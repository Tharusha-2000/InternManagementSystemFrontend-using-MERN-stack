import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Container } from '@mui/material';
import axios from 'axios'; 
import Swal from 'sweetalert2';
import { BASE_URL } from '../../config';

const EmailForm = () => {
  const token = localStorage.getItem('token');
  const [data, setData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.email || !data.subject || !data.message) {
      Swal.fire({
        position: 'top',
        text: 'All fields are required',
        customClass: {
          container: 'my-swal',
          confirmButton: 'my-swal-button',
        },
      });
      return;
    }

    axios
      .post(`${BASE_URL}sendUserToEmail`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        Swal.fire({
          position: 'top',
          text: response.data.msg,
          customClass: {
            container: 'my-swal',
            confirmButton: 'my-swal-button',
          },
        });

        setData({
          email: '',
          subject: '',
          message: '',
        });
      })
      .catch((error) => {
        if (error.response) {
         
          Swal.fire({
            position: 'top',
            text: error.response.data.msg,
            customClass: {
              container: 'my-swal',
            confirmButton: 'my-swal-button',
            },
          });
        }
      });
  };

  return (
   
        <form noValidate autoComplete="off" 
        onSubmit={handleSubmit}
      
        >
          <TextField
            label="To:"
            variant="outlined"
            fullWidth
            style={{ marginTop: '10px'}}
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <TextField
            label="Subject:"
            variant="outlined"
            fullWidth
            style={{ marginTop: '10px'}}
            value={data.subject}
            onChange={(e) => setData({ ...data, subject: e.target.value })}
          />
          <TextField
            label="Message:"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            style={{ marginTop: '10px'}}
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
          />
         <Button
         variant="contained"
         style={{ marginTop: '10px', backgroundColor: '#1766E4', marginLeft: '170px' }} 
         type="submit"
        >
         Send
         </Button>
        </form>
     
  );
};

export default EmailForm;
