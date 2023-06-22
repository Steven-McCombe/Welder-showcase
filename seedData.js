const { doc, setDoc, getFirestore } = require('firebase/firestore');
const { initializeApp } = require('firebase/app');

// TODO: Replace the following with your app's Firebase project configuration
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
const db = getFirestore(app);

async function addWelder() {
  const docRef = doc(db, 'welders', 'welder-id'); // Replace 'welder-id' with the actual ID

  await setDoc(docRef, {
    name: 'John Doe',
    location: 'New York',
    yearsOfExperience: 5,
    certifications: ['AWS Certified', 'CWI Certified'],
    aboutMe: 'Experienced welder with a demonstrated history of working in the construction industry.',
    profilePic: 'url_to_profile_pic',
    gallery: ['url_to_image1', 'url_to_image2'],
    contact: {
      phoneNumber: '123-456-7890',
      email: 'johndoe@example.com'
    }
  });
}

addWelder()
  .then(() => console.log('Welder added!'))
  .catch((error) => console.error('Error adding welder: ', error));
