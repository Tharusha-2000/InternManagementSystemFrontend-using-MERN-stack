import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  InputLabel,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Radio,
  Button,
} from "@mui/material";

function EvaluationFormMentor({
  internId,
  internName,
  jobPerformanceCriteriasMentor,
  coreValuesCriteriasMentor,
  handleClose,
}) {
  const [actionTakenMentor, setActionTakenMentor] = useState("");
  const [commentMentor, setCommentMentor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");



  const [ratings, setRatings] = React.useState(
    Array(jobPerformanceCriteriasMentor.length).fill(0)
  );
  const [coreValuesRatings, setCoreValuesRatings] = React.useState(
    Array(coreValuesCriteriasMentor.length).fill(0)
  );
  const [overallPerformanceRating, setOverallPerformanceRating] =
    React.useState(0);

  const handleRadioChange = (event, index) => {
    const newRatings = [...ratings];
    newRatings[index] = Number(event.target.value);
    setRatings(newRatings);
  };

  const handleCoreValuesRadioChange = (event, index) => {
    const newRatings = [...coreValuesRatings];
    newRatings[index] = Number(event.target.value);
    setCoreValuesRatings(newRatings);
  };

  const handleOverallPerformanceRadioChange = (event) => {
    setOverallPerformanceRating(Number(event.target.value));
  };

  const onSave = async () => {
    if (!validateForm()) {
      window.alert("Please fill out all fields."); // Show an alert to the user
      
      return;
    }
    handleClose(); 
    try {
      const response = await fetch(`http://localhost:8900/api/users/storeMentorScores/${internId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coreValuesScoresMentor: coreValuesRatings.map(rating => rating * 20),
          jobPerformanceScoresMentor: ratings.map(rating => rating * 20),
          overall_performance_mentor: overallPerformanceRating * 20,
          action_taken_mentor: actionTakenMentor,
          comment_mentor: commentMentor,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const validateForm = () => {
    if (actionTakenMentor === "" || commentMentor === "") {
      return false;
    }

    if (ratings.includes(0) || coreValuesRatings.includes(0) || overallPerformanceRating === 0) {
      return false;
    }

    return true;
  };

  return (
    <div>
      
     
      <Typography variant="h4" align="center" style={{ margin: "20px 0" }}>
        Mentor
      </Typography>
      <Container maxWidth="md">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <InputLabel sx={{ paddingRight: 2, fontSize: "1.25rem" }}>
            intern name
          </InputLabel>
          <TextField
            placeholder="Enter text here"
            disabled={true}
            value={internName}
          />
        </Box>
      </Container>
      <br></br>

      <Container maxWidth="md">
        <Typography
          variant="h5"
          align="left"
          style={{ margin: "20px 0", fontWeight: "bold" }}
        >
          Rating Scale
        </Typography>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="body1">5 – outstanding</Typography>
          <Typography variant="body1">4 – exceeds expectations</Typography>
          <Typography variant="body1">3 – meets expectations</Typography>
          <Typography variant="body1">2 – needs improvement</Typography>
          <Typography variant="body1">1 – unacceptable</Typography>
        </Box>

        <br></br>
      </Container>

      {/*----table 3 start */}

      <Container maxWidth="md">
        <Typography
          variant="h5"
          align="left"
          style={{ margin: "20px 0", fontWeight: "bold" }}
        >
          Criterias for Assessing Job Performance mentor
        </Typography>
        <br></br>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={1}>
                  <Typography variant="h6">criteria</Typography>
                </TableCell>
                {["a", "b", "c", "d", "e"].map((value, num) => (
                  <TableCell key={value} align="center">
                    <Typography variant="h6">{num + 1}</Typography>
                  </TableCell>
                ))}
                <TableCell align="center">
                  <Typography variant="h6">Weight</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobPerformanceCriteriasMentor.map((criteria, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {criteria}
                  </TableCell>
                  {["a", "b", "c", "d", "e"].map((value, num) => (
                    <TableCell key={num} align="center">
                      <Radio
                        value={num + 1}
                        checked={ratings[index] === num + 1}
                        onChange={(event) => handleRadioChange(event, index)}
                      />
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    {ratings[index] ? ratings[index] * 20 + "%" : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <br></br>
        {/*---------------------------table 4 start*/}
      </Container>

      <Container maxWidth="md">
        <Typography
          variant="h5"
          align="left"
          style={{ margin: "20px 0", fontWeight: "bold" }}
        >
          CORE VALUES AND OBJECTIVES mentor
        </Typography>
        <br></br>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={1}>
                  <Typography variant="h6">criteria</Typography>
                </TableCell>
                {["a", "b", "c", "d", "e"].map((value, num) => (
                  <TableCell key={num} align="center">
                    <Typography variant="h6">{num + 1}</Typography>
                  </TableCell>
                ))}
                <TableCell align="center">
                  <Typography variant="h6">Weight</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coreValuesCriteriasMentor.map((criteria, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {criteria}
                  </TableCell>
                  {["a", "b", "c", "d", "e"].map((value, num) => (
                    <TableCell key={num} align="center">
                      <Radio
                        value={num + 1}
                        checked={coreValuesRatings[index] === num + 1}
                        onChange={(event) =>
                          handleCoreValuesRadioChange(event, index)
                        }
                      />
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    {coreValuesRatings[index]
                      ? coreValuesRatings[index] * 20 + "%"
                      : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/*-----------------------------overall performans mentor---------------------------------*/}

      <Container maxWidth="md">
        <Typography
          variant="h5"
          align="left"
          style={{ margin: "20px 0", fontWeight: "bold" }}
        >
          Overall Performance mentor
        </Typography>
        <br></br>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right" colSpan={1}>
                  <Typography variant="h6"></Typography>
                </TableCell>
                {["a", "b", "c", "d", "e"].map((value, num) => (
                  <TableCell key={num} align="center">
                    <Typography variant="h6">{num + 1}</Typography>
                  </TableCell>
                ))}
                <TableCell align="center">
                  <Typography variant="h6">Weight</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Overall performance
                </TableCell>
                {["a", "b", "c", "d", "e"].map((value, num) => (
                  <TableCell key={num} align="center">
                    <Radio
                      value={num + 1}
                      checked={overallPerformanceRating === num + 1}
                      onChange={handleOverallPerformanceRadioChange}
                    />
                  </TableCell>
                ))}
                <TableCell align="center">
                  {overallPerformanceRating
                    ? overallPerformanceRating * 20 + "%"
                    : ""}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Container maxWidth="md">
        <Typography
          variant="h5"
          align="left"
          style={{ margin: "20px 0", fontWeight: "bold" }}
        >
          Action Taken mentor
        </Typography>
      </Container>

      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Typography align="left" sx={{ paddingLeft: "20px" }}>
            What are the action taken to improve His/her Performance &
            Development:
          </Typography>
        </Box>
      </Container>
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <TextField 
  multiline 
  rows={4} 
  sx={{ width: "700px" }} 
  value={actionTakenMentor} 
  onChange={(e) => setActionTakenMentor(e.target.value)}
/>
        </Box>
      </Container>
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Typography align="left" sx={{ paddingLeft: "20px" }}>
            comments /Reccomendations mentor:
          </Typography>
        </Box>
      </Container>
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <TextField 
  multiline 
  rows={4} 
  sx={{ width: "700px" }} 
  value={commentMentor} 
  onChange={(e) => setCommentMentor(e.target.value)}
/>
        </Box>
      </Container>
      <br></br>
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          style={{ marginTop: "20px" }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "20px" }}
            onClick={onSave}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "20px" }}
            onClick={handleClose} // Call the handleClose function when the cancel button is clicked
          >
            Cancel
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default EvaluationFormMentor;
