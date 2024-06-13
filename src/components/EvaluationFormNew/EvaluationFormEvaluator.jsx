import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import EvaluationFormTableTemp from "./EvaluationFormTableTemp";
import { BASE_URL } from '../../config';

function EvaluationFormEvaluator({ internId, internName, jobPerformanceCriteriasEvaluator, coreValuesCriteriasEvaluator, handleClose, setRefreshKey, ...props}) {
  const [ratings, setRatings] = useState([]);
  const [coreValuesRatings, setCoreValuesRatings] = useState([]);
  const [overallPerformanceRating, setOverallPerformanceRating] = useState(null);
  const [comment, setComment] = useState('');
  const token = localStorage.getItem("token");

  const onSave = async () => {
    let errors = [];
// Check if all job performance ratings are marked
if (ratings.some(rating => rating === 0)) {
  errors.push('All Job Performance Ratings are not marked');
}

// Check if all core values ratings are marked
if (coreValuesRatings.some(rating => rating === 0)) {
  errors.push('All Core Values Ratings are not marked');
}
    if (!overallPerformanceRating) {
      errors.push('Overall Performance Rating');
    }
  

  
    // Check if comment is filled
    if (comment.trim() === '') {
      errors.push('Comment');
    }
  
    if (errors.length > 0) {
      alert(`Please fill the following fields correctly: \n${errors.join('\n')}`);
      return;
    }
  
    const data = {
      job_performance_scores_evaluator: ratings.map(rating => rating * 20),
      core_values_scores_evaluator: coreValuesRatings.map(rating => rating * 20),
      overall_performance_evaluator: overallPerformanceRating * 20,
      comment_evaluator: comment
    };
  
    try {
      const response = await fetch(
        `${BASE_URL}postEvaluatorResultById/${internId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      handleClose();
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    }
    setRefreshKey(prevKey => prevKey + 1); // Increment the key to trigger refresh
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
            value={internName}
            disabled={true}
          />
        </Box>
      </Container>
      <Container maxWidth="md">
        <Typography
          variant="h5"
          align="left"
          style={{ margin: "20px 0", fontWeight: "bold" }}
        >
          Rating Scale
        </Typography>
        <Box display="flex" justifyContent="space-between" width="100%">
  <Typography variant="body1" sx={{ mr: 2 }}>5 – outstanding</Typography>
  <Typography variant="body1" sx={{ mr: 2 }}>4 – exceeds expectations</Typography>
  <Typography variant="body1" sx={{ mr: 2 }}>3 – meets expectations</Typography>
  <Typography variant="body1" sx={{ mr: 2 }}>2 – needs improvement</Typography>
  <Typography variant="body1">1 – unacceptable</Typography>
</Box>

        <br></br>
      </Container>


      <Container maxWidth="md">
      <Typography
          variant="h5"
          align="left"
          style={{ margin: "20px 0", fontWeight: "bold" }}
        >
          Criterias for Assessing Job Performance Evaluator
        </Typography>
        <br></br>
        

        <EvaluationFormTableTemp
          criterias={jobPerformanceCriteriasEvaluator}
          onRatingsChange={setRatings}
        />
      </Container>
      <br></br>

      <Container maxWidth="md">
      <Typography
          variant="h5"
          align="left"
          style={{ margin: "20px 0", fontWeight: "bold" }}
        >
          CORE VALUES AND OBJECTIVES Evaluator
        </Typography><br></br>
        <EvaluationFormTableTemp
          criterias={coreValuesCriteriasEvaluator}
          onRatingsChange={setCoreValuesRatings}
        />
      </Container>

      <Container maxWidth="md">
      <Typography
    variant="h5"
    align="left"
    style={{ margin: "20px 0", fontWeight: "bold" }}
  >
    Overall Performance evaluator
  </Typography>
  <br></br>
        <EvaluationFormTableTemp 
          criterias={["Overall performance"]} 
          onRatingsChange={setOverallPerformanceRating} 
        />
      </Container>
      <Container maxWidth="md">
        <Typography
          variant="h5"
          align="left"
          style={{ margin: "20px 0", fontWeight: "bold" }}
        >
          comment Evaluator
        </Typography>
      </Container>

      <Container maxWidth="md">
      <Typography align="left" sx={{ paddingLeft: "20px" }}>
           give any comments or proposals for the intern:
          </Typography>
          <br></br>
        <TextField 
          multiline 
          rows={4} 
          sx={{ width: "700px" }} 
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </Container>   

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
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Container>
    </div>
  )
}

export default EvaluationFormEvaluator;