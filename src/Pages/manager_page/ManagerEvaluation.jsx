import React from 'react';
import Managersidebar from '../../components/common/Managersidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import EvaluationInternListManager from '../../components/EvaluationInternList/EvaluationInternListManager';


export default function ManagerEvaluation() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Managersidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      
       <EvaluationInternListManager/>
      
      </Box>
      </Box>
      </>
  )}

