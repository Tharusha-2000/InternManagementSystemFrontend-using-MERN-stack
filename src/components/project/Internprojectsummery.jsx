import React, { useState, useEffect , forwardRef } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  FormControlLabel
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { BASE_URL } from "../../config";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import TaskIcon from '@mui/icons-material/Task';
import TaskPieChart from './projectpiechart';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TaskBarChart from './projectbarchart';
import TablePagination from '@mui/material/TablePagination';
import { CircularProgress, Container } from "@mui/material";


const Internprojectsummery = forwardRef((props, ref) => {

  // State for tasks and data
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changeRoleId, setChangeRoleId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const token = localStorage.getItem("token");



  
  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks
  const fetchTasks = async () => {
    const response = await axios.get(`${BASE_URL}task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = Array.isArray(response.data)
      ? response.data
      : [response.data];
    setTasks(responseData);
    console.log(responseData);
  };




  // Render component
  return (    
   <div ref={ref}>
    <Grid>  
     
      
    
      <Grid > 
   <Grid item xs={12} sm={6} md={4}>

    <DialogTitle id="form-dialog-title"> PROJECT TASK LIST </DialogTitle>
     

     <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={1} style={{ padding: '10px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '90%', margin: 'auto' }}>
        <Typography variant="h6" style={{ marginBottom: '20px', textAlign: 'center',fontWeight: 'bold', color: 'black', fontSize: '2em'  }}>Task Summary</Typography>
         <div>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          
            <Typography style={{ fontWeight: 'bold', color: 'black' }}> Total Tasks: {tasks.length}</Typography>
            <Typography style={{ fontWeight: 'bold', color: 'green',paddingLeft: '45px' }}>Completed Tasks: {tasks.filter(task => task.isVerified).length}</Typography>
            <Typography style={{ fontWeight: 'bold', color: 'red' }}>Tasks  To Do: {tasks.filter(task => !task.isVerified).length}</Typography>
          </div>
          <div style={{ width: '100%', maxWidth: '500px' }}>
            {tasks.length > 0 ? (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <TaskPieChart tasks={tasks} />
              </div> 
            ) : (
              <Typography> </Typography>
            )}
          </div>
         </div>
           
     <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold'}}>
        Task Overview
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : tasks.length > 0 ? (
        <Box my={4}>
          <TaskBarChart tasks={tasks} />
        </Box>
      ) : (
        <Typography align="center">No tasks found</Typography>
      )}
    </Container>
        </Paper>
      </Grid>
     </Grid>
   
  
    <div>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "1500px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        

        <Card sx={{ backgroundColor: '#E9FBF7' }}>
          <Box sx={{ mb: 1 }}>
            <Typography
              level="title-md"
              style={{ fontSize: "18px", fontWeight: "bold", color: "green" }}
            >
              DONE LIST{"  "}
              <DoneAllIcon style={{ color: "green" }} fontSize="medium" />
            </Typography>
            <Typography level="body-sm">
              completed task and verified by mentor
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <TableContainer>
              <Table>
                <TableBody>
                  {tasks
                    .filter((task) => task.isVerified)
                    .map((task) => (
                      <TableRow key={task._id} sx={{ height: '10px' }}>
                        <TableCell>
                          <Typography>{task.title}</Typography>
                          </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Card>
      </Stack>

    </div>

 
   </Grid>
   </Grid>
  </Grid>
  </div>
  );
});


export default Internprojectsummery;
