import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
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

// Initialize Authentication and Firestore
const auth = getAuth();
const db = getFirestore();

// Set up authentication state change listener
const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { auth, db, onAuthStateChange };
