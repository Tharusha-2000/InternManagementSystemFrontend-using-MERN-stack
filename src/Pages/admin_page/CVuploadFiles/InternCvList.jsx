import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from '../../../config';

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
  Autocomplete,
  Grid,
  IconButton  } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { TextField } from "@mui/material";
import { db } from './firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import EditCVfiles from "./EditCVfiles";
import ViewCVfiles from "./ViewCVfiles";



export default function InternCvList({ rows }) {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // get details in database 
  const token = localStorage.getItem('token');
 
 
  useEffect(() => {
    axios
      .get(`${BASE_URL}users`,{
        headers: {
        Authorization: `Bearer ${token}`,
    },
  })
  
      .then((result) => {
        const internData = result.data.users.filter(user => user.role === 'intern');
        setFilteredData(internData);
        setData(internData);
        
      })
      .catch((err) => console.log(err));
  }, []);
 

// creating filter function
const Filter = (event) => {
  const searchTerm = event.target.value.toLowerCase();
  setFilteredData(
    data.filter(
      (f) =>
        (typeof f.fname === 'string' && f.fname.toLowerCase().includes(searchTerm)) ||
        (typeof f.lname === 'string' && f.lname.toLowerCase().includes(searchTerm)) ||
        ((typeof f.fname === 'string' && typeof f.lname === 'string') && 
         (f.fname.toLowerCase() + ' ' + f.lname.toLowerCase()).includes(searchTerm))||
        (typeof f.role === 'string' && f.role.toLowerCase().includes(searchTerm)) ||
        (typeof f.email === 'string' && f.email.toLowerCase().includes(searchTerm))
    )
  );
};

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};


// delete user row
const deleteUser = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  }).then((result) => {
    if (result.value) {
      deleteApi(id);
    }
  });
}; 

const deleteApi = async (id) => {
  try {
    const userDoc = doc(db, "cvfiles", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "CV file has been deleted.", "success");
    getUsers();
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};


/*
const deleteApi = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8000/api/cvfiles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire("Deleted!", "CV file has been deleted.", "success");
    setData(data.filter((item) => item._id !== id)); 
  } catch (error) {
    console.error('Error deleting CV file:', error);
  }
};
*/

// open and close function
const [openEdit, setOpenEdit] = useState(false);
const [openView, setOpenView] = useState(false);
const [internId, setInternId] = useState(null);
const handleEditOpen = (id) => {
  setInternId(id);
  setOpenEdit(true);
};
const handleEditClose = () => {
  setOpenEdit(false);
};
const handleViewOpen = (id) => {
  setInternId(id);
  setOpenView(true);
};
const handleViewClose = () => {
  setOpenView(false);
};




return (
<>
  <ViewCVfiles open={openView} handleClose={handleViewClose} userId={internId} />
  <EditCVfiles open={openEdit} handleClose={handleEditClose} internId={internId} />
   <Paper sx={{ Width: "100%", overflow: "auto", padding: "12px"}}>
      <Typography variant="h4" gutterBottom align="center" component="div">
       Intern CV List
      </Typography>
      <Divider />
      <Box heigth={10} />


     <Grid sx={{ justifyContent: "space-between",mb:4 }}/>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100vh",
            borderRadius: "20px",
            boxShadow: 3,
            marginLeft: "1%"
          }}
        >
          <InputBase type="text" className="form-control" onChange={Filter} sx={{ ml: 3, flex: 1 }} placeholder="Search Users" />
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
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1em",
                }}
              >
                Inetern Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1em",
                }}
              >
                CV
              </TableCell>
              <TableCell 
                sx={{
                  fontWeight: "bold",
                  fontSize: "1em",
                }}>
                  Status
                {/*<span className={`status ${row.status}`}>{row.status}</span>
                {row.hasFile ? 'Completed' : 'Pending'}*/}
              </TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((user) => (
              <TableRow key={user._id}>
                <TableCell sx={{ fontSize: "1em" }}>
                  {" "}
                  {user.fname} {user.lname}{" "}
                </TableCell>
                {/*<TableCell sx={{ fontSize: "1em" }}>{user.role}</TableCell>
                   <TableCell sx={{ fontSize: "1em" }}>{user.email}</TableCell>*/}
                <TableCell align="left">
                          {user.cv}
                          <Button 
                              variant="contained" 
                              color="primary" 
                              onClick={() => handleViewOpen(user._id)}
                          > View CV
                            {/*<AccountCircleIcon />*/}
                          </Button>
                </TableCell>
                <TableCell align="left">
                    
                  </TableCell>
                <TableCell align="left">
                    <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              classname="cursor-pointer"
                              onClick={() => handleEditOpen(user._id)}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => { deleteApi(user.id); }}
                            />
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
            count={(rows || []).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
   </Paper>
  </>
  );
}


