import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from '../../config';
import Swal from "sweetalert2";
import {
  Button,
  Dialog,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


function ChangeRole({ userid,onRoleChange }) {
  //const [DialogIsOpen, setDialogIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [data, setData] = useState([]);
  const [open, openchange] = useState(false);
  const [changeRoleId, setChangeRoleId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');


  useEffect(() => {
    if (open) {
    axios
      .get(`${BASE_URL}user/${userid}`,{
        headers: {
        Authorization: `Bearer ${token}`,
    },
  })

      .then((result) => {
        setData(result.data.user);
        console.log(result.data.user.role);
        setSelectedRole(result.data.user.role);

      })
      .catch((err) => { 
        Swal.fire({ position: "top",
        text:err,
        customClass: {
          container: 'my-swal',
          confirmButton: 'my-swal-button' 
        }
     })
        console.log(err);
                       
      });
    }                 

  }, [open]);


 
  {/* handel change role*/}

  const functionopenpopup = () => {
    setChangeRoleId(userid);
    openchange(true);
  };
  const closepopup = () => {
    setChangeRoleId(null);
    openchange(false);
  };

  function handleRoleChange() {
    console.log(selectedRole);
  
    axios
      .put(`${BASE_URL}users/${userid}`, 
      {role: selectedRole},
      {headers: {
         Authorization: `Bearer ${token}` 
       },
      },
       )
      .then((result) => {
        setData({ ...data, role: selectedRole });
      
        console.log(result.data.msg);
        Swal.fire({ position: "top", text:result.data.msg
          ,customClass: {container: 'my-swal',
           confirmButton: 'my-swal-button'} })
           onRoleChange(userid, selectedRole);   
           console.log(selectedRole);
           closepopup();
       
     
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        
          Swal.fire({ position: "top", text:err.response.data.msg
          ,customClass: {container: 'my-swal',
          confirmButton: 'my-swal-button'} 
         })
       //  window.alert(err.response.data.msg)
       closepopup();       
      });
 }
  
return (
    <div>
                <Button
                  onClick={() => functionopenpopup()}
                  variant="contained"
                  sx={{
                    border: '1px solid rgb(46, 51, 181)',
                    color: changeRoleId === userid ? '#fff':'rgb(46, 51, 181)', 
                    backgroundColor: changeRoleId === userid ? '#0056b3':'rgba(42, 45, 141, 0.438)', 
                    '&:hover': {
                      backgroundColor: '#0056b3',
                      color: '#fff', 
                    },
                  }}
                >
                  <ManageAccountsIcon/>
                </Button>
                 
       

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
                            value={selectedRole}
                          //  value={data.role}
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

      </div>
  
  );
}

export default ChangeRole;
