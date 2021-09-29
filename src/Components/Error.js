import React, { useEffect } from 'react'

export const Error = ({ error , error_header }) => {

  return (
    <div className={`alert alert-danger alert-dismissible fade show ${error ? '' : 'd-none'}`} role="alert">
      <strong className="alert-heading" >{error_header}</strong>
      <p>{error}</p>
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}
