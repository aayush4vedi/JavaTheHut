import React from 'react'

const AdventureSummary = ({adventure}) =>  {
    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{adventure.title}</span>
                <p>Posted by: {adventure.char}</p>
                <p className="grey-text">{adventure.when}</p>
            </div>
        </div>
    )
}

export default AdventureSummary;
