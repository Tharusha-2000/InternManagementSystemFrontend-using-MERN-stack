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
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EvaluationFormAdminFu from "../EvaluationFormNew/EvaluationFormAdminFu";
import { BASE_URL } from '../../config';
import SearchIcon from '@mui/icons-material/Search';



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

  const handleClick = (intern) => {
    if (intern.eformStatus === "created") {
      setCompletedDialogOpen(true); // Open the "already created" dialog
    } else {
      setSelectedInternName(intern.name);
      setSelectedMentorName(intern.mentor);
      setSelectedEvaluationFormDetailsId(intern.evaluationFormDetailsId);
      setOpenDialog(true); // Open the normal dialog
    }
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}Evinterns`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        console.log(result.data); // Log the data to see what's returned
        setInterns(result.data);
        setFilteredData(result.data); // Set filteredData state here
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
        setRefreshKey((oldKey) => oldKey + 1); // Refresh the component
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //search bar
  
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = interns.filter(intern => intern.name.toLowerCase().includes(searchTerm));
    setFilteredData(filtered);
  };
  useEffect(() => {
    setFilteredData(interns);
  }, [interns]);


  return (
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


      <Table
  aria-label="simple table"
  sx={{ minWidth: 650 }}
>
  <TableHead>
    <TableRow>
      <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        Intern Name
      </TableCell>
      <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        Mentor Name
      </TableCell>
      <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        Status
      </TableCell>
      <TableCell
        sx={{
          fontWeight: "bold",
          fontSize: "1.2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Evaluation Form
      </TableCell>
      <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        
      </TableCell>
        
    </TableRow>
  </TableHead>
  <TableBody>
  {filteredData.map((intern, index) => (
      <TableRow
        key={index}
      >
        <TableCell sx={{ fontSize: "1rem" }}>{intern.name}</TableCell>
        <TableCell sx={{ fontSize: "1rem" }}>{intern.mentor}</TableCell>
        <TableCell sx={{ fontSize: "1rem" }}>
          {intern.eformStatus}
        </TableCell>
        <TableCell
          sx={{
            fontSize: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => handleClick(intern)}>
            <AssignmentIndIcon />
          </IconButton>
        </TableCell>
        <TableCell sx={{ fontSize: "1rem" }}>
          <Button
            onClick={() => {
              setToBeDeletedId(intern.evaluationFormDetailsId);
              setConfirmDialogOpen(true);
            }}
          >
            <DeleteForeverIcon />
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <EvaluationFormAdminFu
          internName={selectedInternName}
          mentorName={selectedMentorName} // Pass selected mentor name as prop
          evaluationFormDetailsId={selectedEvaluationFormDetailsId} // Pass selected evaluationFormDetailsId as prop
          onClose={handleClose}
          onSave={() => {
            handleClose(); // Close the first dialog
            setSaveDialogOpen(true); // Open the second dialog
            setRefreshKey((oldKey) => oldKey + 1); // Refresh the component
          }}
        />
      </Dialog>

      {/*Added this dialog box for notify succesfully saved pop up*/}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogContent style={{ padding: "20px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Successfully saved
          </Typography>
          <Typography variant="subtitle1" align="center">
            notified respected evaluators and mentors
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSaveDialogOpen(false)} // Close the dialog when clicked
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/*Add this dialog box for notify completed evaluation forms*/}
      <Dialog
        open={completedDialogOpen}
        onClose={() => setCompletedDialogOpen(false)}
      >
        <DialogContent>
          <Typography variant="h6" align="center">
            Already created the evaluation form
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompletedDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>

      {/*Added this confirmation dialog box for confirm delete*/}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogContent>
          <Typography variant="h6" align="center">
            Are you sure you want to delete this interns evaluation form?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleDelete(toBeDeletedId);
              setConfirmDialogOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default EvaluationInternList;
