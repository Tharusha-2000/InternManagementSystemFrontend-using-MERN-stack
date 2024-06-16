import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from '@mui/material';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EvaluationFormManager from '../EvaluationFormNew/EvaluationFormManager';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import { BASE_URL } from '../../config';



function EvaluationInternListManager() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvaluationFormDetails, setSelectedEvaluationFormDetails] = useState(null); // New state
  const [mentor, setMentor] = useState(null);
  const token = localStorage.getItem("token");
  const [filteredRows, setFilteredRows] = useState([]); // Add this state variable


  useEffect(() => {
    const fetchInternDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}getInternsForManager`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setRows(response.data);
        setFilteredRows(response.data); // Initialize filteredRows with all data
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
  // Add this function to handle the search functionality
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = rows.filter(intern => 
      intern.fname.toLowerCase().includes(searchTerm) || 
      intern.lname.toLowerCase().includes(searchTerm) // Assuming you want to search by first or last name
    );
    setFilteredRows(filtered); // Update filteredRows based on search
  };

  return (
    <div>
     

      <Typography variant="h4" gutterBottom align="center">
        All Evaluations
      </Typography>
      <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical"/>
      <Grid sx={{ justifyContent: "space-between", mb: 4, display: "flex", alignItems: "center" }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100vh",
          borderRadius: "20px",
          boxShadow: 3,
          marginLeft: "1%",
        }}
      >
        <InputBase type="text" onChange={handleSearch}  sx={{ ml: 2, flex: 1 }} placeholder="Search Interns" />
        <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Grid>
      <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: "bold", fontSize: "1em" }}>Intern Name</TableCell>
        <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "1em" }}>Evaluator Name</TableCell>
        <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "1em" }}>Mentor Name</TableCell>
        <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "1em" }}>Evaluations</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {filteredRows.map((row) => (
        <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row" sx={{ fontSize: "1em" }}>
            {row.fname + ' ' + row.lname}
          </TableCell>
          <TableCell align="right" sx={{ fontSize: "1em" }}>
            {row.evaluationFormDetails.evaluator}
          </TableCell>
          <TableCell align="right" sx={{ fontSize: "1em" }}>
            {row.mentor}
          </TableCell>
          <TableCell align="right">
            <IconButton onClick={() => handleClickOpen(row)} sx={{ fontSize: "1em" }}>
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