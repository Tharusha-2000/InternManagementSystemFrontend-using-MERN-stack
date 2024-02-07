
import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './adduser.css'

import {  useNavigate } from 'react-router-dom'
import axios from 'axios'


function Adduser() {
    console.log("hi");
	
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
		
	  });
	  const navigate = useNavigate()
      const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('email', data.email);
		formData.append('password', data.password);
		
	
		axios.post('http://localhost:3000/add_user', formData)
		.then(result => {
			if(result.data.Status) {
				navigate('/Addusertable')
			} else {
				alert(result.data.Error)
			}
		})
		.catch(err => console.log(err))
	  }




/*	const option = [ 
		{label: "Gender",value :1},
		{label: "Male",value :2},
		{label: "Female",value :3},
	   ]
   
	 
  
   
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
  
    const handleSubmit= (e)=>{
	e.preventDefault();
	const data={email,password}
	axios.post('http://localhost:5173/register',{email,password})
	.then(res=>{
		console.log(res);
		console.log(res.data);
		alert("user added successfully")
	})
	.catch(err=>{console.log(err)
	})
   }
    */
    return (

		<div className='d-flex flex-column align-items-center pt-4'>
		  <h2>NEW REGISTRATION</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit} >
			 

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
                     <p>TO:</p>
                
				<div class="col-12">
					<label for="inputName" class="form-label">Name</label>
					<input type="text" class="form-control" id="inputName" placeholder="Enter Name" autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})}/>
				</div>
				
				<br />
				

             </div>
			 <div className='d-flex btnt'>
				<div class="col-0">
					<button type="submit" class="btn btn-primary" className=' rounded-2 btn1 '>Register & invite</button>
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

