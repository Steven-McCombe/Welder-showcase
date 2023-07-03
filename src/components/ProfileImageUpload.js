import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ProfileImageUpload = ({ handleImageURL }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = event => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUploadSubmit = () => {
    if (selectedImage) {
      uploadImage(selectedImage);
    }
  };

  const uploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        console.error(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          handleImageURL(downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} multiple={false} />
      <button onClick={handleUploadSubmit}>Upload</button>
    </div>
  );
};

export default ProfileImageUpload;
