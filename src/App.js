import React from 'react'
import InputField from './Functionality/InputField'
import parseWiki from 'infobox-parser'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  useParams,
} from 'react-router-dom'
import { Card } from './Components/Card'
import { ViewHeader } from './Components/ViewHeader'
import { ViewProducer } from './Components/ViewProducer'
// import Nav from './Components/Nav2'
// import Footer from './Components/Footer2'









const App = () =>
{
  // Spotify search results
  const spotifyObject = InputField('text', {
      "tracks": {
        "href": "https://api.spotify.com/v1/search?query=the+message&type=track&offset=0&limit=5",
        "items":[]
      }
    }
  )
  
  const search = InputField('text', '')


  return (
    <div className='container '>

      <Switch>
        <Route path='/track/:id'>
          <ViewInfo spotify={spotifyObject} />
        </Route>

        <Route path='/' >
          <Index spotify={spotifyObject} search={search}/>
        </Route>
      </Switch>
      {/* <Footer />  */}
    </div>
  )
}

// Views Information for selected track
const ViewInfo =  ({spotify}) =>
{
  // producer info
  const [producer, setproducer] = useState([])
  // object for setting errors
  const [error, seterror] = useState('')
  // id of selected track
  const id = useParams().id
  const items = spotify.state.tracks.items
  // selected track object
  const track = items.find(each => each.id === id)
  // spinner
  const [spinner, setspinner] = useState('')
  
  const [wikiurl, setwikiurl] = useState('/#')

  console.log('object', track)


  // cleans string before sending request
  // returns string
  function querEscape(string)
  {
    return string.trim().replace(/\s+/g, '%20')
  }

  // gets wikipedia key from selected track object
  // returns string 
  async function getPageKey(obj)
  {
    if (!obj.name ){
      console.log('empty or invalid obj',obj)
      return null
    }

    // search query to send to wikipedia
    const query = obj.name.replace(/\(feat.*?\)/g,'') + '%20' + obj.artists.map(each => each.name).join('%20') + '%20'+ obj.album.name + ' ' + String(obj.album.release_date).slice(0,4)
    // console.log('release ', obj.album.release_date.slice(0,4))

    const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=' +  querEscape(query)
    const res = await axios.get(url)

    if (!res.data.query.search.length){
      console.log('no suitable wikipedia page')
      return null
    }
    // const wikiUrl = 'https://en.wikipedia.org/?curid='+res.data.query.search[0].pageid

    // gets name of first search result and converts to key suitable for another wikipedia request
    const k = res.data.query.search[0].title.replace(/\s+/g, '_')
    console.log('page key', k,url)

    return k
  }


  // gets wikipedia page in wikitext from key
  // returns string
  async function getSource(key)
  {
    const url = 'https://en.wikipedia.org/w/rest.php/v1/page/' + key
    const res = await axios.get( url )
    // sets the link to wiki page
    setwikiurl( 'https://en.wikipedia.org/wiki/' + key)

    if (!res.data.source) {
      console.log('unable to find source from supplied key')
      return null
    }
    // cleans result
    const repl = res.data.source//.replace(/{{ref.*?\|a|b|c\|\[a|b|c\]}}/gmis, '')
    console.log('source',repl)

    return repl
  }


  // extracts {{tracklist}} section from the wikipedia page source
  // returns array  containing the {{tracklist}} section
  function getTracklist(source)
  {
    let re = /{{track.*list.*?^}}/gmsi

    const mach =source.match(re)

    if (!source.match(re)){
      console.log('no tracklist found')
      return null
    }

    const ma = source.match(re).length ?  source.match(re)[0] :  source.match(re)
    console.log('matched', ma, mach)

    return ma 
  }


  // parses raw tracklist source
  // returns object
  function parseTracklist(tracklist)
  {
    return parseWiki(tracklist).general
  }


  // finds the songs key name in the object to use to find the producer value later on
  // TODO: make the function better by finding the best match instead of exact match
  function getKeyByValue(object, value) {
    return Object.keys(object)
      .find(key =>
        String(object[key]).match(new RegExp(value, 'i'))
      )
  }


  // finds producer info from object given the key no.
  // returns array of string containing producer names if any exists
  function getProducer(key, tracklist)
  {
    // finds key no. Ex: from "title12" => "12"
    const k = key.slice(5)

    const producer =tracklist[ 'extra' + k]

    console.log('extra'+ k, tracklist )
    console.log(producer, 'producer')
    

    if (!producer){
      console.log('no producer info available')
      return null
    }

    return producer
  }


  /*
  *  given a  string  possibly containing  1 or more - {{tracklist}} - sections
  *  parses each {{tracklist}} separately and finds the best result
  *  returns array containing the key name and object of best result
  */
  function getKeyFromTracklist(tracklist, trackname)
  {
    console.log('trackname',trackname)

    // splits different sections into array
    const all = tracklist.replace(/^}}.*?^{{/gmsi, '}}abcd{{').split('abcd')
    console.log('split', all )
    // parse each string in array into object
    const parsed = ( all.map(each => parseTracklist(each)))
    console.log('parse',parsed)
    // finds tracklist object that contains the name of the song to be found
    // invalid objects are mapped to 'undefined'
    const keyed  = parsed.map(each => getKeyByValue(each, trackname) )
    console.log('keyvalue',keyed)
    // finds the correct object - one that isn't undefined
    const ans = keyed.find(each => each)
    const parans = parsed.find(each => getKeyByValue(each, trackname) === ans)
    console.log('ahndle', ans,parans)

    if (!ans) {
      console.log('track not found in tracklist')
      return null
    }
    // key name and object which the key is in
    return [ans, parans] 
  }



  async function main(track)
  {
    setspinner('yes')
    // search wikipedia for the song
    const key = await getPageKey(track)

    if (!key){
      seterror('No search result from Wikipedia')
      return
    }
    // gets the source of the found page in wikitext format
    const source  = await getSource(key)

    if (!source) {
      seterror('Unable to find wikipedia source from key')
      return
    }
    // converts wikitext source to object
    const tracklist = getTracklist(source)

    if (!tracklist) {
      seterror('No tracklist section found')
      return
    }
    // cleans trackname gotten from spotify
    const trackname = track.name.replace(/\(feat.*?\)/g, '').trim()

    // gets key given trackname and wikitext source
    const valuekey = getKeyFromTracklist(tracklist, trackname)

    if (!valuekey){
      seterror('Unable to find song in tracklist')
      return
    }
    // finds producer info
    const producer = getProducer(valuekey[0], valuekey[1])

    if (!producer){
      seterror('Unable to producer info')
      return
    }


    setproducer(producer)
  }


  // console.log(wikiurl)


  // eslint-disable-next-line
  useEffect(() =>{
    main(track)
      .then(d => setspinner('no'))
      .catch(error => seterror(error))
      // eslint-disable-next-line
  }, [track])


  return (
    <div>
      <ViewHeader   track={track} wiki={wikiurl}      />
      <div className='hh my-4'>
      {
        spinner === 'yes'
        ? <Spinner />
        :
          error 
          ? <Error error={error} />
          : <ViewProducer producer={producer} />
      }
      </div>
    </div>
  )
}



