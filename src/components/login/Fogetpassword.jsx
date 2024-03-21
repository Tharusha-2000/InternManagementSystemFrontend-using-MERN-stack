import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'



function Fogetpassword () {
   const [value, setValue] =useState({ email: ''})
   const [error, setError] =useState(null)
   const navigate = useNavigate()


  const handleSubmit = (event) => {
    console.log(value)
    event.preventDefault();
    if(!value.email ){
      setError('result')
      window.alert('Please fill the required fields')
      return;
    }

    axios.post('http://localhost:8000/api/users/generateOTP&sendmail', value)
          .then(result => {
              if(result.data){
                  window.alert(result.data.msg);
                  console.log(result.data.msg);
                     if(result.status === 201 ) {
                     // console.log(result.data.code);
                          navigate('/Varify',{ state: { email: value.email ,code:result.data.code} });
                      }
                 
                }
              }) 
                .catch(err => {
                  if (err.response) {
                   //   window.alert(err.response.data.msg);
                  }
              })
       

    }


 return (
   <div className='d-flex justify-content-center align-items-center vh-100  loginPage'>
    <div className='p-3 rounded w-25 border  loginForm'>      
       
       <h2>Forget password</h2>
       <form onSubmit={handleSubmit}>
           <div className='mb-3 '>
               <label htmlFor="email"><strong>Enter Email Address</strong></label>
               <br />
               <br />
               <input type="email" name='email' autoComplete='off' placeholder='Enter Email' onChange={(e) => setValue({...value, email: e.target.value})}
                 className='form-control rounded-0'/>
           </div>
             <button type="submit" className='w-100 rounded-1 mb-2' >Send Email</button>
       </form>     
    </div>
   </div>
  )
}
export default Fogetpassword;
