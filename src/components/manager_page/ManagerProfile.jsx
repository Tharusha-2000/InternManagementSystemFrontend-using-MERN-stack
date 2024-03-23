import React from 'react';
import Managersidebar from '../common/Managersidebar';
import Header from '../common/Header';
import Box from '@mui/material/Box';


export default function ManagerProfile() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Managersidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <h1>manager profile </h1>
      </Box>
      </Box>
      </>
  )}

