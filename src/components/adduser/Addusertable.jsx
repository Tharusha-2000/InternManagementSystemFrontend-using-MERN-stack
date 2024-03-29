import axios from "axios";
import React, { useEffect, useState } from "react";

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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Adduser from "./Adduser";
import { Add } from "@mui/icons-material";

function Addusertable({ rows }) {
  //const [DialogIsOpen, setDialogIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [data, setData] = useState([]);
  const [open, openchange] = useState(false);
  
  const [filteredData, setFilteredData] = useState([]);

  {/* get details in database */}
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/users/user")
      .then((result) => {
        setFilteredData(result.data.users);
        setData(result.data.users);
        
      })
      .catch((err) => console.log(err));
  }, []);
 
  {/* handel change password*/}

  const functionopenpopup = (userId) => {
    setSelectedUserId(userId);
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  function handleRoleChange() {
    axios
      .put(`http://localhost:8001/api/users/user/${selectedUserId}`, {
        role: selectedRole,
      })
      .then((result) => {
          const updateData=data.map((user) =>
            user._id === selectedUserId ? { ...user, role: selectedRole } : user
          );
        setData(updateData);
        setFilteredData(updateData);
        console.log(result.data.msg);
        closepopup();
      })
      .catch((err) => console.log(err));
  }
  
  {/* delect user*/}

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:8001/api/users/user/${id}`)
        .then((result) => {
          setData(data.filter((user) => user._id !== id));
          console.log(result.data.msg);
          window.location.reload(); 
        })
        .catch((err) => console.log(err));
    }
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
     <br />
      <Typography variant="h4" gutterBottom align="center">
        User List
      </Typography>
      <br />

     <Grid sx={{ justifyContent: "space-between",mb:4 }}>
    
       <Adduser/>
        <br />
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
       
      </Grid>
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
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1em",
                }}
              >
                Role
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
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((user) => (
              <TableRow key={user._id}>
                <TableCell sx={{ fontSize: "1em" }}>
                  {" "}
                  {user.fname} {user.lname}{" "}
                </TableCell>
                <TableCell sx={{ fontSize: "1em" }}>{user.role}</TableCell>
                <TableCell sx={{ fontSize: "1em" }}>{user.email}</TableCell>
                <TableCell>
                  
                    <Button
                      onClick={() => functionopenpopup(user._id)}
                      color="primary"
                      variant="contained"
                    >
                      Change Role
                    </Button>
                 
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
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
