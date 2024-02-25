import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
import Login from './Login'




function CreateNew () {
    
   
  return (
    
     <div className='d-flex justify-content-center align-items-center vh-100  loginPage'>
         <div className='p-3 rounded w-25 border  loginForm'>      
            
            <h2>Create New Password</h2>
            <br />
            
            <p>Your new password must be different 
                from previously used passwords</p>
            <form >
         
                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password'
                      className='form-control rounded-0'/>
                </div>

                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Confirm Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password'
                      className='form-control rounded-0'/>
                </div>
             </form>  
               
                <button className='w-100 rounded-1 mb-2' >Create password</button>
              
           
        </div>
    </div>
    
 )
}

export default CreateNew 