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
import IconButton from "@mui/material/IconButton";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import EvaluationFormEvaluator from "../EvaluationFormNew/EvaluationFormEvaluator";
import { BASE_URL } from '../../config';

function EvaluationinternListEvaluator() {
  const [rows, setRows] = useState([]); // Store the interns data here
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [open, setOpen] = useState(false); // State to control the dialog
  const [selectedIntern, setSelectedIntern] = useState(null); // Add this state variable
  const [refreshKey, setRefreshKey] = useState(0);
  
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
          `${BASE_URL}getInternsByEvaluator/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log(response.data);
        setRows(response.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchInternDetails();
  }, [refreshKey]);

  const handleClickOpen = (row) => {
    if (row.isEvaluated) {
      alert('You already have filled the form');
    } else {
      setSelectedIntern(row);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
<TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>Intern Name</TableCell>
        <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }} align="center">Evaluate Before</TableCell>
        <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }} align="center">Evaluation Form</TableCell>
        <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }} align="center">Status</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell component="th" scope="row" sx={{ fontSize: "1rem" }}>{row.name}</TableCell>
          <TableCell align="center" sx={{ fontSize: "1rem" }}>{new Date(row.evaluate_before).toISOString().substring(0, 10)}</TableCell>
          <TableCell align="center" sx={{ fontSize: "1rem" }}>
            <IconButton onClick={() => handleClickOpen(row)}>
              <AssignmentIndIcon />
            </IconButton>
          </TableCell>
          <TableCell align="center" sx={{ fontSize: "1rem" }}>{row.isEvaluated ? "Evaluated" : "Not Evaluated"}</TableCell>
        </TableRow>
      ))}
    </TableBody>

          <Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="form-dialog-title"
  fullWidth={true}
  maxWidth="md" // 'md' is for medium. You can also use 'sm', 'lg', 'xl', 'xs' or 'false'
>
  <DialogTitle id="form-dialog-title">Evaluation Form</DialogTitle>
  <DialogContent>
    {selectedIntern && (
      <EvaluationFormEvaluator
        internId={selectedIntern.evaluationFormDetailsId}
        internName={selectedIntern.name}
        jobPerformanceCriteriasEvaluator={selectedIntern.job_performance_criterias_evaluator}
        coreValuesCriteriasEvaluator={selectedIntern.core_values_criterias_evaluator}
        handleClose={handleClose}
        setRefreshKey={setRefreshKey}
      />
    )}
  </DialogContent>
</Dialog>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EvaluationinternListEvaluator;
