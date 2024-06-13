import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from '../../config';
import { jwtDecode } from "jwt-decode";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Grid,
  IconButton,

} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from '@mui/material/styles';
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Interndetails from "../interntable/intern";
import ProjectTask from "../project/project";
import CircularProgress from '@mui/material/CircularProgress';

function internlist({ rows }) {

  const [role, setRole] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);

  {/* get details in database */}
  const token = localStorage.getItem('token');
  useEffect(() => {
    //const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, []);
 
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}interns`,{
        headers: {
        Authorization: `Bearer ${token}`,
    },
  })

      .then((result) => {
        console.log(result.data.interns); 
        setFilteredData(result.data.interns);
        setData(result.data.interns);
        setIsLoading(false);
        if (result.data.interns.interviewScore) {
          setIsComplete(true);
        }
      })
      .catch((err) => {console.log(err);
                      setIsLoading(false); } );
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
   
  }


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





  return (
 <Grid>  
   <Grid> 
   <Paper style={{ maxWidth: "100%", overflow: "auto" }}>
   <div>
    <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical"/>
      <Typography variant="h4" gutterBottom align="center">
        Intern Details
      </Typography>
      <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical"/>

     <Grid sx={{ justifyContent: "space-between",mb:4 ,display: "flex", alignItems: "center" }}>
    
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100vh",
            borderRadius: "20px",
            boxShadow: 3,
            marginLeft: "1%",
          }}
        >
         
          <InputBase type="text" className="form-control" onChange={Filter} sx={{ ml: 2, flex: 1 }} placeholder="Search Users" />
          <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      
      </Grid>
      <Divider/>
      
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
                Name
              </TableCell>
             
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1em",
                }}
              >
                Email
              </TableCell>
              <TableCell
                
                sx={{
                  fontWeight: "bold",
                  fontSize: "1em",
                  
                }}
              >
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((intern) => (
               
              <TableRow key={intern._id}>
                <TableCell sx={{ fontSize: "1em" }}>
                  {" "}
                  {intern.fname} {intern.lname}{" "}
                </TableCell>
                
                <TableCell sx={{ fontSize: "1em" }}>{intern.email}</TableCell>
                <TableCell>
                 <Box display="flex" alignItems="center">
                   { role !== 'admin' && <Interndetails internId={intern._id} />}
                    <ProjectTask  internId={intern._id}/>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
   </div>
   </Paper>
   </Grid>

</Grid>
 );
}

export default internlist;