import React from 'react'
import './style.css'
import { Link,useNavigate } from 'react-router-dom'
const Varify = () => {
  return (
   <div className='d-flex justify-content-center align-items-center vh-100  loginPage'>
     <div className='p-3 rounded w-25 border  loginForm'>      
       
       <h1>Verification</h1>
       <form >
           <div className='mb-3 '>
               <label htmlFor="email"><strong>Enter verification code</strong></label>
               <br />
               <br />
               <input onChange={(e) => setOTP(e.target.value) } className={styles.textbox} type="text" placeholder='OTP' />
                  
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