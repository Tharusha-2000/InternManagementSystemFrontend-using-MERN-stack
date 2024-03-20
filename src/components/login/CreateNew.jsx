import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import Login from './Login'
import e from 'cors'




function CreateNew () {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state;
    //console.log(email);

   const [values, setValues] =useState({
       password: '',
        confirmpassword: ''
    })

    const handleSubmit = (event) => {
        //console.log(values)
        event.preventDefault();
         if(!values.password || !values.confirmpassword) {
              window.alert('Please fill the required fields')
              return;
          }
         if(values.password !== values.confirmpassword) {
          window.alert('Password and Confirm Password should be same')
          return;
         }
         const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
        if (!passwordRegex.test(data.password)) {
            window.alert('Password must be at least 6 characters long and contain at least one letter and one number.')
            return;
        }

         axios.put('http://localhost:8000/api/users/resetPassword', {email:email,password:values.password})
          // console.log(email);
          // console.log(values);
         
       
       .then(result => {
                if(result.data) {
                    window.alert(result.data.msg);
                    console.log(result.data.msg);
                       if(result.status === 201 ) {
                               navigate('/ll');
                      }
                }
            }) 
            .catch(err => {
                if (err.response) {
                    window.alert(err.response.data.msg);
                }
            })


    }



  return (
    
     <div className='d-flex justify-content-center align-items-center vh-100  loginPage'>
         <div className='p-3 rounded w-25 border  loginForm'>      
            
            <h2>Create New Password</h2>
            <br />
            
            <p>Your new password must be different 
                from previously used passwords</p>
            <form  onSubmit={handleSubmit}>
         
                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password' onChange={(e) => setValues({...values, password : e.target.value})}
                      className='form-control rounded-0'/>
                </div>

                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Confirm Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password' onChange={(e) => setValues({...values, confirmpassword : e.target.value})}
                      className='form-control rounded-0'/>
                </div>
               
              
                <button type="submit" className='w-100 rounded-1 mb-2' >Create password</button>
                </form>  
           
        </div>
    </div>
 )

}

export default CreateNew 