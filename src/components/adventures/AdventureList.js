import React from 'react';
import AdventureSummary from './AdventureSummary';
import { Route, BrowserRouter, Switch, NavLink } from 'react-router-dom'

const AdventureList = ({adventures}) => {
  let items = adventures.map( (adv) =>{
    return(
      <NavLink exact to={"/adv/" + adv.id}>
        <AdventureSummary 
          adventure={adv}
          id = {adv.id}
        />
      </NavLink>
    )
  })
  return (
    <div className="adventure-list section">
        {items}
    </div>
  )
}

export default AdventureList