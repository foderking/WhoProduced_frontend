import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Card } from '../Components/Card';
import { Spinner } from "../Components/Spinner";
import { Error } from "../Components/Error";

const DB_URL = 'https://whoproduced.herokuapp.com/search';

export const Index = ({ spotify_filler, search }) => {
  const show_albums = spotify_filler.state;   // 'empty' object to be populated when the request is successful
  const SetAlbums = spotify_filler.setState;
  const [show_error, SetError] = useState('');
  const [show_spinner, SetSpinner] = useState(false);
  const [err_timeout, SetErrorTimeout] = useState(0)  // state for managing removal / timing out of the error 

  const NewError = (message) => {
    // Function modifies the "SetError" function and automatically sets "show_error" state back to ""  after a specified period of time
    const TTL = 5000
    clearInterval(err_timeout)  // resets any existing "show_error" state that hasn't already timed out to ""
    SetError(message) // changes error message to specified error

    SetErrorTimeout(
      // resets back to "" after specified time
      setTimeout(() => SetError(''), TTL)
    )
  }
  async function GetAlbums(url, data, headers)
  {
    try {
      const response = await axios.post(url, data, headers);
      return response
    }
    catch (error) {
      console.error("Error in 'GetAlbums()'", error)
      SetError(error)
      return
    }
  }

  async function FindAlbum(request_query) {
    console.log(`"FindAlbum()".Sending request to ${DB_URL} for "${request_query}"`);

    const request_headers = {
      "Content-Type": "application/json"
    };
    const request_data = {
      query: request_query,
      type: 'track',
      limit: '5'
    };

    try {
      // sends request to server
      const response = await axios.post(DB_URL, request_data, request_headers);

      if (!response.data.tracks.items.length) {
        NewError('No results');
        // SetError('No results');
        console.log("FindAlbum Error: No results")
        return
      }
      SetAlbums(response.data);
      console.log('"FindAlbum()" successful. response ->', response.data);
    }
    catch (e) {
      console.log(e);
      console.error('Error in "FindAlbum"', e);
    }
  }

  async function HandleSubmit(e) {
    console.log("'handlesubmit()'. initial object ->", show_albums);
    e.preventDefault();
    // clearTimeout(err_timeout)

    console.log('start spinner')
    SetSpinner(true);

    await FindAlbum(search.main.value)
    
    console.log('stop spinner')
    SetSpinner(false)
  }


  return (
    <div>
      <header className='py-5 text-center'>

        <h1 className='display-3'>WhoProduced</h1>
        <p className='lead'>Find out who produced some of your favorite tracks</p>

      </header>

      <section>

        <div className='mb-5 p-5'>
          <form className="form-inline" onSubmit={HandleSubmit}>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <input
                {...search.main}
                className="form-control"
                id="inlineFormInputGroup"
                placeholder='Search here...' />

              <button type="submit" className="btn btn-dark">Search</button>
            </div>
          </form>
        </div>

        <div className='hh'>
          <Spinner show={show_spinner} />
          <Error error={show_error} />
          {
            show_albums.tracks.items.map(each => <Card key={each.id} each={each} />)
          }
        </div>

      </section>
    </div>
  );
};
