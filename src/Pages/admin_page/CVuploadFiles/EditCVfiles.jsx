import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/system';
import 'firebase/storage';
import 'firebase/firestore';
//import { UploadFile } from '@mui/icons-material';
import { getStorage, 
        ref, 
        uploadBytesResumable, 
        getDownloadURL
       } from "firebase/storage";
import app from './firebase-config';
import { BASE_URL } from '../../../config';


export default function EditCvfile({open, handleClose, internName, internId}) {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [inputs , setInputs ] = useState({});

  const {getRootProps, getInputProps} = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  });

    
useEffect(() => {
  if (file) {
    const fileName = `${new Date().getTime()}_${file.name}`;
    uploadFile(file, fileName);
  }
}, [file]);


      const uploadFile = async (file) => {
      const storage = getStorage(app);
      const folder = "CVFILES/";
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, 'CVFILES/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      
      
      

      // Listen for state changes, errors, and completion of the upload.
              uploadTask.on('state_changed',
              (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              }, 
              (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                  case 'storage/canceled':
                    // User canceled the upload
                    break;

                  // ...

                  case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
              }, 
              () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at (DownloadURL) - ', downloadURL);
                  setInputs((prev) => {
                    return {
                      ...prev,
                      [fileName]: downloadURL,
                    };
                  });
                });
              }
            );
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const fileData = { fileURL: fileUrl, userId: internId };
        console.log("fileData:", fileData);
        
        await axios.post("http://localhost:8000/api/cvfiles", fileData);
        window.location.reload();
      }catch (error) {
        console.log(error);
        if (error.response && error.response.status === 404) {
          alert('Error: Route not found');
        } else {
          alert('An unknown error occurred');
        }
      }
    };






  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md" // Increase the width of the dialog box
        PaperProps={{
          component: 'form',
          style: { height: '80%' }, // Increase the height of the dialog box
          onSubmit: handleSubmit,
    
        }}
      >
        <DialogTitle>{`Upload File for ${internName}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To upload a file, please select it here. We will process it accordingly.
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
            value={file ? file.name : ''}
            InputProps={{
              readOnly: true,
            }}
          />
          <input
            type="file"
            style={{ display: 'none' }}
            id="hidden-file"
            accept="application/pdf"
            onChange={(e) => setFile((prev) => e.target.files[0])}
          />
          <Box {...getRootProps()} 
                    sx={{ 
                            border: '2px dashed #000', 
                            padding: 2, 
                            marginTop: 2, 
                            height:"300px" 
                        }}>
            <input {...getInputProps()} />
            {fileUrl ? (
              <object data={fileUrl} type="application/pdf" width="100%" height="100%">
                <p>It appears you don't have a PDF plugin for this browser. No biggie... you can 
                      <a href={fileUrl}>click here to download the PDF file.</a></p>
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