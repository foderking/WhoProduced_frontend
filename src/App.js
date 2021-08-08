import React from 'react'
import InputField from './Functionality/InputField'
import wiki from 'wikijs'
import parseWiki from 'infobox-parser'
import axios from 'axios'
import RandomNumGen from './Functionality/random'
import { useState } from 'react'

const App = () =>
{
  const song = InputField('text', '')
  const search = InputField('text', '')
  // const producer = InputField('text', [])
  const [producer, setproducer] = useState([])


  const [ex, setex] = useState(
    {
    "tracks": {
        "href": "https://api.spotify.com/v1/search?query=the+message&type=track&offset=0&limit=5",
        "items": []}}
  )
  
  async function getPageKey(query)
  {
    const res = await axios.get(`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${query}&limit=1`)
    console.log('page key', res.data.pages[0])

    return res.data.pages[0].key
  }

  async function getSource(key)
  {
    const res = await axios.get('https://en.wikipedia.org/w/rest.php/v1/page/' + key)
    console.log('source', res.data.source)

    return res.data.source
  }

  function getTracklist(source)
  {
    let re = /{{track.*list.*?^}}/gmsi

    console.log('matched', source.match(re))
    return source.match(re).length ?  source.match(re)[0] :  source.match(re)
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
    try
    {
      await getAlbum(search.main.value)
    }
    catch (error)
    {
      return
    }
const x =`
    const key = await getPageKey(search.main.value)

    const source = await getSource(key)
    // console.log(source)

    const trackList = parseTracklist(getTracklist(source))

    console.log('parsed trackist', (trackList))

    const valueKey = getKeyByValue(trackList, song.main.value)
    console.log('key by value', valueKey)

    const producer = getProducer(valueKey, trackList)

    setproducer(producer)
    `
    // const map = {"first" : "1", "second" : "2"};
// console.log(getKeyByValue(map,"2"))
    // wiki()
    //   .find(`${album.main.value} (album)`)
    //   .then(page => (page.html()))
    //   .then(a => console.log(a))
  }


  return (
    <div className='container '>
      <header className='py-5 text-center'>
        <h1 className='display-3'>WhoProduced</h1>
        <p className='lead'>Find out who produced some of your favorite tracks</p>
      </header>


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
     <ul>
      {
        Array.isArray(producer) 
        ? 
        producer.map(each => <li key={RandomNumGen()}>{each}</li>)
        : producer
      }
      </ul>

      {
        ex.tracks.items.map(each => <Card each={each} />)
      }
    </div>
  )
}

function SearchView({tracks})
{
  return (
    <div className="d-flex align-items-center">
      <div className="flex-shrink-0">
        <img src={tracks.items[0].album.images[1].url} alt="..." />
      </div>
      <div className="flex-grow-1 ms-3">
        This is some content from a media component. You can replace this with any content and adjust it as needed.
      </div>
      <div className="flex-grow-1 ms-3">
        This is some content from a media component. You can replace this with any content and adjust it as needed.
      </div>
    </div>
  )
}

function Card({each})
{
  return (
    <div className="ant-row _27ig9" >
      <div className="ant-col ant-col-xs-24 ant-col-md-19">
        <a href="/Info/It-Was-Written-Damian-Marley-Stephen-Marley-Capleton-Drag-On/03M3oEPsk8WjwMlVOKBFXv">
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
        </a>
      </div>

      <div className="ant-col _1C1NE ant-col-xs-24 ant-col-md-5">
        <a href={each.external_urls.spotify} target="_blank" className="USeLs">
          <img className="_9H-oe" src="https://img.icons8.com/ios-filled/50/000000/spotify.png" />
        </a>
      </div>
    </div>
  )
}


export default App


