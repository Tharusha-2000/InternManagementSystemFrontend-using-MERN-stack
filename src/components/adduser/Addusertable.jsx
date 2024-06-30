import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from '../../config';
import Swal from "sweetalert2";
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
  TextField,
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
import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Adduser from "./Adduser";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeRole from "./ChangeRole";


function Addusertable({ rows }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  {/* get details in database */}
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  if (userRole !== 'admin') {
    return null; // Do not render the component
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}users`,{
        headers: {
        Authorization: `Bearer ${token}`,
    },
  })
 
      .then((result) => {
        
       // console.log(result.data.users); 
        setFilteredData(result.data.users);
        setData(result.data.users);
        setIsLoading(false);
      })
      .catch((err) => { console.log(err.response.data.msg);
                        Swal.fire({ position: "top", text:err.response.data.msg
                        ,customClass: {container: 'my-swal',
                        confirmButton: 'my-swal-button'} })
                        setIsLoading(false);
                      });

  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
   
  }
 
  
  {/* delect user*/}


  const handleDelete = (id) => {
    setDeletingId(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      width: '400px',
    
    }).then((result) => {
      if (result.value) {
        axios
          .delete(`${BASE_URL}users/${id}`,{
            headers: {
            Authorization: `Bearer ${token}`,
        }
        
      })
          .then((result) => {
            Swal.fire({ title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success",
                        width: '400px',
                     } );
            setFilteredData((prevFilteredData) => prevFilteredData.filter((user) => user._id !== id));
          
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 403) {
               Swal.fire({ position: "top", text: err.response.data.msg
                          ,customClass: {container: 'my-swal',
                                confirmButton: 'my-swal-button'} })
                         
                // window.alert(err.response.data.msg);
               .then(() => {
                localStorage.removeItem('token');
                navigate("/");
               })
            }
          }) .finally(() => {
            // Reset deletingId state here
            setDeletingId(null);
          })

        
      }else {
        // Reset deletingId state here if the operation was cancelled
        setDeletingId(null);
      }

    });
  };
  


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

const roleStyles = {
  admin: {
    backgroundColor: 'rgba(139, 0, 139, 0.2)', 
    color: '#8B008B'
  },
  mentor: {
    backgroundColor: 'rgba(138, 43, 226, 0.2)', 
    color: '#8A2BE2'
  },
  evaluator: {
    backgroundColor: 'rgba(0, 100, 0, 0.2)', 
    color: '#008000'
  },
  manager: {
    backgroundColor: 'rgba(255, 160, 122, 0.2)',
    color: '#FFA07A'
  },
  intern: {
    backgroundColor: 'rgba(113, 176, 224, 0.2)', 
    color: '#007BFF' 
  }
};

const handleUserAdded = (newUser) => {
  setData(prevData => [...prevData, newUser]);
  setFilteredData(prevData => [...prevData, newUser]);
 
};

const SetRoleChange = (userid, newRole) => {
  console.log(userid, newRole);

  const updatedData = data.map(user =>
    user._id === userid ? { ...user, role: newRole } : user
  );
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
        All User 
      </Typography>
      <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical"/>
   
  <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '90%',marginLeft: '1%' }}>
  <Paper
    component="form"
    sx={{
      p: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: { xs: "60%", sm: "60%", md: "60%" },
      borderRadius: "20px",
      boxShadow: 3,
      marginLeft: "1%",
      flexGrow: 1, // Allow the TextField to grow and take available space
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
  <Grid >
    <Adduser onUserAdded={handleUserAdded} sx={{ marginLeft: '20px' }} />
  </Grid>
</Stack>
      <Divider sx={{ height: 5, m: 0.5 }} orientation="vertical"/>
   
      
      
      <TableContainer>
        
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
                Role
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
                  paddingLeft: "50px",
                }}
              >
                Actions
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
                          <Typography >
                            {user.fname} {user.lname}
                          </Typography>
                          <Typography color="textSecondary" style={{ fontSize: '0.7rem' }}>
                            {user.jobtitle}
                         </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                <TableCell sx={{ fontSize: "1em", alignItems: "right" }}>
                  <div style={{ 
                    height: '25px', 
                    width: '85px', 
                    borderRadius: '15px', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '14px',
                    ...roleStyles[user.role] 
                  }}>
                    {user.role}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: "1em", color: "" }}>{user.email}</TableCell>
                <TableCell>
                <div style={{ display: 'flex'  }}>
                <ChangeRole userid={user._id}  onRoleChange={SetRoleChange} />       
                    <Button
                      sx={{
                        border: "1px solid rgb(174, 73, 73)",
                        marginLeft: "10px",
                        color: deletingId === user._id ?"#fff" : "rgb(174, 73, 73)", 
                        backgroundColor: deletingId === user._id ? "#CC0000": "rgba(174, 73, 73, 0.314)", 
                        '&:hover': {
                          backgroundColor: "#CC0000",
                          color: "#fff", 
                        },
                      }}
                      variant="outlined"
                      onClick={() => handleDelete(user._id)}
                    >
                       <DeleteIcon/>
                    </Button>
                    </div>  
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

export default Addusertable;
