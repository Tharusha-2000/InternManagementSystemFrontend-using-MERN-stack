
import Internsidebar from '../../components/common/Internsidebar';
import Header from '../../components/common/Header';
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL } from "../../config";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";


function TaskTable() {
    // State for tasks and data
    const [tasks, setTasks] = useState([]);
    const [data, setData] = useState({
      title: "",
      isComplete: false,
    });
  
    const [open, setOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

   if (userRole !== 'intern') {
      return null; // Do not render the component
    }
    const handleClickOpen = (task) => {
      setCurrentTask(task);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
   
    // handel complete notcomplete profile button
  
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
    }));
  
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
  

    // Function to add a task
    const addTask = async () => {
      if(!data.title) {
        Swal.fire({ position: "top",
          text:"Please fill the required fields",
          customClass: {
            container: 'my-swal',
            confirmButton: 'my-swal-button' 
          }
       })
      //  window.alert('Please fill the required fields')
        return;
      } 
    
      try {
        await axios.post(`${BASE_URL}task`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData({ title: "" });
        fetchTasks();
      } catch (error) {
        
        if (error.response) {
              Swal.fire({
                  position: "top",
                  text: error.response.data.msg,
                  customClass: {
                    container: 'my-swal',
                    confirmButton: 'my-swal-button'
                  }
                })
        
        } else {
               Swal.fire({
                  position: "top",
                  text: error.message,
                  customClass: {
                    container: 'my-swal',
                    confirmButton: 'my-swal-button'
                  }
                })
        }
      }
    };
          
    
      /* delect task*/
    function handleDelete(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this task!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        width: '400px',
      }).then((result) => {
        if (result.value) {
          axios
            .delete(`${BASE_URL}task/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(() => {
              Swal.fire({
                title: "Deleted!",
                text: "Task has been deleted.",
                icon: "success",
                width: '400px',
              });
              // Remove the deleted task from the local state
              setTasks(tasks.filter((task) => task._id !== id));
            })
            .catch((err) => {
              console.log(err);
              if (err.response.status === 403) {
                Swal.fire({
                  position: "top",
                  text: err.response.data.msg,
                  customClass: {
                    container: 'my-swal',
                    confirmButton: 'my-swal-button'
                  }
                })
                // window.alert(err.response.data.msg);
              }
            });
        }
      });
    }
  
    {/* update task*/}
  
    const handleupdate = async (id) => {
      
     
      
      const data = {
        title: currentTask.title,
      };
    console.log(data.isComplete);
    console.log(data);
       
      await axios
        .put(`${BASE_URL}task/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          Swal.fire({ position: "top",
          text:response.data.msg,
          customClass: {
            container: 'my-swal',
            confirmButton: 'my-swal-button' 
          }
       })
         // window.alert(response.data.msg);
         .then(() => {
          setTasks(
            tasks.map((task) =>
              task._id === id ? { ...task, title: currentTask.title } : task
            )
            );
          console.log(response.data);
         })
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const handleSwitchChange = async (id, isComplete) => {
      // Create the data object
      const data = {
        isComplete: isComplete,
      };
  
      // Send the PUT request
      await axios
        .put(`${BASE_URL}task/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setTasks(
            tasks.map((task) =>
              task._id === id ? { ...task, isComplete: isComplete } : task
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <Internsidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
     <Card sx={{ backgroundColor: '#FFF2F2' }}>
          <Box sx={{ mb: 1 }}>
            <Typography
              level="title-md"
              style={{ fontSize: "18px", fontWeight: "bold", color: "red" }}
            >
              TO DO LIST
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              style={{ marginTop: "30px" }}
            >
             <TextField
  value={data.title}
  onChange={(e) => setData({ ...data, title: e.target.value })}
  placeholder="Add a task"
  fullWidth
  size="small"
  InputProps={{
    style: {
      height: '40px', // Adjust the height as needed
      fontSize: '0.875rem', // Adjust the font size as needed
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px', // Adjust the border radius as needed
    },
  }}
/>

<Button
  variant="solid"
  type="submit"
  onClick={addTask}
  style={{ backgroundColor: '#e7004c', color: 'white' }}
>
  +ADD
</Button>
            </Box>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <TableContainer>
              <Table>
                <TableBody>
                  {tasks
                    .filter((task) => !task.isVerified)
                    .map((task) => (
                      <TableRow key={task._id} >
                        <TableCell sx={{ width: "75%" }}>
                          {task.title}
                        </TableCell>

                        <TableCell >
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDelete(task._id)}
                            sx={{
                              marginRight: "10px",
                              '&:hover': {
                           
                                backgroundColor: '#0056b3',
                                color: '#fff', 
                              
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>

                          <IconButton
                            size="small"
                            color="primary"
                            aria-label="edit"
                            sx={{
                              marginRight: "10px",
                              '&:hover': {
                           
                                backgroundColor: '#0056b3',
                                color: '#fff', 
                              
                              },
                            }}
                            onClick={() => handleClickOpen(task)}
                          >
                            <EditIcon />
                          </IconButton>

                          <FormControlLabel
                            control={
                              <Android12Switch
                                checked={task.isComplete}
                                onChange={(e) => {
                                  // Update the task's status in the local state
                                  setCurrentTask({
                                    ...currentTask,
                                    isComplete: e.target.checked,
                                  });
                                  // Call the function to update the task's status in the database
                                  handleSwitchChange(
                                    task._id,
                                    e.target.checked
                                  );
                                }}
                              />
                            }
                            label="complete"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Card>

        <Card sx={{ backgroundColor: '#E9FBF7' }}>
  <Box sx={{ mb: 1 }}>
    <Typography
      level="title-md"
      style={{ fontSize: "18px", fontWeight: "bold", color: "#26b89a" }}
    >
      DONE LIST{"  "}
      <DoneAllIcon style={{ color: "#26b89a" }} fontSize="medium" />
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
                <TableCell>{task.title}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Stack>
</Card>
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit this task, please enter your task here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            value={currentTask ? currentTask.title : ""}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, title: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleupdate(currentTask._id);
              handleClose();
            }}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
      </Box>
      </Box>
      </>
  );
}
  export default TaskTable;
