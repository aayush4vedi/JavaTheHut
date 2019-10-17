import React from 'react'

const AdventureSummary = (props) =>  {
    const { title, char, when} = props;
    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{title}</span>
                <p>Posted by: {char}</p>
                <p className="grey-text">{when}m</p>
            </div>
        </div>
    )
}

export default AdventureSummary;
