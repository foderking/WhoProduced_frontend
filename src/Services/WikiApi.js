import { InfoViewException } from "../Functionality/Errors"
import axios from "axios"
import parseWiki from 'infobox-parser';
import { NewError } from "../Functionality/Errors";
/*
* Function get the name of the wikipedia page of the track if any
*   info about the track object is used to makes a request to wikipedia like : name, artists, album
*   if the first result matches the track, the function is deemes successful, else not
* typical wiki response would be something like => {...{...timestamp: "2021-09-24T01:21:43Z", title: "The Marshall Mathers LP 2"...}...}
* the key would then be => The_Marshall_Mathers_LP_2
*/

const BASE_URL = 'https://en.wikipedia.org'

export async function GetPageKey(track_object, trackname)
{
	console.log('"GetPageKey()" start.')

	const BASE_WIKI_URl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=' 

	if (!track_object.name) { // throw exception if key is missing
		const error_message = "'Track' object does not contain valid 'name' key"
		const error_name = "TRACK_KEY_ERROR" 
		throw new InfoViewException(error_message, error_name)
	}

	// Sets up query for wikipedia
	// ** assert RemoveFeatures(track_object.name) === trackname ** 
	const quer_cat = trackname + ' ' + GetAllArtists(track_object.artists) + ' ' + track_object.album.name + ' ' + String(track_object.album.release_date).slice(0, 4);
	const query = new URLSearchParams(quer_cat).toString()
	console.log('query ==>', query)

	// Url for request
	const url = BASE_WIKI_URl + QueryEscape(query);
	console.log('"GetPageKey" url ==>', url)

	const response = await axios.get(url);
	console.log('"GetPageKey" response ==>', response)

	if (!response.data.query.search.length) {  // throw exception if no result from query
		const error_message = "Wikipedia query did not give any valid result"
		const error_name = "NO_WIKI_PAGE" 
		throw new InfoViewException(error_message, error_name)
	}
	// const wikiUrl = 'https://en.wikipedia.org/?curid='+res.data.query.search[0].pageid
	// gets name of first search result and converts to key suitable for another wikipedia request
	const wikipedia_page_key = response.data.query.search[0].title.replace(/\s+/g, '_');
	console.log('Success! Wikipedia page key ==>', wikipedia_page_key);

	console.log('"GetPageKey()" end.')

	if (!wikipedia_page_key) {
		const error_message = "Wikipedia query did not give any valid result"
		const error_name = "NO_WIKI_PAGE" 
		throw new InfoViewException(error_message, error_name)
	}
	return wikipedia_page_key;
}


// Gets the source of the wiki page in wikitext format
export async function GetPageSource(key)
{
	console.log('"GetPageSource()" start.')

	const url = BASE_URL + '/w/rest.php/v1/page/' + key;
	console.log('"GetPageSource" url ==>', url)

	const response = await axios.get(url);
	console.log('"GetPageSource" response ==>', response)

	if (!response.data.source) {
		const error_message = "'GetPageSource' request did not return valid result"
		const error_name = "NO_WIKI_SOURCE" 
		throw new InfoViewException(error_message, error_name)
	}

	const wikitext_source = response.data.source; //.replace(/{{ref.*?\|a|b|c\|\[a|b|c\]}}/gmis, '')
	console.log('wikitext source ==>', wikitext_source);

	console.log('"GetPageSource()" end.')
	return wikitext_source;
}

/*
* Extracts {{ tracklist }} section from the raw wikitext
*   {{tracklist}} section is extracted from the wikitext
* 
*/
export function MatchTracklistFromSource(source)
{
	console.log('"GetTracklistFromSource()" start.')

	let regx = /{{track.*list.*?^}}/gmsi;

	const matched = source.match(regx);
	console.log('Matched object ==>', matched)

	if (!matched) {
		const error_message = "Theres is not tracklist section in the wikipedia page"
		const error_name = "NO_TRACKLIST_SECTION" 
		throw new InfoViewException(error_message, error_name)
	}

	const match_string = matched.length ? matched[0] : matched;

	console.log('"GetTracklistFromSource()" end.')
	return match_string;
}

