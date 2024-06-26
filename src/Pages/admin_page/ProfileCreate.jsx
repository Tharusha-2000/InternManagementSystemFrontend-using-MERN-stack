import React from 'react';
import AdminSidebar from '../../components/common/AdminSidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import InternTable from '../../components/interntable/interntable';
import Grid from '@mui/material/Grid';

export default function ProfileCreate() {
  return (
    <>
    <Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <AdminSidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
         <InternTable />
      </Box>
      </Box>
      </Grid>
      </Grid>
      </>
  )}
