

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
        <Route path="/" element={<AdminDashboard />}></Route>
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