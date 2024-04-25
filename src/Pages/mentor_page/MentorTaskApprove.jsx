import Mentorsidebar from '../../components/common/Mentorsidebar';
import Header from '../../components/common/Header';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { Card, Box, Typography, Divider, Stack ,CardActions, Button } from '@mui/joy';
import { TableRow, TableCell, Table,TableBody,TableContainer,TableHead } from '@mui/material';

// ProjectdoneList component fetches tasks  

function ProjectdoneListToApprove() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Fetch the tasks from the server
    axios
      .get(`${BASE_URL}taskNotify`, {
        headers: { Authorization: `Bearer ${token}` },
      }) 
      .then(response => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleVerify = (taskId) => {
  

    const token = localStorage.getItem("token");
    const isVerified = { isVerified: true };
    axios
      .put(`${BASE_URL}taskVerify/${taskId}`, isVerified,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        console.log(`Task ${taskId} has been verified.`);
        console.log(response);
        // Update the task in the state
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCancel = (taskId) => {
    const token = localStorage.getItem("token");
    const isVerified = { isVerified: false };
    axios
      .put(`${BASE_URL}taskVerify/${taskId}`, isVerified,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        console.log(`Task ${taskId} has been verified.`);
        console.log(response);
        // Update the task in the state
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
   <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Mentorsidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <Card>
       <Divider />
      <Stack spacing={1} sx={{ my: 1 }}>
          <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1em",
                  width: '50%', 
                }}
              >
                Task
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1em",
                  width: '25%', 
                }}
              >
                Intern Name
              </TableCell>
              <TableCell
                
                sx={{
                  fontWeight: "bold",
                  fontSize: "1em",
                  
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {tasks.map((task) => (
               <TableRow key={task._id}>
                <TableCell  sx={{  width: '50%' }}>  
                  <Typography variant="subtitle1">{task.title}</Typography>
                </TableCell>
                <TableCell sx={{  width: '25%' }}>
                  <Typography variant="subtitle2">{task._userId.fname} {task._userId.lname}</Typography>
                </TableCell>
                <TableCell>
                  <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                    <Button variant="solid" type="submit" size="small" onClick={() => handleVerify(task._id)}>Verify</Button>
                    <Button variant="outlined" color="neutral" size="small" onClick={() => handleCancel(task._id)}>Cancel</Button>
                  </CardActions>
                </TableCell>
              </TableRow>

              ))}

         </TableBody>
        </Table>
       </TableContainer>

       </Stack>
    </Card>

   </Box>
   </Box>
    </>
  );

}

export default ProjectdoneListToApprove;
