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

function EvaluationinternListMentor() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // 'token' is the key you're using to store the JWT
        const decoded = KJUR.jws.JWS.parse(token);
        const userId = decoded.payloadObj.id; // replace 'sub' with the property that holds the user ID in your JWT payload

        const response = await axios.get(
          `http://localhost:8000/api/users/checkMentor/${userId}`
        );
        console.log(response.data);
        setRows(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMentorDetails();
  }, []);

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
  

  return (
    <div>
      <h1>this is evaluation list for Mentor</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Intern Name</TableCell>
              <TableCell align="center">Evaluate before</TableCell>
              <TableCell align="center">Evaluation form</TableCell>
              <TableCell align="center">status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows.map((row) => (
                <TableRow
                  key={row.internName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.internName}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(row.evaluateBefore).toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleClickOpen(row)}>
                      <AssignmentIndIcon />
                    </IconButton>

                    <Dialog
                      open={open}
                      onClose={handleClose}
                      maxWidth="md"
                      fullWidth
                    >
                      <DialogTitle>Evaluation Form</DialogTitle>
                      <DialogContent>
                        <EvaluationFormMentor
                          internId={selectedIntern?.internId}
                          internName={selectedIntern?.internName}
                          jobPerformanceCriteriasMentor={selectedIntern?.jobPerformanceCriteriasMentor  }
                          coreValuesCriteriasMentor={selectedIntern?.coreValuesCriteriasMentor}
                          handleClose={handleClose}
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell align="center">
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
