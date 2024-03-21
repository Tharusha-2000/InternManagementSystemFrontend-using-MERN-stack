import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link ,useNavigate } from 'react-router-dom';
import React,{ useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';


import Login from './components/login/Login';
import Addusertable from './components/adduser/Addusertable';
import Adduser from './components/adduser/Adduser';
//import Dashboard from './components/Dashboard';
import Header from './components/common/Header';
import HS from './components/common/HS';
import Fogetpassword from './components/login/Fogetpassword';
import Varify from './components/login/Varify';
import CreateNew from './components/login/CreateNew';




import AdminDashboard from './components/common/admin_page/AdminDashboard';
import Registration from './components/common/admin_page/Registration';
import CVManagement from './components/common/admin_page/CVManagement';
import Evaluation from './components/common/admin_page/Evaluation';
import Profile from './components/common/admin_page/Profile';
import ProfileCreate from './components/common/admin_page/ProfileCreate';
import Security from './components/common/admin_page/Security';


import Test from './test.jsx';




function App() {
  const [user,setUsers] = useState();  
  return (
   
   <BrowserRouter>
      <TokenCheck setUsers={setUsers} />
      <Routes>
        <Route path="/Login" element={<Login setUsers={setUsers}/>} > </Route>
        <Route path="/Addusertable" element={<Addusertable />}> </Route>
        <Route path="/Adduser" element={<Adduser />}> </Route>
        <Route path="/Forgetpassword" element={<Fogetpassword/>}> </Route>
        <Route path="/CreateNew" element={<CreateNew/>}> </Route>
        <Route path="/Varify" element={<Varify/>}> </Route>
        <Route path="/HS" element={<HS/>}> </Route>
     
        <Route path="/Test" element={<Test/>}> </Route>







            <Route path="/AD" element={<AdminDashboard/>}></Route>
            <Route path="/registration" element={<Registration />}></Route>
            <Route path="/cvmanagement" element={<CVManagement />}></Route>
            <Route path="/evaluation" element={<Evaluation />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/profilecreate" element={<ProfileCreate />}></Route>
            <Route path="/security" element={<Security />}></Route>
        </Routes>

   </BrowserRouter>    
  
  );
}
function TokenCheck({ setUsers }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
      console.log('Token:', token);
    if (token) {
      const decodedToken = jwtDecode(token);
     // console.log('Decoded token:', decodedToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        setUsers(null);
        localStorage.removeItem('token');
        navigate('/ll');
      } else {
        setUsers(decodedToken);
      }
    }
  }, [navigate, setUsers]);

  return null;
}

export default App;

