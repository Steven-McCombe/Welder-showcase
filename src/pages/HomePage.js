import React from 'react';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import SignOut from '../SignOut';

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <SignIn />
      <SignOut />
      
    </div>
  );
}

export default HomePage;
