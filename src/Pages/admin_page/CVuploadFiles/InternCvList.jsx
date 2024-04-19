/*
//-----------------------CODE SAMPL 1-----------------------
import * as React from "react";
import axios from "axios";
import{ useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography  from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { db } from './firebase-config';
import { collection,
         getDocs,
         addDoc,
         updateDoc,
         deleteDoc,
         FieldValue,
         doc } from 'firebase/firestore';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { TextField }  from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditCVfiles from "./EditCVfiles";
import ViewCVfiles from "./ViewCVfiles";





export default function InternCvList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "cvfiles"); //db.collection name cvfiles
  
 //get details in database //}
/* useEffect(() => {
  axios
    .get("http://localhost:8001/api/users/interns")
    .then((result) => {
      setData(result.data.users);
      
    })
    .catch((err) => console.log(err));
}, []);
 
//--------------//
useEffect(() => {
  axios
    .get("http://localhost:8001/userDetails")
    .then((result) => {
      const usersWithInternName = result.data.users.map(user => ({
        ...user,
        internname: `${user.fname} ${user.lname}`
      }));
      setData(usersWithInternName);
    })
    .catch((err) => console.log(err));
}, []);



/*

//GET REQUEST FROM BACKEND API
useEffect(() => {
  getUsers();
}, []);

const getUsers = async () => {
  try {
  const response = await axios.get("http://localhost:8001/api/users/interns");
  const data = response.data;
  setRows(data.map((doc) => ({ ...doc, internname: `${doc.user.fname} ${doc.user.lname}`, id: doc._id })));
  } catch (error) {
  console.error('Error fetching users:', error);
  // Handle the error appropriately in your application
}
};

*/

