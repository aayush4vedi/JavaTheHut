import React from 'react';
import './App.css';
import CardArray from './CardArray'; //ELEMETS
import SearchBox from './SearchBox'
import { rangers } from './rangers';


const App = ()=> {
  return (
    <div className='tc'>
        <h1>My Power Rangers</h1>
        <SearchBox/>
        <CardArray rangers = {rangers}/>
    </div>
  );
}

export default App;
