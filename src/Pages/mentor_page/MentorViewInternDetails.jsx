import React from 'react';
import Mentorsidebar from '../../components/common/Mentorsidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import Projectinternlistable from '../../components/project/projectinternlist';
export default function MentorViewProfile() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Mentorsidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Projectinternlistable/>
      </Box>
      </Box>
      </>
  )}
