import React from 'react';
import { useState } from 'react';
import { Spinner } from "../Components/Spinner";
import { Error } from "../Components/Error";
// import { Card } from '../Components/Card';
// import { GetAlbums } from '../Services/SpotifyApi';
import { NewError } from '../Functionality/Errors';
import { SearchGenius } from '../Services/GeniusApi';
import { GeniusCard } from '../Components/GeniusCard';
import InputField from '../Functionality/InputField'

export const Index = () =>
{
  const search = InputField('text', '')
  // const show_albums = spotify_filler.state;   // 'empty' object to be populated when the request is successful
  // const SetAlbums = spotify_filler.setState;
  const [genius_results, SetResults] = useState({
    meta : {},
    response: {
      hits : []
    }
  })

  const [show_spinner, SetSpinner] = useState(false);

  const [err_timeout, SetErrorTimeout] = useState(0)  // state for managing removal / timing out of the error 
  const [show_error, SetError] = useState('');
  const [error_header, SetErrorHeader] = useState("Error")
  // async function SearchSpotify(request_query)
  // {
  //   console.log('start spinner')
  //   SetSpinner(true);

  //   console.log(`"FindAlbum()"`)
  //   try {
  //     const response = await GetAlbums(request_query)     // sends request to server
  //     SetAlbums(response.data);
  //     console.log('"FindAlbum()" successful. response ->', response.data);
  //   }
  //   catch (e) {
  //     NewError(e, SetError, SetErrorHeader, SetErrorTimeout, err_timeout)
  //   }
  //   console.log('"FindAlbum()" end.')
    
  //   console.log('stop spinner')
  //   SetSpinner(false)
  // }
  async function QueryGenius(request_query)
  {
    console.log('start spinner')
    SetSpinner(true);
    console.log(`"SearchGenius()"`)

    try {
      const response = await SearchGenius(request_query)     // sends request to server
      SetResults(response);
      console.log('"SearchGenius()" successful. response ->', response);
    }
    catch (e) {
      NewError(e, SetError, SetErrorHeader, SetErrorTimeout, err_timeout)
    }
    
    console.log('"SearchGenius()" end.')
    console.log('stop spinner')
    SetSpinner(false)
  }

  async function HandleSubmit(e) {
    console.log("'handlesubmit()'")//. initial object ->", show_albums);
    e.preventDefault();

    await QueryGenius(search.main.value)
    // await SearchSpotify(search.main.value)
    
    console.log('"handleSubmit()" end.')
  }


  return (
    <div>
      <header className='py-5 text-center'>

        <h1 className='display-3'>WhoProduced</h1>
        <p className='lead'>Find out who produced some of your favorite tracks</p>

      </header>

      <section>

        <div className='mb-5 p-5'>
          <form onSubmit={HandleSubmit}>
            <div className="input-group form-outline mb-2 mr-sm-2 mb-sm-0">
              <input
                {...search.main}
                className="form-control"
                type='search'
                id="inlineFormInputGroup"
                placeholder='search song here...' />

              <button type="submit" className="btn btn-dark">Search</button>
            </div>
          </form>
        </div>

        {/*
        * Spinner component - shows when the webiste is still searching or loading
        *  Error component - shows errors
        */}
        <div className='hh'>
          <Spinner show={show_spinner} /> 
          <Error error={show_error} error_header={error_header} />    

          {/* {
            show_albums.tracks.items.map(each => <Card key={each.id} each={each} />)
          } */}
          {
            genius_results.response.hits.map(each => <GeniusCard key={each.result.id} each={each} />)
          }
        </div>

      </section>
    </div>
  );
};
