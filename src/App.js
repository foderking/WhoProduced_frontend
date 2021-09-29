import React from 'react'
import InputField from './Functionality/InputField'
import {
  Switch, Route,
} from 'react-router-dom'
import { Info } from './Views/Info'
import { Index } from './Views/Index'
// import Nav from './Components/Nav2'
// import Footer from './Components/Footer2'


const App = () =>
{
  const search = InputField('text', '')
  // Spotify search results
  const spotify_filler = InputField('text', {
      "tracks": {
        "href": "https://api.spotify.com/v1/search?query=the+message&type=track&offset=0&limit=5",
        "items":[]
      }
    }
  )
  return (
    <div className='container '>

      <Switch>

        <Route path='/track/:id'>
          <Info spotify={spotify_filler} />
        </Route>

        <Route path='/' >
          <Index spotify_filler={spotify_filler} search={search}/>
        </Route>

      </Switch>

    </div>
  )
}

export default App