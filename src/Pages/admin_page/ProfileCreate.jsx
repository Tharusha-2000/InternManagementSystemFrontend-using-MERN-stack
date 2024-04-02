import React from 'react';
import AdminSidebar from '../../components/common/AdminSidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';



export default function ProfileCreate() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <AdminSidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <h1>ProfileCreate</h1>
      </Box>
      </Box>
      </>
  )}