/*
// FETCHING DOCUMENT FROM A FIRESTORE COLLECTION
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
-----//



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            //deleteName(id);
        }
      }); 
    }
    
// DELETE THE WHOLE DOCUMENT
    const deleteApi = async (id) => {
        const userDoc = doc(db, "cvfiles", id);
        await deleteDoc(userDoc);
        Swal.fire("Deleted!", "CV file has been deleted.", "success");
        getUsers();
    };
/*
    // DELETE A FIELD IN A DOCUMENT
    const deleteName = async (id) => {
      const userDoc = doc(db, "cvfiles", id);
      await updateDoc(userDoc, {
        internname: FieldValue.delete()
      });
      Swal.fire("Deleted!", "Name has been deleted.", "success");
      getUsers();
    };

----/

    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            getUsers();
        }
    };

    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);
    const handleEditOpen = () => {
      setOpenEdit(true);
    };
    const handleEditClose = () => {
      setOpenEdit(false);
    };
    const handleViewOpen = () => {
      setOpenView(true);
    };
    const handleViewClose = () => {
      setOpenView(false);
    };


  return (
    <>
    <ViewCVfiles open={openView} handleClose={handleViewClose} />
    <EditCVfiles open={openEdit} handleClose={handleEditClose} />
    {rows.length > 0 && (
    <Paper sx={{ width: "100%", overflow: "hidden", padding:"12px" }}>
        <Typography 
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
            >
            CV List
        </Typography>
        <Divider />
        <Box heigth={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={rows}
                sx={{ width: 300 }}
                onChange={(e,v) => filterData(v)}
                getOptionLabel={(rows) => rows.internname || ""}
                renderInput={(params) => (
                    <TextField {...params} size="small" label="Search Intern Name" />
                )}
            />
            <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
            >
            </Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />}>
                Add CV
            </Button>
        </Stack>
        <Box height={10} />
      <TableContainer>
        <Table >
          <TableHead>
            <TableRow>
                <TableCell align="left" sx={{ minWidth: "100px", fontSize: "15px",  fontWeight: "bold" }}>
                    Intern Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px", fontSize: "15px", fontWeight: "bold" }}>
                    CV
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px", fontSize: "15px", fontWeight: "bold" }}>
                    Status
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px"}}>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                        <TableCell  align="left">
                            {row.internname}
                        </TableCell>
                        <TableCell  align="left">
                            {row.cv}
                            <Button variant="contained" color="primary"  onClick={handleViewOpen}> 
                            <AccountCircleIcon />
                            </Button>
                        </TableCell>
                        <TableCell >
                            <span className={`status ${row.status}`}>{row.status}</span>
                        </TableCell>
                        <TableCell align="left">
                            <Stack spacing={2} direction="row">
                               {/*<EditIcon 
                                    style={{
                                        fontSize: "20px", 
                                        color:"blue",
                                        cursor:"pointer",
                                        }}
                                        classname="cursor-pointer"
                                        //onClick={() => editUser(row.id)}
                                      /> -------/}
                                <EditIcon 
                                  style={{
                                    fontSize: "20px", 
                                    color:"blue",
                                    cursor:"pointer",
                                    }}
                                    classname="cursor-pointer"
                                    onClick={handleEditOpen}
                                />
                                
                                <DeleteIcon 
                                    style={{
                                        fontSize: "20px", 
                                        color:"darkred",
                                        cursor:"pointer",
                                        }}
                                        onClick={() =>
                                            { deleteUser(row.id);
                                    }}
                                />  	
                            </Stack>
                        </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10,20,50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )}
  </>
  );
  }




//-----------------------CODE SAMPL 2   working codee-----------------------



import * as React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { db } from './firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditCVfiles from "./EditCVfiles";
import ViewCVfiles from "./ViewCVfiles";
import EditIcon from '@mui/icons-material/Edit';


export default function InternCvList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "cvfiles");

  useEffect(() => {
    getUsers();
  }, []);
/* previous code----
  const getUsers = async () => {
    try {
      const data = await getDocs(empCollectionRef);
      setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
///////////


    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/users/user");
        const data = response.data;
        console.log(response.data)
        setRows(data.map((doc) => ({ ...doc, internname: `${doc.user.fname} ${doc.user.lname}`, id: doc._id })));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getUsers();
    }
  };

  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const handleEditOpen = () => {
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const handleViewOpen = () => {
    setOpenView(true);
  };
  const handleViewClose = () => {
    setOpenView(false);
  };

  return (
    <>
      <ViewCVfiles open={openView} handleClose={handleViewClose} />
      <EditCVfiles open={openEdit} handleClose={handleEditClose} />
        <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px", fontWeight: "bold" }}
          >
            Interns' cv list
          </Typography>
          <Divider />
          <Box heigth={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.internname || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Intern Name" />
              )}
            />
          </Stack>
          <Box height={10} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ minWidth: "100px", fontSize: "15px", fontWeight: "bold" }}>
                    Intern Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px", fontSize: "15px", fontWeight: "bold" }}>
                    CV
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px", fontSize: "15px", fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        <TableCell align="left">
                        {row.user && `${row.user.fname} ${row.user.lname}`}
                        </TableCell>
                        <TableCell align="left">
                          {row.cv}
                          <Button variant="contained" color="primary" onClick={handleViewOpen}>
                            <AccountCircleIcon />
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          <span className={`status ${row.status}`}>{row.status}</span>
                          {row.hasFile ? 'Completed' : 'Pending'}
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
                              onClick={handleEditOpen}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => { deleteUser(row.id); }}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
    </>
  );
}

/*

import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function InternCvList() {
  const [rows, setRows] = useState([]);


  useEffect(() => {
    axios
    .get('http://localhost:8001/userDetails') // replace with your correct API endpoint
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return response.data;
      })
      .then(data => Array.isArray(data) ? setRows(data) : setRows([]))
      .catch(error => console.error(error));  
  }, []);



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Intern Name</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Email</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            row.user && 
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.user.fname} {row.user.lname}
              </TableCell>
              <TableCell align="right">{row.user.role}</TableCell>
              <TableCell align="right">{row.user.email}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
*/

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
import { Tab } from "bootstrap";



export default function InternCvList({ rows }) {

  const [data, setData] = useState([]);

  
  const [filteredData, setFilteredData] = useState([]);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  {/* get details in database */}
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

// open and close function
const [openEdit, setOpenEdit] = useState(false);
const [openView, setOpenView] = useState(false);
const handleEditOpen = () => {
  setOpenEdit(true);
};
const handleEditClose = () => {
  setOpenEdit(false);
};
const handleViewOpen = () => {
  setOpenView(true);
};
const handleViewClose = () => {
  setOpenView(false);
};


return (
<>
  <ViewCVfiles open={openView} handleClose={handleViewClose} />
  <EditCVfiles open={openEdit} handleClose={handleEditClose} />
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
                          <Button variant="contained" color="primary" onClick={handleViewOpen}>
                            <AccountCircleIcon />
                          </Button>
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
                              onClick={handleEditOpen}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => { deleteUser(user.id); }}
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
            //count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
   </Paper>
  </>
  );
}


