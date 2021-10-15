import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from "../Components/Spinner";
import { Error } from "../Components/Error";
import { GetTrack } from '../Services/GeniusApi';
import { TrackHeader } from '../Components/TrackHeader';
import { ProducerCard } from '../Components/ProducerCard';
import { NewError } from '../Functionality/Errors';

export const Track = () => { // Views Information for selected track
  const id = useParams().id // id of selected track

  const [track, SetTrack] = useState(null) // Stored the response from server 

  const [spinner, setspinner] = useState(false);

  const [err_timeout, SetErrorTimeout] = useState(0)  // state for managing removal / timing out of the error 
  const [show_error, SetError] = useState('');
  const [error_header, SetErrorHeader] = useState("Error")


  useEffect(async () => {
    try {
      setspinner(true);

      const track = await GetTrack(id)
      SetTrack(track)

      setspinner(false);
    }
    catch (error) {
      NewError(error, SetError, SetErrorHeader, SetErrorTimeout, err_timeout)
      setspinner(false);
    }   // eslint-disable-next-line
  }, []);


  return (
    <div>
      <TrackHeader track={track} show={track ? true : false} />

      <div className='hh my-4'>
        {
          track ?
            track.response.song.producer_artists.map(
              each => <ProducerCard key={each.id} each={each} show={track ? true : false} />
            )
            : <></>
        }
        <Spinner show={spinner} />
        <Error error={show_error} error_header={error_header} />
      </div>
    </div>
  );
};
