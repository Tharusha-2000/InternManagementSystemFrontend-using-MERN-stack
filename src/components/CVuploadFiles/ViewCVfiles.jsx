

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ViewCvfiles = ({ open, handleClose, cvUrl }) => {
   console.log(cvUrl);
  return (
    <>
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