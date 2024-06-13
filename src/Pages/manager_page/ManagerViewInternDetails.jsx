import React from 'react';
import Managersidebar from '../../components/common/Managersidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import Projectinternlistable from '../../components/project/projectinternlist';

export default function ManagerViewProfile() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Managersidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <Projectinternlistable/>
      </Box>
      </Box>
      </>
  )}

