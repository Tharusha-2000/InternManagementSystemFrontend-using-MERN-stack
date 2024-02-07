import React from 'react'
import './style.css'
export const Fogetpassword = () => {
    
    
    
    
 return (
   <div className='d-flex justify-content-center align-items-center vh-100  loginPage'>
    <div className='p-3 rounded w-25 border  loginForm'>      
       
       <h2>Forget password</h2>
       <form >
           <div className='mb-3 '>
               <label htmlFor="email"><strong>Enter Email Address</strong></label>
               <br />
               <br />
               <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                 className='form-control rounded-0'/>
           </div>
             <button type="submit" className='w-100 rounded-1 mb-2'>Send Email</button>
       </form>     
    </div>
   </div>
  )
}
export default Fogetpassword;
