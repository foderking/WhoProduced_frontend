import React from 'react';
import { toMin } from "../Functionality/toMin";

export const ViewHeader = ({ track, wiki, show }) => {
  if (!show) {
    return <Template />
  }
  return (
    <div className="my-5 ant-row _1Hykx rowgap">
      <div className="ant-col _2-PUF ant-col-xs-24 ant-col-md-10 ant-col-lg-7">
        <div className="_311TL">
          <img alt='album art' className="_1Z3HS" src={track.album.images[1].url} />
        </div>
      </div>
      <div className="ant-col _1iPHb ant-col-xs-24 ant-col-md-14 ant-col-lg-17">
        <div className="_2jrwe">
          <h3 className="ant-typography _33nfP">{track.artists.map(each => each.name).join(', ')}</h3>
          <h1 className="ant-typography _1okg0">{track.name}</h1>
        </div>
        <div className="_1LTl0">
          <a rel='noreferrer' href={track.external_urls.spotify} target="_blank" className="ant-btn ant-btn-icon-only hgoDm _1v_0F">
            <img alt='album art' className="_9H-oe spotty" src="https://img.icons8.com/ios-filled/50/000000/spotify.png" />
          </a>
          <a rel='noreferrer' href={wiki} target="_blank" className="ant-btn ant-btn-icon-only hgoDm _1v_0F">
            <img alt='album art' className="_9H-oe spotty" width='45px' src="https://image.flaticon.com/icons/png/64/48/48927.png" />
          </a>
        </div>

        <span className="_2rLB1">
          <div className="ant-row _3JZcg rowgap">
            <div className="ant-col _2MShg ant-col-xs-12 ant-col-md-6">
              <div className="YNn26">
                <h3 className="ant-typography">{track.album.release_date}</h3><span className="ant-typography ant-typography-secondary">Release Date</span>
              </div>
            </div>
            <div className="ant-col _2MShg ant-col-xs-12 ant-col-md-6">
              <div className="YNn26">
                <h3 className="ant-typography">{track.popularity}</h3><span className="ant-typography ant-typography-secondary">Popularity</span>
              </div>
            </div>
            <div className="ant-col _2MShg ant-col-xs-12 ant-col-md-6">
              <div className="YNn26">
                <h3 className="ant-typography">{track.track_number}</h3><span className="ant-typography ant-typography-secondary">Track Number</span>
              </div>
            </div>
            <div className="ant-col _2MShg ant-col-xs-12 ant-col-md-6">
              <div className="YNn26">
                <h3 className="ant-typography">{toMin(track.duration_ms / 1000)}</h3><span className="ant-typography ant-typography-secondary">duration</span>
              </div>
            </div>
          </div>
        </span>
        <div className="_2m6jQ">
          <div><span className="ant-typography">Explicit:<span className="_1kRYA"> {String(track.explicit)}</span></span></div>
          <div><span className="ant-typography">Album:<span className="_1kRYA"> {track.album.type}</span></span></div>
        </div>
      </div>
    </div>
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
