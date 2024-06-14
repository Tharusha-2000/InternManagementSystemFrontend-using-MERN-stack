import React from 'react';
import Mentorsidebar from '../../components/common/Mentorsidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import EvaluationinternListMentor from '../../components/EvaluationInternList/EvaluationinternListMentor';
import EvaluationFormMentor from '../../components/EvaluationFormNew/EvaluationFormMentor';


export default function MentorEvaluation() {
  
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Mentorsidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <>
       <EvaluationinternListMentor/>
      </>
      </Box>
      </Box>
      </>
  )}