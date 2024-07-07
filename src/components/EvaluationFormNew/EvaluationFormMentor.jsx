import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  InputLabel,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import EvaluationFormTableTemp from "./EvaluationFormTableTemp";
import { BASE_URL } from "../../config";
import Swal from "sweetalert2";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";

function EvaluationFormMentor({
  internId,
  internName,
  jobPerformanceCriteriasMentor,
  coreValuesCriteriasMentor,
  handleClose,
  setRefreshKey,
  refreshKey,
  isMentorFormFilled,
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


  const token = localStorage.getItem("token");
  // ...


  const onSave = async () => {
    if (!validateInputs()) {
      return;
    }
  
    // Convert ratings to percentage values
    const jobPerformanceScoresPercentage = ratings.map(rating => rating * 20);
    const coreValuesScoresPercentage = coreValuesRatings.map(rating => rating * 20); 
  
    try {
      const response = await axios.post(`${BASE_URL}storeMentorScores/${internId}`, {
        coreValuesScoresMentor: coreValuesScoresPercentage, 
        jobPerformanceScoresMentor: jobPerformanceScoresPercentage, 
        overall_performance_mentor: overallPerformanceRating,
        action_taken_mentor: actionTakenMentor,
        comment_mentor: commentMentor,
        
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        console.log('Data saved successfully');
      } else {
        console.error('Error saving data', response.status);
      }
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  
    handleClose(); // Close the form
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

    

    if (errors.length > 0) {
      Swal.fire({
        position: "top",
        title: "Validation Error",
        html: errors.join("<br>"),
        customClass: {
          container: "my-swal",
          confirmButton: "my-swal-button",
        },
      });
      return false;
    }

    return true;
  };
  useEffect(() => {
    // Calculate the mean score for both Job Performance and Core Values criteria
    const calculateMeanScores = () => {
      const jobPerformanceMean =
        ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
      const coreValuesMean =
        coreValuesRatings.reduce((acc, curr) => acc + curr, 0) /
        coreValuesRatings.length;
      
      return ((jobPerformanceMean + coreValuesMean) / 2) * 20; // Calculate the mean of both means, then convert to a percentage 
    };

  
    const overallPerformanceMeanPercentage = calculateMeanScores();
    setOverallPerformanceRating(overallPerformanceMeanPercentage);
  }, [ratings, coreValuesRatings]); // Dependencies array, useEffect runs when these values change

  //view form data codes
  const [isEvaluated, setIsEvaluated] = useState(false); // Initialize isEvaluated state


  const [jobPerformanceScoresMentor, setJobPerformanceScoresMentor] = useState(
    []
  );
  const [coreValuesScoresMentor, setCoreValuesScoresMentor] = useState([]);

  

  useEffect(() => {
    const fetchEvaluationData = async () => {
      if (isMentorFormFilled) {
        try {

          const response = await axios.get(
            `${BASE_URL}getReviewDetailsById/${internId}`, 
            {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
          );
      
          const data = response.data;

          
          setJobPerformanceScoresMentor(
            data.job_performance_scores_mentor.map((score) => score / 20)
          );
          setCoreValuesScoresMentor(
            data.core_values_scores_mentor.map((score) => score / 20)
          );
          setOverallPerformanceRating(data.overall_performance_mentor);
          setCommentMentor(data.comment_mentor);
          setActionTakenMentor(data.action_taken_mentor);
        } catch (error) {
          console.error("Fetching evaluation data failed:", error);
        }
      }
    };

    fetchEvaluationData();
  }, [isEvaluated, isMentorFormFilled, internId, token]);
  return (
    <div>
      <Typography variant="h4" align="center" style={{ margin: "20px 0" }}>
        Evaluation Form
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
  <Typography variant="body1" sx={{ mr: 2 }}>1 – unacceptable </Typography>
  <Typography variant="body1" sx={{ mr: 2 }}>2 – needs improvement </Typography>
  <Typography variant="body1" sx={{ mr: 2 }}>3 – meets expectations</Typography>
  <Typography variant="body1" sx={{ mr: 2 }}>4 – exceeds expectations</Typography>
  <Typography variant="body1">5 – outstanding</Typography>
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
          CRITERIAS FOR ASSESING JOB PERFORMANCE
        </Typography>
        <br></br>
        <EvaluationFormTableTemp
          criterias={jobPerformanceCriteriasMentor}
          onRatingsChange={setRatings}
          ratings={jobPerformanceScoresMentor} 
          isEvaluated={isMentorFormFilled}
        />

        <br></br>
      </Container>

      <Container maxWidth="md">
        <Typography
          variant="h5"
          align="left"
          style={{ margin: "20px 0", fontWeight: "bold" }}
        >
         CRITERIAS FOR ASSESING CORE VALUES 
        </Typography>
        <br></br>
        <EvaluationFormTableTemp
          criterias={coreValuesCriteriasMentor}
          onRatingsChange={setCoreValuesRatings}
          isEvaluated={isMentorFormFilled}
          ratings={coreValuesScoresMentor}
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
        {/* Display the calculated mean score for overall performance */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ margin: "20px 0" }}
        >
          <Typography variant="h5" component="h2">
            Mean Score:
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography
              variant="h4"
              color="primary"
              sx={{ marginRight: "8px" }}
            >
              {overallPerformanceRating.toFixed(2)}%
            </Typography>
            <Tooltip title="This is the average score based on job performance and core values ratings.">
              <InfoIcon color="action" />
            </Tooltip>
          </Box>
        </Box>
      </Container>
      <br></br>

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
            disabled={isMentorFormFilled} // Disable this field if isMentorFormFilled is true
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
            disabled={isMentorFormFilled} 
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
          <div
            onClick={() => {
              if (isEvaluated) {
                Swal.fire({
                  position: "top",
                  text: "Cannot save, Evaluation has already been completed.", // Corrected the text property
                  icon: "error", 
                  customClass: {
                    container: "my-swal",
                    confirmButton: "my-swal-button",
                  },
                });
              }
            }}
            style={{
              display: "inline-block",
              cursor: isEvaluated ? "not-allowed" : "pointer",
            }}
          >
            <div
              onClick={() => {
                if (isMentorFormFilled) {
                  Swal.fire({
                    position: "top",
                    text: "Cannot save, Evaluation has already been completed.",
                    icon: "error",
                    customClass: {
                      container: "my-swal",
                      confirmButton: "my-swal-button",
                    },
                  });
                }
              }}
              style={{
                display: "inline-block",
                cursor: isMentorFormFilled ? "not-allowed" : "pointer",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "20px" }}
                onClick={onSave}
                disabled={isMentorFormFilled} // This button is now inside the div which has the onClick event
              >
                Save
              </Button>
            </div>
          </div>
          <Button
           variant="outlined"
           style={{
             margin: "8px",
             borderColor: "blue",
             width: "100px",
             height: "40px",
           }}
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