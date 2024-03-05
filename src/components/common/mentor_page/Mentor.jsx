import { useState } from 'react'
import '../../HS.css'
import Header from '../Header'
import Mentorsidebar from './Mentorsidebar'
import Home from '../Home'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function Mentor() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <BrowserRouter>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Mentorsidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
      
      <div>
        <Routes>
        <Route path="/mentordashboard" element={<MentorDashboard />}></Route>
        <Route path="/mentorprofile" element={<MentorProfile />}></Route>
        <Route path="/mentorviewprofile" element={<MentorViewProfile />}></Route>
        <Route path="/security" element={<Security />}></Route>
        
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default Mentor









function Security(){
  return <h2> Security page</h2>
}