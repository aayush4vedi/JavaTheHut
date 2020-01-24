import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // ORGANISMS
// import Hello from './Hello';
// import Card from './Card' //ATOM
// import CardArray from './CardArray'; //ELEMETS
import * as serviceWorker from './serviceWorker';
import 'tachyons';

ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker.unregister();
