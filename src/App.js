import React from 'react'

const App = () => {
  return (
    <div className='container'>
      <header className='text-center py-5'>
        <h1 className='display-3'>WhoProduced</h1>
        <p className='lead'>Find out who produced some of your favorite tracks</p>
      </header>

      <div className='text-center'>
        <input className='form-group form-control-lg mx-sm-3 mb-2' />
        <button className='btn btn-secondary mb-2'>Search</button>
      </div>
    </div>
  )
}

export default App
