import React from 'react'
import InputField from './Functionality/InputField'
import parseWiki from 'infobox-parser'
import axios from 'axios'
import RandomNumGen from './Functionality/random'
import { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  useParams,
} from 'react-router-dom'
import { Card } from './Components/Card'
import { ViewHeader } from './ViewHeader'









const App = () =>
{
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
    </div>
  )
}


const ViewInfo =  ({spotify}) =>
{
  const [producer, setproducer] = useState([])

  const id = useParams().id
  const items = spotify.state.tracks.items
  const track = items.find(each => each.id === id)

  console.log('object', track)



  function querEscape(string)
  {
    return string.trim().replace(/\s+/g, '%20')
  }


  async function getPageKey(obj)
  {
    if (!obj.name ){
      console.log('empty obj',obj)
      return
    }


    const query = obj.name.replace(/\(feat.*?\)/g,'') + '%20' + obj.artists.map(each => each.name).join('%20') + '%20'+ obj.album.name + ' ' + String(obj.album.release_date).slice(0,4)

    console.log('release ', obj.album.release_date.slice(0,4))

    const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=' +  querEscape(query)
    const res = await axios.get(url)

    if (!res.data.query.search.length){
      console.log('no suitable wikipedia page')
      return null
    }

    const wikiUrl = 'https://en.wikipedia.org/?curid='+res.data.query.search[0].pageid
    const k = res.data.query.search[0].title.replace(/\s+/g, '_')
    console.log('page key', k,url,wikiUrl)// res.data.query.search)//, res.data.pages[0])

    return k
  }


  async function getSource(key)
  {
    const res = await axios.get( 'https://en.wikipedia.org/w/rest.php/v1/page/'+key)
    const repl = res.data.source.replace(/{{ref.*?\|a|b|c\|\[a|b|c\]}}/gmis, '')
    console.log('source',repl)//res.data.source.length)

    return repl// res.data.source.replace(/{{ref\|a\|\[a\]}}/gmi, '')
  }



  function getTracklist(source)
  {
    let re = /{{track.*list.*?^}}/gmsi

    const mach =source.match(re)

    if (!source.match(re)){
      return null
    }

    const ma = source.match(re).length ?  source.match(re)[0] :  source.match(re)
    console.log('matched', ma, mach)

    return ma 
  }



  function parseTracklist(tracklist)
  {
    return parseWiki(tracklist).general
  }



  function getKeyByValue(object, value) {
    return Object.keys(object)
      .find(key =>
        String(object[key]).match(new RegExp(value, 'i'))
      )
  }



  function getProducer(key, tracklist)
  {
    const k = key.slice(5)

    const producer =tracklist[ 'extra' + k]
    console.log('extra'+ k, tracklist )
    

    if (!producer){
      console.log('no producer info available')
      return null
    }

    return producer
  }


  function handle(tracklist, trackname)
  {
    console.log('trackname',trackname)
    const all = tracklist.replace(/^}}.*?^{{/gmsi, '}}abcd{{').split('abcd')
    console.log('split', all )

    const parsed = ( all.map(each => parseTracklist(each)))
    console.log('parse',parsed)

    const keyed  = parsed.map(each => getKeyByValue(each, trackname) )
    console.log('keyvalue',keyed)
    
    const ans = keyed.find(each => each)
    const parans = parsed.find(each => getKeyByValue(each, trackname) === ans)
    console.log('ahndle', ans,parans)

    if (!ans) {
      return null
    }
    return [ans, parans] 
  }





  async function a()
  {
    const trackname = track.name.replace(/\(feat.*?\)/g, '').trim()
    const key = await getPageKey(track)
    console.log('key ', key)

    if (!key){
      console.log('wiki id not found')
      return
    }

    const source  = await getSource(key)

    const tracklist = getTracklist(source)

    if (!tracklist) {
      console.log('no tracklist found')
      return
    }
    
    // const parse = parseTracklist(tracklist)
    // console.log(parse, 'parsed')

    // console.log('parsed trackist', (parse))

    // console.log('trackname', trackname)
    // const valueKey = getKeyByValue(parse, trackname)//.trim()// search.main.value)
    // console.log('key by value', valueKey)

    const valuekey = handle(tracklist, trackname)
    if (!valuekey){
      console.log('track not found in tracklist')
      return
    }


    const producer = getProducer(valuekey[0], valuekey[1])
    if (!producer){
      return
    }

    console.log(producer, 'producer')
    setproducer(producer)
  }

  useEffect(() => {
    a()
    //eslint-disable-next-line
  }, [])


  return (
    <div>
      <ViewHeader image={track.album.images[1].url} track={track} />

      <ViewProducer producer={producer} />
    </div>
  )
}

export function toMin(seconds)
{
  const min = parseInt(seconds / 60)
  const sec = parseInt(seconds % 60)
  
  return `${min}: ${sec}`
}

const ViewProducer = ({producer}) =>
<div className='my-5'>
  <h2>Producers</h2>
  <ul>
  {
    Array.isArray(producer) ?
      producer.map(each => <li key={RandomNumGen()} >{each}</li> )
      : producer
  }
  </ul>
</div>


const Index = ({spotify, search}) =>
{

  const ex = spotify.state
  const setex = spotify.setState
 


  async function getAlbum(query)
  {
    const url = 'http://localhost:8888/search'

    const headers = {
      "Content-Type": "application/json"
    }

    const data = {
      query ,
      type: 'track',
      limit:'5'
    }

    console.log(url , query)

    try{
      const a = await axios.post(url, data , headers)
      console.log('ans',a.data)
      setex(a.data)
    }
    catch (e){
      console.log(e)
      console.log('couldnt get album', e)
    }
    
  }

  async function handleSubmit(e)
  {
    e.preventDefault()
    console.log(ex)

    await getAlbum(search.main.value)

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

        <div>
          {
            ex.tracks.items.map(each => <Card key={each.id} each={each} />)
          }
        </div>
      </section>
    </div>
  )
}

export default App