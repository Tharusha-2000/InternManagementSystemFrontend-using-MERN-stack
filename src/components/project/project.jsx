import React, { useState, useEffect } from "react";
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


function internTaskTable({ internId }) {
  // State for tasks and data
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changeRoleId, setChangeRoleId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const token = localStorage.getItem("token");

  const handleClickOpen = (task) => {
    setChangeRoleId(internId);
    setOpen(true);
  };

  const handleClose = () => {
    setChangeRoleId(null);
    setOpen(false);
  };

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&::after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
     "& .Mui-disabled + .MuiSwitch-track": {

      opacity: 0.991,
    },
    
    "& .Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[200],
    }
  }));






  
  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks
  const fetchTasks = async () => {
    const response = await axios.get(`${BASE_URL}task/${internId}`, {
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
    <Grid>  
    
   
      <IconButton
        onClick={() => handleClickOpen()}
        variant="contained"
        sx={{
          border: "1px solid rgb(46, 51, 181)",
          color:  changeRoleId === internId ?"#fff":"rgb(46, 51, 181)",
          backgroundColor: changeRoleId === internId ?  "#0056b3": "rgba(42, 45, 141, 0.438)",
          padding: "0px 13px",
          fontSize: "0.875rem",
          minWidth: "auto",
          "&:hover": {
            backgroundColor: "#0056b3",
            color: "#fff",
          },
          '& .MuiSvgIcon-root': {
            fontSize: '1.5rem', // Adjust icon size if necessary
          }
        }}
      >
        <TaskIcon />
      </IconButton>
      <Grid > 
   <Grid item xs={12} sm={6} md={4}>
   <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"  maxWidth="md" >
    <DialogTitle id="form-dialog-title"> PROJECT TASK LIST <IconButton onClick={handleClose} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
     <DialogContent>

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
        <Card  sx={{ backgroundColor: '#FFF2F2' }}>
          <Box sx={{ mb: 1 }}>
            <Typography
              level="title-md"
              style={{ fontSize: "18px", fontWeight: "bold", color: "red" }}
            >
              TO DO LIST
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <TableContainer>
              <Table>
                <TableBody>
                  {tasks
                    .filter((task) => !task.isVerified)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((task) => (
                      <TableRow key={task._id} >
                        <TableCell sx={{ width: "75%" }}>
                        <Typography>{task.title}</Typography>
                        </TableCell>

                        <TableCell >
                      
                          <FormControlLabel
                            control={
                              <Android12Switch
                                checked={task.isComplete}
                                 disabled
                               />
                            }
                              label={
                                <Typography variant="body2" style={{fontSize: '0.8rem', color: 'black' }}>
                                {task.isComplete ? "Complete" : "Not Complete"}
                              </Typography>
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tasks.filter((task) => !task.isVerified).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
          </Stack>
        </Card>

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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={tasks.filter((task) => task.isVerified).length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </Stack>
        </Card>
      </Stack>

    </div>

    </DialogContent>
   </Dialog>
   </Grid>
   </Grid>
  </Grid>
  );
}

export default internTaskTable;
