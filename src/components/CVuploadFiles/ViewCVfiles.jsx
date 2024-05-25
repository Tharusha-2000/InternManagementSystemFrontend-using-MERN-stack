import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
//import app from './firebase-config';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewCvfile({ open, handleClose, userId }) {
  const [cvFiles, setCvFiles] = useState([]);
  
  useEffect(() => {
    const fetchCvFiles = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/users/${userId}/cvfiles`);
          // Ensure response.data is an object and convert it to an array
          const data = response.data ? [response.data] : [];
          setCvFiles(data);
        } catch (error) {
          console.error('Failed to fetch CV files:', error);
        }
      }
    };
  
    fetchCvFiles();
  }, [userId]);

/*
  const viewFile = async (filePath) => {
    try {
      const storage = getStorage(app);
      const fileRef = ref(storage, filePath);
      const downloadUrl = await getDownloadURL(fileRef);
      // Open the download URL in a new tab
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Failed to fetch download URL:', error);
    }
  };
*/

const viewFile = async (filePath) => {
  try {
    if (!filePath) {
      console.error('File path is empty');
      return;
    }
    const storage = getStorage(app);
    const fileRef = ref(storage, filePath);
    const downloadUrl = await getDownloadURL(fileRef);
    // Open the download URL in a new tab
    window.open(downloadUrl, '_blank');
  } catch (error) {
    console.error('Failed to fetch download URL:', error);
  }
};

  return (
    <React.Fragment>
       <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Here are the CV file available for viewing:"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          The File will open in a new tab, 
          allowing you to view the curriculum vitea of intern without leaving the your current page.
          
        {cvFiles.map((cvFile) => (
          <div key={cvFile.fileName}>
            <h2>{cvFile.fileName}</h2>
            <Button variant="contained" onClick={() => viewFile(cvFile.filePath)}>
          View File
        </Button>
          </div>
        ))}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back to the Page</Button>
        </DialogActions>
       
      </Dialog>
    </React.Fragment>
  );
}