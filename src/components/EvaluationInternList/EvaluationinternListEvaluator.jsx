import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { KJUR } from 'jsrsasign';
import { jwtDecode } from "jwt-decode";
import IconButton from '@mui/material/IconButton';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EvaluationFormEvaluator from '../EvaluationFormNew/EvaluationFormEvaluator';
import { BASE_URL } from '../../config';
import Swal from 'sweetalert2';
import { Avatar, Box, Button } from '@mui/material';

function EvaluationinternListEvaluator() {
  const [rows, setRows] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [open, setOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  if (userRole !== 'evaluator') {
    return null;
  }

  useEffect(() => {
    const fetchInternDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = KJUR.jws.JWS.parse(token);
        const userId = decoded.payloadObj.id;

        const response = await axios.get(`${BASE_URL}getInternsByEvaluator`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setRows(response.data);
        setFilteredData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInternDetails();
  }, [refreshKey]);

  const handleClickOpen = (row) => {
    setSelectedIntern(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = rows.filter((intern) =>
      intern.name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  return (
    <Grid container spacing={1}>
    <Grid item xs={12} >

      <Paper style={{ maxWidth: "100%", overflow: "auto" }}>
      <Typography variant="h4" gutterBottom align="center" 
      sx={{
        color: 'rgba(0, 0, 102, 0.8)', 
        fontWeight: 'bold', 
        marginBottom: '2px', 
        paddingTop: '10px', 
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
      }}>
        All Evaluations
      </Typography>
        <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical" />
        <Grid
          sx={{
            justifyContent: 'space-between',
            mb: 4,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100vh',
              borderRadius: '20px',
              boxShadow: 3,
              marginLeft: '1%',
            }}
          >
            <InputBase
              type="text"
              onChange={handleSearch}
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search Interns"
            />
            <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>

        {filteredData.length === 0 ? (
         <Box
         display="flex"
         justifyContent="center"
         alignItems="center"
         height="65vh"
     
       >
         <Card>
           <CardContent>
             <Typography variant="h5" component="h2" gutterBottom>
               No Evaluations
             </Typography>
             <Typography variant="body1">
             You have no assigned evaluations yet. Please check back later for any updates.
             </Typography>
           </CardContent>
         </Card>
       </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1em",
                      backgroundColor: "rgba(0, 0, 102, 0.8)",
                      color: "#fff"
                    }}
                  >
                    Intern Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1em",
                      backgroundColor: "rgba(0, 0, 102, 0.8)",
                      color: "#fff"
                    }}
                  >
                    Evaluate Before
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1em",
                      backgroundColor: "rgba(0, 0, 102, 0.8)",
                      color: "#fff"
                    }}
                  >
                    Evaluation Form
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1em",
                      backgroundColor: "rgba(0, 0, 102, 0.8)",
                      color: "#fff"
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontSize: '1rem' }}>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          src={row.imageUrl}
                          alt={`${row.name}`}
                          style={{ marginRight: '20px' }}
                        />
                        <Box>
                          <Typography>{row.name}</Typography>
                          <Typography color="textSecondary" style={{ fontSize: '0.7rem' }}>
                            {row.jobtitle}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: '1rem' }}>
                      {new Date(row.evaluate_before).toISOString().substring(0, 10)}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: '1rem' }}>
                      <Button
                        onClick={() => handleClickOpen(row)}
                        variant="contained"
                        sx={{
                          border: '1px solid rgb(46, 51, 181)',
                          color: 'rgb(46, 51, 181)',
                          backgroundColor: 'rgba(42, 45, 141, 0.438)',
                          '&:hover': {
                            backgroundColor: '#0056b3',
                            color: '#fff',
                          },
                        }}
                      >
                        <AssignmentIndIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: '1rem' }}>
                      {row.isEvaluated ? 'Evaluated' : 'Not Evaluated'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md"
              >
                <DialogTitle id="form-dialog-title"></DialogTitle>
                <DialogContent>
                  {selectedIntern && (
                    <EvaluationFormEvaluator
                      isEvaluated={selectedIntern.isEvaluated}
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
        )}
      </Paper>
    </Grid>
   </Grid>
  );
}

export default EvaluationinternListEvaluator;