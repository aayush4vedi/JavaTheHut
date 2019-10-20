import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyAbMHH0xB6jWWmZuxugLgC56AQKpq0GB6Y",
    authDomain: "big-city-adv.firebaseapp.com",
    databaseURL: "https://big-city-adv.firebaseio.com",
    projectId: "big-city-adv",
    storageBucket: "big-city-adv.appspot.com",
    messagingSenderId: "680423012578",
    appId: "1:680423012578:web:0de41e9e98d61db401c6bb",
    measurementId: "G-27JJC1E0YH"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 