/*
*  Given a  string  possibly containing  1 or more - {{tracklist}} - sections
*    parses each {{tracklist}} separately and finds the best result
*    returns array containing the "title" key containing the track and the relevant object
*/
export function GetObjFromTracklist(tracklist, trackname)
{
	console.log('"GetObjFromTracklist()" start.')

	// splits different sections into array
	const split_section = tracklist.replace(/^}}.*?^{{/gmsi, '}}abcd{{').split('abcd');
	console.log('split section ==>', split_section);

	// parse each string in array into object
	const parsed_obj_array = split_section.map(each => ParseTracklist(each));
	console.log('parsed_obj_array ==>', parsed_obj_array);

	// finds tracklist object that contains the name of the song to be found
	//   invalid objects are mapped to 'undefined'
	const find_correct_object = parsed_obj_array.map(each => GetKeyByValue(each, trackname));
	console.log('find_correct_object ==>', find_correct_object);

	// finds the correct object - one that isn't undefined
	const correct_obj_title = find_correct_object.find(each => each);
	console.log('correct_obj_name?? ==>', correct_obj_title)
	const correct_obj = parsed_obj_array.find(each => GetKeyByValue(each, trackname) === correct_obj_title);
	console.log('correct_obj?? ==>', correct_obj);

	if (!correct_obj_title || !correct_obj) {
		const error_message = "Couldn't find json object representing track"
		const error_name = "CORRECT_OBJECT_NOT_FOUND" 
		throw new InfoViewException(error_message, error_name)
	}
	// key name and object which the key is in
	console.log('"GetObjFromTracklist()" end.')
	return [correct_obj_title, correct_obj];
}

// Get producer info from object given the title no of the track
// returns array of string containing producer names if any exists
export function GetProducer(title, tracklist)
{
	console.log('"GetProducer()" start')
	// Finds title no. Ex: from "title12" => "12"
	const title_no = title.slice(5);

	const producer = tracklist['extra' + title_no];

	if (!producer) {
		const error_message = "Producer info not found in tracklist object"
		const error_name = "NO_PRODUCER" 
		throw new InfoViewException(error_message, error_name)
	}

	console.log('producer ==>', producer);
	console.log('"GetProducer()" end')
	return producer;
}



 /*
  * Error exceptions
  * ================
  * TRACK_KEY_ERROR : The track object does not contain the valid key
  * NO_WIKI_PAGE    : Wiki query did not return any valid result
  * NO_WIKI_SOURCE  : Wiki page request did not return any valid source
  * NO_TRACKLIST_SECTION        : Theres is not tracklist section in the wikipedia page
  * CORRECT_OBJECT_NOT_FOUND    : Couldn't find json object representing track"
  * NO_PRODUCER     : Producer info not found in tracklist
  *
  */
export  async function SearchWiki(track, SetError, SetErrorHeader, SetErrorTimeout, err_timeout)
  {
    try {
      // cleans trackname gotten from spotify
      const trackname = RemoveFeatures(track.name)

      // search wikipedia for the songs page key to be used for later requests
      const track_wiki_key = await GetPageKey(track, trackname);


      // if key is found, get page source in wikitext format
      const wikitext_source = await GetPageSource(track_wiki_key);

      // Capture section containing the tracklist from the wikitext
      const extracted_tracklist = MatchTracklistFromSource(wikitext_source);

      // gets key given trackname and wikitext source
      const [track_title, track_object] = GetObjFromTracklist(extracted_tracklist, trackname);

      // finds producer info
      const producer = GetProducer(track_title, track_object);

      //  wiki link 
      const wiki_url = BASE_URL + '/wiki/' + track_wiki_key
      console.log('wiki url ==>', wiki_url)

      return ({ wiki_url, producer })
    }
    catch (e) {
      console.error(e)
      NewError(e, SetError, SetErrorHeader, SetErrorTimeout, err_timeout)
      // NewError(e, SetError, SetErrorHeader, SetErrorTimeout, err_timeout)
      return ({ wiki_url:null, producer: null })
    }
  } 




// reomoves tracknames with (feat) etc.
export const RemoveFeatures = (name) => name.replace(/\(feat.*?\)/g, '').trim();
// parses array containing track information. returns string containing all artists
const GetAllArtists  = (artist_array) => artist_array.map(each => each.name).join(' ')
// cleans string for url
const QueryEscape    = (string) => string.trim().replace(/\s+/g, ' ')
// Parses raw tracklist source
const ParseTracklist = (tracklist) => parseWiki(tracklist).general
// finds the key 'tile"X"' where X represents the index of the track name in the tracklist object
// find the position of the track in the object. This value is later used to find the producer info 
// ** TODO ** :: make the function better by finding the best match instead of exact match
const GetKeyByValue  = (object, value) => Object.keys(object).find( key => String(object[key]).match( new RegExp(value, 'i') ) )

