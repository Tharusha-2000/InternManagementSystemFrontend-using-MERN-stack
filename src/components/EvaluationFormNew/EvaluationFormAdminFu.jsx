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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EvaluationFormAdminEv from "./EvaluationFormAdminEv";
import EvaluationFormAdminMen from "./EvaluationFormAdminMen";
import axios from "axios";
import { BASE_URL } from '../../config';

function EvaluationFormAdminFu({
  internName,
  mentorName,
  evaluationFormDetailsId,
  onClose,
  onSave,
}) {
  const [internNameState] = useState(internName);
  const [evaluationDate, setEvaluationDate] = useState("");
  const [selectedEvaluator, setSelectedEvaluator] = useState("");
  const [additionalCriteria, setAdditionalCriteria] = useState([]);
  const [additionalCriteria2, setAdditionalCriteria2] = useState([]);
  const [evaluatorError, setEvaluatorError] = useState(false);
  const [initialCriteria] = useState([
    "System Proficiency",
    "Quality of work - Free from errors and mistakes. Accuracy, quality of work in general",
    "Effective Communication",
    "job knowledge",
    "Training & Development - seeks to enhance performance and stays updated with new developments in the field.",
  ]);
  const [initialCriteria2] = useState([
    "Relationships with Diverse workplace community",
    "Planning and organizing- The ability to analyze work, set goals, develop plans of action, utilize time.",
    "Initiative and creativity -  The ability to  proceed with a task without being told every detail and the ability to make constructive suggestions.",
    "Attendance -Consistency in coming to work daily and conforming to scheduled work hours.",
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
      alert("Please select a date.");//validation for date field
      return;
    }

    if (!selectedEvaluator) {
      setEvaluatorError(true);
      alert("Please select an evaluator.");//select evaluator validation
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
        evaluatorName: selectedEvaluator,
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
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h3" align="left" style={{ margin: "20px 0" }}>
          Intern Evaluation
        </Typography>
        <Box display="flex" alignItems="center" marginBottom="20px">
          <InputLabel sx={{ paddingRight: 2, fontSize: "1.25rem" }}>
            Intern Name
          </InputLabel>
          <TextField
            placeholder={internNameState}
            style={{ width: "650px" }}
            value={internNameState}
            disabled={true}
          />
        </Box>
        <Box display="flex" alignItems="center" marginBottom="20px">
          <InputLabel sx={{ paddingRight: 2, fontSize: "1.25rem" }}>
            Evaluate before
          </InputLabel>
          <TextField
            type="date"
            value={evaluationDate}
            onChange={(e) => {
              setEvaluationDate(e.target.value);
              setDateError(false);
            }}
            InputLabelProps={{ shrink: true }}
            style={{ width: "650px" }}
            error={dateError}
            helperText={dateError ? "Please select a date." : ""}
          />
        </Box>
      </Container>

      <Container maxWidth="md">
        <Accordion sx={{ backgroundColor: '#D3D3D3' }}>
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
        <Accordion sx={{ backgroundColor: '#D3D3D3' }}>
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