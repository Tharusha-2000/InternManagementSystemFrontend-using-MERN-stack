import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/login/Login';
import Addusertable from './components/adduser/Addusertable';
import Adduser from './components/adduser/Adduser';
//import Dashboard from './components/Dashboard';
import PrimaryNavBar from './components/common/PrimaryNavBar';


function App() {
  return (
   <BrowserRouter>
     <Routes>
        <Route path="/p" element={<Login />} > </Route>
        <Route path="/Addusertable" element={<Addusertable />}> </Route>
        <Route path="/Adduser" element={<Adduser />}> </Route>
        <Route path="/" element={<PrimaryNavBar/>}> </Route>

     </Routes>
   </BrowserRouter>

  );
}

export default App;

