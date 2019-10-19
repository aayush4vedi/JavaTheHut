import React from 'react';
import AdventureSummary from './AdventureSummary';
import { Route, BrowserRouter, Switch, NavLink } from 'react-router-dom'

const AdventureList = () => {
  let adventures = [
    {
      'id': 1,
      'title': 'Playing piano at my home',
      'char': 'Oswald',
      'when' : '3rd September, 7pm'
    },
    {
      'id': 2,
      'title': 'Getting 3 marshmellos with my tea',
      'char': 'Henry',
      'when' : '3rd September, 4pm'
    },
    {
      'id': 3,
      'title': 'Riding bicycle',
      'char': 'Daisy',
      'when' : '3rd September, 2am'
    }
  ]
  let items = adventures.map( (adv) =>{
    return(
      <NavLink exact to={"/adv/" + adv.id}>
        <AdventureSummary
          id = {adv.id}
          title = {adv.title}
          char = {adv.char}
          when = {adv.when}
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