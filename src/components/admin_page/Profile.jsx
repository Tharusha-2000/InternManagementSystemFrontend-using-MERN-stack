import React from 'react';
import AdminSidebar from '../common/AdminSidebar';
import Header from '../common/Header';
import Box from '@mui/material/Box';




export default function Profile() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <AdminSidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <h1>Profile</h1>
      </Box>
      </Box>
      </>
  )}
