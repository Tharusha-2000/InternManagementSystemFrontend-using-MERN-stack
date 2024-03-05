import { useState } from 'react'
import '../HS.css'
import Header from '../Header'
import Mentorsidebar from './Mentorsidebar'
import Home from '../Home'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function Manager() {
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
        <Route path="/managerdashboard" element={<ManagerDashboard />}></Route>
        <Route path="/managerprofile" element={<ManagerProfile />}></Route>
        <Route path="/managerviewprofile" element={<ManagerViewProfile />}></Route>
        <Route path="/security" element={<Security />}></Route>
        
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default Manager









function Security(){
  return <h2> Security page</h2>
}