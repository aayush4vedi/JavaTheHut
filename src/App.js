import React, {Component} from 'react';
import './App.css';
import CardArray from './CardArray'; //ELEMETS
import SearchBox from './SearchBox'
import { rangers } from './rangers';


class App extends Component {
  constructor(){
    super();
    this.state =  {
      rangers: rangers,
      searchField: ''
    }
  }
  onSearchChange = (event) => {
    this.setState({ searchField:  event.target.value})
  }
  render(){
    const searchedRanger = this.state.rangers.filter(rangers => {
      return rangers.name.toLowerCase().includes(this.state.searchField.toLowerCase());
    })
    return (
      <div className='tc'>
          <h1 className='f1'>My Power Rangers</h1>
          <SearchBox searchChange = {this.onSearchChange}/>
          <CardArray rangers = {searchedRanger}/>
      </div>
    );
  }
}

export default App;
