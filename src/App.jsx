
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link ,useNavigate } from 'react-router-dom';
import React,{ useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import './App.css';
import { UserProvider } from './components/Contexts/UserContext.jsx';


import Login from './components/login/Login';
import Addusertable from './components/adduser/Addusertable';
import Adduser from './components/adduser/Adduser';
import Fogetpassword from './components/login/Fogetpassword';
import Varify from './components/login/Varify';
import CreateNew from './components/login/CreateNew';
import Security from './components/common/Security.jsx';
import Profile from './components/common/Profile.jsx';


import AdminDashboard from './Pages/admin_page/AdminDashboard';
import Registration from './Pages/admin_page/Registration';
import CVupload from './Pages/admin_page/CVupload.jsx';
import Evaluation from './Pages/admin_page/Evaluation';
import ProfileCreate from './Pages/admin_page/ProfileCreate';
import ShowTask from './Pages/admin_page/ShowTask.jsx';



import Interntable from './components/interntable/interntable.jsx';
import Intern from './components/interntable/intern.jsx';
import Project from './components/project/project.jsx';
import Projectinternlist from './components/project/projectinternlist.jsx';




import EvaluatorDashboard from './Pages/evaluator_page/EvaluatorDashboard';
import EvaluatorEvaluation from './Pages/evaluator_page/EvaluatorEvaluation';
import EvaluatorviewInternDetails from './Pages/evaluator_page/EvaluatorviewInternDetails.jsx';



import MentorDashboard from './Pages/mentor_page/MentorDashboard';
import MentorEvaluation from './Pages/mentor_page/MentorEvaluation';
import MentorViewInternDetails from './Pages/mentor_page/MentorViewInternDetails.jsx';
import MentorTaskApprove from './Pages/mentor_page/MentorTaskApprove';

import InternDashboard from './Pages/intern_page/InternDashboard';
import InternProfile from './Pages/intern_page/InternProfile';
import InternEvaluation from './Pages/intern_page/InternEvaluation';
import InternProjectTask from './Pages/intern_page/InternProjectTask';


import ManagerDashboard from './Pages/manager_page/ManagerDashboard';
import ManagerEvaluation from './Pages/manager_page/ManagerEvaluation';
import ManagerViewInternDetails  from './Pages/manager_page/ManagerViewInternDetails.jsx';

function App() {
  const [user,setUsers] = useState();  

  return (

<UserProvider>
  <BrowserRouter>
   
      <TokenCheck setUsers={setUsers} />
      <Routes>
        <Route path="/" element={<Login setUsers={setUsers}/>} > </Route>

        <Route path="/Addusertable" element={<Addusertable />}> </Route>
        <Route path="/Adduser" element={<Adduser />}> </Route>
        <Route path="/Forgetpassword" element={<Fogetpassword/>}> </Route>
        <Route path="/CreateNew" element={<CreateNew/>}> </Route>
        <Route path="/Varify" element={<Varify/>}> </Route>
        <Route path="/security" element={<Security />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        
       
        <Route path="/interntable" element={<Interntable/>}> </Route>
        <Route path="/intern" element={<Intern/>}> </Route>
        <Route path="/project" element={<Project/>}> </Route>
        <Route path="/projectinternlist" element={<Projectinternlist/>}> </Route>
        
     
        
     
      




            {/*---------------Admin Navigation-----------------*/}

            <Route path="/AdminDashboard" element={<AdminDashboard/>}></Route>
            <Route path="/registration" element={<Registration />}></Route>

             <Route path="/cvupload" element={<CVupload/>}></Route> 

            <Route path="/evaluation" element={<Evaluation />}></Route>
            
            <Route path="/profilecreate" element={<ProfileCreate />}></Route>
            <Route path="/showInternTask" element={<ShowTask/>}></Route>
            





            {/*-------------Evaluator Navigation--------------*/}

            <Route path="/evaluatordashboard" element={<EvaluatorDashboard/>}></Route>
            <Route path="/evaluatorevaluation" element={<EvaluatorEvaluation />}></Route>
            <Route path="/evaluatorviewInternDetails" element={<EvaluatorviewInternDetails />}></Route>
          
            




            {/*---------------Mentor Navigation---------------*/}

            <Route path="/mentordashboard" element={<MentorDashboard/>}></Route>
            <Route path="/mentorevaluation" element={<MentorEvaluation />}></Route>
            <Route path="/mentorviewInternDetails" element={<MentorViewInternDetails />}></Route>
            <Route path="/mentortaskApprove" element={<MentorTaskApprove />}></Route>





            {/*---------------Intern Navigation---------------*/}

            <Route path="/interndashboard" element={<InternDashboard/>}></Route>
            <Route path="/internprofile" element={<InternProfile />}></Route>
            <Route path="/internevaluation" element={<InternEvaluation />}></Route>
            <Route path="/internprojectTask" element={<InternProjectTask />}></Route>





            {/*---------------Manager Navigation---------------*/}

            <Route path="/managerdashboard" element={<ManagerDashboard/>}></Route>
            <Route path="/managerevaluation" element={<ManagerEvaluation />}></Route>
            <Route path="/managerviewInternDetails" element={<ManagerViewInternDetails />}></Route>
            

        </Routes>

   </BrowserRouter>  
  </UserProvider>  
  
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
        navigate('/');
      } else {
        setUsers(decodedToken);
      }
    }
  }, [navigate, setUsers]);

  return null;
}

export default App;

