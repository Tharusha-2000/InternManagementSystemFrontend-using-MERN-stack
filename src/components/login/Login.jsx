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
import {BASE_URL} from '../../config';
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';

const defaultTheme = createTheme();

function Login() {
    //console.log("login");
    const [values, setValues] =useState({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
 
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if(!values.email || !values.password) {
        Swal.fire({ position: "top", text: "Please fill the required fields" 
                        ,customClass: { confirmButton: 'my-button' }});
        return;
      }
      setLoading(true); 
   
    
      axios.post(`${BASE_URL}login`, values)
        .then(result => {
        
          if(result.data) {
            setLoading(false);
           // Swal.fire({ position: "top", text: result.data.msg });
            const token = result.data.token;
            localStorage.setItem("token", token);
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;
    
            if(role === 'admin') {
              navigate('/AdminDashboard');
            } else if(role === 'intern')  {
              navigate('/interndashboard');
            } else if(role === 'mentor')  {
              navigate('/mentordashboard');
            } else if(role === 'evaluator')  {
              navigate('/evaluatordashboard');  
            } else if(role === 'manager')  {
              navigate('/managerdashboard');
            } else {
              Swal.fire({ position: "top", text:"Invalid role"  ,customClass: { confirmButton: 'my-button' }});
              return;
            } 
               
            // Show the popup after navigation
              let timerInterval;
              Swal.fire({
                title: "NEW USER ?",
                text: "if this first logging change password!",
                icon: "question",
                timer: 3000,
                timerProgressBar: true,
                showCancelButton: true,
                confirmButtonText: "Yes, change it!",
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                didOpen: () => {
                  const swal2popup = document.querySelector('.swal2-popup');
                  const swal2actions = document.querySelector('.swal2-actions');
                  const swal2loading = document.querySelector('.swal2-loading');
                  swal2popup.style.position = 'fixed';
                  swal2popup.style.top = '5%';
                  swal2popup.style.right = '1%';
                  swal2popup.style.width = '300px'; // Adjust width as needed
                  swal2popup.style.height = '270px'; // Adjust height as needed
                  swal2popup.style.fontSize = '12px';
                  swal2loading.style.position = 'absolute';
                  swal2loading.style.bottom = `${swal2actions.offsetHeight}px`;
                  timerInterval = setInterval(() => {
                    const timeLeft = Swal.getTimerLeft();
                    if (timeLeft !== undefined) {
                      console.log(timeLeft);
                    }
                  }, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                }
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/security");
                } else if (result.dismiss === Swal.DismissReason.timer) {
                  console.log("I was closed by the timer");
                }
              });
            
                      
     

          } else {
            Swal.fire({ position: "top", text: result.data.msg  ,customClass: { confirmButton: 'my-button' }});
          }
        })
        .catch(err => {
          setLoading(false); 
          
          if (err.response) {
            Swal.fire({ position: "top", text: err.response.data.msg  ,customClass: { confirmButton: 'my-button' }});
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
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Log in'}
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
