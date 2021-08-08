import React from 'react';
import { Link } from 'react-router-dom';

export function Card({ each }) {
  return (
    <div className="ant-row _27ig9 rowgap">
      <div className="ant-col ant-col-xs-24 ant-col-md-19">

        <Link to={`/track/${each.id}`} onClick={() => console.log('clikc')}>
          <div className="ant-row F-pFw rowgap">
            <div className="ant-col ant-col-xs-7 ant-col-sm-6 ant-col-md-5 ant-col-lg-4">
              <img alt='album art' src={each.album.images[1].url} />
            </div>

            <div className="ant-col _2whaa ant-col-xs-17 ant-col-lg-20">
              <div className="ant-row _3EW_U rowgap">
                <div className="ant-col _28Yqm ant-col-xs-24 ant-col-lg-8">
                  <div className="ant-typography ant-typography-ellipsis ant-typography-single-line ant-typography-ellipsis-single-line _12mCB">
                    {each.artists.map(each => each.name).join(', ')}
                  </div>

                  <div className="ant-typography ant-typography-ellipsis ant-typography-ellipsis-multiple-line _1guJu">
                    {each.name}
                  </div>
                </div>

                <div className="ant-col _1hTOV ant-col-xs-24 ant-col-lg-16">
                  <div className="OKyL0">
                    <p className="_1vVQ4">{each.album.release_date}</p>
                    <p className="lUyFq">Release Date</p>
                  </div>

                  <div className="OKyL0">
                    <p className="_1vVQ4">{each.popularity}</p>
                    <p className="lUyFq">Popularity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

      </div>

      <div className="ant-col _1C1NE ant-col-xs-24 ant-col-md-5">
        <a rel='noreferrer' href={each.external_urls.spotify} target="_blank" className="USeLs">
          <img alt='album art' className="_9H-oe spotty" src="https://img.icons8.com/ios-filled/50/000000/spotify.png" />
        </a>
      </div>
    </div>
  );
}
