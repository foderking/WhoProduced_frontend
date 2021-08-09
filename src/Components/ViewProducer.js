import React from 'react';
// import { Link } from 'react-router-dom';
import RandomNumGen from '../Functionality/random';

export const ViewProducer = ({ producer }) => <div className='my-5'>
  <div className='display-4 my-5'>Producers</div>
  
  {Array.isArray(producer) ?
    producer.map(each => 
      <ProdCard key={RandomNumGen()} name={each} />
      )
    :
      <ProdCard key={RandomNumGen()} name={producer} />
  }
</div>;


const  ProdCard = ({ name }) => 
// {/* <div className='col-8'> */}
<div>
    <div className="ant-row _27ig9 rowgap">
      <div className="ant-col ant-col-xs-24 ant-col-md-19">
        <div className="ant-row F-pFw rowgap">
          <div className="ant-col  ant-col-xs-7 ant-col-sm-6 ant-col-md-5 ant-col-lg-4">
          {/* <div className='col-2'> */}
            <img alt='album art' src='http://getdrawings.com/free-icon/unknown-user-icon-58.png' />
          </div>

          <div className="ant-col _2whaa ant-col-xs-17 ant-col-lg-20">
            <div className="ant-row _3EW_U rowgap">
              <div className="ant-col _28Yqm ant-col-xs-24 ant-col-lg-8">
                <div className="ant-typography ant-typography-ellipsis ant-typography-single-line ant-typography-ellipsis-single-line _12mCB">
                  {name}
                </div>

                <div className="ant-typography ant-typography-ellipsis ant-typography-ellipsis-multiple-line _1guJu">
                  {name}
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
  // </div>
