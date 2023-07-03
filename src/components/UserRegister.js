import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import ProfileImageUpload from './ProfileImageUpload';
import GalleryUpload from './GalleryUpload';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Occupations from '../Lists/Occupations';
import { MDBBtn, MDBContainer, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import makeAsyncScriptLoader from 'react-async-script';

function UserRegister({ isScriptLoadSucceed }) {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [address, setAddress] = useState('');
  const [profilePictureURL, setProfilePictureURL] = useState('');
  const [galleryURLs, setGallery] = useState([]);
  const auth = getAuth();

  const handleProfilePictureURL = (url) => {
    setProfilePictureURL(url);
  };

  const handleImageURLs = (url) => {
    setGallery(prevGallery => [...prevGallery, url]);
  };

  const onSubmit = async (data) => {
    data.address = address || "";
    data.name = data.name || "";
    data.occupation = data.occupation || "";
    data.yearsOfExperience = data.yearsOfExperience || 0;
    data.certifications = data.certifications || "";
    data.aboutMe = data.aboutMe || "";
    data.phoneNumber = data.phoneNumber || "";
    data.email = data.email || "";
    data.profilePic = profilePictureURL || "";
    data.gallery = galleryURLs.length > 0 ? galleryURLs : [];

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
          setFormData(fetchedData);
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
    !isScriptLoadSucceed && (
    <MDBContainer>
      <h1>User Profile</h1>
      <ProfileImageUpload handleImageURL={handleProfilePictureURL} />
      <MDBContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
          <MDBInput {...register('profilePic')} type='hidden' />  
          <MDBInput {...register('gallery')} type='hidden' />  
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
          <GalleryUpload handleImageURLs={handleImageURLs} />
          <MDBBtn type="submit" label="Update Profile"/>
          
      </form>
      </MDBContainer>
    </MDBContainer>
  )
  );
}

export default makeAsyncScriptLoader(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`)(UserRegister);
