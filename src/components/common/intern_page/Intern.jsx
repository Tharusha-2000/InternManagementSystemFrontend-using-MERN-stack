import { useState } from 'react'
import '../HS.css'
import Header from '../Header'
import Internsidebar from './Internsidebar'
import Home from '../Home'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function Intern() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <BrowserRouter>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Internsidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
      
      <div>
        <Routes>
        <Route path="/interndashboard" element={<Dashboard />}></Route>
        <Route path="/evaluation" element={<Evaluation />}></Route>
        <Route path="/viewrofile" element={<ViewProfile />}></Route>
        <Route path="/security" element={<Security />}></Route>
        
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default Intern

function Dashboard(){
  return <h2>This is intern Dashboard</h2>
}


function Evaluation(){
  return <h2>Intern evaluation</h2>
}


function ViewProfile(){
  return <h2>Intern Profile page</h2>
}

function Security(){
  return <h2>Intern Security page</h2>
}