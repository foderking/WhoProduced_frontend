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
  const album = InputField('text', '')
  // const producer = InputField('text', [])
  const [producer, setproducer] = useState([])

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


  async function handleSubmit(e)
  {
    e.preventDefault()

    const key = await getPageKey(album.main.value)

    const source = await getSource(key)
    // console.log(source)

    const trackList = parseTracklist(getTracklist(source))

    console.log('parsed trackist', (trackList))

    const valueKey = getKeyByValue(trackList, song.main.value)
    console.log('key by value', valueKey)

    const producer = getProducer(valueKey, trackList)

    setproducer(producer)
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

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='songName'>
            Song
          </label>
          <input
            {...song.main}
            className='form-control'
            id="songName"
            placeholder='e.g The Message'
          />
        </div>
        <div className="form-group">
          <label htmlFor="albumName">Album</label>
          <input
            {...album.main}
            className="form-control"
            id="albumName"
            placeholder="e.g It was written" />
        </div>
        <button className='btn btn-secondary mb-2'>Search</button>
      </form>
      <h2>Producer</h2>
      <ul>
      {
        Array.isArray(producer) 
        ? 
        producer.map(each => <li key={RandomNumGen()}>{each}</li>)
        : producer
      }
      </ul>
    </div>
  )
}

export default App
