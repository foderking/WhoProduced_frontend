import React from 'react'
import {
  Switch, Route,
} from 'react-router-dom'
import { Info } from './Views/Info'
import { Index } from './Views/Index'
import InputField from './Functionality/InputField'
import Nav from './Components/Nav'
import Footer from './Components/Footer'

const App = () =>
{
  const search = InputField('text', '')
  const spotify_template = InputField('text', {
    "tracks": {
      "href": "",
      "items": []
    }
  })

  return (
    <div className='container '>
      <Nav />

      <Switch>
        <Route path='/track/:id'>
          <Info spotify={spotify_template} />
        </Route>

        <Route path='/' >
          <Index spotify_filler={spotify_template} search={search} />
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App