

import { useState } from 'react'
import './HS.css'
import Header from './Header'
import Sidebar from './admin_page/Sidebar'
import Home from './Home'
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
      <Home />
  
      <div>
        <Routes>
        <Route path="/" element={<Dashboard />}></Route>
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



/*
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