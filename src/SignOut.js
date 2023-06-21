import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

const Signout = () => {
  const signout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  }
  
  return (
    <button onClick={signout}>Sign Out</button>
  );
}

export default Signout;
