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
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EvaluationFormAdminFu from "../EvaluationFormNew/EvaluationFormAdminFu";

function EvaluationInternList() {
  const [interns, setInterns] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInternName, setSelectedInternName] = useState("");
  const [selectedMentorName, setSelectedMentorName] = useState("");
  const [selectedEvaluationFormDetailsId, setSelectedEvaluationFormDetailsId] =
    useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false); // Add this line
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
      .get("http://localhost:8000/api/users/Evinterns")
      .then((result) => {
        console.log(result.data); // Log the data to see what's returned
        setInterns(result.data);
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
      .delete("http://localhost:8000/api/users/deleteeformData", {
        data: { id },
      })
      .then((response) => {
        console.log(response.data);
        setRefreshKey((oldKey) => oldKey + 1); // Refresh the component
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h3" gutterBottom>
        All Evaluations
      </Typography>
      <Table
        aria-label="simple table"
        sx={{ minWidth: 650, backgroundColor: "#f5f5f5" }}
      >
        <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
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
          {interns.map((intern, index) => (
            <TableRow
              key={index}
              sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" } }}
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

      {/*Add this dialog box for notify succesfully saved pop up*/}
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
            Are you sure you want to delete this intern?
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
