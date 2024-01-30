import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Addusertable from './components/Addusertable';
import Adduser from './components/Adduser';


function App() {
  return (
   <BrowserRouter>
     <Routes>
        <Route path="/" element={<Login />} > </Route>
        <Route path="/Addusertable" element={<Addusertable />}> </Route>
        <Route path="/Adduser" element={<Adduser />}> </Route>
     </Routes>
   </BrowserRouter>
  );
}

export default App;

