import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import  {jwtDecode} from 'jwt-decode';
import image from '../../assets/photo1.jpeg'


const defaultTheme = createTheme();

function Login() {
    console.log("login");
    const [values, setValues] =useState({
        email: '',
        password: ''
    })

    
    const [error, setError] =useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    
  
    const handleSubmit = (event) => {
        console.log(values)
        event.preventDefault();
       if(!values.email || !values.password) {
            setError('result')
            window.alert('Please fill the required fields')
            return;
       }
       

      axios.post('http://localhost:8001/api/users/login', values)
             .then(result => {
                 if(result.data) {
                     window.alert(result.data.msg);
                     const token = result.data.token;
                     localStorage.setItem("token", token);
                     const decodedToken = jwtDecode(token);
                     console.log(decodedToken);
                     console.log("hi");
                 
                      const role = decodedToken.role;
              
                        if(role === 'admin') {
                              navigate('/AdminDashboard');
                        } else if(role === 'intern')  {
                              navigate('/interndashboard')
                        }else if(role === 'mentor')  {
                              navigate('/mentordashboard')
                        }else if(role === 'evaluator')  {
                              navigate('/evaluatordashboard')  
                        }else if(role === 'manager')  {
                              navigate('/managerdashboard')
                        } else{
                           setError('result')
                           window.alert('Invalid role')
                        } 
                 } else {
                setError('result')
                window.alert(result.data.msg)
                }
                        })
          .catch(err => {
             if (err.response) {
                 window.alert(err.response.data.msg);
              }

            })

    }   

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
           
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Login 
          </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setValues({...values, email : e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setValues({...values, password : e.target.value})}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login in
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/Forgetpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
               </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default Login;