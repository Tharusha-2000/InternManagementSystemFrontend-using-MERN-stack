
import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckIcon from '@mui/icons-material/Check';
import {
  TextField,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  TextareaAutosize,
  Paper,
} from "@mui/material";
import { CenterFocusStrong } from "@mui/icons-material";

function EvaluationFormAdmin() {
  const [internName, setInternName] = useState("");
  const [evaluationDate, setEvaluationDate] = useState("");
  const [evaluator, setEvaluator] = useState(""); // You should fetch or calculate this value
  const [ratings, setRatings] = useState({}); // You should fetch or calculate this value
  const [newCriteria, setNewCriteria] = useState("");
  const [additionalCriteria, setAdditionalCriteria] = useState([]);

 //initial criteria for job performance table
  const initialCriteria = [
    "System Proficiency",
    "Quality of work - Free from errors and mistakes. Accuracy, quality of work in general",
    "Effective Communication",
    "job knowledge",
    "Training & Development - seeks to enhance performance and stays updated with new developments in the field."
  ];


//initial criteria for core values table
  const [initialCriteria2, setInitialCriteria2] = useState([
    "Builds Strong Relationships with Diversity",
    "Planning and organizing- The ability to analyze work, set goals, develop plans of action, utilize time.",
    "Initiative and creativity -  The ability to  proceed with a task without being told every detail and the ability to make constructive suggestions.",
    "Cooperation - Willingness to work harmoniously with others in getting a job done.",
    "Decision-making - The ability to make decisions and the quality and timeliness of those decisions",
    "Compliance and Professionalism"
    // Add more initial criteria as needed
  ]);

  //table 3 - initial criteria for overall performance
  const [initialCriteria3, setInitialCriteria3] = useState([
    "Criteria 1",
    "Criteria 2",
    "Criteria 3",
    // Add more initial criteria as needed
  ]);
  //table 3 -functions
  const [additionalCriteria3, setAdditionalCriteria3] = useState([]);
  const [newCriteria3, setNewCriteria3] = useState("");
  const [ratings3, setRatings3] = useState({});

  const handleRadioChange3 = (event, index) => {
    setRatings3((prevRatings) => ({ ...prevRatings, [index]: Number(event.target.value) }));
  };

  const handleAddCriteria3 = () => {
    setAdditionalCriteria3((prevList) => [...prevList, newCriteria3]);
    setNewCriteria3("");
  };

  const handleRemoveCriteria3 = (index) => {
    setAdditionalCriteria3((prevList) => prevList.filter((_, i) => i !== index));
  };

  //finish-------------------------------------------


  //table 4 - initial criteria for mentor core values

  const [initialCriteria4, setInitialCriteria4] = useState([
    "Criteria 1",
    "Criteria 2",
    "Criteria 3",
    // Add more initial criteria as needed
  ]);

  const [additionalCriteria4, setAdditionalCriteria4] = useState([]);
  const [newCriteria4, setNewCriteria4] = useState("");
  const [ratings4, setRatings4] = useState({});

  const handleRadioChange4 = (event, index) => {
    setRatings4((prevRatings) => ({ ...prevRatings, [index]: Number(event.target.value) }));
  };

  const handleAddCriteria4 = () => {
    setAdditionalCriteria4((prevList) => [...prevList, newCriteria4]);
    setNewCriteria4("");
  };

  const handleRemoveCriteria4 = (index) => {
    setAdditionalCriteria4((prevList) => prevList.filter((_, i) => i !== index));
  };

//finish table4-------------------------------------------



 
  const [additionalCriteria2, setAdditionalCriteria2] = useState([]);
const [newCriteria2, setNewCriteria2] = useState("");
const [ratings2, setRatings2] = useState({});

  const handleRadioChange = (event, index) => {
    setRatings((prevRatings) => ({ ...prevRatings, [index]: Number(event.target.value) }));
  };

  const handleAddCriteria = () => {
    setAdditionalCriteria((prevList) => [...prevList, newCriteria]);
    setNewCriteria("");
  };

  const handleRemoveCriteria = (index) => {
    setAdditionalCriteria((prevList) => prevList.filter((_, i) => i !== index));
  };

  useEffect(() => {
    // Replace 'your-backend-endpoint' with the actual endpoint from which you are fetching the intern name
    axios
      .get("your-backend-endpoint")
      .then((response) => {
        setInternName(response.data.internName);
      })
      .catch((error) => {
        console.error("Error fetching intern name:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Intern Name:", internName);
    console.log("Evaluation Date:", evaluationDate);
  };

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h3" align="left" style={{ margin: "20px 0" }}>
          Intern Evaluation
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="20px">
            <InputLabel sx={{ paddingRight: 2, fontSize: "1.25rem" }}>
              Intern Name
            </InputLabel>
            <TextField
              placeholder={internName}
              style={{ width: '650px' }} // Remove flex: 1
              value={internName}
              onChange={(e) => setInternName(e.target.value)}
            />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="20px">
            <InputLabel sx={{ paddingRight: 2, fontSize: "1.25rem" }}>
              Evaluate before
            </InputLabel>
            <TextField
              type="date"
              value={evaluationDate}
              onChange={(e) => setEvaluationDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              style={{ width: '650px' }} // Remove flex: 1
            />
          </Box>
        </form>
      </Container>
      <Typography variant="h4" align="center" style={{ margin: "20px 0" }}>
        Evaluator
      </Typography>

      <Container maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
        <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="20px">
          <InputLabel sx={{ paddingRight: 2, fontSize: "1.25rem" }}>
            select Evaluator
          </InputLabel>
          <Select
            value={evaluator}
            onChange={(e) => setEvaluator(e.target.value)}
            style={{ width: '650px' }}
          >
            {/* Add your options here */}
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </Box>
      </Container>

      <br></br>
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

        
        
      </Container>

      <br></br>

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
                      />
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <TextField
                      value={ratings[index] ? ratings[index] * 20 + '%' : ''}
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
          />
        </TableCell>
      ))}
      <TableCell align="center">
        <TextField
          value={ratings2[index] ? ratings2[index] * 20 + '%' : ''}
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
<Container  maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
<Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
  <Typography variant="h6" align="left" sx={{ paddingLeft: '20px' }}>comments /Reccomendations</Typography>
</Box>
</Container>
<Container  maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
    <br></br>
<Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between">
  <TextField multiline rows={4} sx={{ width: '700px' }} dis />
</Box>
</Container>

<br></br>




{/*------------------------------------------------Mentor Forms starts----------------------------------*/}







<Typography variant="h4" align="center" style={{ margin: "20px 0" }}>
        Mentor
      </Typography>
<Container  maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
<Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="20px">
            <InputLabel sx={{ paddingRight: 2, fontSize: "1.25rem" }}>
             Assigned Mentor name
            </InputLabel>
            <TextField
              placeholder={internName}
              style={{ width: '650px' }} // Remove flex: 1
              value={internName}
              onChange={(e) => setInternName(e.target.value)}
            />
          </Box>
          </Container>
          <br></br>

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

        
        
      </Container>

       {/*----table 3 start */}

<Container maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
  <Typography variant="h5" align="left" style={{ margin: "20px 0", fontWeight: "bold" }}>
  Additional Criteria 3
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
            checked={ratings3[index] === num + 1}
            onChange={(event) => handleRadioChange3(event, index)}
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


<Container maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
  <Typography variant="h5" align="left" style={{ margin: "20px 0", fontWeight: "bold" }}>
  Additional Criteria 4
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
            checked={ratings4[index] === num + 1}
            onChange={(event) => handleRadioChange4(event, index)}
          />
        </TableCell>
      ))}
      <TableCell align="center">
        <TextField
          value={ratings4[index] ? ratings4[index] * 20 + '%' : ''}
          // Add your other TextField properties here
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

