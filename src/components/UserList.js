import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import UserProfile from './UserProfile';

function UserList() {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const UsersCollection = collection(db, 'users');
      const UsersSnapshot = await getDocs(UsersCollection);
      const userList = UsersSnapshot.docs.map(doc => doc.data());
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {Users.map((user, index) => (
        <UserProfile key={index} user={user} />
      ))}
    </div>
  );
}

export default UserList;
