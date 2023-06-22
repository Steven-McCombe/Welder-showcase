import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import ImageUpload from './ImageUpload';

function UserProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  
  const handleProfilePictureURL = (url) => {
    // Update the user profile with the profile picture URL
    console.log(url);
  };

  const handleGalleryURLs = (urls) => {
    // Update the user profile with the gallery URLs
    console.log(urls);
  };

  // This function is called when the form is submitted
  const onSubmit = async (data) => {
    await setDoc(doc(db, "users", auth.currentUser.uid), data);
  };
  
  // Fetch the current user's profile when the component loads
  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          for (const [key, value] of Object.entries(docSnap.data())) {
            setValue(key, value);
          }
        }
      }
      
      setLoading(false);
    };
    
    fetchProfile();
  }, [setValue, auth.currentUser]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input {...register('name')} type="text" />
      </label>

      <label>
        Location:
        <input {...register('location')} type="text" />
      </label>

      <label>
        Years of Experience:
        <input {...register('yearsOfExperience')} type="number" min="0" />
      </label>

      <label>
        Certifications:
        <input {...register('certifications')} type="text" />
      </label>

      <label>
        About Me:
        <textarea {...register('aboutMe')} />
      </label>

      <label>
        Upload Profile Picture:
        <ImageUpload handleImageURL={handleProfilePictureURL} single={true} />
      </label>

      <label>
        Upload Your Work Gallery:
        <ImageUpload handleImageURL={handleGalleryURLs} single={false} />
      </label>

      <input type="submit" />
    </form>
  );
}

export default UserProfile;
