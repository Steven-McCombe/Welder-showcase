import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD66iZFyz0Y2r-Gq83ZugtE0fDOwP0tgDE",
  authDomain: "talentshowcase-3a90c.firebaseapp.com",
  databaseURL: "https://talentshowcase-3a90c-default-rtdb.firebaseio.com",
  projectId: "talentshowcase-3a90c",
  storageBucket: "talentshowcase-3a90c.appspot.com",
  messagingSenderId: "542040577117",
  appId: "1:542040577117:web:4b5df949173921944469b4",
  measurementId: "G-17YN3227Y2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
