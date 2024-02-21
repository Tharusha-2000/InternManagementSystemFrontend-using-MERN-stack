import './style.css'
import { Link,useNavigate } from 'react-router-dom'
import React, { useState, useRef } from 'react';
import './varify.css'; 


const Varify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

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

  return (
   <div className='d-flex justify-content-center align-items-center vh-100  loginPage'>
     <div className='p-3 rounded w-25 border  loginForm'>      
       
       <h1>Verification</h1>
       <form >
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
           <div className='mb-1'> 
                   <p>Didn’t Receive a code?<Link to="#">resend</Link></p>
                  
                </div>
             <button type="submit" className='w-100 rounded-1 mb-2'>Verify</button>
       </form>     
     </div>
   </div>
  )
}

export default Varify