import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CloseIcon from "@mui/icons-material/Close";
import EvaluationFormManager from "../EvaluationFormNew/EvaluationFormManager";
import { BASE_URL } from "../../config";

function EvaluationInternListManager() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvaluationFormDetails, setSelectedEvaluationFormDetails] =
    useState(null); // New state
  const [mentor, setMentor] = useState(null);
  const token = localStorage.getItem("token");
  const [filteredRows, setFilteredRows] = useState([]); // Add this state variable

  useEffect(() => {
    const fetchInternDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}getInternsForManager`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
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
    const filtered = rows.filter(
      (intern) =>
        intern.fname.toLowerCase().includes(searchTerm) ||
        intern.lname.toLowerCase().includes(searchTerm) // Assuming you want to search by first or last name
    );
    setFilteredRows(filtered); // Update filteredRows based on search
  };

  const roleStyles = {
    admin: { backgroundColor: "rgba(255, 0, 0, 0.1)", color: "red" },
    intern: { backgroundColor: "rgba(0, 255, 0, 0.1)", color: "green" },
    mentor: { backgroundColor: "rgba(0, 0, 255, 0.1)", color: "blue" },
    evaluator: { backgroundColor: "rgba(255, 255, 0, 0.1)", color: "orange" },
    manager: { backgroundColor: "rgba(128, 0, 128, 0.1)", color: "purple" },
  };

  return (
    <Grid container spacing={1}>
    <Grid item xs={12} >

      <Typography variant="h4" gutterBottom align="center">
        All Evaluations
      </Typography>
      <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical" />
      <Grid
        sx={{
          justifyContent: "space-between",
          mb: 4,
          display: "flex",
          alignItems: "center",
        }}
      >
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
          <InputBase
            type="text"
            onChange={handleSearch}
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search Interns"
          />
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
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)",
                  color: "#fff",
                }}
              >
                Intern Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)",
                  color: "#fff",
                }}
              >
                Evaluator Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)",
                  color: "#fff",
                }}
              >
                Mentor name
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  Evaluation Details
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((user) => (
              <TableRow key={user._id}>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={user.imageUrl}
                      alt={`${user.fname} ${user.lname}`}
                      style={{ marginRight: "20px" }}
                    />
                    <Box>
                      <Typography>
                        {user.fname} {user.lname}
                      </Typography>
                      <Typography
                        variant="secondary"
                        sx={{ color: "rgba(0, 0, 0, 0.5)" }} // Adjust the opacity as needed
                      >
                        {user.university}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography>
                      {user.evaluationFormDetails.evaluator}
                    </Typography>
               
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography>{user.mentor}</Typography>
           
                </TableCell>

                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Button
                      onClick={() => handleClickOpen(user)}
                      variant="contained"
                      sx={{
                        border: "1px solid rgb(46, 51, 181)",
                        color: "rgb(46, 51, 181)",
                        backgroundColor: "rgba(42, 45, 141, 0.438)",
                        "&:hover": {
                          backgroundColor: "#0056b3",
                          color: "#fff",
                        },
                      }}
                    >
                      <AssignmentIndIcon />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <div> {/* Placeholder for the title, if any */}</div>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <EvaluationFormManager
            evaluationFormDetails={selectedEvaluationFormDetails}
            mentor={mentor}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  </Grid>
  );
}

export default EvaluationInternListManager;
