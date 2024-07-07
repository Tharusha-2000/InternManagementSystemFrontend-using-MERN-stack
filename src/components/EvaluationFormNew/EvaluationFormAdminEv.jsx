import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, InputLabel, Select, MenuItem, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Radio, TextField, Button, FormControl } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { BASE_URL } from '../../config';

function EvaluationFormAdminEv({ evaluationFormDetailsId,handleSave, additionalCriteria, setAdditionalCriteria, additionalCriteria2, setAdditionalCriteria2,initialCriteria, initialCriteria2,  setSelectedEvaluator,selectedEvaluator, evaluatorError, setEvaluatorError  }) {
    
    
    const [ratings, setRatings] = useState([]);
    const [ratings2, setRatings2] = useState([]);
    const [newCriteria, setNewCriteria] = useState('');
    const [newCriteria2, setNewCriteria2] = useState('');
    const [evaluators, setEvaluators] = useState([]);//for select evaluators


    useEffect(() => {
      const token = localStorage.getItem("token");
    
      axios.get(`${BASE_URL}evaluators`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setEvaluators(response.data); // response.data should be an array of evaluator names
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    
      console.log(selectedEvaluator);
    }, [evaluationFormDetailsId, selectedEvaluator]); // Both dependencies in a single array


     
    const handleChange = (event) => {
      const selectedEmail = event.target.value;
      const selectedEvaluator = evaluators.find(evaluator => evaluator.email === selectedEmail);
      setSelectedEvaluator(selectedEvaluator);
      setEvaluatorError(false); // Reset evaluatorError when an evaluator is selected
      console.log(selectedEvaluator); // Log the selected evaluator object
    };
  
    const handleRadioChange = (event, index) => {
      setRatings((prevRatings) => {
        const newRatings = [...prevRatings];
        newRatings[index] = Number(event.target.value);
        return newRatings;
      });
    };
    
    const handleAddCriteria = () => {
      setAdditionalCriteria((prevValues) => [...prevValues, newCriteria]);
      setNewCriteria("");
    };
  
    const handleRemoveCriteria = (index) => {
      setAdditionalCriteria((prevValues) => prevValues.filter((_, i) => i !== index));
    };
    
  return (
    <div>
      <Typography variant="h4" align="center" style={{ margin: "20px 0" }}>
        Evaluator
      </Typography>
      <Container maxWidth="md">
        <br />
        <FormControl fullWidth>
          <InputLabel id="evaluator-select-label">Select Evaluator</InputLabel>
          <Select
            labelId="evaluator-select-label"
            id="evaluator-select"
            onChange={handleChange}
            value={selectedEvaluator.email || ''}
            label="Select Evaluator"
            error={evaluatorError}
          >
            {evaluators.map((evaluator, index) => (
           <MenuItem key={index} value={evaluator.email}>
           <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
             <span>{evaluator.name}</span>
             <span style={{ color: 'rgba(0, 0, 0, 0.54)' }}>{evaluator.email}</span>
           </div>
         </MenuItem>
            ))}
          </Select>
          {evaluatorError && <p style={{ color: 'red' }}>Please select an evaluator.</p>}
        </FormControl>
      </Container>

      <br></br>
      <Container maxWidth="md">
        <Typography variant="h5" align="left" style={{ margin: "20px 0", fontWeight: "bold" }}>
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
      <br></br>

      <Container maxWidth="md">

      <Typography variant="h5" align="left" style={{ margin: "20px 0", fontWeight: "bold" }}>
      CRITERIAS FOR ASSASING JOB PERFORMANCE
        </Typography>
        <br></br>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={1}>
                  <Typography variant="h6">criteria</Typography>
                </TableCell>
                {['a', 'b', 'c', 'd', 'e'].map((value, num) => (
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
              {[...initialCriteria, ...additionalCriteria].map((criteria, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {criteria}
                  </TableCell>
                  {['a', 'b', 'c', 'd', 'e'].map((value, num) => (
                    <TableCell key={num} align="center">
                      <Radio
                        value={num + 1}
                        checked={ratings[index] === num + 1}
                        onChange={(event) => handleRadioChange(event, index)}
                        disabled
                      />
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <TextField
                      value={ratings[index] ? ratings[index] * 20 + '%' : ''}
                      disabled
                      // Add your other TextField properties here
                    />
                  </TableCell>
                  {index >= initialCriteria.length && (
                    <TableCell align="center">
                      <Button onClick={() => handleRemoveCriteria(index - initialCriteria.length)}>Remove</Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            <TableRow>
  <TableCell>
    <TextField
      value={newCriteria}
      onChange={(e) => setNewCriteria(e.target.value)}
    />
  </TableCell>
  <TableCell />
  <TableCell />
  <TableCell />
  <TableCell />
  <TableCell />
  <TableCell align="right">
  <Button onClick={handleAddCriteria} startIcon={<CheckIcon sx={{ fontSize: 40 }} />}>ADD</Button>
</TableCell>
</TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

<Container maxWidth="md">
  <Typography variant="h5" align="left" style={{ margin: "20px 0", fontWeight: "bold" }}>
  CRITERIAS FOR CORE VALUES AND OBJECTIVES
  </Typography>
  <br></br>
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left" colSpan={1}>
            <Typography variant="h6">criteria</Typography>
          </TableCell>
          {['a', 'b', 'c', 'd', 'e'].map((value, num) => (
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
  {[...initialCriteria2, ...additionalCriteria2].map((criteria, index) => (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        {criteria}
      </TableCell>
      {['a', 'b', 'c', 'd', 'e'].map((value, num) => (
        <TableCell key={num} align="center">
          <Radio
            value={num + 1}
            checked={ratings2[index] === num + 1}
            onChange={(event) => setRatings2((prevRatings) => ({ ...prevRatings, [index]: Number(event.target.value) }))}
            disabled
          />
        </TableCell>
      ))}
      <TableCell align="center">
        <TextField
          value={ratings2[index] ? ratings2[index] * 20 + '%' : ''}
          disabled
          // Add your other TextField properties here
        />
      </TableCell>
      {index >= initialCriteria2.length && (
        <TableCell align="center">
          <Button onClick={() => setAdditionalCriteria2((prevValues) => prevValues.filter((_, i) => i !== index - initialCriteria2.length))}>Remove</Button>
        </TableCell>
      )}
    </TableRow>
  ))}
  <TableRow>
    <TableCell>
      <TextField
        value={newCriteria2}
        onChange={(e) => setNewCriteria2(e.target.value)}
      />
    </TableCell>
    <TableCell />
    <TableCell />
    <TableCell />
    <TableCell />
    <TableCell />
    <TableCell align="right">

      <Button onClick={() => { setAdditionalCriteria2((prevValues) => [...prevValues, newCriteria2]); setNewCriteria2(""); }} startIcon={<CheckIcon sx={{ fontSize: 40 }} />}>ADD</Button>
    </TableCell>
  </TableRow>

</TableBody>
    </Table>
  </TableContainer>
  
  
  <br></br>



  
</Container>

<Container maxWidth="md">
  <Typography variant="h5" align="left" style={{ margin: "20px 0", fontWeight: "bold" }}>
    OVERALL PERFORMANCE
  </Typography>
  <br></br>
  <Box display="flex" alignItems="center" justifyContent="space-between">
  <Typography variant="h6" sx={{ paddingLeft: '20px' }}>Mean Score</Typography>
  <TextField disabled={true}/>
</Box>
</Container>

<br></br><br></br>
<Container  maxWidth="md">
<Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
  <Typography variant="h6" align="left" sx={{ paddingLeft: '20px' }}>comments /Reccomendations</Typography>
</Box>
</Container>
<Container  maxWidth="md">
    <br></br>
<Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between">
  <TextField multiline rows={4} sx={{ width: '700px' }} disabled />
</Box>
</Container>

<br></br>
    </div>
  )
}

export default EvaluationFormAdminEv;