import React from 'react';
import Evaluatorsidebar from '../../components/common/Evaluatorsidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import EvaluationinternListEvaluator from '../../components/EvaluationInternList/EvaluationinternListEvaluator';


export default function EvaluatorEvaluation() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Evaluatorsidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <EvaluationinternListEvaluator/>
      </Box>
      </Box>
      </>
  )}