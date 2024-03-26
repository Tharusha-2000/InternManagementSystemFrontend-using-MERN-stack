import React from 'react';
import Mentorsidebar from '../common/Mentorsidebar';
import Header from '../common/Header';
import Box from '@mui/material/Box';


export default function MentorViewProfile() {
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Mentorsidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <h1>mentor vp </h1>
      </Box>
      </Box>
      </>
  )}
