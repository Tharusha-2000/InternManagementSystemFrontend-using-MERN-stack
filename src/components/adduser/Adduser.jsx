import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  InputLabel,
  DialogContent,
  IconButton,
  TextField,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BASE_URL } from "../../config";
import Swal from "sweetalert2";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function Adduser({ onUserAdded }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [data, setData] = useState({
    fname: "",
    lname: "",
    dob: "",
    role: "",
    gender: "",
    email: "",
    password: "",
    jobtitle: "",
    employmentType: "",
    department: "",
  });

  //console.log(data);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dob = new Date(data.dob);
    const today = new Date();
    console.log(dob);
    console.log(today);

    if (
      !data.fname ||
      !data.lname ||
      !data.dob ||
      !data.role ||
      !data.gender ||
      !data.email ||
      !data.password
    ) {
      Swal.fire({
        position: "top",
        text: "Please fill the required fields",
        customClass: {
          container: "my-swal",
          confirmButton: "my-swal-button",
        },
      });
      //window.alert('Please fill the required fields')
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(data.password)) {
      Swal.fire({
        position: "top",
        text: "Password must be at least 6 characters long and contain at least one letter and one number.",
        customClass: {
          container: "my-swal",
          confirmButton: "my-swal-button",
        },
      });
      // window.alert('Password must be at least 6 characters long and contain at least one letter and one number.')
      return;
    }
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(data.fname) || !nameRegex.test(data.lname)) {
      Swal.fire({
        position: "top",
        text: "name must only contain letters.",
        customClass: {
          container: "my-swal",
          confirmButton: "my-swal-button",
        },
      });
      //  window.alert('name must only contain letters.')
      return;
    }
    if (dob > today) {
      Swal.fire({
        position: "top",
        text: "Date of birth must be in the past.",
        customClass: {
          container: "my-swal",
          confirmButton: "my-swal-button",
        },
      });
      // window.alert('Date of birth must be in the past.');
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post(`${BASE_URL}register`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data) {
          Swal.fire({
            position: "top",
            text: result.data.msg,
            customClass: {
              container: "my-swal",
              confirmButton: "my-swal-button",
            },
          }).then(() => {
            if (result.status === 201) {
              onUserAdded(result.data.user);
              console.log(result.data.user);
              handleClose();

              // window.location.reload();
            }
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          borderRadius: "60%",
          backgroundColor: "#3949ab",

          padding: "20px",
          "&:hover": {
            backgroundColor: "#0056b3",
            color: "#fff",
          },
        }}
      >
        <PersonAddIcon color="inherit" style={{ fontSize: 40 }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          // style: {
          //   backgroundColor:   'rgba(173, 216, 230, 1)',
          // },
        }}
      >
        <DialogTitle id="form-dialog-title">
          New Registration
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="First Name"
                  fullWidth
                  onChange={(e) => setData({ ...data, fname: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Last Name"
                  fullWidth
                  onChange={(e) => setData({ ...data, lname: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setData({ ...data, dob: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    onChange={(e) =>
                      setData({ ...data, gender: e.target.value })
                    }
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Role</FormLabel>
                  <RadioGroup
                    row
                    onChange={(e) => {
                      setSelectedValue(e.target.value);
                      setData({ ...data, role: e.target.value });
                    }}
                  >
                    <FormControlLabel
                      value="intern"
                      control={<Radio />}
                      label="Intern"
                    />
                    <FormControlLabel
                      value="evaluator"
                      control={<Radio />}
                      label="Evaluator"
                    />
                    <FormControlLabel
                      value="manager"
                      control={<Radio />}
                      label="Manager"
                    />
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                    />
                    <FormControlLabel
                      value="mentor"
                      control={<Radio />}
                      label="Mentor"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="JobTitle"
                  fullWidth
                  disabled={selectedValue == "intern"}
                  onChange={(e) =>
                    setData({ ...data, jobtitle: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label=" EmploymentType"
                  fullWidth
                  disabled={selectedValue == "intern"}
                  onChange={(e) =>
                    setData({ ...data, employmentType: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Department"
                  fullWidth
                  disabled={selectedValue == "intern"}
                  onChange={(e) =>
                    setData({ ...data, department: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h7">Temporary Login Details</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Register & invite
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Adduser;
