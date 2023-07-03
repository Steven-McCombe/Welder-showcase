import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const GalleryUpload = ({ handleImageURLs }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = event => {
    setSelectedImages([...event.target.files]);
  };

  const handleUploadSubmit = () => {
    if (selectedImages.length > 0) {
      selectedImages.forEach(uploadImage);
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
          handleImageURLs(downloadURL); // this should handle adding the URL to a gallery array
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} multiple={true} />
      <button onClick={handleUploadSubmit}>Upload</button>
    </div>
  );
};

export default GalleryUpload;
