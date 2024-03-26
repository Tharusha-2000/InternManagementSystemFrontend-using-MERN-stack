import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Adminsidebar from './AdminSidebar';
import Internsidebar from './Internsidebar';
import Managersidebar from './Managersidebar';
import Mentorsidebar from './Mentorsidebar';
import Evaluatorsidebar from './Evaluatorsidebar';
import Header from './Header';
import Box from '@mui/material/Box';
import Secure from '../Security/Secure';
export default function Security() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, []);

  const getSidebar = () => {
    switch (role) {
      case 'admin':
        return <Adminsidebar />;
      case 'intern':
        return <Internsidebar />;
      case 'mentor':
        return <Mentorsidebar />;
      case 'evaluator':
        return <Evaluatorsidebar />;
      case 'manager':
        return <Managersidebar />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <Box height={60} />
      <Box sx={{ display: 'flex' }}>
        {getSidebar()}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Secure/>
        </Box>
      </Box>
    </>
  );
}