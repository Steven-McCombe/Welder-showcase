import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import ImageUpload from './ImageUpload';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Occupations from '../Lists/Occupations'
import { MDBBtn, MDBContainer, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';

function UserProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
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
    data.city = city;
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
  
  const handleImageURL = (url) => {
    // Logic to handle the image URL
  };
  

  return (
    <MDBContainer>
      <h1>User Profile</h1>
      <ImageUpload handleImageURL={handleImageURL} />
      <MDBContainer>
      <form onSubmit={handleSubmit(onSubmit)}>

          <MDBInput {...register('name')} label='Full Name' id='typeText' type='text' />


          <GooglePlacesAutocomplete
            selectProps={{
              city,
              onChange: setCity,
            }}
            autocompletionRequest={{
              types: ['(cities)'],
            }}
          />


            <label>
              Occupation:
              <select {...register('occupation')}>
                {Occupations.map((occupation, index) => (
                  <option value={occupation} key={index}>
                    {occupation}
                  </option>
                ))}
              </select>
            </label>

          <MDBInput {...register('yearsOfExperience')} label='Years of Experience' id='typeNumber' type='number'/>



        <MDBInput {...register('certifications')} type="text" label='Licenses/Certifications'/>
 


        <MDBTextArea {...register('aboutMe')} label='About Me' id='textAreaExample' rows={6} />

        <MDBInput {...register('phoneNumber')} label='Phone number' id='typePhone' type='tel' />
        
        <MDBInput {...register('email')} label='Email' id='typeEmail' type='email' />

        <MDBBtn type="submit" label="Update Profile"/>
      </form>
      </MDBContainer>
    </MDBContainer>
  );
}

export default UserProfile;