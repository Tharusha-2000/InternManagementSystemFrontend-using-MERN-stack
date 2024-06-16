
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import image2 from '../../assets/photo2.jpg';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../../config';
import Swal from 'sweetalert2';
function Fogetpassword() {
    const [value, setValue] =useState({ email: ''})
    const [error, setError] =useState(null)
    const navigate = useNavigate()


  const handleSubmit = (event) => {
    console.log(value)
    event.preventDefault();
    if(!value.email ){
      setError('result')
      Swal.fire({ position: "top",
      text: "Please fill the required fields",
      customClass: { confirmButton: 'my-button' }
     });
     // window.alert('Please fill the required fields')
      return;
    }

    axios.post(`${BASE_URL}generateOTP&sendmail`, value)
          .then(result => {
              if(result.data){
                Swal.fire({ position: "top",
                text:result.data.msg,
                customClass: { confirmButton: 'my-button' }
               }) ; 
               //window.alert(result.data.msg);
                  console.log(result.data.msg);
                     if(result.status === 201 ) {
                     // console.log(result.data.code);
                          navigate('/Varify',{ state: { email: value.email ,code:result.data.code} });
                      }
                     
                 
                }
              }) 
                .catch(err => {
                  if (err.response) {
                    console.log(err.response.data.msg);

                    Swal.fire({ position: "top",
                    text:err.response.data.msg,
                    
                    customClass: { confirmButton: 'my-button' }
                   })

                   // window.alert(err.response.data.msg);

                      .then(() => {
                         navigate('/');
                    
                  });
  

                  }
              })
       

    }

  return (
    <main
    style={{
        backgroundImage: `url(${image2})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh', // make the main tag fill the entire height of the viewport
        display: 'flex', // add this
        justifyContent: 'center', // add this
        alignItems: 'center', 
       }} >

      <Paper
        sx={{
          width: 400,
          mx: 'auto', // margin left & right
          my: 0, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
          backgroundColor: 'rgba(190, 216, 230, 0.9)',
 
        }}
        variant="outlined"
      >
       
        <div>
          <Typography variant="h5" component="h3">
            <b>Forget Password</b>
          </Typography>
          <br />
          <br />
          <Typography variant="body1">Enter the email address .</Typography>
        </div>
        
      
          <Input
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            onChange={(e) => setValue({...value, email: e.target.value})}
          />
        
        
          <Button 
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }} 
                onClick={handleSubmit} >Send Email</Button>
          
      </Paper>
    </main>
  );
}

export default Fogetpassword;
