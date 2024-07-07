import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
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
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Radio,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import Swal from 'sweetalert2';

function ReviewFormAdmin({ internName, mentorName, evaluationFormDetailsId, onClose }) {
  const [evaluationDetails, setEvaluationDetails] = useState(null);

  useEffect(() => {
    const fetchEvaluationDetails = async () => {
      // Corrected the token key to "token" as per your storage setup.
      const tokenKey = 'token'; // Corrected key
      const token = localStorage.getItem(tokenKey);
      console.log(`Retrieved token: ${token}`); // Debugging line

      if (!token) {
        console.error(`Token is not available in local storage under key: ${tokenKey}`);
        return;
      }
      try {
        const response = await axios.get(`${BASE_URL}getReviewDetailsById/${evaluationFormDetailsId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEvaluationDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch evaluation details", error);
        // Handle error (e.g., show an error message)
      }
    };

    if (evaluationFormDetailsId) {
      fetchEvaluationDetails();
    }
  }, []); // Dependency array to re-fetch if id changes

  const handleSaveClick = () => {
    Swal.fire({
      title: 'Evaluation Form',
      text: 'You have already created the evaluation form.',
      icon: 'info',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div>
     <Container maxWidth="md">
        <Typography variant="h3" align="center" style={{ margin: "20px 0" }}>
           Created Evaluation Form
        </Typography>
        <br></br> <br></br> <br></br> <br></br> <br></br>
       
        <Grid container spacing={2} alignItems="center">
  <Grid item xs={12} sm={6}>
    <InputLabel sx={{ mb: 1, fontSize: "1.25rem" }}>
      Intern Name
    </InputLabel>
    <TextField
      fullWidth
      placeholder={internName}
      value={internName}
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
  value={evaluationDetails ? new Date(evaluationDetails.evaluate_before).toLocaleDateString() : ''}
  disabled
  variant="outlined"
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




          <Typography variant="h4" align="center" style={{ margin: "20px 0" }}>
        Evaluator
      </Typography>
           
      <TextField
        fullWidth
        label="Selected Evaluator"
        value={evaluationDetails ? `${evaluationDetails.evaluator} - ${evaluationDetails.evaluator_email}` : ''}
        InputProps={{
          readOnly: true,
        }}
        sx={{ mt: 2 }}
        variant="outlined"
        disabled
      />
{evaluationDetails && evaluationDetails.job_performance_criterias_evaluator && evaluationDetails.core_values_criterias_evaluator &&(
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
              <Typography variant="h6">Criteria</Typography>
            </TableCell>
            {["a", "b", "c", "d", "e"].map((value, num) => (
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
          {evaluationDetails.job_performance_criterias_evaluator.map((criteria, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {criteria}
              </TableCell>
              {["a", "b", "c", "d", "e"].map((value, num) => (
                <TableCell key={num} align="center">
                  <Radio
                    value={num + 1}
                    checked={false} // Assuming you want to show unchecked radio buttons
                    disabled={true} // Assuming you want to show them as disabled
                  />
                </TableCell>
              ))}
              <TableCell align="center">
                {/* If you have a way to calculate weight, insert it here. Otherwise, leave blank or insert a placeholder */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container><br></br>
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
              <Typography variant="h6">Criteria</Typography>
            </TableCell>
            {["a", "b", "c", "d", "e"].map((value, num) => (
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
          {evaluationDetails.core_values_criterias_evaluator.map((criteria, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {criteria}
              </TableCell>
              {["a", "b", "c", "d", "e"].map((value, num) => (
                <TableCell key={num} align="center">
                  <Radio
                    value={num + 1}
                    checked={false} // Assuming you want to show unchecked radio buttons
                    disabled={true} // Assuming you want to show them as disabled
                  />
                </TableCell>
              ))}
              <TableCell align="center">
                {/* If you have a way to calculate weight, insert it here. Otherwise, leave blank or insert a placeholder */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  </Container>
  
)}
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



          </AccordionDetails>
        </Accordion>
        </Container>
        <br></br><br></br> <br></br>








        <Container maxWidth="md">
      <Accordion sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ height: "60px" }}
          >
            <Typography>Click here to see created mentor evaluation form </Typography>
          </AccordionSummary>
          <AccordionDetails>




          <Typography variant="h4" align="center" style={{ margin: "20px 0" }}>
        Mentor
      </Typography>
           
      <TextField
        fullWidth
        label="Selected Evaluator"
        value={evaluationDetails ? `${evaluationDetails.evaluator} - ${evaluationDetails.evaluator_email}` : ''}
        InputProps={{
          readOnly: true,
        }}
        sx={{ mt: 2 }}
        variant="outlined"
        disabled
      />
{evaluationDetails && evaluationDetails.job_performance_criterias_mentor && evaluationDetails.core_values_criterias_mentor &&(
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
              <Typography variant="h6">Criteria</Typography>
            </TableCell>
            {["a", "b", "c", "d", "e"].map((value, num) => (
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
          {evaluationDetails.job_performance_criterias_mentor.map((criteria, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {criteria}
              </TableCell>
              {["a", "b", "c", "d", "e"].map((value, num) => (
                <TableCell key={num} align="center">
                  <Radio
                    value={num + 1}
                    checked={false} // Assuming you want to show unchecked radio buttons
                    disabled={true} // Assuming you want to show them as disabled
                  />
                </TableCell>
              ))}
              <TableCell align="center">
                {/* If you have a way to calculate weight, insert it here. Otherwise, leave blank or insert a placeholder */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container><br></br>
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
              <Typography variant="h6">Criteria</Typography>
            </TableCell>
            {["a", "b", "c", "d", "e"].map((value, num) => (
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
          {evaluationDetails.core_values_criterias_mentor.map((criteria, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {criteria}
              </TableCell>
              {["a", "b", "c", "d", "e"].map((value, num) => (
                <TableCell key={num} align="center">
                  <Radio
                    value={num + 1}
                    checked={false} // Assuming you want to show unchecked radio buttons
                    disabled={true} // Assuming you want to show them as disabled
                  />
                </TableCell>
              ))}
              <TableCell align="center">
                {/* If you have a way to calculate weight, insert it here. Otherwise, leave blank or insert a placeholder */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  </Container>
  
)}
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



          </AccordionDetails>
        </Accordion>
        </Container>

        <br></br><br></br> <br></br>
        <Container maxWidth="md">
  <Box display="flex" style={{ position: "absolute", right: 0 }}>
    <div onClick={() => {
      // Check if the Save button is disabled, then show SweetAlert
      Swal.fire({
        text: "Cannot save, Evaluation Form has already been created", // Corrected the text property
        icon: "error", 
        customClass: {
          container: "my-swal",
          confirmButton: "my-swal-button",
        },
      });
    }}>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "10px", width: "100px", height: "40px" }}
        disabled
      >
        Save
      </Button>
    </div>
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
</Container>
    </div>
  );
}

export default ReviewFormAdmin;