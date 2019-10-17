import React from 'react';
import AdventureSummary from './AdventureSummary';

const AdventureList = () => {
  let adventures = [
    {
      'title': 'Playing piano at my home',
      'char': 'Oswald',
      'when' : '3rd September, 7pm'
    },
    {
      'title': 'Getting 3 marshmellos with my tea',
      'char': 'Henry',
      'when' : '3rd September, 4pm'
    },
    {
      'title': 'Riding bicycle',
      'char': 'Daisy',
      'when' : '3rd September, 2am'
    }
  ]
  let items = adventures.map( (adv) =>{
    return(
      <AdventureSummary
        title = {adv.title}
        char = {adv.char}
        when = {adv.when}
      />
    )
  })
  return (
    <div className="adventure-list section">
        {items}
    </div>
  )
}

export default AdventureList