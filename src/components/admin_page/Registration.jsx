import React from 'react';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import Box from '@mui/material/Box';

//import Adduser from '../adduser/Adduser';
import Addusertable from '../adduser/Addusertable';



export default function Registration() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Sidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
         <Addusertable/>
      
      </Box>
      </Box>
      </>
  )}
