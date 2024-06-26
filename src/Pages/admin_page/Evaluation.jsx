import React from 'react';
import AdminSidebar from '../../components/common/AdminSidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import EvaluationInternList from '../../components/EvaluationInternList/EvaluationInternList';



export default function Evalauation() {
  return (
    <>
    <Grid > 
   <Grid item xs={12} sm={6} md={4}>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <AdminSidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
         <EvaluationInternList/>
      </Box>
      </Box>
      </Grid>
      </Grid>
      </>
      
  )}