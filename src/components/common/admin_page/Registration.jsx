import React from 'react';
import Sidebar from './Sidebar';
import Header from '../Header';
import Box from '@mui/material/Box';
import Adduser from '../../adduser/Adduser'



export default function Registration() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Sidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <Adduser />
      </Box>
      </Box>
      </>
  )}
