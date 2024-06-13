import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  InputLabel,
  TextField,
  Button,
  TableContainer,
  Paper,
} from "@mui/material";
import EvaluationFormTableTemp from "./EvaluationFormTableTemp";
import { BASE_URL } from '../../config';
function EvaluationFormMentor({
  internId,
  internName,
  jobPerformanceCriteriasMentor,
  coreValuesCriteriasMentor,
  handleClose,
  setRefreshKey,
  refreshKey,
}) {
  const [actionTakenMentor, setActionTakenMentor] = useState("");
  const [commentMentor, setCommentMentor] = useState("");
  const [ratings, setRatings] = useState(
    Array(jobPerformanceCriteriasMentor.length).fill(0)
  );
  const [coreValuesRatings, setCoreValuesRatings] = useState(
    Array(coreValuesCriteriasMentor.length).fill(0)
  );
  const [overallPerformanceRating, setOverallPerformanceRating] = useState(0);

  const handleOverallPerformanceRadioChange = (rating) => {
    setOverallPerformanceRating(Number(rating));
  };
  const token = localStorage.getItem("token");
  // ...

  const onSave = async () => {
    if (!validateInputs()) {
      return;
    }

    handleClose();
    try {
      const response = await fetch(
        `${BASE_URL}storeMentorScores/${internId}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            coreValuesScoresMentor: coreValuesRatings.map(
              (rating) => rating * 20
            ),
            jobPerformanceScoresMentor: ratings.map((rating) => rating * 20),
            overall_performance_mentor: overallPerformanceRating * 20,
            action_taken_mentor: actionTakenMentor,
            comment_mentor: commentMentor,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validateInputs = () => {
    let errors = [];

    if (actionTakenMentor.trim() === "") {
      errors.push("Action Taken cannot be empty");
    }

    if (commentMentor.trim() === "") {
      errors.push("Comment cannot be empty");
    }

    if (ratings.some((rating) => rating === 0)) {
      errors.push("All Job Performance Criteria must be rated");
    }

    if (coreValuesRatings.some((rating) => rating === 0)) {
      errors.push("All Core Values Criteria must be rated");
    }

    if (overallPerformanceRating === 0) {
      errors.push("Overall Performance must be rated");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
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
        <EvaluationFormTableTemp
          criterias={jobPerformanceCriteriasMentor}
          onRatingsChange={setRatings}
        />

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
        <EvaluationFormTableTemp
          criterias={coreValuesCriteriasMentor}
          onRatingsChange={setCoreValuesRatings}
        />
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
          <EvaluationFormTableTemp
            criterias={["Overall performance"]}
            onRatingsChange={handleOverallPerformanceRadioChange}
          />
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
            onClick={() => {
              onSave();
              setRefreshKey(refreshKey + 1); // Corrected here
            }}
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
