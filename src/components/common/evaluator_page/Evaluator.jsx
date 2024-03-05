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
        <Route path="/evaluatordashboard" element={<EvaluatorDashboard />}></Route>
        <Route path="/evaluatorprofile" element={<EvaluatorProfile />}></Route>
        <Route path="/evaluatorviewprofile" element={<EvaluatorViewProfile />}></Route>
        <Route path="/security" element={<Security />}></Route>
        
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default Evaluator






function Security(){
  return <h2> Security page</h2>
}