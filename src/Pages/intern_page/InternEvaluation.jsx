import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Internsidebar from '../../components/common/Internsidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InternPdf from '../../components/EvaluationFormNew/InternPdf';
import { BASE_URL } from '../../config';
import { KJUR } from 'jsrsasign';

export default function InternEvaluation() {
  const [isEvaluated, setIsEvaluated] = useState(false);

useEffect(() => {
  const fetchEvaluationStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = KJUR.jws.JWS.parse(token);
        const userId = decoded.payloadObj.id;
        console.log(userId);


        const response = await axios.get(`${BASE_URL}getCommentsById`, {

          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIsEvaluated(response.data.isEvaluated);
      }
    } catch (error) {
      console.error('Error fetching evaluation status:', error);
    }
  };

  fetchEvaluationStatus();
}, []);
  return (
    <>
      <Header />
      <Box height={60} />
      <Box sx={{ display: 'flex' }}>
        <Internsidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {isEvaluated ? <InternPdf /> : <div><Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Evaluation Pending
          </Typography>
          <Typography variant="body1">
            Your evaluation has not yet been completed. Please check back later.
          </Typography>
        </CardContent>
      </Card>
    </Box></div>}
        </Box>
      </Box>
    </>
  );

}

