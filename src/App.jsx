import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link ,useNavigate } from 'react-router-dom';
import React,{ useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';


import Login from './components/login/Login';
import Addusertable from './components/adduser/Addusertable';
import Adduser from './components/adduser/Adduser';
//import Dashboard from './components/Dashboard';
//import Header from './components/common/Header';
import HS from './components/common/HS';
import Fogetpassword from './components/login/Fogetpassword';
import Varify from './components/login/Varify';
import CreateNew from './components/login/CreateNew';




import AdminDashboard from './components/admin_page/AdminDashboard';
import Registration from './components/admin_page/Registration';
import CVManagement from './components/admin_page/CVManagement';
import Evaluation from './components/admin_page/Evaluation';
import Profile from './components/admin_page/Profile';
import ProfileCreate from './components/admin_page/ProfileCreate';
import Security from './components/admin_page/Security';


import Test from './test.jsx';
import Test2 from './test2.jsx';


import EvaluatorDashboard from './components/evaluator_page/EvaluatorDashboard';
import EvaluatorProfile from './components/evaluator_page/EvaluatorProfile';
import EvaluatorEvaluation from './components/evaluator_page/EvaluatorEvaluation';
import EvaluatorViewProfile from './components/evaluator_page/EvaluatorViewProfile';


import MentorDashboard from './components/mentor_page/MentorDashboard';
import MentorProfile from './components/mentor_page/MentorProfile';
import MentorEvaluation from './components/mentor_page/MentorEvaluation';
import MentorViewProfile from './components/mentor_page/MentorViewProfile';


import InternDashboard from './components/intern_page/InternDashboard';
import InternProfile from './components/intern_page/InternProfile';
import InternEvaluation from './components/intern_page/InternEvaluation';


import ManagerDashboard from './components/manager_page/ManagerDashboard';
import ManagerProfile from './components/manager_page/ManagerProfile';
import ManagerEvaluation from './components/manager_page/ManagerEvaluation';
import ManagerViewProfile from './components/manager_page/ManagerViewProfile';


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
        <Route path="/Test2" element={<Test2/>}> </Route>
        <Route path="/Search" element={<Search/>}> </Route>




            {/*---------------Admin Navigation-----------------*/}

            <Route path="/AD" element={<AdminDashboard/>}></Route>
            <Route path="/registration" element={<Registration />}></Route>
            <Route path="/cvmanagement" element={<CVManagement />}></Route>
            <Route path="/evaluation" element={<Evaluation />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/profilecreate" element={<ProfileCreate />}></Route>
            <Route path="/security" element={<Security />}></Route>





            {/*-------------Evaluator Navigation--------------*/}

            <Route path="/evaluatordashboard" element={<EvaluatorDashboard/>}></Route>
            <Route path="/evaluatorprofile" element={<EvaluatorProfile />}></Route>
            <Route path="/evaluatorevaluation" element={<EvaluatorEvaluation />}></Route>
            <Route path="/evaluatorviewprofile" element={<EvaluatorViewProfile />}></Route>
            <Route path="/security" element={<Security />}></Route>
            




            {/*---------------Mentor Navigation---------------*/}

            <Route path="/mentordashboard" element={<MentorDashboard/>}></Route>
            <Route path="/mentorprofile" element={<MentorProfile />}></Route>
            <Route path="/mentorevaluation" element={<MentorEvaluation />}></Route>
            <Route path="/mentorviewprofile" element={<MentorViewProfile />}></Route>
            <Route path="/security" element={<Security />}></Route>





            {/*---------------Intern Navigation---------------*/}

            <Route path="/interndashboard" element={<InternDashboard/>}></Route>
            <Route path="/internprofile" element={<InternProfile />}></Route>
            <Route path="/internevaluation" element={<InternEvaluation />}></Route>
            <Route path="/security" element={<Security />}></Route>





            {/*---------------Manager Navigation---------------*/}

            <Route path="/managerdashboard" element={<ManagerDashboard/>}></Route>
            <Route path="/managerprofile" element={<ManagerProfile />}></Route>
            <Route path="/managerevaluation" element={<ManagerEvaluation />}></Route>
            <Route path="/managerviewprofile" element={<ManagerViewProfile />}></Route>
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

