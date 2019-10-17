import React, { Component } from 'react'

class AdventureSummary extends Component {
    const { title, char, date} = this.props;
    render() {
        return (
            <div className="card z-depth-0 project-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title ">{title}</span>
                    <p>Posted by {char}</p>
                    <p className="grey-text">{date}m</p>
                </div>
            </div>
        )
    }
}

export default AdventureSummary
