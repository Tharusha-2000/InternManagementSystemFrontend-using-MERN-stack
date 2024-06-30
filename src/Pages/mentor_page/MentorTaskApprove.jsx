import Mentorsidebar from '../../components/common/Mentorsidebar';
import Header from '../../components/common/Header';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { Card, Box, Typography, Divider, Stack ,CardActions, Button } from '@mui/joy';
import { TableRow, TableCell, Table,TableBody,TableContainer,TableHead } from '@mui/material';
import { jwtDecode } from "jwt-decode";
import VerifiedIcon from '@mui/icons-material/Verified';
import Swal from "sweetalert2";
import TablePagination from '@mui/material/TablePagination';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
// ProjectdoneList component fetches tasks  

function ProjectdoneListToApprove() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [verifingId, setVerifingId] = useState(null);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

   if(userRole !== 'mentor'){
      return null; // Do not render the component
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };


  useEffect((taskId) => {
    axios
      .get(`${BASE_URL}taskNotify`, {
        headers: { Authorization: `Bearer ${token}` },
      }) 
      .then(response => {
        console.log(response.data);
        const sortedTasks = response.data.sort((a, b) => a.isVerified - b.isVerified);
        setTasks(sortedTasks);
       
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleVerify = (taskId) => {
    setVerifingId(taskId);
    Swal.fire({
      title: "Are you sure?",
      text: "Verify this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      width: '400px',
    
    }).then((result) => {
     if (result.value) {

      const isVerified = { isVerified: true };
     axios
      .put(`${BASE_URL}taskVerify/${taskId}`, isVerified,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        console.log(`Task ${taskId} has been verified.`);
        console.log(response);
        Swal.fire({ title:"Verified!",
       // text: "task has been verified.",
        icon: "success",
        width: '400px',
      });
       // Update the task in the state
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => task._id === taskId ? {...task, isVerified: true} : task);
        return updatedTasks.sort((a, b) => a.isVerified - b.isVerified);
      });
      })
      .catch(error => {
        console.error(error);
      }).finally(() => {
        // Reset deletingId state here
        setVerifingId(null);
      })
    }else {
      // Reset deletingId state here if the operation was cancelled
      setVerifingId(null);
    }

    });
  };

  const handleCancel = (taskId) => {
    setDeletingId(taskId);
    Swal.fire({
      title: "Are you sure?",
      text: "reject this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      width: '400px',
    
    }).then((result) => {
      if (result.value) {
     const isVerified = { isVerified: false };
    axios
      .put(`${BASE_URL}taskVerify/${taskId}`, isVerified,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        console.log(`Task ${taskId} has been reject.`);
        console.log(response);
        Swal.fire({ title:"rejected!",
       // text: "task has been rejected.",
        icon: "success",
        width: '400px',
      });
        // Update the task in the state
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      })
      .catch(error => {
        console.error(error);
      }).finally(() => {
        // Reset deletingId state here
        setDeletingId(null);
      })
    }else {
      // Reset deletingId state here if the operation was cancelled
      setDeletingId(null);
    }

    });  
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleCancelClick = () => {
    setSearchTerm('');
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
      <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                {!searchTerm && <SearchIcon style={{ cursor: 'pointer' }} />}
                {searchTerm && <CancelIcon onClick={handleCancelClick} style={{ cursor: 'pointer' }} />}
              </InputAdornment>
              ),
            }}
          />
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
                {tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((task) => (
               <TableRow key={task._id}>
                <TableCell  sx={{  width: '50%' }}>  
                  <Typography variant="subtitle1">{task.title}</Typography>
                </TableCell>
                <TableCell sx={{  width: '25%' }}>
                  <Typography variant="subtitle2">{task._userId.fname} {task._userId.lname}</Typography>
                </TableCell>
                <TableCell>
                {task.isVerified ? (
                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
                   <VerifiedIcon color="success" />
                   <Typography variant="subtitle2" color="success" sx={{ ml: 1 }}>Verified</Typography>
                 </Box>
                  ) : (
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        <Button variant="solid" type="submit" size="small"     sx={{
                    border: '1px solid rgb(46, 51, 181)',
                    color:  verifingId === task._id ? '#fff':'rgb(46, 51, 181)', 
                    backgroundColor: verifingId === task._id ?  '#0056b3':'rgba(42, 45, 141, 0.438)', 
                    '&:hover': {
                      backgroundColor: '#0056b3',
                      color: '#fff', 
                    },
                  }} onClick={() => handleVerify(task._id)}>Verify</Button>
                        <Button variant="solid" color="neutral" size="small"   sx={{
                        border: "1px solid rgb(174, 73, 73)",
                        marginLeft: "10px",
                        color: deletingId === task._id ?"#fff" : "rgb(174, 73, 73)", 
                        backgroundColor: deletingId === task._id ? "#CC0000": "rgba(174, 73, 73, 0.314)", 
                       
                        '&:hover': {
                          backgroundColor: "#CC0000",
                          color: "#fff", 
                        },
                      }} 
                      onClick={() => handleCancel(task._id)}>reject</Button>
                    </CardActions>
                     )}
                   </TableCell>
              </TableRow>

              ))}

         </TableBody>
        </Table>
       </TableContainer>
       <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={tasks.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
       </Stack>
    </Card>

   </Box>
   </Box>
    </>
  );

}

export default ProjectdoneListToApprove;
