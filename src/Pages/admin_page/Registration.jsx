import React from 'react';
import AdminSidebar from '../../components/common/AdminSidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';

//import Adduser from '../adduser/Adduser';
import Addusertable from '../../components/adduser/Addusertable';



export default function Registration() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <AdminSidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
         <Addusertable/>
      
      </Box>
      </Box>
      </>
  )}
