
import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './adduser.css'

import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'


function Adduser() {
    console.log("hi");
	const option = [ 
		{label: "Gender",value :1},
		{label: "Male",value :2},
		{label: "Female",value :3},
	   ]
   
	   function handleSelect(event){
		   setValue(event.target.value)
	   }
  
   /*
    const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		address: '',
		salary: '',
		image: ''
	})
	const navigate = useNavigate()


	const handleSubmit = (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("name", data.name);
		formdata.append("email", data.email);
		formdata.append("password", data.password);
		formdata.append("address", data.address);
		formdata.append("salary", data.);
		axios.post('http://localhost:8081/create', formdata)
		.then(res => {
			navigate('/Addusertable')
		})
		.catch(err => console.log(err));
	}
   */

    return (

		<div className='d-flex flex-column align-items-center pt-4'>
		  <h2>NEW REGISTRATION</h2>
			<form class="row g-3 w-50" >
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
                <div className='d-flex ' >
                <div class="col-6">
					<label for="inputDate" class="form-label">Date of Birth</label>
					<input type="date" class="form-control" id="inputDate" placeholder='Enter DOB' autoComplete='off'
					onChange={e => setData({...data, date: e.target.value})}/>
				</div>
                <div class="col-6">
                    <label for="inputGender" class="form-label">Gender</label>
					
					<select className="form-select" onChange={handleSelect}>
                        {option.map(option => (
                           <option value={option.value}>{option.label}</option>
      
                         ))}
                    </select>
					
					<input type="text" class="form-control" id="inputgender" placeholder='Enter Gender' autoComplete='off'
					onChange={e => setData({...data, gender: e.target.value})}/> 
				 
				</div>
                </div>
				<div class="col-12">
					<label for="inputRoll" class="form-label">Roll</label>
					<input type="text" class="form-control" id="inputroll" placeholder='Enter roll' autoComplete='off'
					onChange={e => setData({...data, roll: e.target.value})}/>
				</div>
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
             <div className='box3 rounded-1'>
                    <h4>Invite User</h4>
                  <h8>TO:</h8>
                
				<div class="col-12">
					<label for="inputName" class="form-label">Name</label>
					<input type="text" class="form-control" id="inputName" placeholder="Enter Name" autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})}/>
				</div>
				
				<div class="col-12">
					<label for="inputEAddress" class="form-label">Email Address</label>
					<input type="Email" class="form-control" id="inputEmail" placeholder="enter email" autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>

				<div class="col-12 mb-3">
					<label for="inputMsg" class="form-label" >Massege</label>
					<input type="text" class="form-control" id="inputMsg" placeholder='enter msg'
					onChange={e => setData({...data, msg: e.target.value})}/>
				</div>
				<br />
				

             </div>
			 <div className='d-flex btnt'>
				<div class="col-0">
					<button type="submit" class="btn btn-primary" className=' rounded-2 btn1'>Register & invite</button>
				</div>
                <div class="col-3">
					<button type="cancel " class="btn btn-primary" className=' rounded-2 btn2'>cancel</button>
				
				</div>
             </div>
			</form>
		</div>

    )

}

export default Adduser;

