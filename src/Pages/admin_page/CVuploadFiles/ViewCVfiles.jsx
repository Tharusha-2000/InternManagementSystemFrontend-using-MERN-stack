import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from './firebase-config';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewCvfile({ open, handleClose, userId }) {
  const [cvFiles, setCvFiles] = useState([]);

  useEffect(() => {
    const fetchCvFiles = async () => {
      if (userId) {
      try {
        const response = await axios.get(`http://localhost:8000/api/cvfiles/${userId}`);
        // Ensure response.data is an array
        const data = Array.isArray(response.data) ? response.data : [];
        setCvFiles(data);
      } catch (error) {
        console.error('Failed to fetch CV files:', error);
      }
    }
  };

    fetchCvFiles();
  }, [userId]);



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


  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Curriculum Vitae
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              close
            </Button>
          </Toolbar>
        </AppBar>

        {Array.isArray(cvFiles) && cvFiles.map((cvFile) => {
          console.log(cvFile.fileURL); // This will log the URL to the console
          return (
            <div key={cvFile.fileName}>
              <h2>{cvFile.fileName}</h2>
              {cvFile.fileURL ? 
            <Box sx={{ backgroundColor: 'yellow', width: '100px', height: '20px' }}>Completed</Box> : 
            <Box sx={{ backgroundColor: 'green', width: '100px', height: '20px' }}>Pending</Box>}
        </div>
        );
      })}
       {cvFiles.map((cvFile) => (
          <div key={cvFile.fileName}>
            <h2>{cvFile.fileName}</h2>
            <Button variant="contained" onClick={() => viewFile('CVFILES/CV File.pdf')}>
  View File
</Button>
          </div>
        ))}
        
       
      </Dialog>
    </React.Fragment>
  );
}