const Index = ({spotify, search}) =>
{
  const ex = spotify.state
  const setex = spotify.setState
  const [err, seterr] = useState('')
  const [spin, setspin] = useState('')
 


  async function getAlbum(query)
  {
    const url = 'https://whoproduced.herokuapp.com/search'

    const headers = {
      "Content-Type": "application/json"
    }

    const data = {
      query ,
      type: 'track',
      limit:'5'
    }

    console.log(url , query)

    try {
      seterr('')
      const a = await axios.post(url, data , headers)
      console.log('ans',a.data)

      if (!a.data.tracks.items.length) {
        seterr('No results')
      }
      setex(a.data)
    }
    catch (e) {
      console.log(e)
      console.log('couldnt get album', e)
    }
  }

  function handleSubmit(e)
  {
    setspin('yes')
    e.preventDefault()
    console.log(ex)

    getAlbum(search.main.value)
      .then(data => setspin(''))
      .catch(error => seterr(error))
  }


  return(
    <div>
      <header className='py-5 text-center'>
        <h1 className='display-3'>WhoProduced</h1>
        <p className='lead'>Find out who produced some of your favorite tracks</p>
      </header>

      <section>
        <div className='mb-5 p-5'>
          <form className="form-inline" onSubmit={handleSubmit}>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <input
                {...search.main}
                className="form-control"
                id="inlineFormInputGroup"
                placeholder='Search here...'
              />

              <button type="submit" className="btn btn-dark">Search</button>
            </div>
          </form>
        </div>

        <div className='hh'>
          {
            spin ?
            <Spinner />
            :
            err ?
            <Error error={err} />
            :
            ex.tracks.items.map(each => <Card key={each.id} each={each} />)
          }
        </div>
      </section>
    </div>
  )
}
const Error =  ({error}) =>
<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Error!</strong> {error}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>


const Spinner = () =>
<div className='my-5 py-5 text-center'>
  <div class="spinner-border spinner-custom" role="status">
    {/* <span class="sr-only">Loading...</span> */}
  </div>
</div>

export default App
