import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDZ1lAeO8X0e0ICG8UF2yQzfhqB9MM01M4",
    authDomain: "sangit-blog.firebaseapp.com",
    databaseURL: "https://sangit-blog-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sangit-blog",
    storageBucket: "sangit-blog.appspot.com",
    messagingSenderId: "247311923562",
    appId: "1:247311923562:web:7af8bc874c706103cc4d13",
    measurementId: "G-R198BBBDF3"


}


firebase.initializeApp(firebaseConfig)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
