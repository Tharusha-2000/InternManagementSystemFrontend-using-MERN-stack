import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import AdminDashboard from '../admin_page/AdminDashboard';
import Registration from '../admin_page/Registration';
import CVManagement from '../admin_page/CVManagement';
import Evaluation from '../admin_page/Evaluation';
import Profile from '../admin_page/Profile';
import ProfileCreate from '../admin_page/ProfileCreate';
import Security from '../admin_page/Security';

//import Sibebar from './admin_page/Sidebar';


function HS() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/AD" element={<AdminDashboard/>}></Route>
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

export default HS






















/*
import { useState } from 'react'
import './HS.css'
import Header from './Header'
import Sidebar from './admin_page/Sidebar'
import HomeNav from './HomeNav'
import { BrowserRouter, Routes, Route } from "react-router-dom"
//import Intern from "./intern_page/Intern"


function HS() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <BrowserRouter>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      
  
      <div>
        <Routes>
        <Route path="/" element={<HomeNav/>}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/evaluation" element={<Evaluation />}></Route>
        <Route path="/profilecreate" element={<ProfileCreate />}></Route>
        <Route path="/cvmanagement" element={<CVManagement />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Security" element={<Security />}></Route>
        
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default HS

function Dashboard(){
  return <h2>Dashboard</h2>
}

function Registration(){
  return <h2>Register page</h2>
}

function Evaluation(){
  return <h2>Evaluation page</h2>
}

function ProfileCreate(){
  return <h2>Profile creation</h2>
}

function CVManagement(){
  return <h2>CV Manageemnt</h2>
}

function Profile(){
  return <h2>Profile page</h2>
}

function Security(){
  return <h2>Security page</h2>
}




import { useState } from 'react'
import './HS.css'
import Header from './Header'
import Sidebar from './Sidebar'



function HS() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    </div>
  )
}

export default HS
*/