import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Card } from '../Components/Card';
import { Spinner } from "../Components/Spinner";
import { Error } from "../Components/Error";

const DB_URL = 'https://whoproduced.herokuapp.com/search';

export const Index = ({ spotify_filler, search }) =>
{
  const show_albums = spotify_filler.state;   // 'empty' object to be populated when the request is successful
  const SetAlbums = spotify_filler.setState;

  const [show_spinner, SetSpinner] = useState(false);

  const [err_timeout, SetErrorTimeout] = useState(0)  // state for managing removal / timing out of the error 
  const [show_error, SetError] = useState('');
  const [error_header, SetErrorHeader] = useState("Error")

  // Function modifies the "SetError" function and automatically sets "show_error" state back to ""  after a specified period of time
  function NewError (error_message, error_header)
  {
    const TTL = 5000
    clearInterval(err_timeout)  // resets any existing "show_error" state that hasn't already timed out to ""

    // changes error message to specified error
    SetError(error_message) // error message
    SetErrorHeader(error_header) // error heading

    SetErrorTimeout(
      // resets back to "" after specified time
      setTimeout(() => SetError(''), TTL)
    )
  }

  function ErrorAlias(err)
  { // Error aliases to make them readable to the user
    if (err === "EMPTY_SPOTIFY_RESPONSE") {
      return "No Result From Spotify"
    }
    else return err
  }

  // The exception type for "Index" view
  class IndexViewException {
    constructor(message, exception_type)
    {
      this.message = message;
      this.name = exception_type;
    }
    // Make the exception convert to a pretty string when used as a string
    // (e.g., by the error console)
    toString()
    {
      return `${this.name}: "${this.message}"`;
    }
  }

  async function GetAlbums(request_query, exception)
  { // Handles query request to backend
    console.log(`"GetAlbum()".Sending request to ${DB_URL} for "${request_query}"`);
    const request_headers = {
      "Content-Type": "application/json"
    };
    const request_data = {
      query: request_query,
      type: 'track',
    }

    const response = await axios.post(DB_URL, request_data, request_headers)

    console.log('"GetAlbum()" end.')

    if (!response.data.tracks.items.length) { // exception when spotify doesn't find song
      //  ** TODO ** : refactor error response  on backend
      throw new exception("Spotify response didn't contain any result", "EMPTY_SPOTIFY_RESPONSE")
    }   
    else {
      return response
    }
  }

  async function FindAlbum(request_query)
  {
    console.log('start spinner')
    SetSpinner(true);

    console.log(`"FindAlbum()"`)
    try {
      const response = await GetAlbums(request_query, IndexViewException)     // sends request to server
      SetAlbums(response.data);
      console.log('"FindAlbum()" successful. response ->', response.data);
    }
    catch (e) {
      console.error(e);
      NewError(e.message, ErrorAlias(e.name) )
    }
    console.log('"FindAlbum()" end.')
    
    console.log('stop spinner')
    SetSpinner(false)
  }

  async function HandleSubmit(e) {
    console.log("'handlesubmit()'. initial object ->", show_albums);
    e.preventDefault();


    await FindAlbum(search.main.value)
    
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

        {/*
        * Spinner component - shows when the webiste is still searching or loading
        *  Error component - shows errors
        */}
        <div className='hh'>
          <Spinner show={show_spinner} /> 
          <Error error={show_error} error_header={error_header} />    
          {
            show_albums.tracks.items.map(each => <Card key={each.id} each={each} />)
          }
        </div>

      </section>
    </div>
  );
};
