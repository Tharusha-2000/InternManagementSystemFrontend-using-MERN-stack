import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'



function Login () {
   
   console.log("login");
   //const navigate =useNavigate();
/*
   const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    
  
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:5173/Addusertable', values)
        .then(result => {
            if(result.data.loginStatus) {
                localStorage.setItem("valid", true)
                navigate('/Addusertable')
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
    

*/


  return (
    
     <div className='d-flex justify-content-center align-items-center vh-100  loginPage'>
         <div className='p-3 rounded w-25 border  loginForm'>      
            
            <h2>Login Page</h2>
            <form >
                <div className='mb-3 '>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                      className='form-control rounded-0'/>
                </div>
                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password'
                      className='form-control rounded-0'/>
                </div>
             </form>  
                <div className='mb-1'> 
                  <Link to="/forgot">Forgot Password</Link>
                </div>
                <button className='w-100 rounded-1 mb-2' > Log in </button>
              
           
        </div>
    </div>
    
 )
}

export default Login