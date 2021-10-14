import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ViewHeader } from '../Components/Info_Header';
import { ViewProducer } from '../Components/Info_Producer';
import { Spinner } from "../Components/Spinner";
import { Error } from "../Components/Error";
import { SearchWiki } from '../Services/WikiApi'
import { GetTrack } from '../Services/SpotifyApi';


export const Info = ({spotify}) =>
{ // Views Information for selected track
  const id = useParams().id // id of selected track

  const [producer, setproducer] = useState([]); // producer info
  // selected track object
  const [track, SetTrack] = useState(null)

  const [spinner, setspinner] = useState(false);

  const [wikiurl, setwikiurl] = useState('/#');

  const [err_timeout, SetErrorTimeout] = useState(0)  // state for managing removal / timing out of the error 
  const [show_error, SetError] = useState('');
  const [error_header, SetErrorHeader] = useState("Error")


  useEffect(async () => {
    const track = await GetTrack(id)
    SetTrack(track)

    setspinner(true);

    const main_response = await SearchWiki(track, SetError, SetErrorHeader, SetErrorTimeout, err_timeout)
    const wikiurl = main_response.wiki_url

    const producer = main_response.producer
    console.log('main response ==>', main_response)

    if (wikiurl && producer ) {
      setproducer(producer);
      setwikiurl(wikiurl)
    }

    setspinner(false);
    // eslint-disable-next-line
  }, []);


  return (
    <div>
      {
        /* 
        * ViewHeader pararms::
        * track - Object representing track Information
        * wiki  - Url to selected track
        * 
        */
      }
      <ViewHeader track={track} wiki={wikiurl} show={track ? true : false} />
      
      <div className='hh my-4'>
      {
        /*
        * ViewProducer params::
        * producer - could be an array containing the names all the producers or a string containing the name of the producer
        * 
        */
      }
      <ViewProducer producer={producer} />
      <Spinner show={spinner} />
      <Error error={show_error} error_header={error_header} />    
      </div>
    </div>
  );
};
