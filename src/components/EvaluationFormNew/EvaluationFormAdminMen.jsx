import React, { useState,useEffect } from 'react';
import { Typography, Container, Box, InputLabel, TextField, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Radio, Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';


function EvaluationFormAdminMen({ mentorName: selectedMentorName, evaluationFormDetailsId, setJobPerformanceCriteriasMentor, setCoreValuesCriteriasMentor }) {
   //initial criteria for job performance table
  const initialCriteria3 = [
    "Job Skill and System Proficiency",
    "Quality of work - Free from errors and mistakes. Accuracy, quality of work in general",
    "Effective Communication and Knowledge Sharing",
    "Adapts Positively to Change and Challenges",
    "Timeliness - On-time Delivery of Projects & Achieve Internal Target On Projects",
    "Reliability-The intern can be depended upon to be available for work, to complete work"
  ];

  //initial criteria for core values table
  const initialCriteria4 = [
    "Builds Strong Relationships with Diversity",
    "Planning and organizing- The ability to analyze work, set goals, develop plans of action, utilize time.",
    "Initiative and creativity -  The ability to  proceed with a task without being told every detail and the ability to make constructive suggestions.",
    "Cooperation - Willingness to work harmoniously with others in getting a job done.",
    "Decision-making - The ability to make decisions and the quality and timeliness of those decisions",
    "Compliance and Professionalism",
    "Attendance -Consistency in coming to work daily and conforming to scheduled work hours.",
    // can Add more initial crteria as needed
  ];


  const [additionalCriteria3, setAdditionalCriteria3] = useState([]);
  const [additionalCriteria4, setAdditionalCriteria4] = useState([]);
  const [newCriteria3, setNewCriteria3] = useState("");
  const [newCriteria4, setNewCriteria4] = useState("");
  const [ratings3, setRatings3] = useState([]);
  const [ratings4, setRatings4] = useState([]);

  const handleRadioChange3 = (event, index) => {
    setRatings3(prevRatings => {
      const newRatings = [...prevRatings];
      newRatings[index] = Number(event.target.value);
      return newRatings;
    });// handle radio change for table 3
  };

  const handleRadioChange4 = (event, index) => {
    setRatings4(prevRatings => {
      const newRatings = [...prevRatings];
      newRatings[index] = Number(event.target.value);
      return newRatings;
    });// handle radio change for table 4
  };

  const handleRemoveCriteria3 = (index) => {
    setAdditionalCriteria3(prevCriteria => prevCriteria.filter((_, i) => i !== index));
  };// handle remove criteria for table 3


  const handleRemoveCriteria4 = (index) => {
    setAdditionalCriteria4(prevCriteria => prevCriteria.filter((_, i) => i !== index));
  };// handle remove criteria for table 4

  const [mentorName, setMentorName] = useState(selectedMentorName); // Use it as initial value here
  // rest of the code...

    // Use useEffect to print the evaluationFormDetailsId when the component mounts
    useEffect(() => {
      setJobPerformanceCriteriasMentor(initialCriteria3.concat(additionalCriteria3));
      setCoreValuesCriteriasMentor(initialCriteria4.concat(additionalCriteria4));
    }, [additionalCriteria3, additionalCriteria4]);


  

  return (
    <div>
      <Typography variant="h4" align="center" style={{ margin: "20px 0" }}>
        Mentor
      </Typography>
      <Container maxWidth="md">
        <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="20px">
          <InputLabel sx={{ paddingRight: 2, fontSize: "1.25rem" }}>
            Assigned Mentor name
          </InputLabel>
          <TextField
            placeholder={mentorName}
            style={{ width: '650px' }} // Remove flex: 1
            value={mentorName}
            onChange={(e) => setMentorName(e.target.value)} // Corrected here
            disabled={true}
          />
        </Box>
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

       {/*----table 3 start */}

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
  {[...initialCriteria3, ...additionalCriteria3].map((criteria, index) => (
    <TableRow key={criteria}>
      <TableCell component="th" scope="row">
        {criteria}
      </TableCell>
      {['a', 'b', 'c', 'd', 'e'].map((value, num) => (
        <TableCell key={num} align="center">
          <Radio
            value={num + 1}
            checked={ratings3[index] === num + 1}
            onChange={(event) => handleRadioChange3(event, index)}
            disabled={true}
          />
        </TableCell>
      ))}
      <TableCell align="center">
        <TextField
          value={ratings3[index] ? ratings3[index] * 20 + '%' : ''}
          // Add your other TextField properties here
        />
      </TableCell>
      {index >= initialCriteria3.length && (
        <TableCell align="center">
          <Button onClick={() => handleRemoveCriteria3(index - initialCriteria3.length)}>Remove</Button>
        </TableCell>
      )}
    </TableRow>
  ))}
  <TableRow>
    <TableCell>
      <TextField
        value={newCriteria3}
        onChange={(e) => setNewCriteria3(e.target.value)}
      />
    </TableCell>
    <TableCell />
    <TableCell />
    <TableCell />
    <TableCell />
    <TableCell />
    <TableCell align="right">
      <Button onClick={() => { setAdditionalCriteria3((prevValues) => [...prevValues, newCriteria3]); setNewCriteria3(""); }} startIcon={<CheckIcon sx={{ fontSize: 40 }} />}>ADD</Button>
    </TableCell>
  </TableRow>

</TableBody>
    </Table>
  </TableContainer>


    <br></br>
    {/*---------------------------table 4 start*/}
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
  {[...initialCriteria4, ...additionalCriteria4].map((criteria, index) => (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        {criteria}
      </TableCell>
      {['a', 'b', 'c', 'd', 'e'].map((value, num) => (
  <TableCell key={value} align="center">
    <Radio
      value={num + 1}
      checked={ratings3[index] === num + 1}
      onChange={(event) => handleRadioChange3(event, index)}
      disabled={true}
    />
  </TableCell>
))}
      <TableCell align="center">
        <TextField
          value={ratings4[index] ? ratings4[index] * 20 + '%' : ''}
          disabled={true}
          
        />
      </TableCell>
      {index >= initialCriteria4.length && (
        <TableCell align="center">
          <Button onClick={() => handleRemoveCriteria4(index - initialCriteria4.length)}>Remove</Button>
        </TableCell>
      )}
    </TableRow>
  ))}
  <TableRow>
    <TableCell>
      <TextField
        value={newCriteria4}
        onChange={(e) => setNewCriteria4(e.target.value)}
      />
    </TableCell>
    <TableCell />
    <TableCell />
    <TableCell />
    <TableCell />
    <TableCell />
    <TableCell align="right">
      <Button onClick={() => { setAdditionalCriteria4((prevValues) => [...prevValues, newCriteria4]); setNewCriteria4(""); }} startIcon={<CheckIcon sx={{ fontSize: 40 }} />}>ADD</Button>
    </TableCell>
  </TableRow>

</TableBody>
    </Table>
  </TableContainer>
</Container>

{/*-----------------------------overall performans mentor---------------------------------*/}

<Container maxWidth="md">
  <Typography variant="h5" align="left" style={{ margin: "20px 0", fontWeight: "bold" }}>
    OVERALL PERFOMANCE
  </Typography>
  <br></br>
  <Box display="flex" alignItems="center" justifyContent="space-between">
  <Typography variant="h6" sx={{ paddingLeft: '20px' }}>Mean Score</Typography>
  <TextField disabled={true}/>
</Box>
</Container>


<Container maxWidth="md"  >
<Typography variant="h5" align="left" style={{ margin: "20px 0", fontWeight: "bold" }}>
  ACTION TAKEN
  </Typography>
</Container>

<Container  maxWidth="md"  >
<Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
  <Typography  align="left" sx={{ paddingLeft: '20px' }}>What are the action taken to improve His/her Performance & Development:</Typography>
</Box>
</Container>
<Container  maxWidth="md"  >
        <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between">
          <TextField multiline rows={4} sx={{ width: '700px' }}  disabled/>
        </Box>
      </Container>
<Container  maxWidth="md"  >
<Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
  <Typography  align="left" sx={{ paddingLeft: '20px' }}>comments /Reccomendations:</Typography>
</Box>
</Container>
<Container  maxWidth="md">
        <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between">
          <TextField multiline rows={4} sx={{ width: '700px' }} disabled/>
        </Box>
      </Container>


<br></br>
    </div>
  )
}

export default EvaluationFormAdminMen
