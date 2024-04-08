import React from 'react';
import AdminSidebar from '../../components/common/AdminSidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';

import EvaluationInternList from '../../components/EvaluationInternList/EvaluationInternList';
import EvaluationFormAdmin from '../../components/EvaluationFormNew/EvaluationFormAdmin';
import TempMentorTables from '../../components/EvaluationFormNew/TempMentorTables';

export default function Evalauation() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <AdminSidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
         <EvaluationInternList/>
      </Box>
      </Box>
      </>
  )}
