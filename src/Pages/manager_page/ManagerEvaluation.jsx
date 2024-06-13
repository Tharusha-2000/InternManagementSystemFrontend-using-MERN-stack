import React from 'react';
import Managersidebar from '../../components/common/Managersidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import { jwtDecode } from "jwt-decode";
import EvaluationInternListManager from '../../components/EvaluationInternList/EvaluationInternListManager';


export default function ManagerEvaluation() {

  const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

   if(userRole !== 'manager'){
      return null; // Do not render the component
    }
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Managersidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      
       <EvaluationInternListManager/>
      
      </Box>
      </Box>
      </>
  )}

