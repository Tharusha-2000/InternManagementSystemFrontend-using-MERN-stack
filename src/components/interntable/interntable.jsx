import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from '../../config';
import {
  Button,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Box,
  Typography,
  Grid,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from '@mui/material/styles';
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch';
import Interndetails from "../interntable/intern";
import { jwtDecode } from "jwt-decode";
import { useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";


function internTable({ rows }) {
  const [selectedRole, setSelectedRole] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  {/* get details in database */}

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  if (userRole !== 'admin') {
    return null;
  }
 
  useEffect(() => {
    axios
      .get(`${BASE_URL}interns`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setFilteredData(result.data.interns);
        setData(result.data.interns);
        if (result.data.interns.interviewScore) {
          setIsComplete(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&::after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },

    "& .Mui-disabled + .MuiSwitch-track": {
      opacity: 0.99,
    },
    
    "& .Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[200],
    }
  }));


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

const SetDataChange = (internId, newData) => {
  console.log(internId, newData);
  const updatedData = data.map(intern =>
    intern._id === internId ? { ...intern, data: newData } : intern
  );
  console.log(updatedData);
  setData(updatedData);
  setFilteredData(updatedData);
};

  return (
    <Grid container spacing={1}>
        <Grid item xs={12} >
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
        Intern List
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
     // flexGrow: 1, // Allow the TextField to grow and take available space
    }}
  >
   <InputBase type="text" 
      value={searchTerm}
      onChange={Filter}
      placeholder="Search Users"
      fullWidth
      size="small"
      InputProps={{
        style: {
          height: '40px',
          fontSize: '0.875rem',
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
        },
        ml: 2,
        flex: 1,
      }}
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
      
      <TableContainer  >
       <Table>
          <TableHead>
            <TableRow>
            <TableCell
                
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)", 
                  color: "#fff",
                  
                }}
              >
                Name
              </TableCell>
             
              <TableCell
                
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)", 
                  color: "#fff",
                  
                }}
              >
                Email
              </TableCell>
              <TableCell
                
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)", 
                  color: "#fff",
                 padding: isSmallScreen ? '6px' : '16px'
                }}
              >
                Actions
              </TableCell>
              <TableCell
                
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  backgroundColor: "rgba(0, 0, 102, 0.8)", 
                  color: "#fff",
                  
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((intern) => (
               
              <TableRow key={intern._id} >
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
                <TableCell>
                 <Box display="flex" alignItems="center">
                    <Interndetails internId={intern._id}  onDataChange={SetDataChange} />
                   
                  </Box>
                </TableCell>

                <TableCell   sx={{ padding: isSmallScreen ? '6px' : '16px'}}>
                <FormControlLabel
                      control={
                        <Android12Switch
                          checked={intern.interviewScore && intern.mentorEmail }
                          onChange={(e) => 
                            setIsComplete(e.target.checked)
                          }
                        
                        />
                      }

                    />
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

export default internTable;
