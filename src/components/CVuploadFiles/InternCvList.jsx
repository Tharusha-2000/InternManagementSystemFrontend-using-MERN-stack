import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from '../../config';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead, 
  TablePagination,
  TableRow,
  Typography, 
  Divider, 
  Button, 
  Box, 
  Stack,
  Grid,
  Avatar,
  IconButton  
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import {
  deleteObject,
  ref 
} from "firebase/storage";
import { storage } from "../../firebaseconfig";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import EditCVfiles from "./EditCVfiles";
import ViewCVfiles from "./ViewCVfiles";
import { jwtDecode } from "jwt-decode";

export default function InternCvList({ rows }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const token = localStorage.getItem('token');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value, 10);
    setPage(0);
  };

  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  if (userRole !== 'admin') {
    return null; // Do not render the component
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${BASE_URL}users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        const internData = result.data.users.filter(user => user.role === 'intern').map(user => ({
          ...user,
          status: user.cvUrl ? 'Available' : 'Pending',
        }));
        setFilteredData(internData);
        setData(internData);
      })
      .catch((err) => console.log(err));
  };

  const Filter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setFilteredData(
      data.filter(
        (f) =>
          (typeof f.fname === 'string' && f.fname.toLowerCase().includes(searchTerm)) ||
          (typeof f.lname === 'string' && f.lname.toLowerCase().includes(searchTerm)) ||
          ((typeof f.fname === 'string' && typeof f.lname === 'string') && 
           (f.fname.toLowerCase() + ' ' + f.lname.toLowerCase()).includes(searchTerm)) ||
          (typeof f.role === 'string' && f.role.toLowerCase().includes(searchTerm)) ||
          (typeof f.email === 'string' && f.email.toLowerCase().includes(searchTerm))
      )
    );
  };

  const deleteFile = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      customClass: {
        popup: 'swal-popup',
      }
    }).then(async (result) => {
      if (result.value) {
        try {
          const user = data.find((item) => item._id === id);
          if (!user) {
            throw new Error('User not found');
          }
          const cvPath = user.cvUrl.replace('https://firebasestorage.googleapis.com/v0/b/zionlogy-4b6e6.appspot.com/o/', '');
          const decodedCvPath = decodeURIComponent(cvPath.split('?')[0]);
          await deleteFromFirebaseStorage(decodedCvPath);
          await deleteFromDB(id);

          Swal.fire({
            title: "Deleted!",
            text: "CV file has been deleted.",
            icon: "success",
            customClass: {
              popup: 'swal-popup',
            }
          });

          // Fetch data after deletion
          fetchData();
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      }
    });
  };

  const deleteFromDB = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${BASE_URL}${id}/deletecv`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted item from the data array
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting CV file:', error);
      throw error;
    }
  };

  const deleteFromFirebaseStorage = async (cvPath) => {
    const cvRef = ref(storage, cvPath);
    try {
      await deleteObject(cvRef);
      console.log(`File ${cvPath} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete file ${cvPath}: `, error);
    }
  };

  const [openEdit, setOpenEdit] = useState(false);
  const [internId, setInternId] = useState(null);

  const handleEditOpen = (id) => {
    setInternId(id);
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };

  return (
    <>
         <EditCVfiles key={internId} open={openEdit} handleClose={handleEditClose} internId={internId} refreshData={fetchData} />
      <Paper sx={{ Width: "100%", overflow: "auto", padding: "12px"}}>
        <Typography variant="h4" gutterBottom align="center" 
          sx={{
            color: 'rgba(0, 0, 102, 0.8)', 
            fontWeight: 'bold', 
            marginBottom: '2px', 
            paddingTop: '10px', 
            backgroundColor: 'rgba(255, 255, 255, 0.5)', 
          }}>
          Intern CV List
        </Typography>
        <Divider />
        <Box heigth={10} />
        <Grid sx={{ justifyContent: "space-between", mb: 4 }} />
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "120vh",
            borderRadius: "20px",
            boxShadow: 3,
            marginLeft: "1%"
          }}
        >
          <InputBase type="text" onChange={Filter} sx={{ ml: 3, flex: 1 }} placeholder="Search Users" />
          <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <br />
        <br />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)", 
                  color: "#fff",
                }}>
                  Intern Name
                </TableCell>
                <TableCell sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)", 
                  color: "#fff",
                }}></TableCell>
                <TableCell sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)", 
                  color: "#fff",
                }}>
                  Status
                </TableCell>
                <TableCell sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)", 
                  color: "#fff",
                }}>
                  Updates
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow key={user._id}>
                  <TableCell align="left">
                    <Box display="flex" alignItems="center">
                      <Avatar src={user.imageUrl} alt={`${user.fname} ${user.lname}`} style={{ marginRight: '20px' }} />
                      <Box>
                        <Typography>
                          {user.fname} {user.lname}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell alignItems="right">
                    {user.status === 'Available' ? (
                      <div style={{ 
                        height: '27px', 
                        width: '65px', 
                        backgroundColor: 'mediumvioletred',
                        borderRadius: '5px', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontSize: '12px'
                      }}>
                        {user.status}
                      </div>
                    ) : (
                      <div style={{ 
                        height: '25px', 
                        width: '60px', 
                        backgroundColor: 'thistle',
                        borderRadius: '5px',  
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'black',
                        fontSize: '12px'
                      }}>
                        {user.status}
                      </div>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Stack spacing={2} direction="row">        
                      <ViewCVfiles internId={user._id} />
                      <Button color="primary" onClick={() => handleEditOpen(user._id)}>
                        <EditIcon style={{ fontSize: "20px", color: "royalblue" }} />
                      </Button>
                      <Button color="primary" onClick={() => deleteFile(user._id)}>
                        <DeleteIcon style={{ fontSize: "20px", color: "royalblue" }} />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
