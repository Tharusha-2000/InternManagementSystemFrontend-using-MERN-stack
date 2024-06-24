
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
  const [changeRoleId, setChangeRoleId] = useState(null);
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
    setChangeRoleId(internId);
    setOpen(true);
  };

  const handleClose = () => {
    setChangeRoleId(null);
    setOpen(false);
  };
  // console.log(cvUrl);

  return (
    <>
                              <Button 
                              onClick={() => handleClickOpen(internId)}
                            variant="contained"
                            sx={{
                              border: "1px solid rgb(46, 51, 181)",
                              color: changeRoleId === internId ?"#fff":"rgb(46, 51, 181)",
                              backgroundColor: changeRoleId === internId ?  "#0056b3" :"rgba(42, 45, 141, 0.438)",
                              padding: "0px 13px",
                              fontSize: "0.875rem",
                              minWidth: "auto",
                              "&:hover": {
                                backgroundColor: "#0056b3",
                                color: "#fff",
                              },
                              '& .MuiSvgIcon-root': {
                                fontSize: '1.5rem', // Adjust icon size if necessary
                              }
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
