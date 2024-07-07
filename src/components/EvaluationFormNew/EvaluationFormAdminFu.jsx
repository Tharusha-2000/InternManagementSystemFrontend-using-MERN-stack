import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  InputLabel,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EvaluationFormAdminEv from "./EvaluationFormAdminEv";
import EvaluationFormAdminMen from "./EvaluationFormAdminMen";
import axios from "axios";
import { BASE_URL } from '../../config';
import Swal from 'sweetalert2';
import "./EvaluationFormManager.css";



function EvaluationFormAdminFu({
  internName,
  mentorName,
  evaluationFormDetailsId,
  onClose,
  onSave,
}) {
  const [internNameState] = useState(internName);
  const [evaluationDate, setEvaluationDate] = useState("");
  const [selectedEvaluator, setSelectedEvaluator] = useState({ name: '', email: '' , id: ''});
  const [additionalCriteria, setAdditionalCriteria] = useState([]);
  const [additionalCriteria2, setAdditionalCriteria2] = useState([]);
  const [evaluatorError, setEvaluatorError] = useState(false);
  const [initialCriteria] = useState([
    //evaluator criterias for job performance
    "System Proficiency",
    "Quality of work - Free from errors and mistakes. Accuracy, quality of work in general",
    "Effective Communication",
    "Job knowledge",
    "Training & Development - seeks to enhance performance and stays updated with new developments in the field.",
  ]);
  const [initialCriteria2] = useState([
    //evaluator criterias for core values
    "Relationships with Diverse workplace community",
    "Planning and organizing- The ability to analyze work, set goals, develop plans of action, utilize time.",
    "Initiative and creativity -  The ability to  proceed with a task without being told every detail and the ability to make constructive suggestions.",
   
    "Decision-making - The ability to make decisions and the quality and timeliness of those decisions",
    "Compliance and Professionalism",
  ]);
  const [jobPerformanceCriteriasMentor, setJobPerformanceCriteriasMentor] = useState([]);
  const [coreValuesCriteriasMentor, setCoreValuesCriteriasMentor] = useState([]);
  const [dateError, setDateError] = useState(false);
  const token = localStorage.getItem('token'); 
  const handleSave = () => {
    if (!evaluationDate) {
      setDateError(true);
      Swal.fire({
        position: "top",
        text: "Please fill the required fields",
        customClass: {
          container: 'my-swal',
          confirmButton: 'my-swal-button'
        }
      }) // Validation for date field 
      return;
    }
  
    // Convert evaluationDate to Date object and compare with current date
    const selectedDate = new Date(evaluationDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time part to compare only date part
  
    if (selectedDate < currentDate) {
      Swal.fire({
        position: "top",
        text: "The selected date must be in the future",
        customClass: {
          container: 'my-swal',
          confirmButton: 'my-swal-button'
        }
      }) // Future date validation 
      return;
    }
  
    if (!selectedEvaluator || !selectedEvaluator.id) {
      setEvaluatorError(true);
      Swal.fire({
        position: "top",
        text: "Please Select an Evaluator",
        customClass: {
          container: 'my-swal',
          confirmButton: 'my-swal-button'
        }
      }) // Select evaluator validation using SweetAlert
      return;
    }
    saveEvaluator(
      selectedEvaluator,
      initialCriteria,
      initialCriteria2,
      jobPerformanceCriteriasMentor,
      coreValuesCriteriasMentor
    );
  
    onSave();
  };

  const saveEvaluator = (
    selectedEvaluator,
    initialCriteria,
    initialCriteria2,
    jobPerformanceCriteriasMentor,
    coreValuesCriteriasMentor
  ) => {
    const jobPerformanceCriteriasEvaluator = initialCriteria.concat(additionalCriteria);
    const coreValuesCriteriasEvaluator = initialCriteria2.concat(additionalCriteria2);
  
    axios
      .post(`${BASE_URL}evaluatorname`, {
        id: evaluationFormDetailsId,
        evaluatorName: selectedEvaluator.name,
        evaluatorEmail: selectedEvaluator.email,
        evaluatorId: selectedEvaluator.id,
        jobPerformanceCriteriasEvaluator,
        coreValuesCriteriasEvaluator,
        jobPerformanceCriteriasMentor,
        coreValuesCriteriasMentor,
        evaluateBefore: evaluationDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        // SweetAlert2 success notification
        Swal.fire({
          title: 'Success!',
          text: 'Evaluation form successfully saved.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" style={{ margin: "20px 0" }}>
           Evaluation Form Creation
        </Typography>
        <br></br> <br></br> <br></br> <br></br> <br></br>
       
        <Grid container spacing={2} alignItems="center">
  <Grid item xs={12} sm={6}>
    <InputLabel sx={{ mb: 1, fontSize: "1.25rem" }}>
      Intern Name
    </InputLabel>
    <TextField
      fullWidth
      placeholder={internNameState}
      value={internNameState}
      disabled
      variant="outlined"
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <InputLabel sx={{ mb: 1, fontSize: "1.25rem" }}>
      Evaluate before
    </InputLabel>
    <TextField
      fullWidth
      type="date"
      value={evaluationDate}
      onChange={(e) => {
        setEvaluationDate(e.target.value);
        setDateError(false);
      }}
      InputLabelProps={{ shrink: true }}
      variant="outlined"
      error={dateError}
      helperText={dateError ? "Please select a date." : ""}
    />
  </Grid>
</Grid>
      </Container><br></br> <br></br>

      <Container maxWidth="md">
      <Accordion sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ height: "60px" }}
          >
            <Typography>Click here to see evaluator evaluation form and select evaluator</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EvaluationFormAdminEv
              initialCriteria={initialCriteria}
              initialCriteria2={initialCriteria2}
              evaluationFormDetailsId={evaluationFormDetailsId}
              handleSave={handleSave}
              additionalCriteria={additionalCriteria}
              setAdditionalCriteria={setAdditionalCriteria}
              additionalCriteria2={additionalCriteria2}
              setAdditionalCriteria2={setAdditionalCriteria2}
              setSelectedEvaluator={setSelectedEvaluator}
              selectedEvaluator={selectedEvaluator}
              evaluatorError={evaluatorError}
              setEvaluatorError={setEvaluatorError}
            />
          </AccordionDetails>
        </Accordion>
        <br></br>
        <br></br>
<Accordion sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            style={{ height: "60px" }}
          >
            <Typography>Click here to see mentor evaluation form</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EvaluationFormAdminMen
              mentorName={mentorName}
              evaluationFormDetailsId={evaluationFormDetailsId}
              setJobPerformanceCriteriasMentor={setJobPerformanceCriteriasMentor}
              setCoreValuesCriteriasMentor={setCoreValuesCriteriasMentor}
            />
          </AccordionDetails>
        </Accordion>
      </Container>
      <Box display="flex" style={{ position: "absolute", right: 0 }}>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px", width: "100px", height: "40px" }}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          style={{
            margin: "8px",
            borderColor: "blue",
            width: "100px",
            height: "40px",
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </div>
  );
}

export default EvaluationFormAdminFu;

