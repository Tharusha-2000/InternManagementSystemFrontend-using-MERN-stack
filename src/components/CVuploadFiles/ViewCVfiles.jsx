
import { Dialog, DialogTitle, DialogContent, DialogActions,Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from '../../config';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Button from "@mui/joy/Button";
const ViewCvfiles = ({ internId}) => {
  const [cvUrl, setCvUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (open) {
     
      axios
        .get(`${BASE_URL}interns/${internId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
           setCvUrl(result.data.intern.cvUrl);
        
        })
        .catch((err) => console.log(err));
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log(cvUrl);

  return (
    <>
     
                            <Button 
                            onClick={() => handleClickOpen(internId)}
                            variant="variant"
                            size="small"
                            style={{ marginRight: "10px" ,color:"royalblue" }}
                            sx={{
                              border: '1px solid rgb(46, 51, 181)',
                              color: 'rgb(46, 51, 181)', 
                              backgroundColor: 'rgba(42, 45, 141, 0.438)', 
                              '&:hover': {
                                backgroundColor: '#0056b3',
                                color: '#fff', 
                              },
                            }}
                          > 
                            <FileCopyIcon/>
                          </Button>

    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">

      <DialogTitle>View CV</DialogTitle>
      <DialogContent>
          {cvUrl ? (
            <iframe src={cvUrl} width="100%" height="700px"></iframe>
          ) : (
            <Typography variant="h6" color="text.secondary">
              CV is pending...             
            </Typography>
          )}
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
    </DialogActions>
    </Dialog>
    </>
  );
};

export default ViewCvfiles;