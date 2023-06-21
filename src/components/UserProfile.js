import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { db } from './firebase'; 

function UserProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  
  // This function is called when the form is submitted
  const onSubmit = async (data) => {
    await setDoc(doc(db, "users", auth.currentUser.uid), data);
  };
  
  // Fetch the current user's profile when the component loads
  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Fill the form with the data from Firestore
        for (const [key, value] of Object.entries(docSnap.data())) {
          setValue(key, value);
        }
      }
      
      setLoading(false);
    };
    
    fetchProfile();
  }, [setValue]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Years of Experience:
        <input {...register('yearsOfExperience')} type="number" min="0" />
      </label>

      <label>
        Certifications:
        <input {...register('certifications')} type="text" />
      </label>

      <label>
        Specialized Skills:
        <input {...register('specializedSkills')} type="text" />
      </label>

      <label>
        Previous Projects:
        <input {...register('previousProjects')} type="text" />
      </label>

      <label>
        Geographic Location:
        <input {...register('location')} type="text" />
      </label>

      <label>
        Willingness to Relocate:
        <select {...register('relocation')}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      <label>
        Tool Proficiency:
        <input {...register('toolProficiency')} type="text" />
      </label>

      <input type="submit" />
    </form>
  );
}

export default UserProfile;
