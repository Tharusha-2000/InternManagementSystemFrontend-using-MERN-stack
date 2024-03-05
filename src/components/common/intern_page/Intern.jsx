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
        <Route path="/interndashboard" element={<InternDashboard />}></Route>
        <Route path="/internevaluation" element={<InternEvaluation />}></Route>
        <Route path="/internviewprofile" element={<InternViewProfile />}></Route>
        <Route path="/security" element={<Security />}></Route>
        
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default Intern









function Security(){
  return <h2>Intern Security page</h2>
}