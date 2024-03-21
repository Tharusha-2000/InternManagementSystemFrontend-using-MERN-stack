import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import AdminDashboard from './admin_page/AdminDashboard';
import Registration from './admin_page/Registration';
import CVManagement from './admin_page/CVManagement';
import Evaluation from './admin_page/Evaluation';
import Profile from './admin_page/Profile';
import ProfileCreate from './admin_page/ProfileCreate';
import Security from './admin_page/Security';



//import Sibebar from './admin_page/Sidebar';


function Evaluator() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/evaluatordashboard" element={<EvaluatorDashboard/>}></Route>
            <Route path="/registration" element={<Registration />}></Route>
            <Route path="/cvmanagement" element={<CVManagement />}></Route>
            <Route path="/evaluation" element={<Evaluation />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/profilecreate" element={<ProfileCreate />}></Route>
            <Route path="/security" element={<Security />}></Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default Evaluator