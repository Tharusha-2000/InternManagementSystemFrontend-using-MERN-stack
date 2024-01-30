import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



function Login () {
  
   console.log("login");
   //const navigate =useNavigate();

   const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    
  
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http:/10.10.31.12/Addusertable', values)
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
                <div className='mb-1'> 
                    <p className="forgot-password" >
                        Forget password?
                       </p>
                </div>
                <button className='w-100 rounded-1 mb-2' onClick={handleSubmit}> Log in </button>
              
            </form> 
        </div>
    </div>
    
 )
}

export default Login