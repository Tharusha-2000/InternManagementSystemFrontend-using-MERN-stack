import { useState } from 'react'
import '../HS.css'
import Header from '../Header'
import Evaluatorsidebar from './Evaluatorsidebar'
import Home from '../Home'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function Evaluator() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <BrowserRouter>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Evaluatorsidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
      
      <div>
        <Routes>
        <Route path="/evaluatordashboard" element={<Dashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/viewrofile" element={<ViewProfile />}></Route>
        <Route path="/security" element={<Security />}></Route>
        
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default Evaluator

function Dashboard(){
  return <h2>This is evlauator Dashboard</h2>
}


function Profile(){
  return <h2>Evaluator profile</h2>
}


function ViewProfile(){
  return <h2>Evaluator Profile page</h2>
}

function Security(){
  return <h2> Security page</h2>
}