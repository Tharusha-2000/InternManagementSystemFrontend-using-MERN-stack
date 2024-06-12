import React from 'react';
import Evaluatorsidebar from '../../components/common/Evaluatorsidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import { jwtDecode } from "jwt-decode";

export default function EvaluatorDashboard() {
  
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  if (userRole !== 'evaluator') {
    return null; // Do not render the component
  }


  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Evaluatorsidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <h1>evaluatr dashboard </h1>
      </Box>
      </Box>
      </>
  )}