import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EvaluationFormManager from '../EvaluationFormNew/EvaluationFormManager';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';



function EvaluationInternListManager() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvaluationFormDetails, setSelectedEvaluationFormDetails] = useState(null); // New state
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const fetchInternDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8900/api/users/getInternsForManager');
        setRows(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInternDetails();
  }, []);

  const handleClickOpen = (row) => { 
    setSelectedEvaluationFormDetails(row.evaluationFormDetails);
    setMentor(row.mentor); 
    setOpen(true);
};

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Evaluated intern list</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Intern Name</TableCell>
              <TableCell align="right">Evaluator Name</TableCell>
              <TableCell align="right">Mentor Name</TableCell>
              <TableCell align="right">Evaluations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.fname + ' ' + row.lname}
                </TableCell>
                <TableCell align="right">
                  {row.evaluationFormDetails.evaluator}
                </TableCell>
                <TableCell align="right">
                  {row.mentor}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleClickOpen(row)}> {/* Updated line */}
                    <AssignmentIndIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
  <DialogTitle>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <div> {/* Placeholder for the title, if any */}
      </div>
      <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
        <CloseIcon />
      </IconButton>
    </Box>
  </DialogTitle>
  <DialogContent>
    <EvaluationFormManager evaluationFormDetails={selectedEvaluationFormDetails} mentor={mentor} />
  </DialogContent>
</Dialog>
    </div>
  );
}

export default EvaluationInternListManager;