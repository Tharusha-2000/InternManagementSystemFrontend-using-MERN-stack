import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import  * as jwt_decode from 'jwt-decode'


function Login () {
   
   console.log("login");
   const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    
  
    const handleSubmit = (event) => {
        console.log(values)
        event.preventDefault();

        axios.post('http://localhost:8090/api/users/login', values)
             .then(result => {
                if(result.data) {
                    window.alert(result.data.msg);
                    const token = result.data.token;
                    console.log(token);
                    localStorage.setItem("token", token);
                    const decodedToken = jwt_decode(token);
                    console.log(decodedToken);
                    console.log("hi");
                 
                     const role = decodedToken.role;
              
                     if(role === 'admin') {
                          navigate('/HS');
                   } else  {
                      navigate('/')
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
    
     <div className='d-flex justify-content-center align-items-center vh-100  loginPage'>
         <div className='p-3 rounded w-25 border  loginForm'>      
            
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3 '>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" name='email' autoComplete='off' placeholder='Enter Email' onChange={(e) => setValues({...values, email : e.target.value})}
                      className='form-control rounded-0'/>
                </div>
                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password'onChange={(e) => setValues({...values, password : e.target.value})} 
                      className='form-control rounded-0'/>
                </div>
              
                <div className='mb-1'> 
                  <Link to="/Forgetpassword">Forgot Password</Link>
                </div>
                <button className=' w-100 rounded-1 mb-2' type="submit"> Log in </button>
            </form> 
         </div>
     </div>
    
 )

}

export default Login