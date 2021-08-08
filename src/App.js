import React from 'react'
import InputField from './Functionality/InputField'
import parseWiki from 'infobox-parser'
import axios from 'axios'
// import RandomNumGen from './Functionality/random'
import { useState } from 'react'
import {
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom'















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
  // getPageKey(spotifyObject.state.tracks.items.length ? spotifyObject.state.tracks.items[0]  : {})
  //   name: 'it was written',
  //   artists: [{name:'nas'}],
  // })
  
  return (
    <div className='container '>
      <Switch>
        <Route path='/track/:id'>
          <ViewInfo spotify={spotifyObject} search={search} />
        </Route>
        <Route path='/' >
          <Index spotify={spotifyObject} search={search}/>
        </Route>
      </Switch>
    </div>
  )
}


function Card({each})
{
  return (
    <div className="ant-row _27ig9" >
      <div className="ant-col ant-col-xs-24 ant-col-md-19">
        <Link to={`/track/${each.id}`} onClick={() => console.log('clikc')}>
          <div className="ant-row F-pFw" >
            <div className="ant-col ant-col-xs-7 ant-col-sm-6 ant-col-md-5 ant-col-lg-4">
              <img src={each.album.images[1].url} />
            </div>
            <div className="ant-col _2whaa ant-col-xs-17 ant-col-lg-20">
              <div className="ant-row _3EW_U" >
                <div className="ant-col _28Yqm ant-col-xs-24 ant-col-lg-8">
                  <div className="ant-typography ant-typography-ellipsis ant-typography-single-line ant-typography-ellipsis-single-line _12mCB">
                      {each.artists.map(each => each.name).join(', ')}
                  </div>

                  <div className="ant-typography ant-typography-ellipsis ant-typography-ellipsis-multiple-line _1guJu">
                    {each.name}
                  </div>
                </div>

                <div className="ant-col _1hTOV ant-col-xs-24 ant-col-lg-16">
                  <div className="OKyL0">
                    <p className="_1vVQ4">{each.album.release_date}</p>
                    <p className="lUyFq">Release Date</p>
                  </div>

                  <div className="OKyL0">
                    <p className="_1vVQ4">{each.popularity}</p>
                    <p className="lUyFq">Popularity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="ant-col _1C1NE ant-col-xs-24 ant-col-md-5">
        <a href={each.external_urls.spotify} target="_blank" className="USeLs">
          <img className="_9H-oe" src="https://img.icons8.com/ios-filled/50/000000/spotify.png" />
        </a>
      </div>
    </div>
  )
}



function querEscape(string)
{
  return string.trim().replace(/\s+/g, '%20')
}


const ViewInfo =  ({spotify, search}) =>
{
  const id = useParams().id

  const items = spotify.state.tracks.items
  const track = items.find(each => each.id === id)
  console.log('object', track)

  const [producer, setproducer] = useState([])




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
    console.log('source', res.data.source.length)

    return res.data.source
  }



  function getTracklist(source)
  {
    let re = /{{track.*list.*?^}}/gmsi

    const ma = source.match(re).length ?  source.match(re)[0] :  source.match(re)
    console.log('matched', ma)

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
    console.log('extra'+ k, tracklist, producer)

    return producer
  }













  async function a()
  {
    const key = await getPageKey(track)
    console.log('key ', key)

    const source  = await getSource(key)

    const tracklist = (getTracklist(source))

    const parse = parseTracklist(tracklist)
    console.log(parse)

    console.log('parsed trackist', (parse))

    const valueKey = getKeyByValue(parse, search.main.value)
    console.log('key by value', valueKey)

    const producer = getProducer(valueKey, parse)

    console.log(producer, 'producer')
    setproducer(producer)
  }

  a()


  return (
    <div>
      haha
      {id}
      <img src={track.album.images[1].url}/>
      <h2>Producers</h2>
      {producer}
    </div>
  )
}





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


