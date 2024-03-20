import './style.css'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import React, { useState, useRef } from 'react';
import './varify.css'; 
import axios from 'axios';


const Varify = () => {
  const [otp, setOtp] = useState(['','','','','','']);
  const location = useLocation();
  const { email,code } = location.state;
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  //console.log({code});
  const handleChange = (index, value) => {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        if (value && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
    };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && inputRefs.current[index - 1]) {
              inputRefs.current[index - 1].focus();
        }
    };
  const resendOTP = () => {
    //console.log("hi")
    if(!email){
     window.alert('cannot resend OTP without email address')
     return;
    }
    axios.post('http://localhost:8201/api/users/generateOTP&sendmail',{email:email})
    .then(result => {
        console.log("hi");
        if(result.data){
             if(result.status === 201 ) {
                 window.alert(result.data.msg);   
             }
            }
          });
          
  };

  const handleSubmit = (e) => {

    e.preventDefault();
     console.log(otp);
     const otpNumber=Number(otp.join(''))
     console.log(otpNumber);

     axios.get(`http://localhost:8201/api/users/verifyOTP?&code=${otpNumber}` )
      
       .then(result => {
           if(result.data){
                 console.log("hi");
                 window.alert(result.data.msg);
                  if(result.status === 201 ) {
                      navigate('/CreateNew' ,{state: { email:email} });
                      }
                  }
               }).catch(err => {
                  if (err.response) {
                     console.log("hhhhh");
                     window.alert(err.response.data.msg);
                  }
                });

  };

  return (
    
   <div className='d-flex justify-content-center align-items-center vh-100  loginPage'>
     <div className='p-3 rounded w-25 border  loginForm'>      
       
       <h1>Verification</h1>
       <form onSubmit={handleSubmit}>
           <div className='mb-3 '>
               <label htmlFor="email"><strong>Enter verification code</strong></label>
               <br />
               <br />
           </div>
          <div className="mb-3">
              {otp.map((digit, index) => (
                 <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="otp-input"
                 />
             ))}
         </div>
             <button type="submit" className='w-100 rounded-1 mb-2'>Verify</button>
       </form> 
       <div className='mb-1'> 
                   <p>Didn’t Receive a code?<button type="button" onClick={resendOTP} class="btn btn-link">resend</button></p>
                  
           </div>    
     </div>
   </div>
  )
}

export default Varify