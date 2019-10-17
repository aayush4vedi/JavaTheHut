import React from 'react'

const AdventureList = () => {
  return (
    <div className="adventure-list section">

      <div className="card z-depth-0 adventure-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title ">Playing piano at my home</span>
          <p>Posted by Oswald</p>
          <p className="grey-text">3rd September, 2am</p>
        </div>
      </div>

      <div className="card z-depth-0 adventure-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title ">Getting 3 marshmellos with my tea.</span>
          <p>Posted by The Henry</p>
          <p className="grey-text">3rd September, 2am</p>
        </div>
      </div>

      <div className="card z-depth-0 adventure-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title ">Riding bicycle</span>
          <p>Posted by The Daisy</p>
          <p className="grey-text">3rd September, 2am</p>
        </div>
      </div>
      
    </div>
  )
}

export default AdventureList