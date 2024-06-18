import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ViewCvfiles = ({ open, handleClose, cvUrl }) => {
  return (
    <>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>View CV</DialogTitle>
      <DialogContent>
          {cvUrl ? (
            <object data={cvUrl} type="application/pdf" width="800px" height="600px"></object>
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