<Container maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
  <Typography variant="h5" align="left" style={{ margin: "20px 0", fontWeight: "bold" }}>
    Overall Performance 2
  </Typography>
  <br></br>
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left" colSpan={1}>
            <Typography variant="h6"></Typography>
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


<Container maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
<Typography variant="h5" align="left" style={{ margin: "20px 0", fontWeight: "bold" }}>
  Action Taken
  </Typography>
</Container>

<Container  maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
<Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
  <Typography  align="left" sx={{ paddingLeft: '20px' }}>What are the action taken to improve His/her Performance & Development:</Typography>
</Box>
</Container>
<Container  maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
    <br></br>
<Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between">
  <TextField multiline rows={4} sx={{ width: '700px' }} dis />
</Box>
</Container>
<Container  maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
<Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
  <Typography  align="left" sx={{ paddingLeft: '20px' }}>comments /Reccomendations:</Typography>
</Box>
</Container>
<Container  maxWidth="md" display="flex" justifyContent="center" alignItems="Center">
    <br></br>
<Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between">
  <TextField multiline rows={4} sx={{ width: '700px' }} dis />
</Box>
</Container>

<Container maxWidth="md" display="flex" justifyContent="flex-end" alignItems="center" style={{ position: 'absolute', right: 0 }}>
  <Button variant="contained" color="primary" style={{ margin: "10px" }}>
    Save
  </Button>
  <Button variant="contained" color="secondary" style={{ margin: "10px" }}>
    Cancel
  </Button>
</Container>












        </div>
  );
}

export default EvaluationFormAdmin;