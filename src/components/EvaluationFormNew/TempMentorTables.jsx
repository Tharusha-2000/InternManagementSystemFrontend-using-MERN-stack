import React, { useState } from 'react';
import { Container, Typography, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Radio, TextField, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export default function TempMentorTables() {
  const [initialCriteria3, setInitialCriteria3] = useState([]);
  const [additionalCriteria3, setAdditionalCriteria3] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [newCriteria3, setNewCriteria3] = useState("");
  const [initialCriteria4, setInitialCriteria4] = useState([]);
  const [additionalCriteria4, setAdditionalCriteria4] = useState([]);
  const [ratings2, setRatings2] = useState([]);
  const [newCriteria4, setNewCriteria4] = useState("");

  const handleRadioChange = (event, index) => {
    setRatings((prevRatings) => {
      const newRatings = [...prevRatings];
      newRatings[index] = Number(event.target.value);
      return newRatings;
    });
  };

  const handleAddCriteria = () => {
    setAdditionalCriteria3((prevList) => [...prevList, newCriteria3]);
    setNewCriteria3("");
  };

  const handleRemoveCriteria = (index) => {
    setAdditionalCriteria3((prevList) => prevList.filter((_, i) => i !== index));
  };

  const handleRadioChange2 = (event, index) => {
    setRatings2((prevRatings) => {
      const newRatings = {...prevRatings};
      newRatings[index] = Number(event.target.value);
      return newRatings;
    });
  };

  const handleAddCriteria2 = () => {
    setAdditionalCriteria4((prevList) => [...prevList, newCriteria4]);
    setNewCriteria4("");
  };

  const handleRemoveCriteria2 = (index) => {
    setAdditionalCriteria4((prevList) => prevList.filter((_, i) => i !== index));
  };


  return (
    <Container maxWidth="md" display="flex" flexDirection="column" alignItems="center">
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

   {/*  Job performance table - evaluator  (initialcriteria1)*/}
        
        <Container maxWidth="md" display="flex" justifyContent="center" alignItems="Center">

<Typography variant="h5" align="left" style={{ margin: "20px 0", fontWeight: "bold" }}>
  Criterias for Assessing Job Performance
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
        {[...initialCriteria3, ...additionalCriteria3].map((criteria, index) => (
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
            {index >= initialCriteria3.length && (
              <TableCell align="center">
                <Button onClick={() => handleRemoveCriteria(index - initialCriteria.length)}>Remove</Button>
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
<Button onClick={handleAddCriteria} startIcon={<CheckIcon sx={{ fontSize: 40 }} />}>ADD</Button>
</TableCell>
</TableRow>
      </TableBody>
    </Table>
  </TableContainer>
</Container>






   {/*  Job performance table - mentor  (initialcriteria2)*/}


<Container maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
  <Typography variant="h5" align="left" style={{ margin: "20px 0", fontWeight: "bold" }}>
  CORE VALUES AND OBJECTIVES
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
          //value={ratings2[index] ? ratings2[index] * 20 + '%' : ''}
          // Add your other TextField properties here
          disabled
        />
      </TableCell>
      {index >= initialCriteria4.length && (
        <TableCell align="center">
          <Button onClick={() => setAdditionalCriteria4((prevValues) => prevValues.filter((_, i) => i !== index - initialCriteria2.length))}>Remove</Button>
        </TableCell>
      )}
    </TableRow>
  ))}
  <TableRow>
    <TableCell>
      <TextField
        value={newCriteria2}
        onChange={(e) => setNewCriteria4(e.target.value)}
      />
    </TableCell>
    <TableCell />
    <TableCell />
    <TableCell />
    <TableCell />
    <TableCell />
    <TableCell align="right">
      <Button onClick={() => { setAdditionalCriteria4((prevValues) => [...prevValues, newCriteria2]); setNewCriteria2(""); }} startIcon={<CheckIcon sx={{ fontSize: 40 }} />}>ADD</Button>
    </TableCell>
  </TableRow>

</TableBody>
    </Table>
  </TableContainer>
  <br></br>
  <Box display="flex" alignItems="center" justifyContent="space-between">
  <Typography variant="h6" sx={{ paddingLeft: '20px' }}>Total points</Typography>
  <TextField />
</Box>


  
</Container>

<Container maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
  <Typography variant="h5" align="left" style={{ margin: "20px 0", fontWeight: "bold" }}>
    Overall Performance
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
        <TableRow>
          <TableCell component="th" scope="row">
            Overall Performance
          </TableCell>
          {['a', 'b', 'c', 'd', 'e'].map((value, num) => (
            <TableCell key={num} align="center">
              <Radio
                value={num + 1}
                disabled
                // Add your radio button properties here
              />
            </TableCell>
          ))}
          <TableCell align="center">
            <TextField
            disabled
              // Add your TextField properties here
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
</Container>

<br></br><br></br>

<Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
  <Typography variant="h6" align="left" sx={{ paddingLeft: '20px' }}>comments /Reccomendations</Typography>
</Box>
<Container>
    <br></br>
<Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between">
  <TextField multiline rows={4} sx={{ width: '700px' }} dis />
</Box>
</Container>

<br></br>
        </Container>
    




        
        
  



  );
}
