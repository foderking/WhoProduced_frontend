import axios from 'axios';
import { IndexViewException } from '../Functionality/Errors';

const DB_URL = 'http://localhost:8888/search'
//const DB_URL = 'https://whoproduced.herokuapp.com/search';



export async function GetAlbums(request_query)
{ // Handles query request to backend
	console.log(`"GetAlbum()".Sending request to ${DB_URL} for "${request_query}"`);
	const request_headers = {
		"Content-Type": "application/json"
	};
	const request_data = {
		query: request_query,
		type: 'track',
		limit: 10
	}

	const response = await axios.post(DB_URL, request_data, request_headers)

	console.log('"GetAlbum()" end.')

	if (response.data.Error) { // Handles Error messages from server
		// e.g response.data = {"Error: "No result from spotify api", "name": "EMPTY_SPOTIFY_RESPONSE"}
		const error_message = response.data.Error
		const error_name = response.data.name ?  response.data.name : "Error"

		console.log(response.data)
		throw new IndexViewException(error_message, error_name)
	}
	else {
		return response
	}
}
