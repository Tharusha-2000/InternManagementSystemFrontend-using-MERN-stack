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
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { BASE_URL } from '../../config';


function EvaluationinternListMentor() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = KJUR.jws.JWS.parse(token);
        const userId = decoded.payloadObj.id;
  
        const response = await axios.get(`${BASE_URL}checkMentor/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRows(response.data);
        setFilteredData(response.data); // Make sure this line is present to initialize filteredData
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchMentorDetails();
  }, [refreshKey]);

  const [open, setOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);

  const handleClickOpen = (intern) => {
    if (intern.isMentorFormFilled) {
      alert("You have already completed the form");
    } else {
      setSelectedIntern(intern);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [filteredData, setFilteredData] = useState([]);

// Function to search the intern by name
const handleSearch = (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filtered = rows.filter(intern => intern.internName.toLowerCase().includes(searchTerm));
  setFilteredData(filtered);
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
        <InputBase type="text"  onChange={handleSearch} sx={{ ml: 2, flex: 1 }} placeholder="Search Interns" />
        <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Grid>
      <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
            fontWeight: "bold",
            fontSize: "1em",
          }}
        >
          Intern Name
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontWeight: "bold",
            fontSize: "1em",
          }}
        >
          Evaluate before
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontWeight: "bold",
            fontSize: "1em",
          }}
        >
          Evaluation form
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontWeight: "bold",
            fontSize: "1em",
          }}
        >
          Status
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {Array.isArray(filteredData) && // Use filteredData here
    filteredData.map((row) => (
          <TableRow key={row.internName}>
            <TableCell
              component="th"
              scope="row"
              sx={{ fontSize: "1em" }}
            >
              {row.internName}
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
              <IconButton onClick={() => handleClickOpen(row)}>
                <AssignmentIndIcon />
              </IconButton>
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: "1em" }}
            >
              {row.isMentorFormFilled ? "Completed" : "Pending"}
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
</TableContainer>
    </div>
  );
}

export default EvaluationinternListMentor;
