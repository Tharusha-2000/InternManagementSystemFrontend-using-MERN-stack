import React, { useState } from 'react';
import AdminSidebar from '../../components/common/AdminSidebar';
import Header from '../../components/common/Header';
import '../../index.css';
import Box from '@mui/material/Box';
import InternCvList from './CVuploadFiles/InternCvList';
import UploadStatusContext from './CVuploadFiles/UploadStatusContext';

export default function CVupload() {
  const [uploadStatus, setUploadStatus] = useState('pending');

  return (
    <UploadStatusContext.Provider value={{ uploadStatus, setUploadStatus }}>
    <div className="bgcolor">
      <Header />
      <Box height={80} />
        <Box sx={{ display: 'flex' }}>
          <AdminSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <InternCvList />
        </Box>
      </Box>
    </div>
    </UploadStatusContext.Provider>
  )}
