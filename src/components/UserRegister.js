import React, { useEffect, useState, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import ProfileImageUpload from './ProfileImageUpload';
import GalleryUpload from './GalleryUpload';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Occupations from '../Lists/Occupations';
import { MDBBtn, MDBContainer, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import makeAsyncScriptLoader from 'react-async-script';
import './Styling/UserRegister.css';

const UserRegister = forwardRef(({ isScriptLoadSucceed }, ref) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [profilePictureURL, setProfilePictureURL] = useState('');
  const [galleryURLs, setGalleryURLs] = useState([]);
  const auth = getAuth();

  const handleProfilePictureURL = (url) => {
    const cleanedURL = url.replace('//', '/');
    setProfilePictureURL(cleanedURL);
  };

  const handleImageURLs = (url) => {
    setGalleryURLs((prevGallery) => [...prevGallery, url]);
  };

  const deleteProfilePic = () => {
    const storageRef = doc(db, 'images', profilePictureURL);
    deleteDoc(storageRef)
      .then(() => {
        setProfilePictureURL('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteGalleryPic = (picUrl) => {
    const storageRef = doc(db, 'images', picUrl.replace('//', '/'));
    deleteDoc(storageRef)
      .then(() => {
        setGalleryURLs((prevGallery) => prevGallery.filter((url) => url !== picUrl));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSubmit = async (data) => {
    data.name = data.name || '';
    data.occupation = data.occupation || '';
    data.yearsOfExperience = data.yearsOfExperience || 0;
    data.certifications = data.certifications || '';
    data.aboutMe = data.aboutMe || '';
    data.phoneNumber = data.phoneNumber || '';
    data.email = data.email || '';
    data.profilePic = profilePictureURL || '';
    data.gallery = galleryURLs.length > 0 ? galleryURLs : [];

    await setDoc(doc(db, 'users', auth.currentUser.uid), data);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          setFormData({ ...fetchedData, address: { value: fetchedData.address } }); // Add this line
          for (const [key, value] of Object.entries(fetchedData)) {
            setValue(key, value);
          }
          setProfilePictureURL(fetchedData.profilePic || '');
          setGalleryURLs(fetchedData.gallery || []);
        }
      } else {
        console.log('No Auth');
      }

      setLoading(false);
    };

    fetchProfile();
  }, [setValue, auth.currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    isScriptLoadSucceed && (
      <MDBContainer className="user-register-container">
        <h1>User Profile</h1>
        <ProfileImageUpload handleImageURL={handleProfilePictureURL} />
        {profilePictureURL && (
          <div className="profile-picture-container">
            <img src={profilePictureURL} alt="Profile pic" className="profile-picture " />
            <button onClick={deleteProfilePic} className="delete-button">
              Delete Profile Picture
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <MDBInput {...register('profilePic')} type="hidden" />
          <MDBInput {...register('gallery')} type="hidden" />
          <MDBInput {...register('name')} label="Full Name" id="typeText" type="text" />

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
            defaultValue={formData.address?.value}
          />

          <label className="occupation-label">
            Occupation:
            <select {...register('occupation')} className="occupation-select">
              {Occupations.map((occupation, index) => (
                <option value={occupation} key={index}>
                  {occupation}
                </option>
              ))}
            </select>
          </label>

          <MDBInput {...register('yearsOfExperience')} label="Years of Experience" id="typeNumber" type="number" />

          <MDBInput {...register('certifications')} type="text" label="Licenses/Certifications" />
          <MDBTextArea
            {...register('aboutMe')}
            label="About Me"
            id="textAreaExample"
            rows={6}
            onChange={(e) => setValue('aboutMe', e.target.value)}
            defaultValue={formData.aboutMe} // Use fetched data as defaultValue
          />
          <MDBInput {...register('phoneNumber')} label="Phone number" id="typePhone" type="tel" />
          <MDBInput {...register('email')} label="Email" id="typeEmail" type="email" />
          <GalleryUpload handleImageURLs={handleImageURLs} />
          {galleryURLs.map((url, index) => (
            <div key={index} className="gallery-image-container">
              <img src={url} alt={`Gallery pic ${index}`} className="gallery-image" />
              <button onClick={() => deleteGalleryPic(url)} className="delete-button">
                Delete Picture
              </button>
            </div>
          ))}

          <MDBBtn type="submit" label="Update Profile" className="submit-button" />
        </form>
      </MDBContainer>
    )
  );
});

export default UserRegister;