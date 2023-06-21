import React from 'react';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import SignOut from '../SignOut';
import UserProfile from '../components/UserProfile';
function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <SignIn />
      <SignUp />
      <SignOut />
      <UserProfile />
    </div>
  );
}

export default HomePage;
