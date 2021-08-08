import React from 'react';
import { toMin } from './App';

export const ViewHeader = ({ image, track }) => <div class="ant-row _1Hykx rowgap">
  <div class="ant-col _2-PUF ant-col-xs-24 ant-col-md-10 ant-col-lg-7">
    <div class="_311TL">
      <img alt='album art' class="_1Z3HS" src={image} />
    </div>
  </div>
  <div class="ant-col _1iPHb ant-col-xs-24 ant-col-md-14 ant-col-lg-17">
    <div class="_2jrwe">
      <h3 class="ant-typography _33nfP">{track.artists.map(each => each.name).join()}</h3>
      <h1 class="ant-typography _1okg0">{track.name}</h1>
    </div>
    <div class="_1LTl0"><button type="button" class="ant-btn ant-btn-icon-only hgoDm undefined _2y01H"><i
      class="_3AXtk"></i></button><a rel='noreferrer' href="https://open.spotify.com/track/3VqeTFIvhxu3DIe4eZVzGq" target="_blank"
        class="ant-btn ant-btn-icon-only hgoDm _1v_0F"><i class="_9H-oe"></i></a></div><span class="_2rLB1">
      <div class="ant-row _3JZcg rowgap">
        <div class="ant-col _2MShg ant-col-xs-12 ant-col-md-6">
          <div class="YNn26">
            <h3 class="ant-typography">{track.album.release_date}</h3><span class="ant-typography ant-typography-secondary">Release Date</span>
          </div>
        </div>
        <div class="ant-col _2MShg ant-col-xs-12 ant-col-md-6">
          <div class="YNn26">
            <h3 class="ant-typography">{track.popularity}</h3><span class="ant-typography ant-typography-secondary">Popularity</span>
          </div>
        </div>
        <div class="ant-col _2MShg ant-col-xs-12 ant-col-md-6">
          <div class="YNn26">
            <h3 class="ant-typography">{track.track_number}</h3><span class="ant-typography ant-typography-secondary">Track Number</span>
          </div>
        </div>
        <div class="ant-col _2MShg ant-col-xs-12 ant-col-md-6">
          <div class="YNn26">
            <h3 class="ant-typography">{toMin(track.duration_ms / 1000)}</h3><span class="ant-typography ant-typography-secondary">duration</span>
          </div>
        </div>
      </div>
    </span>
    <div class="_2m6jQ">
      <div><span class="ant-typography">Explicit:<span class="_1kRYA"> {String(track.explicit)}</span></span></div>
      <div><span class="ant-typography">Album:<span class="_1kRYA"> {track.album.type}</span></span></div>
    </div>
  </div>
</div>;
