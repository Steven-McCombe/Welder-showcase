// WelderProfile.js
import React from 'react';

function WelderProfile({ welder }) {
  if (!welder) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{welder.name}</h2>
      <p>Location: {welder.location}</p>
      <p>Years of Experience: {welder.yearsOfExperience}</p>
      <p>Certifications: {welder.certifications}</p>
      <p>About: {welder.aboutMe}</p>
      <p>Cell: {welder.phoneNumber}</p>
      <p>Email: {welder.email}</p>
      <img src={welder.profilePic} alt="Profile"/>
      {welder.gallery && welder.gallery.map((image, index) => (
        <img key={index} src={image} alt="Work gallery"/>
      ))}
    </div>
  );
}

export default WelderProfile;
