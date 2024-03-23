import React from 'react';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import Box from '@mui/material/Box';
import Addusertable from '../adduser/Addusertable'
import EvaluationInternList from '../EvaluationInternList/EvaluationInternList';

export default function Evalauation() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Sidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
         <EvaluationInternList/>
      </Box>
      </Box>
      </>
  )}
