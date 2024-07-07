import React, { useEffect, useState } from "react";
import axios from "axios";
import { KJUR } from "jsrsasign";
import IconButton from "@mui/material/IconButton";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import EvaluationFormMentor from "../EvaluationFormNew/EvaluationFormMentor";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, Divider, Grid, InputBase, Avatar, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { BASE_URL } from '../../config';
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

function EvaluationinternListMentor() {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [refreshKey, setRefreshKey] = useState(0);
  const [rows, setRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);

  if (userRole !== 'mentor') {
    return null; // Do not render the component
  }

  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = KJUR.jws.JWS.parse(token);
        const userId = decoded.payloadObj.id;

        const response = await axios.get(`${BASE_URL}checkMentor`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRows(response.data);
        setFilteredData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMentorDetails();
  }, [refreshKey]);

  const handleClickOpen = (intern) => {
    setSelectedIntern(intern);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRefreshKey(prevKey => prevKey + 1); // Increment refreshKey to trigger useEffect
  };

  // Function to search the intern by name
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = rows.filter(intern => intern.internName.toLowerCase().includes(searchTerm));
    setFilteredData(filtered);
  };

  return (

    <div>
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
            <InputBase type="text" onChange={handleSearch} sx={{ ml: 2, flex: 1 }} placeholder="Search Interns" />
            <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        {filteredData.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
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
                    Evaluate before
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
                    Evaluation form
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
                {Array.isArray(filteredData) && filteredData.map((row) => (
                  <TableRow key={row.internName}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontSize: "1em" }}
                    >
                      <Box display="flex" alignItems="center">
                        <Avatar src={row.imageUrl} alt={`${row.internName}`} style={{ marginRight: '20px' }} />
                        <Box>
                          <Typography>
                            {row.internName}
                          </Typography>
                          <Typography color="textSecondary" style={{ fontSize: '0.7rem' }}>
                            {row.jobtitle}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: "1em" }}
                    >
                      {new Date(row.evaluateBefore).toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: "1em" }}
                    >
                      <Button onClick={() => handleClickOpen(row)} 
                        variant="contained"
                        sx={{
                          border: '1px solid rgb(46, 51, 181)',
                          color: 'rgb(46, 51, 181)', 
                          backgroundColor: 'rgba(42, 45, 141, 0.438)', 
                          '&:hover': {
                            backgroundColor: '#0056b3',
                            color: '#fff', 
                          },
                        }}  >
                        <AssignmentIndIcon />
                      </Button>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: "1em" }}
                    >
                      {row.isMentorFormFilled ? "Completed" : "Pending"}
                    </TableCell>
                  </TableRow>
                ))}
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                  <DialogTitle></DialogTitle>
                  <DialogContent>
                    {selectedIntern && (
                      <EvaluationFormMentor
                        isMentorFormFilled={selectedIntern.isMentorFormFilled}
                        internId={selectedIntern?.internId}
                        internName={selectedIntern?.internName}
                        jobPerformanceCriteriasMentor={selectedIntern?.jobPerformanceCriteriasMentor}
                        coreValuesCriteriasMentor={selectedIntern?.coreValuesCriteriasMentor}
                        handleClose={handleClose}
                        setRefreshKey={setRefreshKey}
                        refreshKey={refreshKey}
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
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
        )}
      </Paper>
    </div>
  );
}

export default EvaluationinternListMentor;