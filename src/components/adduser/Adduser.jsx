import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './adduser.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Adduser() {
    const navigate = useNavigate();
    const option = [
        { value: '', label: 'Select' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ];

   const [data, setData] = useState({
        fname: "" ,
        lname: "" ,
        dob: "",
        role: "",
        gender: "",
        email: "",
        password: ""
       
    });
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!data.fname||!data.lname||!data.dob||!data.role ||!data.gender ||!data.email || !data.password) {
            window.alert('Please fill the required fields')
            return;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
        if (!passwordRegex.test(data.password)) {
            window.alert('Password must be at least 6 characters long and contain at least one letter and one number.')
            return;
        }
        const nameRegex = /^[A-Za-z]+$/;
        if (!nameRegex.test(data.fname)||!nameRegex.test(data.lname)) {
        window.alert('name must only contain letters.')
        return;
        }

      axios.post('http://localhost:8201/api/users/register', data)
            .then(result => {   
                  if (result.data) {
                     window.alert(result.data.msg);
                     if(result.status === 201 ) {
                        navigate('/Addusertable');
                    }
                } 
            
            })
            .catch(err => console.log(err));
    };
    


return (
      <div className='d-flex flex-column align-items-center pt-4'>
            <h2>NEW REGISTRATION</h2>
        <form className="row g-3 w-50" onSubmit={handleSubmit} >
            <div className='box1 rounded-1'>
              <div class="col-12">
                <label for="inputName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="inputfName" placeholder='Enter FName' autoComplete='off'
                  onChange={e => setData({...data, fname: e.target.value})}/>
              </div>
              <div class="col-12">
                <label for="inputName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="inputLName" placeholder='Enter LName' autoComplete='off'
                  onChange={e => setData({...data, lname: e.target.value})}/>
              </div>
              <br />
              <div className='d-flex ' >
                <div class="col-6">
                   <label for="inputDate" class="form-label">Date of Birth</label>
                   <input type="date" class="form-control" id="inputDate" placeholder='Enter DOB' autoComplete='off'
                   onChange={e => setData({...data, dob: e.target.value})}/>
                </div>
                <div class="col-6">
                  <label for="inputGender" class="form-label">Gender</label>
              
                  <select className="form-select" data-toggle="dropdown" onChange={e => setData({...data, gender: e.target.value})}>
                     {option.map(option => (
                        <option value={option.value}>{option.label}</option>
         
                      ))}
                  </select>
                </div>
              </div>
               <br />
               <fieldset class="form-group">
                <div class="row">
                    <legend class="col-form-label col-sm-2 pt-0">Role</legend>
                  <div class="col-sm-10">
                    <div class="form-check">
                       <input type="radio" class="form-check-input"  name="gridRadios" id="gridRadios1" value="intern" 
                       onChange={e => setData({...data, role: e.target.value})}/>
                       <label class="form-check-label" for="gridRadios1">
                          Intern
                       </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="evaluvator"
                        onChange={e => setData({...data, role: e.target.value})}/>
                        <label class="form-check-label" for="gridRadios2">
                            Evaluvator
                        </label>
                    </div>
                    <div class="form-check ">
                         <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="manager" 
                         onChange={e => setData({...data, role: e.target.value})}/>
                         <label class="form-check-label" for="gridRadios3">
                             Manager
                         </label>
                    </div>
                    <div class="form-check ">
                         <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="admin"
                         onChange={e => setData({...data, role: e.target.value})} />
                         <label class="form-check-label" for="gridRadios3">
                            Admin
                         </label>
                    </div>
                    <div class="form-check ">
                         <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios5" value="mentor" 
                         onChange={e => setData({...data, role: e.target.value})}/>
                         <label class="form-check-label" for="gridRadios3">
                             Mentor
                         </label>
                    </div>

                  </div>
                </div>
               </fieldset>
              <br />
             </div>

             <div className='box2 rounded-1'>
                  <h4>Temporary Login Details</h4>
              <div class="col-12">
                <label for="inputEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail" placeholder='Enter Email' autoComplete='off'
                   onChange={e => setData({...data, email: e.target.value})}/>
              </div>

              <div class="col-12">
                <label for="inputPassword4" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder='Enter Password'
                  onChange={e => setData({...data, password: e.target.value})}/>
              </div>
              <br />
              </div>
          <div className='d-flex btnt'>
             <div class="col-0">
                 <button type="submit" class="btn btn-primary" className=' rounded-2 btn1 '>Register & invite</button>
             </div>
             <div class="col-3">
             <button type="cancel" onClick={() => navigate('/AddUserTable')} class="btn btn-primary" className=' rounded-2 btn2'>cancel</button>

             </div>
          </div> 
        </form>
      </div>
    );
}

export default Adduser;


