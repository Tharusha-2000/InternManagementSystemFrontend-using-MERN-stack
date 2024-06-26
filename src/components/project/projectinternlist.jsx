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
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from '@mui/material/styles';
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Interndetails from "../interntable/intern";
import ProjectTask from "../project/project";
import CircularProgress from '@mui/material/CircularProgress';
import ViewCVfiles from "../CVuploadFiles/ViewCVfiles";
import CloseIcon from "@mui/icons-material/Close";

function internlist({ rows }) {

  const [role, setRole] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
  setSearchTerm(event.target.value);

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

const handleClearSearch = () => {
  setSearchTerm("");
  setFilteredData(data);
};



  return (
 <Grid>  
    <Grid >
   <Paper style={{ maxWidth: "100%", overflow: "auto" }}>
  
   <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical"/>
      <Typography variant="h4" gutterBottom align="center" 
      sx={{
        color: 'rgba(0, 0, 102, 0.8)', 
        fontWeight: 'bold', 
        marginBottom: '2px', 
        paddingTop: '10px', 
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
      }}>
        All Intern Details 
      </Typography>
      <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical"/>

     <Grid sx={{ justifyContent: "space-between",mb:4 ,display: "flex", alignItems: "center" }}>
    
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: { xs: "70%", sm: "80%", md: "90%" },
            borderRadius: "20px",
            boxShadow: 3,
            marginLeft: "1%",
          }}
        >
         
         <InputBase
                  type="text"
                  value={searchTerm}
                  onChange={Filter}
                  sx={{ ml: 2, flex: 1 }}
                  placeholder="Search Interns"
                />
               
                <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical" />
          {searchTerm ? (
                  <IconButton onClick={handleClearSearch} sx={{ p: "10px" }} aria-label="clear">
                    <CloseIcon />
                  </IconButton>
                ) : (
                  <IconButton sx={{ p: "10px" }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                )}
        </Paper>
      
      </Grid>
      <Divider/>
      
      <TableContainer>
        <Table>
     <TableHead>
       <TableRow>
          <TableCell   sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)", 
                  color: "#fff",
                }}
          >Intern Name</TableCell>
          <TableCell  sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)", 
                  color: "#fff",
                 
                }}>Email</TableCell>
          <TableCell  sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)", 
                  color: "#fff",
                  paddingLeft: "70px", 
                }} >Details</TableCell>
          
      </TableRow>
   
          </TableHead>
          <TableBody>
            {filteredData.map((intern) => (
               
              <TableRow key={intern._id}>
              
                  <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        <Avatar src={intern.imageUrl} alt={`${intern.fname} ${intern.lname}`} style={{ marginRight: '20px' }} />
                        <Box>
                          <Typography >
                            {intern.fname} {intern.lname}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  
                
                <TableCell sx={{ fontSize: "1em" }}>{intern.email}</TableCell>
                <TableCell >
                 <Box display="flex" alignItems="center"style={{ marginRight: '80px' }}>
                 <Box style={{ marginRight: '10px' }}>
                   <Typography>
                   { role !== 'admin' ? <Interndetails internId={intern._id} /> : <div style={{ width: '20px' }} /> }
                    </Typography>
                    {role !== 'admin' && (
                    <Typography color="textSecondary" style={{ fontSize: '0.7rem',marginLeft: '10px' }}>
                        Profile
                    </Typography>
                     )}
                    </Box>
                

                    <Box style={{ marginRight: '10px' }}>
                      
                   <Typography>
                   { role !== 'admin' ? <ViewCVfiles internId={intern._id} /> : <div style={{ width: '20px' }} /> }
                    </Typography>
                    {role !== 'admin' && (
                        <Typography color="textSecondary" style={{ fontSize: '0.7rem',marginLeft: '20px' }}>
                          CV
                       </Typography>
                      )}
                    </Box>
                      
                   <Box style={{ marginRight: '10px' }}>
                   <Typography>
                    <ProjectTask  internId={intern._id}/>
                    </Typography>
                    <Typography color="textSecondary" style={{ fontSize: '0.7rem' ,marginLeft: '10px'}}>
                        Tasks
                    </Typography>
                    </Box>

                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
   </Paper>
   </Grid>
</Grid>
 );
}

export default internlist;
