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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';

function Addusertable({ rows }) {
  //const [DialogIsOpen, setDialogIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [data, setData] = useState([]);
  const [open, openchange] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

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
      .catch((err) => { console.log(err);
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
 
  {/* handel change role*/}

  const functionopenpopup = (userId) => {
    setSelectedUserId(userId);
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  function handleRoleChange() {
    console.log(selectedRole);
    if (!selectedRole) {
      Swal.fire({
        position: "top",
        text: "Please select a user",
        customClass: {
          container: 'my-swal',
          confirmButton: 'my-swal-button'
        }
      });
      return; // Exit the function
    }
  
    axios
      .put(`${BASE_URL}users/${selectedUserId}`, 
      {role: selectedRole},
      {headers: {
         Authorization: `Bearer ${token}` 
       },
      },
       )
      .then((result) => {
          const updateData=data.map((user) =>
            user._id === selectedUserId ? { ...user, role: selectedRole } : user
          );
        setData(updateData);
        setFilteredData(updateData);
        console.log(result.data.msg);
        Swal.fire({ position: "top", text:result.data.msg
          ,customClass: {container: 'my-swal',
           confirmButton: 'my-swal-button'} })
        closepopup();
        setSelectedRole(null);
     
      })
      .catch((err) => {
        console.log(err);
        if ( err.response.status ===403 ) {
          Swal.fire({ position: "top", text:err.response.data.msg
          ,customClass: {container: 'my-swal',
          confirmButton: 'my-swal-button'} })

         // window.alert(err.response.data.msg);
         .then(() => {


            localStorage.removeItem('token');
            navigate("/");
         });

        }
               
      });
    
  }
  
  {/* delect user*/}


  const handleDelete = (id) => {
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
        },
      })
          .then((result) => {
            Swal.fire({ title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success",
                        width: '400px',
                     } );
            setFilteredData(data.filter((user) => user._id !== id));
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
          });
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
    backgroundColor: 'rgba(240, 230, 140, 0.2)',
    color: '#FFD700'
  }
};



return (
<Grid>   
   <Grid> 
   <Paper style={{ maxWidth: "100%", overflow: "auto" }}>
   <div>
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
         
             <InputBase
                  type="text"
                  value={searchTerm}
                  onChange={Filter}
                  sx={{ ml: 2, flex: 1 }}
                  placeholder="Search Users"
                />
                <Divider sx={{ height: 15, m: 0.5 }} orientation="vertical" />
              
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
        <Box sx={{ marginRight: "12%" }}>
       
        <Adduser />
        </Box>
      </Grid>
      <Divider/>
      
      
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
                  
                <Button
                  onClick={() => functionopenpopup(user._id)}
                  variant="contained"
                  sx={{
                    border: '1px solid rgb(46, 51, 181)',
                    color: 'rgb(46, 51, 181)', 
                    backgroundColor: 'rgba(42, 45, 141, 0.438)', 
                    '&:hover': {
                      backgroundColor: '#0056b3',
                      color: '#fff', 
                    },
                  }}
                >
                  <ManageAccountsIcon/>
                </Button>
                 
                    <Button
                      sx={{
                        border: "1px solid rgb(174, 73, 73)",
                        marginLeft: "10px",
                        color: "rgb(174, 73, 73)", 
                        backgroundColor: "rgba(174, 73, 73, 0.314)", 
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
   </div>
   </Paper>
   </Grid>

     {/* pop up the change roll*/ }
        <Grid>
           <React.Fragment>
                    <Dialog
                      // fullScreen
                      open={open}
                      onClose={closepopup}
                      fullWidth
                      maxWidth="xs"
                    >
                      <DialogTitle>
                        Change Role
                        <IconButton
                          onClick={closepopup}
                          style={{ float: "right" }}

                        >
                          <CloseIcon color="primary"></CloseIcon>
                        </IconButton>{" "}
                      </DialogTitle>
                      <DialogContent>
                        <Stack spacing={1} margin={1}>
                          <RadioGroup
                            aria-label="role"
                            name="role"
                            onChange={(e) => setSelectedRole(e.target.value)}
                          >

                            <FormControlLabel
                              value="admin"
                              control={<Radio />}
                              label="Admin"
                            />
                            <FormControlLabel
                              value="manager"
                              control={<Radio />}
                              label="Manager"
                            />
                            <FormControlLabel
                              value="mentor"
                              control={<Radio />}
                              label="Mentor"
                            />
                            <FormControlLabel
                              value="evaluator"
                              control={<Radio />}
                              label="Evaluator"
                            />
                            <FormControlLabel
                              value="intern"
                              control={<Radio />}
                              label="Intern"
                            />
                          </RadioGroup>

                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRoleChange}
                          >
                            Save
                          </Button>
                        </Stack>
                      </DialogContent>
                    </Dialog>
                   </React.Fragment>
           </Grid>

      
  </Grid>
  
  );
}

export default Addusertable;
