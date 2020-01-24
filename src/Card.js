import React from 'react';


const Card = (props) =>{
    const { id, name, color, rollcall, bg} = props;
    return(
        <div className={`bg-light-${bg} dib pad3 br3 ma2 grow bw2 shadow-5`}>
            <img src={`https://robohash.org/${id}?200x200`} alt="ranger"></img>
            <h2>{name}</h2>
            <h4>{color}</h4>
            <h3>{rollcall}</h3>
        </div>
    )
}
export default Card;