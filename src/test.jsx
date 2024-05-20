import React, { useState, useEffect } from 'react';
import { BASE_URL } from './config';
import axios from 'axios';
import {
  deleteObject,
  getDownloadURL,
  ref, uploadBytesResumable,
} from "firebase/storage";
import { storage } from "./firebaseconfig"
import { uuidv4 } from '@firebase/util'
function Test() {
  const [cv, setCV] = useState(null);
  const [cvUrl, setCVUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const token = localStorage.getItem('token');
  const [oldImagePath, setOldImagePath] = useState(null);
  // Upload file
  const uploadFile =() => {

    if (cv === null) {
       return;
    }
    const cvPath = `cv/${cv.name + uuidv4()}`;
    const cvRef = ref(storage,cvPath);
    const uploadFile = uploadBytesResumable(cvRef, cv);

    uploadFile.on('state_changed', (snapshot) => {
      const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
      setProgress(progress)
    }, (err) => {
      console.log("error while uploading file", err);
    }, () => {
      setProgress(0);
      getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      
      // Delete the previous cv
      if (oldImagePath) {
        const oldImageRef = ref(storage, oldImagePath);
        deleteObject(oldImageRef).then(() => {
          console.log('Old image deleted');
        }).catch((error) => {
          console.log('Failed to delete old image', error);
        });
      }
      console.log(cvPath);
      // Save the path of the uploaded image
      setOldImagePath(cvPath);
      console.log(oldImagePath);

        setCvUrl(downloadURL)
       // setImage(downloadURL);
       console.log(downloadURL);
        console.log(cvUrl);
       
        axios
           .post(`${BASE_URL}uploadImage`,{cvUrl:downloadURL}, {
             headers: { Authorization: `Bearer ${token}` },
           })
           .then((response) => {
             window.alert(response.data.msg);
             console.log(response.data);
           })
           .catch((error) => {
             console.log(error);
           });

      });
      setCV(null);
    });
   
  }
 
  useEffect(() => {
   // const token = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setCVUrl(result.data.user.cvUrl);
        console.log(result.data.user.cvUrl);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App container mt-3">
      <div className='d-flex coloum'>
        <input type="file" className="form-control"
          id="img-upload"
          accept="image/*"
          onChange={(event) => {
            setCV(event.target.files[0]);
          }}
          />
        {cvUrl && <img src={cvUrl} alt="Preview" />}
          <button className="btn btn-success mx-3" onClick={uploadFile}>Upload</button>
      </div>

    </div>
  );
}
export default Test;