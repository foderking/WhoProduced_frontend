import React from 'react'
import InputField from './Functionality/InputField'
import wiki from 'wikijs'
import parseWiki from 'infobox-parser'
import axios from 'axios'

const App = () =>
{
  const song = InputField('text', '')
  const album = InputField('text', '')

  async function getPageKey(query)
  {
    const res = await axios.get(`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${query}&limit=1`)
    console.log(res.data.pages[0])

    return res.data.pages[0].key
  }

  async function getSource(key)
  {
    const res = await axios.get('https://en.wikipedia.org/w/rest.php/v1/page/' + key)
    console.log(res.data)

    return res.data.source
  }

  function getTracklist(source)
  {
    let re = /{{tracklist.*?^}}/gms

    return source.match(re)[0]
  }

  function parseTracklist(tracklist)
  {
    return parseWiki(tracklist).general
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key =>
      object[key].toLowerCase().contains(value.toLowerCase())
    )
  }


  async function handleSubmit(e)
  {
    e.preventDefault()

    const key = await getPageKey(album.main.value)

    const source = await getSource(key)
    // console.log(source)

    const trackList = getTracklist(source)
    console.log(parseTracklist(trackList))

    console.log(getKeyByValue(trackList, song.main.value))
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
    </div>
  )
}

export default App
