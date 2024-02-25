import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './adduser.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Adduser() {
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "" 
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);

        axios.post('http://localhost:9000/api/users/register', formData)
            .then(result => {
                if (result.data.Status) {
					alert("User added successfully!");
					console.log("hi");
                    navigate('/Addusertable');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>NEW REGISTRATION</h2>
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <div className='box2 rounded-1'>
                    <h4>Temporary Login Details</h4>
                    <div className="col-12">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder='Enter Email' autoComplete='off'
                            onChange={e => setData({ ...data, email: e.target.value })} />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" placeholder='Enter Password'
                            onChange={e => setData({ ...data, password: e.target.value })} />
                    </div>
                </div>
                <div className='box3 rounded-1'>
                    <h4>Invite User</h4>
                    <p>TO:</p>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="inputName" placeholder="Enter Name" autoComplete='off'
                            onChange={e => setData({ ...data, name: e.target.value })} />
                    </div>
                </div>
                <div className='d-flex btnt'>
                    <div className="col-0">
                        <button type="submit" className="btn btn-primary rounded-2 btn1">Register & invite</button>
                    </div>
                    <div className="col-3">
                        <button type="cancel" className="btn btn-primary rounded-2 btn2">cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Adduser;


