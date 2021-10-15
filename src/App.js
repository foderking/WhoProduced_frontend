import React from 'react'
import {
  Switch, Route,
} from 'react-router-dom'
// import { Info } from './Views/Info'
import { Index } from './Views/Index'
import InputField from './Functionality/InputField'
import Nav from './Components/Nav'
import Footer from './Components/Footer'
import { Track } from './Views/Track'

const App = () =>
{
  return (
    <div >
      <Nav />

      <div className='container my-3'>
        <Switch>
          <Route path='/track/:id'>
            {/* <Info spotify={spotify_template} /> */}
            <Track />
          </Route>

          <Route path='/' >
            <Index />
          </Route>
        </Switch>
      </div>

      <Footer />
    </div>
  )
}

export default App