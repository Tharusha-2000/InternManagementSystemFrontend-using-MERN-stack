import React, { useState } from 'react';
import AdminSidebar from '../../components/common/AdminSidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InternCvList from '../../components/CVuploadFiles/InternCvList';

export default function CVupload() {


  return (
    <Grid > 
   <Grid item xs={12} sm={6} md={4}>
    
      <Header />
      <Box height={80} />
        <Box sx={{ display: 'flex' }}>
          <AdminSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <InternCvList />
        </Box>
      </Box>
      </Grid>
      </Grid>
  
  )}
