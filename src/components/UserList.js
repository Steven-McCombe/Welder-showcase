import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import UserCard from './UserCard';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBContainer } from 'mdb-react-ui-kit';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <MDBContainer>
      <h1>User List</h1>
      <div className="user-cards-container">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </MDBContainer>
  );
};

export default UserList;
