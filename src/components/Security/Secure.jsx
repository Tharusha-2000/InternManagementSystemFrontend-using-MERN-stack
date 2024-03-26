import React,{ useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
const defaultTheme = createTheme();










function Secure() {

  

 const [values, setValues] =useState({
      Newpassword: '',
      Oldpassword: '',
      Confirmpassword: ''
  })



const handleSubmit = (e) => {
  //console.log(values)
  e.preventDefault();
   if(!values.Newpassword||!values.Oldpassword || !values.Confirmpassword ) {
        window.alert('Please fill the required fields')
        return;
    }
   if(values.Newpassword!== values.Confirmpassword) {
    window.alert('Password and Confirm Password should be same')
    return;
   }
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
   if (!passwordRegex.test(values.Newpassword)){
      window.alert('Password must be at least 6 characters long and contain at least one letter and one number.')
      return;
   }
     

     const token = localStorage.getItem('token');   
    
     axios.post('http://localhost:8001/api/users/secure',values,{
                 headers: {
                    'Authorization': `Bearer ${token}`
                     }
      })
        
      .then(result => {
            if(result.data){
               window.alert(result.data.msg);
               console.log(result.data.msg);
                 if(result.status === 201 ) {
                       
                  }
             }
        }) 
    .catch(err => {
          if (err.response){
            window.alert(err.response.data.msg);
           }
      })
 
 }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Security
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="Oldpassword"
              label="Old password"
              type="password"
              id="Oldpassword"
              onChange={(e) => setValues({...values, Oldpassword : e.target.value})}
             
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Newpassword"
              label="New password"
              type="password"
              id="Newpassword"
              onChange={(e) => setValues({...values,Newpassword : e.target.value})}
            />
              <TextField
              margin="normal"
              required
              fullWidth
              name="Confirmpassword"
              label="Confirm password"
              type="password"
              id="Confirmpassword"
              onChange={(e) => setValues({...values,Confirmpassword : e.target.value})}
            />
           
           <Box display="flex" justifyContent="space-between">
    <Box width="45%">
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Change
        </Button>
    </Box>
    <Box width="45%">
        <Button
            type="cancel"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
        >
            Cancel
        </Button>
    </Box>
</Box>
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Secure;