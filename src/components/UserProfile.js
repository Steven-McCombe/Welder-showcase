// WelderProfile.js
import React from 'react';

function UserProfile({ user }) {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Location: {user.address}</p>
      <p>Years of Experience: {user.yearsOfExperience}</p>
      <p>Certifications: {user.certifications}</p>
      <p>About: {user.aboutMe}</p>
      <p>Cell: {user.phoneNumber}</p>
      <p>Email: {user.email}</p>
      <img src={user.profilePic} alt="Profile"/>
      {user.gallery && user.gallery.map((image, index) => (
        <img key={index} src={image} alt="Work gallery"/>
      ))}
    </div>
  );
}

export default UserProfile;
