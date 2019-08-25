import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Hello from './Hello';
// import Card from './Card' //ATOM
import CardArray from './CardArray'; //ELEMETS
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import { rangers } from './rangers';

ReactDOM.render(
                <div>
                   <CardArray rangers = {rangers}/>
                </div>
, document.getElementById('root'));
serviceWorker.unregister();
