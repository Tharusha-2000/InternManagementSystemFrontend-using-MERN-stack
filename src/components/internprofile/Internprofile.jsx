import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';


//import { Link, Outlet, useNavigate } from 'react-router-dom'
//import axios from 'axios'



function Profile() {
    console.log("hi");
	/*const option = [ 
		{label: "Gender",value :1},
		{label: "Male",value :2},
		{label: "Female",value :3},
	   ]
   
	   function handleSelect(event){
		   setValue(event.target.value)
           }
  */
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
		  <h2>Intern Profile Setting</h2>
		  <h3> Basic Information </h3>
			{/* <form class="row g-3 w-50" > */}
			<form class="row" >
			  {/* <div className='box1 rounded-1'> */}
			  <div className='box1'>
                <div class="col">
				{/* <div class="col-12"> */}
					<label for="inputName" class="form-label">First Name</label><br></br>
					<input type="text1" class="form-control" id="inputfName" autoComplete='off'
					onChange={e => setData({...data, fname: e.target.value})}/>
				</div> 
                <div class="col">
					<label for="inputName" class="form-label">Last Name</label><br></br>
					<input type="text2" class="form-control" id="inputLName" autoComplete='off'
					onChange={e => setData({...data, lname: e.target.value})}/>
				</div>
                <div className='d-flex ' >
                <div class="col">
				{/* </div><div class="col-6"> */}
					<label for="inputName" class="form-label">University Name</label><br></br>
					<input type="text3" class="form-control" id="inputName" autoComplete='off'
					onChange={e => setData({...data, date: e.target.value})}/>
				</div>
                <div class="col">
				{/* <div class="col-6"> */}
                    {/* <label for="inputGpa" class="form-label">GPA</label> */}
					
					{/* <select className="form-select" onChange={handleSelect}> */}
                        {/* {option.map(option => ( */}
                           {/* <option value={option.value}>{option.label}</option> */}
      
                         {/* ))} */}
                    {/* </select>  */}
					<div class ="Gpa">
					<label for="inputGpa" class="form-label">GPA</label><br></br>
					<input type="text4" class="form-control" id="Gpa"  autoComplete='off'
					onChange={e => setData({...data, gender: e.target.value})}/> 
				 </div>
				</div>
                </div>
				<div class="Acc">
				{/* <div class="col-12"> */}
					<label for="inputAccomplishments" class="form-label">Accomplishments</label><br></br>
					<input type="text5" class="form-control" id="Accompishments"  autoComplete='off'
					onChange={e => setData({...data, roll: e.target.value})}/>
				</div>
				<br />
             </div>
             <h4>Interview Details</h4>
             <div className='box2 rounded-1'>
                {/* <h4>Interview Details</h4> */}
				<div class="interview">
                <div class="col-12">
					<label for="inputInterviewScore" class="form-label">Interview Score</label><br></br>
					<input type="text" class="form-control" id="interviewScore" autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
					</div>
				
				</div>

				<div class="col-12">
					<label for="inputInterviewFeedBack" class="form-label">Interview FeedBack</label><br></br>
					<input type="text" class="form-control" id="interviewFeedBack" 
					 onChange={e => setData({...data, password: e.target.value})}/>
				</div>
                <br />
             </div>
			 <h4>Evaluation</h4>
             <div className='box3 rounded-1'>
                    <h8>Evaluation 1:</h8>
                
				<div class="col-12">
					<label for="inputScore" class="form-label">Score</label><br></br>
					<input type="text" class="form-control" id="inputScore" autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})}/>
				</div>
				
				<div class="col-12">
					<label for="inputFeedBack" class="form-label">Feed Back</label><br></br>
					<input type="text" class="form-control" id="FeedBack"  autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>
                 <h8>Evaluation 2:</h8>
				 <div class="col-12">
					<label for="inputScore" class="form-label">Score</label><br></br>
					<input type="text" class="form-control" id="inputScore" autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})}/>
				</div>
				<div class="col-12">
				<label for="inputFeedBack" class="form-label">Feed Back</label><br></br>
					<input type="text" class="form-control" id="FeedBack"  autoComplete='off'
					onChange={e => setData({...data, msg: e.target.value})}/>
					
				</div>
		        </div>

				<h4>Projects</h4>
                <div class="col-12">
					<label for="NumberOfProjects" class="form-label">Number of Projects</label><br></br>
					<input type="text" class="form-control" id="NumberOfProjects" autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="team" class="form-label">Team</label><br></br>
					<input type="text" class="form-control" id="team" autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="Mentor" class="form-label">Mentor</label><br></br>
					<input type="text" class="form-control" id="Mentor" autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>
			
			 <div className='d-flex btnt'>
				<div class="col-0">
					<button type="submit" class="btn btn-primary" className=' rounded-2 btn1'>Save</button>
				</div>
                <div class="col-3">
					<button type="cancel " class="btn btn-primary" className=' rounded-2 btn2'>Edit</button>
				
				</div>
             </div>
			</form>
		</div>

    )

}

export default Profile;
