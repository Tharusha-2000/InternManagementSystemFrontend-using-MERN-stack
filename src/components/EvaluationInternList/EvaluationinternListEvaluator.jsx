import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install this package
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { KJUR } from 'jsrsasign'; // Make sure to install this package
import { jwtDecode } from "jwt-decode";


function EvaluationinternListEvaluator() {
  const [rows, setRows] = useState([]); // Store the interns data here
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  if (userRole !== 'evaluator') {
    return null; // Do not render the component
  }

  useEffect(() => {
    const fetchInternDetails = async () => {
      try {
       // const token = localStorage.getItem("token"); // 'token' is the key you're using to store the JWT
        const decoded = KJUR.jws.JWS.parse(token);
        const userId = decoded.payloadObj.id; // replace 'id' with the property that holds the user ID in your JWT payload
  
        const response = await axios.get(
          `http://localhost:8900/api/users/getInternsByEvaluator/${userId}`
        );
        console.log(response.data);
        setRows(response.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchInternDetails();
  }, []);



  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Intern Name</TableCell>
              <TableCell align="center">Evaluate Before</TableCell>
              <TableCell align="center">Evaluation Form</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">
  {new Date(row.evaluate_before).toISOString().substring(0, 10)}
</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default EvaluationinternListEvaluator;