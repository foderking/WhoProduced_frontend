import axios from 'axios';
import { IndexViewException } from '../Functionality/Errors';

// const base_url = 'https://whoproduced.herokuapp.com';
const base_url = 'http://localhost:8888';

const album_api = base_url + '/search'
const track_api = base_url + '/id'


export async function GetAlbums(request_query)
{ // Handles query request to backend
	console.log(`"GetAlbum()".Sending request to ${album_api} for "${request_query}"`);
	const request_headers = {
		"Content-Type": "application/json"
	};
	const request_data = {
		query: request_query,
		type: 'track',
		limit: 10
	}

	const response = await axios.post(album_api, request_data, request_headers)

	console.log('"GetAlbum()" end.')

	if (response.data.Error) { // Handles Error messages from server
		// e.g response.data = {"Error: "No result from spotify api", "name": "EMPTY_SPOTIFY_RESPONSE"}
		const error_message = response.data.message
		const error_name = response.data.name// response.data.name ?  response.data.name : "Error"

		console.log('error getting album', response.data)
		throw new IndexViewException(error_message, error_name)
	}
	else {
		return response
	}
}

export async function GetTrack(id)
{
	console.log('"GetTrack()" start.')
	console.log(`Resending request for track ${id}`);
	const request_headers = {
		"Content-Type": "application/json"
	};
	const request_data = {
		id,
	}

	const response = await axios.post(track_api, request_data, request_headers)

	console.log('"GetTrack()" end.')

	if (response.data.Error) { // Handles Error messages from server
		// e.g response.data = {"Error: "No result from spotify api", "name": "EMPTY_SPOTIFY_RESPONSE"}
		const error_message = response.data.message
		const error_name = response.data.name// response.data.name ?  response.data.name : "Error"

		console.log('error renewing track', response.data)
		throw new IndexViewException(error_message, error_name)
	}
	else {
		return response.data
	}

}