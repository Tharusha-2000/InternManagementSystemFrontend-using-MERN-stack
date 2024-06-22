import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const MentorEvaluationDetails = () => {
  const { id } = useParams(); // Assuming you're using React Router and the ID is in the URL
  const [evaluationDetails, setEvaluationDetails] = useState(null);

  useEffect(() => {
    const fetchEvaluationDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}getReviewDetailsById/${id}`); // Adjust the API endpoint as needed
        setEvaluationDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch evaluation details:', error);
      }
    };

    fetchEvaluationDetails();
  }, [id]);

  if (!evaluationDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Paper elevation={3} sx={{ padding: 2, margin: '20px', maxWidth: 800 }}>
        <Typography variant="h5" gutterBottom>
          Mentor Evaluation Details
        </Typography>
        <Divider />
        <List>
          {evaluationDetails.job_performance_criterias_mentor.map((criteria, index) => (
            <ListItem key={criteria}>
              <ListItemText
                primary={criteria}
                secondary={`Score: ${evaluationDetails.job_performance_scores_mentor[index]}`}
              />
            </ListItem>
          ))}
          {evaluationDetails.core_values_criterias_mentor.map((criteria, index) => (
            <ListItem key={criteria}>
              <ListItemText
                primary={criteria}
                secondary={`Score: ${evaluationDetails.core_values_scores_mentor[index]}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Overall Performance: {evaluationDetails.overall_performance_mentor}%</Typography>
        <Typography variant="body1">Action Taken: {evaluationDetails.action_taken_mentor}</Typography>
        <Typography variant="body2">Comments: {evaluationDetails.comment_mentor}</Typography>
        <Typography variant="caption">Evaluated Date: {new Date(evaluationDetails.evaluated_date_Mentor).toLocaleDateString()}</Typography>
      </Paper>
    </div>
  );
};

function ViewEvaluationForm() {
  return <MentorEvaluationDetails />;
}

export default ViewEvaluationForm;