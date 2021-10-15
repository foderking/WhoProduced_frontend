import React from 'react';
import base_url from '../Functionality/base_url';

export function ProducerCard({ each }) {
  console.log('producer::>', each)
  return (
    <div className="ant-row _27ig9 rowgap">
      <div className="ant-col ant-col-xs-24 ant-col-md-19">

        <a href={each.url}>
          <div className="ant-row F-pFw rowgap">
            <div className="ant-col ant-col-xs-7 ant-col-sm-6 ant-col-md-5 ant-col-lg-4">
              <img className='buggy' alt='album art' src={each.image_url} />
            </div>

            <div className="ant-col _2whaa ant-col-xs-17 ant-col-lg-20">
              <div className="ant-row _3EW_U rowgap">
                <div className="ant-col _28Yqm ant-col-xs-24 ant-col-lg-8">
                  <div className="ant-typography ant-typography-ellipsis ant-typography-ellipsis-multiple-line _1guJu">
                    {each.name}
                  </div>
                  {/* 
                  <div className="ant-typography ant-typography-ellipsis ant-typography-single-line ant-typography-ellipsis-single-line _12mCB">
                    {each.result.title_with_featured}
                  </div> */}
                </div>

                <div className="ant-col _1hTOV ant-col-xs-24 ant-col-lg-16">
                  <div className="OKyL0">
                    <p className="_1vVQ4">{each.iq}</p>
                    <p className="lUyFq">Genius IQ</p>
                  </div>

                  <div className="OKyL0">
                    <p className="_1vVQ4">{String(each.is_verified)}</p>
                    <p className="lUyFq">Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>

      </div>

      <div className="ant-col _1C1NE ant-col-xs-24 ant-col-md-5">
        <a rel='noreferrer' href={"https://genius.com" + each.api_path} target="_blank" className="USeLs">
          <img alt='genius logo' className="_9H-oe spotty buggy" src={base_url + '/static/img/genius_logo.png'} />
        </a>
      </div>
    </div>
  );
}
