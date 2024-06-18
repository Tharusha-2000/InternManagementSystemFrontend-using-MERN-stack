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



export default function EditCvfile({open, handleClose, internId}) {

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
              const cvRef = ref(storage,cvPath);
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
                  window.alert(response.data.msg);
                  console.log(response.data);
                })
                .catch((error) => {
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
              window.alert(response.data.msg);
            }).catch((error) => {
              console.log('File upload failed', error);
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