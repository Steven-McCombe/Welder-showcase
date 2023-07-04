import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBContainer } from 'mdb-react-ui-kit';

const UserCard = ({ user }) => {
    const [profilePicError, setProfilePicError] = useState(false);
  
    const handleProfilePicError = () => {
      setProfilePicError(true);
    };
  
    const handleDeleteUser = () => {
      deleteDoc(doc(db, 'users', user.id))
        .then(() => {
          console.log('User deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    };
  
    return (
      <MDBCard style={{ maxWidth: '300px' }} className="mx-3 my-3">
        {!profilePicError && (
          <MDBCardImage src={user.profilePic} alt="Profile pic" onError={handleProfilePicError} />
        )}
        {profilePicError && <div className="profile-pic-error">Error loading profile picture</div>}
        <MDBCardBody>
          <MDBCardTitle>{user.name}</MDBCardTitle>
          <MDBCardText>{user.occupation}</MDBCardText>
          <MDBCardText>{user.aboutMe}</MDBCardText>
          <MDBBtn onClick={handleDeleteUser}>Delete</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    );
  };

export default UserCard