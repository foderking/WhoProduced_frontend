import React from 'react';
import base_url from '../Functionality/base_url';

export const TrackHeader = ({ track, wiki, show }) => {
  if (!show) {
    return <Template />
  }
  
  const song = track.response.song
  console.log('song::>', song)
  console.log(song.media)

  function ReadMore()
  {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }

  return (
    <div className="my-5 ant-row _1Hykx rowgap">
      <div className="ant-col _2-PUF ant-col-xs-24 ant-col-md-10 ant-col-lg-7">
        <div className="_311TL">
          <img alt='album art' className="_1Z3HS" src={song.header_image_url} />
        </div>
      </div>
      <div className="ant-col _1iPHb ant-col-xs-24 ant-col-md-14 ant-col-lg-17">
        <div className="_2jrwe p-3">
          <h1 className="ant-typography _33nfP">{song.full_title}</h1>
          {/* <h1 className="ant-typography _1okg0">{track.name}</h1> */}
          <p className='lead '>
            {
              song.description.plain.slice(0,300)
            }
            <span id="dots">...</span>
            <span id="more">
              {
                song.description.plain.slice(300)
              }
            </span>
          </p>
          <button onClick={() => ReadMore()} id="myBtn">Read more</button>
        </div>
        <div className="_1LTl0">
          {/* <a rel='noreferrer' href={track.external_urls.spotify} target="_blank" className="ant-btn ant-btn-icon-only hgoDm _1v_0F">
            <img alt='album art' className="_9H-oe spotty" src={base_url + "/static/img/spotify_logo.png"} />
          </a> */}
          <a rel='noreferrer' href={song.url} target="_blank" className="ant-btn ant-btn-icon-only hgoDm _1v_0F">
            <img alt='album art' className="_9H-oe spotty" width='45px' src={base_url + "/static/img/genius_logo.png"} />
          </a>
          {
            song.media.map(
              each => <Media key={each.url} media={each} />
              // each => <p>{each.url}</p>
            )
          }
          {/* <a rel='noreferrer' href={wiki} target="_blank" className="ant-btn ant-btn-icon-only hgoDm _1v_0F">
            <img alt='album art' className="_9H-oe spotty" width='45px' src="https://image.flaticon.com/icons/png/64/48/48927.png" />
          </a> */}
        </div>

        {/* <span className="_2rLB1">
          <div className="ant-row _3JZcg rowgap">
            <div className="ant-col _2MShg ant-col-xs-12 ant-col-md-6">
              <div className="YNn26">
                <h3 className="ant-typography"></h3><span className="ant-typography ant-typography-secondary">Release Date</span>
              </div>
            <div className="ant-col _2MShg ant-col-xs-12 ant-col-md-6">

          </div>
        </span> */}
        <div className="_2m6jQ">
          <div><span className="ant-typography">Album:<span className="_1kRYA"> {song.album ? song.album.name : 'null'}</span></span></div>
          <div><span className="ant-typography">Artist:<span className="_1kRYA"> {song.primary_artist.name}</span></span></div>
          <div><span className="ant-typography">Release Date:<span className="_1kRYA"> {song.release_date_for_display}</span></span></div>
        </div>
      </div>
    </div>
  )
}

const Media = ({media}) => 
{
  const spotify = base_url + "/static/img/spotify_logo.png"
  const soundcloud = base_url + "/static/img/soundcloud_logo.png"
  const youtube = base_url + "/static/img/youtube_logo.png"
  const def = base_url + "/static/img/default_logo.png"
  console.log(media)
  function GetImage (provider)
  {
    if ( provider === 'spotify'   ) return spotify
    if ( provider === 'soundcloud') return soundcloud
    if ( provider === 'youtube'   ) return youtube

    return def
  }

  return (
    <a rel='noreferrer' href={ media.url } target="_blank" className="ant-btn ant-btn-icon-only hgoDm _1v_0F">
      <img alt='album art' className="_9H-oe spotty" width='45px' src={ GetImage(media.provider) } />
    </a>   
  )
}

const Template = () =>
  <div className="my-5 ant-row _1Hykx rowgap">
    <div className="ant-col _2-PUF ant-col-xs-24 ant-col-md-10 ant-col-lg-7">
      <div className="_311TL">
        <img alt='album art' className="_1Z3HS" src='https://i.scdn.co/image/ab67616d00001e025078cc61b6523a4a1846365b' />
      </div>
    </div>
    <div className="ant-col _1iPHb ant-col-xs-24 ant-col-md-14 ant-col-lg-17">
      <div className="_2jrwe">
        <h3 className="ant-typography _33nfP">--</h3>
        <h1 className="ant-typography _1okg0">--</h1>
      </div>
      <div className="_1LTl0">
        <a rel='noreferrer' href={'#'} target="_blank" className="ant-btn ant-btn-icon-only hgoDm _1v_0F">
          <img alt='album art' className="_9H-oe spotty" src="https://img.icons8.com/ios-filled/50/000000/spotify.png" />
        </a>
        <a rel='noreferrer' href={'#'} target="_blank" className="ant-btn ant-btn-icon-only hgoDm _1v_0F">
          <img alt='album art' className="_9H-oe spotty" width='45px' src="https://image.flaticon.com/icons/png/64/48/48927.png" />
        </a>
      </div>

      <span className="_2rLB1">
        <div className="ant-row _3JZcg rowgap">
          <div className="ant-col _2MShg ant-col-xs-12 ant-col-md-6">
            <div className="YNn26">
              <h3 className="ant-typography"></h3><span className="ant-typography ant-typography-secondary">Release Date</span>
            </div>
          </div>
          <div className="ant-col _2MShg ant-col-xs-12 ant-col-md-6">
            <div className="YNn26">
              <h3 className="ant-typography"></h3><span className="ant-typography ant-typography-secondary">Popularity</span>
            </div>
          </div>
          <div className="ant-col _2MShg ant-col-xs-12 ant-col-md-6">
            <div className="YNn26">
              <h3 className="ant-typography"></h3><span className="ant-typography ant-typography-secondary">Track Number</span>
            </div>
          </div>
          <div className="ant-col _2MShg ant-col-xs-12 ant-col-md-6">
            <div className="YNn26">
              <h3 className="ant-typography"></h3><span className="ant-typography ant-typography-secondary">duration</span>
            </div>
          </div>
        </div>
      </span>
      <div className="_2m6jQ">
        <div><span className="ant-typography">Explicit:<span className="_1kRYA"> </span></span></div>
        <div><span className="ant-typography">Album:<span className="_1kRYA"> </span></span></div>
      </div>
    </div>
  </div>;
