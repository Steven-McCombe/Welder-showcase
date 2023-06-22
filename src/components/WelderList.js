// WelderList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import WelderProfile from './WelderProfile';

function WelderList() {
  const [welders, setWelders] = useState([]);

  useEffect(() => {
    const fetchWelders = async () => {
      const weldersCollection = collection(db, 'users');
      const welderSnapshot = await getDocs(weldersCollection);
      const welderList = welderSnapshot.docs.map(doc => doc.data());
      setWelders(welderList);
    };

    fetchWelders();
  }, []);

  return (
    <div>
      {welders.map((welder, index) => (
        <WelderProfile key={index} welder={welder} />
      ))}
    </div>
  );
}

export default WelderList;
