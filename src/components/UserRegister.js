import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import ImageUpload from './ImageUpload';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Occupations from '../Lists/Occupations';
import { MDBBtn, MDBContainer, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import makeAsyncScriptLoader from 'react-async-script';

function UserRegister({ isScriptLoadSucceed }) {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [address, setAddress] = useState('');
  const auth = getAuth();

  
  const handleProfilePictureURL = (url) => {
    console.log(url);
  };

  const handleGalleryURLs = (urls) => {
    console.log(urls);
  };

  const onSubmit = async (data) => {
    data.address = address || ""; // Set address to an empty string if it's undefined
    data.name = data.name || "";
    data.occupation = data.occupation || "";
    data.yearsOfExperience = data.yearsOfExperience || 0;
    data.certifications = data.certifications || "";
    data.aboutMe = data.aboutMe || "";
    data.phoneNumber = data.phoneNumber || "";
    data.email = data.email || "";
    
    await setDoc(doc(db, "users", auth.currentUser.uid), data);
  };
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          for (const [key, value] of Object.entries(fetchedData)) {
            setValue(key, value);
          }
          setFormData(fetchedData);  // Store fetched data in state
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
    !isScriptLoadSucceed && (
    <MDBContainer>
      <h1>User Profile</h1>
      <ImageUpload handleImageURL={handleImageURL} />
      <MDBContainer>
      <form onSubmit={handleSubmit(onSubmit)}>

          <MDBInput {...register('name')} label='Full Name' id='typeText' type='text' />

          <GooglePlacesAutocomplete
          selectProps={{
            address,
            onChange: setAddress,
          }}
          apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          autocompletionRequest={{
            componentRestrictions: {
              country: ['us'],
            },
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
          <MDBTextArea
        {...register('aboutMe')}
        label='About Me'
        id='textAreaExample'
        rows={6}
        defaultValue={formData.aboutMe}  // Use fetched data as defaultValue
      />
          <MDBInput {...register('phoneNumber')} label='Phone number' id='typePhone' type='tel' />
          <MDBInput {...register('email')} label='Email' id='typeEmail' type='email' />
          <MDBBtn type="submit" label="Update Profile"/>
          
      </form>
      </MDBContainer>
    </MDBContainer>
  )
  );
}

export default makeAsyncScriptLoader(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`)(UserRegister);
