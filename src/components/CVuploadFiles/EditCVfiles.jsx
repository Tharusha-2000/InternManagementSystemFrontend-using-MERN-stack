//stable EditCV files
import * as React from 'react';
import { useState, useCallback } from 'react';
import { BASE_URL } from '../../config';
import axios from 'axios';
import {
  deleteObject,
  getDownloadURL,
  ref, uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebaseconfig"
import { uuidv4 } from '@firebase/util'
import { Button,
         TextField,
         Dialog,
         DialogActions,
         DialogContent,
         DialogContentText,
         DialogTitle } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/system';
import Swal from 'sweetalert2';



export default function EditCvfile({open, handleClose, internId,refreshData}) {

  const [cv, setCV] = useState(null);
  const [cvUrl, setcvUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const token = localStorage.getItem('token');
  const [inputs , setInputs ] = useState({});
  const [oldCvPath, setOldImagePath] = useState(null);
  const {getRootProps, getInputProps} = useDropzone({
    onDrop: (acceptedFiles) => {
      setCV(acceptedFiles[0]);
      setcvUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  });


          const uploadFile = useCallback(() => {
  return new Promise((resolve, reject) => {
    if (cv === null) {
      reject('No file selected');
      return;
    }

    const cvPath = `cv/${cv.name + uuidv4()}`;
    const cvRef = ref(storage, cvPath);
    const uploadTask = uploadBytesResumable(cvRef, cv);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      setProgress(progress);
    }, 
    (error) => {
      console.log(error);
      reject(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at (DownloadURL) - ', downloadURL);

        // Delete the previous cv 
        if (oldCvPath) {
          const oldCvRef = ref(storage, oldCvPath);
          deleteObject(oldCvRef).then(() => {
            console.log('Old CV deleted');
          }).catch((error) => {
            console.log('Failed to delete old CV', error);
          });
        }
        console.log(cvPath);
        // Save the path of the uploaded cv
        setOldImagePath(cvPath);
        console.log(oldCvPath);

        const fileData = { cvUrl: downloadURL, userId: internId };
        const token = localStorage.getItem("token");

        axios.put(`${BASE_URL}${internId}/uploadcv`, fileData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          handleClose(); // Close the component immediately after request completion
          Swal.fire({
            title: 'Success!',
            text: response.data.msg,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Assuming refreshData is a function passed from the parent component to refresh the data
            refreshData(); // Call this function to refresh the data in the parent component
          });
          console.log(response.data);
        })
        .catch((error) => {
          handleClose(); // Close the component immediately after encountering an error
          Swal.fire({
            title: 'Error!',
            text: error.response.data.msg || 'An error occurred!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.log(error);
        });
        setCV(null);
        resolve(downloadURL);
      });
    });
  });
});



  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md" 
        PaperProps={{
          component: 'form',
          style: { height: '80%' }, 
          onSubmit: (e) => {
            e.preventDefault();
            uploadFile().then((downloadURL) => {
              // Show a success message with SweetAlert
              Swal.fire({
                title: 'Success!',
                text: 'File uploaded successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
              });
            }).catch((error) => {
              console.log('File upload failed', error);
              // Optionally, handle the error with SweetAlert as well
              Swal.fire({
                title: 'Error!',
                text: 'File upload failed!',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            });
          },
    
        }}
      >
        <DialogTitle>Upload File </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To upload a file, please select it here. 
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="file"
            name="file"
            label="Select File"
            type="text"
            fullWidth
            variant="standard"
            value={cv ? cv.name : ''}
            InputProps={{
              readOnly: true,
            }}
          />
          <input
            type="file"
            style={{ display: 'none' }}
            id="hidden-file"
            accept="application/pdf"
            onChange={(e) => setCV((prev) => e.target.files[0])}
          />
          <Box {...getRootProps()} 
                    sx={{ 
                            border: '2px dashed #000', 
                            padding: 2, 
                            marginTop: 2, 
                            height:"300px" 
                        }}>
            <input {...getInputProps()} />
            {cvUrl ? (
              <object data={cvUrl} type="application/pdf" width="100%" height="100%">
                <p>It appears you don't have a PDF plugin for this browser.
                      <a href={cvUrl}>click here to download the PDF file.</a></p>
              </object>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </Box>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Upload</Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}