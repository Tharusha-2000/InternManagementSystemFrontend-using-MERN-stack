import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Button, 
  TextField,
  Box 
} from '@mui/material';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BASE_URL } from "../../config";



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




const TaskTable = () => {
  // State for tasks and data
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState({ title: '' });


  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  
  const handleClickOpen = (task) => {
    setCurrentTask(task);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };





  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const token = localStorage.getItem('token');
  
  // Function to fetch tasks
  const fetchTasks = async () => {

    const response = await axios.get(`${BASE_URL}task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setData(response.data);
    setTasks(response.data);
    console.log(response.data);
  };

  // Function to add a task
  const addTask = async () => {
    const token = localStorage.getItem('token');
    if (data.title) {
      await axios.post(`${BASE_URL}task`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData({ title: '' });
      fetchTasks();
    }
  };

    {/* delect user*/}

function handleDelete(id) {
        
        if (window.confirm("Are you sure you want to delete this task?")) {
          axios
            .delete(`${BASE_URL}task/${id}`,{
              headers: {
              Authorization: `Bearer ${token}`,
          },

        })   .then(() => {
         // Remove the deleted task from the local state
            setTasks(tasks.filter(task => task._id !== id));
      })
         .catch((err) => {
              console.log(err);
            if ( err.response.status ===403 ) {
              window.alert(err.response.data.msg);
              
            }
        });
      }
};
    
    {/* update task*/}

function handleupdate(id){
        const data = {
          title: currentTask.title,
        };

     axios
         .put(`${BASE_URL}task/${id}`, data ,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
         .then((response) => {
           window.alert(response.data.msg);
           window.location.reload(); 
           console.log(response.data);
         })
         .catch((error) => {
           console.log(error);
         })
    
    };  










  


  // Render component
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          value={data.title}
          onChange={e => setData({ ...data, title: e.target.value })}
          placeholder="Add a task"
          fullWidth
          size="small"
        />
        <Button variant="contained" color="primary" onClick={addTask} size="small">
          AddTask
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete"   onClick={() => handleDelete(task._id)} >
                     <DeleteIcon />
                  </IconButton>

                  <IconButton size="small" color="primary" aria-label="edit" onClick={() => handleClickOpen(task)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>


              </TableRow>
            ))} 
          </TableBody>
        </Table>
      </TableContainer>


     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
            value={currentTask ? currentTask.title : ''}
            onChange={e => setCurrentTask({ ...currentTask, title: e.target.value })}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
            <Button onClick={() => {
         
            handleupdate(currentTask._id);
            handleClose();
            }} color="primary">
            Update
            </Button>
        </DialogActions>
     </Dialog>
    </div>
  );
};

export default TaskTable;