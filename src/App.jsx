
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link ,useNavigate } from 'react-router-dom';
import React,{ useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';


import Login from './components/login/Login';
import Addusertable from './components/adduser/Addusertable';
import Adduser from './components/adduser/Adduser';
//import Dashboard from './components/Dashboard';
//import Header from './components/common/Header';
import Fogetpassword from './components/login/Fogetpassword';
import Varify from './components/login/Varify';
import CreateNew from './components/login/CreateNew';
import Security from './components/common/Security.jsx';
import Profile from './components/common/Profile.jsx'


import AdminDashboard from './components/admin_page/AdminDashboard';
import Registration from './components/admin_page/Registration';
import CVupload from './components/admin_page/CVupload.jsx';
import Evaluation from './components/admin_page/Evaluation';
//import Profile from './components/admin_page/Profile';
import ProfileCreate from './components/admin_page/ProfileCreate';



import Test from './test.jsx';
import Test2 from './test2.jsx';
import Test3 from './Test3.jsx';


import EvaluatorDashboard from './components/evaluator_page/EvaluatorDashboard';
import EvaluatorEvaluation from './components/evaluator_page/EvaluatorEvaluation';
import EvaluatorViewProfile from './components/evaluator_page/EvaluatorViewProfile';



import MentorDashboard from './components/mentor_page/MentorDashboard';
import MentorEvaluation from './components/mentor_page/MentorEvaluation';
import MentorViewProfile from './components/mentor_page/MentorViewProfile';


import InternDashboard from './components/intern_page/InternDashboard';
import InternProfile from './components/intern_page/InternProfile';
import InternEvaluation from './components/intern_page/InternEvaluation';



import ManagerDashboard from './components/manager_page/ManagerDashboard';
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
        <Route path="/security" element={<Security />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
    

        <Route path="/Test" element={<Test/>}> </Route>
        <Route path="/Test2" element={<Test2/>}> </Route>
        <Route path="/Test3" element={<Test3/>}> </Route>
      




            {/*---------------Admin Navigation-----------------*/}

            <Route path="/AdminDashboard" element={<AdminDashboard/>}></Route>
            <Route path="/registration" element={<Registration />}></Route>
            <Route path="/cvupload" element={<CVupload/>}></Route>
            <Route path="/evaluation" element={<Evaluation />}></Route>
            
            <Route path="/profilecreate" element={<ProfileCreate />}></Route>
           





            {/*-------------Evaluator Navigation--------------*/}

            <Route path="/evaluatordashboard" element={<EvaluatorDashboard/>}></Route>
            <Route path="/evaluatorevaluation" element={<EvaluatorEvaluation />}></Route>
            <Route path="/evaluatorviewprofile" element={<EvaluatorViewProfile />}></Route>
          
            




            {/*---------------Mentor Navigation---------------*/}

            <Route path="/mentordashboard" element={<MentorDashboard/>}></Route>
            <Route path="/mentorevaluation" element={<MentorEvaluation />}></Route>
            <Route path="/mentorviewprofile" element={<MentorViewProfile />}></Route>
          





            {/*---------------Intern Navigation---------------*/}

            <Route path="/interndashboard" element={<InternDashboard/>}></Route>
            <Route path="/internprofile" element={<InternProfile />}></Route>
            <Route path="/internevaluation" element={<InternEvaluation />}></Route>
            <Route path="/interntable" element={<Interntable/>}></Route>





            {/*---------------Manager Navigation---------------*/}

            <Route path="/managerdashboard" element={<ManagerDashboard/>}></Route>
            <Route path="/managerevaluation" element={<ManagerEvaluation />}></Route>
            <Route path="/managerviewprofile" element={<ManagerViewProfile />}></Route>
            

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
        navigate('/Login');
      } else {
        setUsers(decodedToken);
      }
    }
  }, [navigate, setUsers]);

  return null;
}

export default App;

