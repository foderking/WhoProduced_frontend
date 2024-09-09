import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Index } from './Views/Index'
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