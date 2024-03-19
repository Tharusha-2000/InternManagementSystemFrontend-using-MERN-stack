import React from 'react';
import Sidebar from './Sidebar';
import Header from '../Header';
import Box from '@mui/material/Box';


export default function Evalauation() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Sidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <h1>Evaluation</h1>
      </Box>
      </Box>
      </>
  )}
