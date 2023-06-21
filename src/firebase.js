import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASEAPI,
  authDomain: "talentshowcase-3a90c.firebaseapp.com",
  databaseURL: "https://talentshowcase-3a90c.firebaseio.com",
  projectId: "talentshowcase-3a90c",
  storageBucket: "talentshowcase-3a90c.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
