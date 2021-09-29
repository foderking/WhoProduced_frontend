import React, { useEffect } from 'react'

export const Error = ({ error }) => {

  return (
    <div className={`alert alert-danger alert-dismissible fade show ${error ? '' : 'd-none'}`} role="alert">
      <strong>Error!</strong> {error}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}
