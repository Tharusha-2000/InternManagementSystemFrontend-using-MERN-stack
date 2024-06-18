import React from 'react';
import Internsidebar from '../../components/common/Internsidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import { jwtDecode } from "jwt-decode";

export default function InternDashboard() {

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  if (userRole !== 'intern') {
    return null; // Do not render the component
  }

  return (
    <>
    <Header />
    <Box height={60} />
     <Box sx={{ display: 'flex' }}>
      <Internsidebar />
     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       




    </Box>
    </Box>
      </>
  )}
