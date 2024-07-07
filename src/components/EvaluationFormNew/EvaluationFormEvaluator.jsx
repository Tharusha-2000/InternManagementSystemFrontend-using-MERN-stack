import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  InputLabel,
  TextField,
  Button,
  Tooltip
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import EvaluationFormTableTemp from "./EvaluationFormTableTemp";
import { BASE_URL } from '../../config';
import Swal from "sweetalert2";
import axios from 'axios'; 



function EvaluationFormEvaluator({ internId, internName, jobPerformanceCriteriasEvaluator, coreValuesCriteriasEvaluator, handleClose, setRefreshKey, isEvaluated,...props}) {
  const [ratings, setRatings] = useState([]);
  const [coreValuesRatings, setCoreValuesRatings] = useState([]);
  const [overallPerformanceRating, setOverallPerformanceRating] = useState(null);
  const [comment, setComment] = useState('');
  const token = localStorage.getItem("token");
  // Calculate and format the overallPerformanceRating just before the return statement
  const formattedOverallPerformanceRating = overallPerformanceRating !== null ? overallPerformanceRating.toFixed(2) : 'N/A';
  const [jobPerformanceMeanScore, setJobPerformanceMeanScore] = useState(0); // Example initialization
  const [coreValuesMeanScore, setCoreValuesMeanScore] = useState(0); // Initialize with a default value, adjust as needed
  const [jobPerformanceScoresEvaluator, setJobPerformanceScoresEvaluator] = useState([]);
  const [corevaluesscoresevaluator, setCoreValuesScoresEvaluator] = useState([]);

  const onSave = async () => {
    let errors = [];
    if (isEvaluated) {
      Swal("Cannot save", "Evaluation has already been completed.", "error");
      return; // Exit the function early
    }
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
      
      Swal.fire({ position: "top",
        text: 'Please fill all the following fields: ',
        customClass: {
          container: 'my-swal',
          confirmButton: 'my-swal-button' 
        }
     })
      
      return;
    }
  
    const data = {
      job_performance_scores_evaluator: ratings.map(rating => rating * 20),
      core_values_scores_evaluator: coreValuesRatings.map(rating => rating * 20),
      overall_performance_evaluator: overallPerformanceRating ,
      comment_evaluator: comment
    };
  
    try {
      const response = await axios.post(`${BASE_URL}postEvaluatorResultById/${internId}`, data, {
        headers: {


          "Authorization": `Bearer ${token}`,
        },
      });
  
      handleClose();
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    }
    setRefreshKey(prevKey => prevKey + 1); // Increment the key to trigger refresh
  };
  useEffect(() => {
    // Function to calculate mean score for Job Performance criteria
    const calculateJobPerformanceMean = () => {
      if (ratings.length === 0) return 0; // Check if ratings array is empty
      return ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
    };
  
    // Function to calculate mean score for Core Values criteria
    const calculateCoreValuesMean = () => {
      if (coreValuesRatings.length === 0) return 0; // Check if coreValuesRatings array is empty
      return coreValuesRatings.reduce((acc, curr) => acc + curr, 0) / coreValuesRatings.length;
    };
  
    // Calculate mean scores
    const jobPerformanceMean = calculateJobPerformanceMean(); 
    const coreValuesMean = calculateCoreValuesMean(); 
  
    // Calculate overall mean score
    const overallMean = (jobPerformanceMean + coreValuesMean) / 2 * 20; 
  
    // Update state with calculated mean scores
    setJobPerformanceMeanScore(jobPerformanceMean * 20); 
    setCoreValuesMeanScore(coreValuesMean * 20); 
    setOverallPerformanceRating(overallMean); 
  }, [ratings, coreValuesRatings]); // Dependencies for the useEffect hook


  
  useEffect(() => {
    const fetchEvaluationData = async () => {
      if (isEvaluated) {
        try {
          const response = await axios.get(`${BASE_URL}getReviewDetailsById/${internId}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          const data = response.data;
          // Assuming the API returns an object with job_performance_scores_evaluator, core_values_scores_evaluator, overall_performance_evaluator, and comment_evaluator
          setJobPerformanceScoresEvaluator(data.job_performance_scores_evaluator.map(score => score / 20));
          setCoreValuesScoresEvaluator(data.core_values_scores_evaluator.map(score => score / 20)); // Use the correct data field for core values
          setOverallPerformanceRating(data.overall_performance_evaluator);
          setComment(data.comment_evaluator);
        } catch (error) {
          console.error('Fetching evaluation data failed:', error);
        }
      }
    };

    fetchEvaluationData();
  }, [isEvaluated, internId, token]);
  
  

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
          <Typography variant="body1" sx={{ mr: 2 }}>1 – unacceptable </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>2 – needs improvement </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>3 – meets expectations</Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>4 – exceeds expectations</Typography>
          <Typography variant="body1">5 – outstanding</Typography>
        </Box>  
        <br></br>
      </Container>


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
          criterias={jobPerformanceCriteriasEvaluator}
          onRatingsChange={setRatings}
          ratings={jobPerformanceScoresEvaluator}
          isEvaluated={isEvaluated}
        />
      </Container>
      <br></br>

      <Container maxWidth="md">
      <Typography
          variant="h5"
          align="left"
          style={{ margin: "20px 0", fontWeight: "bold" }}
        >
            CRITERIAS FOR ASSESING CORE VALUES 
        </Typography><br></br>
        <EvaluationFormTableTemp
          criterias={coreValuesCriteriasEvaluator}
          onRatingsChange={setCoreValuesRatings}
          ratings={corevaluesscoresevaluator}
          isEvaluated={isEvaluated}
          
        />
      </Container>
      <Container maxWidth="md">
      
      <Typography
    variant="h5"
    align="left"
    style={{ margin: "20px 0", fontWeight: "bold" }}
  >
    Overall Performance mentor
  </Typography>
  
      {/* Display the calculated mean score for overall performance */}
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ margin: "20px 0" }}>
        <Typography variant="h5" component="h2">
          Mean Score:
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="primary" sx={{ marginRight: "8px" }}>
            {formattedOverallPerformanceRating}%
          </Typography>
          <Tooltip title="This is the average score based on job performance and core values ratings.">
            <InfoIcon color="action" />
          </Tooltip>
        </Box>
      </Box>
     
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
          sx={{ width: "798px" }} 
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          disabled={isEvaluated} 
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
        <div
 onClick={() => {
  if (isEvaluated) {
    Swal.fire({
      position: "top",
      text: "Cannot save, Evaluation has already been completed.", // Corrected the text property
      icon: "error", // Added the missing icon property
      customClass: {
        container: 'my-swal',
        confirmButton: 'my-swal-button'
      }
    })
  }
}}
  style={{ display: 'inline-block', cursor: isEvaluated ? 'not-allowed' : 'pointer' }}
>
  <Button
    variant="contained"
    color="primary"
    style={{ marginLeft: "20px" }}
    onClick={onSave}
    disabled={isEvaluated} // Disable the Save button when isEvaluated is true
  >
    Save
  </Button>
</div>
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