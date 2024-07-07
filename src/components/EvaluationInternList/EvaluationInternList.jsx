import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  InputBase,
  Divider,
  Avatar,
  Box
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EvaluationFormAdminFu from "../EvaluationFormNew/EvaluationFormAdminFu";
import { BASE_URL } from '../../config';
import SearchIcon from '@mui/icons-material/Search';
import Swal from "sweetalert2";
import ReviewFormAdmin from "../EvaluationFormNew/ReviewFormAdmin";

function EvaluationInternList() {
  const token = localStorage.getItem('token'); 
  const [interns, setInterns] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInternName, setSelectedInternName] = useState("");
  const [selectedMentorName, setSelectedMentorName] = useState("");
  const [selectedEvaluationFormDetailsId, setSelectedEvaluationFormDetailsId] =
    useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false); 
  const [completedDialogOpen, setCompletedDialogOpen] = useState(false); // to implement dialog box for notify completed evaluation forms
  const [refreshKey, setRefreshKey] = useState(0); // to refresh the page after save the evaluation form
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [toBeDeletedId, setToBeDeletedId] = useState(null);
  const [createdDialogOpen, setCreatedDialogOpen] = useState(false); 

  const handleClick = (intern) => {
    if (!intern.mentor) {
      Swal.fire({
        title: 'No Mentor Assigned',
        text: 'A mentor must be assigned before creating the evaluation form.',
        icon: 'warning',
      });
    } else if (intern.eformStatus === "created") {
      setSelectedInternName(intern.name);
      setSelectedMentorName(intern.mentor);
      setSelectedEvaluationFormDetailsId(intern.evaluationFormDetailsId);
      setCreatedDialogOpen(true); // Open the created evaluation dialog
    } else {
      setSelectedInternName(intern.name);
      setSelectedMentorName(intern.mentor);
      setSelectedEvaluationFormDetailsId(intern.evaluationFormDetailsId);
      setOpenDialog(true);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setCreatedDialogOpen(false); 
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}Evinterns`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        console.log(result.data);
        setInterns(result.data);
        setFilteredData(result.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, [refreshKey]);
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}deleteeformData`, {
        data: { id },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setRefreshKey((oldKey) => oldKey + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = interns.filter(intern => intern.name.toLowerCase().includes(searchTerm));
    setFilteredData(filtered);
  };

  useEffect(() => {
    setFilteredData(interns);
  }, [interns]);

  const roleStyles = {
    admin: { backgroundColor: 'rgba(255, 0, 0, 0.1)', color: 'red' },
    intern: { backgroundColor: 'rgba(0, 255, 0, 0.1)', color: 'green' },
    mentor: { backgroundColor: 'rgba(0, 0, 255, 0.1)', color: 'blue' },
    evaluator: { backgroundColor: 'rgba(255, 255, 0, 0.1)', color: 'orange' },
    manager: { backgroundColor: 'rgba(128, 0, 128, 0.1)', color: 'purple' },
  };

  return (
    <Grid container spacing={1}>
    <Grid item xs={12} >

    <TableContainer component={Paper}>
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
          <InputBase type="text" onChange={handleSearch} sx={{ ml: 2, flex: 1 }} placeholder="Search Interns" />
          <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>

      <Table aria-label="simple table" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1.2em", backgroundColor: "rgba(0, 0, 102, 0.8)", color: "#fff" }}>
              Intern Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1.2em", backgroundColor: "rgba(0, 0, 102, 0.8)", color: "#fff" }}>
              Mentor Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1.2em", backgroundColor: "rgba(0, 0, 102, 0.8)", color: "#fff" }}>
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1.2em", backgroundColor: "rgba(0, 0, 102, 0.8)", color: "#fff" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((intern, index) => (
            <TableRow key={index}>
              <TableCell align="left">
                <Box display="flex" alignItems="center">
                  <Avatar src={intern.imageUrl} alt={`${intern.name}`} style={{ marginRight: '20px' }} />
                  <Box>
                    <Typography>
                      {intern.name}
                    </Typography>
                  
                  </Box>
                </Box>
              </TableCell>
              <TableCell sx={{ fontSize: "1em" }}>
              <Typography>
                  {intern.mentor}
                  </Typography>
              </TableCell>
              <TableCell sx={{ fontSize: "1em" }}>{intern.eformStatus}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleClick(intern)}
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
                  <AssignmentIndIcon/>
                </Button>
                <Button
                  sx={{
                    border: "1px solid rgb(174, 73, 73)",
                    marginLeft: "10px",
                    color: "rgb(174, 73, 73)", 
                    backgroundColor: "rgba(174, 73, 73, 0.314)", 
                    '&:hover': {
                      backgroundColor: "#CC0000",
                      color: "#fff", 
                    },
                  }}
                  variant="outlined"
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(intern.evaluationFormDetailsId);
                        Swal.fire(
                          'Deleted!',
                          'The intern\'s evaluation form has been deleted.',
                          'success'
                        )
                      }
                    })
                  }}
                >
                  <DeleteForeverIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            height: '90%', 
          },
        }}
      >
        <EvaluationFormAdminFu
          internName={selectedInternName}
          mentorName={selectedMentorName} 
          evaluationFormDetailsId={selectedEvaluationFormDetailsId}
          onClose={handleClose}
          onSave={() => {
            handleClose(); 
            setSaveDialogOpen(true); 
            setRefreshKey((oldKey) => oldKey + 1); 
          }}
        />
      </Dialog>
      <Dialog
            open={createdDialogOpen}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
              style: {
                height: '90%',
              },
            }}
          >
            {/* Render the component you want for created evaluation dialog */}
            <ReviewFormAdmin
              internName={selectedInternName}
              mentorName={selectedMentorName}
              evaluationFormDetailsId={selectedEvaluationFormDetailsId}
              onClose={handleClose}
            />
          </Dialog>
    </TableContainer>
    </Grid>
    </Grid>
    
  );
}

export default EvaluationInternList;