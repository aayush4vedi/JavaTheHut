import React from 'react'

const AdventureDetails = (props) => {
    const id = props.match.params.id
    const {title, char, when} = props
    return (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">{ id } - {title}</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et labore quaerat quibusdam vel saepe, ab voluptate accusantium culpa nemo fuga earum? Soluta amet nobis officia sed neque fuga aperiam quia?</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by {char}</div>
                    <div><strong>When:</strong> {when}</div>
                </div>
            </div>
        </div>
    )
}

export default AdventureDetails;

