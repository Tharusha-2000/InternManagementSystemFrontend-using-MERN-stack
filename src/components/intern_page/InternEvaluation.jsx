import React from 'react';
import Internsidebar from '../common/Internsidebar';
import Header from '../common/Header';
import Box from '@mui/material/Box';


export default function InternEvaluation() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Internsidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <h1>intern evaluation </h1>
      </Box>
      </Box>
      </>
  )}

