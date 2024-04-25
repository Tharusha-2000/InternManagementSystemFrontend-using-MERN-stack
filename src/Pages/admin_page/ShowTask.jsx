import React from 'react';
import AdminSidebar from '../../components/common/AdminSidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import InternTable from '../../components/project/projectinternlist';



export default function ShowTask() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <AdminSidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <InternTable/>
      
      </Box>
      </Box>
      </>
  )}