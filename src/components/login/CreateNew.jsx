import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import image2 from "../../assets/photo2.jpg";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";


function CreateNew() {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state||{};
    //console.log(email);

   const [values, setValues] =useState({
       password: '',
        confirmpassword: ''
    })

 const handleSubmit = (e) => {
        //console.log(values)
        e.preventDefault();
         if(!values.password || !values.confirmpassword) {
              window.alert('Please fill the required fields')
              return;
          }
         if(values.password !== values.confirmpassword) {
          window.alert('Password and Confirm Password should be same')
          return;
         }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
         if (!passwordRegex.test(values.password)){
            window.alert('Password must be at least 6 characters long and contain at least one letter and one number.')
            return;
         }

     axios.put('http://localhost:8000/api/users/resetPassword', {email:email,password:values.password})
          // console.log(email);
          // console.log(values);
         
       
       .then(result => {
                if(result.data){
                    window.alert(result.data.msg);
                    console.log(result.data.msg);
                       if(result.status === 201 ) {
                               navigate('/Login');
                      }
                }
            }) 
            .catch(err => {
                if (err.response){
                    window.alert(err.response.data.msg);
                    navigate('/Login');
                 }
            })
    }


  return (
    <main
      style={{
        backgroundImage: `url(${image2})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh", // make the main tag fill the entire height of the viewport
        display: "flex", // add this
        justifyContent: "center", // add this
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: 400,
          mx: "auto", // margin left & right
          my: 0, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
          backgroundColor: "rgba(190, 216, 230, 0.9)",
        }}
        variant="outlined"
      >
        <div>
          <Typography variant="h5" component="h3">
            <b>Create New Password</b>
          </Typography>
          <br />
          
        </div>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name="confirmpassword"
            type="password"
            placeholder="Enter password"
            onChange={(e) =>
              setValues({ ...values, confirmpassword: e.target.value })
            }
          />
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Create password
        </Button>
      </Paper>
    </main>
  );
}

export default CreateNew;
