import React from 'react';

export const Spinner = ({ show }) => 
// 'show' activates the spinner if it is true, else not
<div className={`my-5 py-5 text-center ${show ?  '' : 'd-none' }`}>
  <div className="spinner-border spinner-custom" role="status">
  </div>
</div>;
