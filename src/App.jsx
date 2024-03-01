import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/login/Login';
import Addusertable from './components/adduser/Addusertable';
import Adduser from './components/adduser/Adduser';
//import Dashboard from './components/Dashboard';
import Header from './components/common/Header';

import HS from './components/common/HS';
import Internprofile from './components/internprofile/Internprofile';


function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} > </Route>
        <Route path="/Internprofile" element={<Internprofile/>}> </Route>
        <Route path="/Addusertable" element={<Addusertable />}> </Route>
        <Route path="/Adduser" element={<Adduser />}> </Route>
        <Route path="/HS" element={<HS/>}> </Route>
        <Route path="/HS/Addusertable" element={<Addusertable/>}> </Route>
      </Routes>
   </BrowserRouter>

  );
}

export default App;

