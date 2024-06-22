import React from 'react';
import Evaluatorsidebar from '../../components/common/Evaluatorsidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import Projectinternlistable from '../../components/project/projectinternlist';

 export default function EvaluatorviewInternDetails() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Evaluatorsidebar />
     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Projectinternlistable/>
     </Box>
      </Box>
      </>
  )}
