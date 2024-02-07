import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Addusertable from './components/Addusertable';
import Adduser from './components/Adduser';
import EvaluationFormNew from './components/EvaluationFormNew/EvaluationFormNew';


function App() {
  return (
    <div>
   <BrowserRouter>
     <Routes>
        <Route path="/" element={<Login />} > </Route>
        <Route path="/Addusertable" element={<Addusertable />}> </Route>
        <Route path="/Adduser" element={<Adduser />}> </Route>
       

     </Routes>
   </BrowserRouter>
  
    <EvaluationFormNew></EvaluationFormNew>
    </div>
  );
}

export default App;

