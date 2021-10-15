import axios from 'axios';
import { IndexViewException } from '../Functionality/Errors';

import base_url from '../Functionality/base_url'


const search_url = base_url + '/api/search'
const track_api = base_url + '/api/track'


export async function SearchGenius(request_query)
{ // Handles query request to backend
	console.log(`"SearchGenius()".Sending request to ${search_url} for "${request_query}"`);
	const request_headers = {
		"Content-Type": "application/json"
	};
	// const request_data = {
	// 	query: request_query,
	// 	type: 'track',
	// 	limit: 10
	// }
	const query_params = '?path=genius&q=' + request_query

	// const response = await axios.post(search_url, request_data, request_headers)
	const response = await axios({
		method:"GET",
		url:search_url + query_params,
		Headers: request_headers
	})

	console.log('"SearchGenius()" end.')

	const err = response.data.error 

	if (err) { // Handles Error messages from server
		// e.g response.data = {"Error: "No result from spotify api", "name": "EMPTY_SPOTIFY_RESPONSE"}
		const error_message = err.message
		const error_name = err.name// response.data.name ?  response.data.name : "Error"

		console.log('Server', error_name, error_message)
		throw new IndexViewException(error_message, error_name)
	}
	else {
		return response.data
	}
}

export async function GetTrack(id)
{
	console.log('"GetTrack()" start.')
	console.log(`Sending request for track ${id}`);

	const query_params = '?id=' + id

	const response = await axios.get(track_api + query_params)

	console.log('"GetTrack()" end.')

	const err = response.data.error 

	if (err) { // Handles Error messages from server
		// e.g response.data = {"Error: "No result from spotify api", "name": "EMPTY_SPOTIFY_RESPONSE"}
		const error_message = err.message
		const error_name = err.name// response.data.name ?  response.data.name : "Error"

		console.log('Server', error_name, error_message)
		throw new IndexViewException(error_message, error_name)
	}
	else {
		console.log('Genius resp::>', response.data)
		return response.data
	}

}