import React from 'react';
import Mentorsidebar from '../../components/common/Mentorsidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import InternTable from '../../components/project/projectinternlist';
export default function MentorViewProfile() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Mentorsidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <InternTable/>
      </Box>
      </Box>
      </>
  )}
