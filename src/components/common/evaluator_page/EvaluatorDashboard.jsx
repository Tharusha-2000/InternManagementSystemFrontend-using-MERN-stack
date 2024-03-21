import React from 'react';
import Evaluatorsidebar from './Evaluatorsidebar';
import Header from '../Header';
import Box from '@mui/material/Box';


export default function EvaluatorDashboard() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Evaluatorsidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <h1>evalu tr dashboard </h1>
      </Box>
      </Box>
      </>
  )}