import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Adminsidebar from "./AdminSidebar";
import Internsidebar from "./Internsidebar";
import Managersidebar from "./Managersidebar";
import Mentorsidebar from "./Mentorsidebar";
import Evaluatorsidebar from "./Evaluatorsidebar";
import Header from "./Header";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { BASE_URL } from '../../config';
import Swal from "sweetalert2";
const defaultTheme = createTheme();

export default function Security() {
  const [role, setRole] = useState("");
  const [values, setValues] = useState({
    Newpassword: "",
    Oldpassword: "",
    Confirmpassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, []);

  const getSidebar = () => {
    switch (role) {
      case "admin":
        return <Adminsidebar />;
      case "intern":
        return <Internsidebar />;
      case "mentor":
        return <Mentorsidebar />;
      case "evaluator":
        return <Evaluatorsidebar />;
      case "manager":
        return <Managersidebar />;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    //console.log(values)
    e.preventDefault();
    if (!values.Newpassword || !values.Oldpassword || !values.Confirmpassword) {
          Swal.fire({ position: "top", text: "Please fill the required fields"
          ,customClass: {container: 'my-swal',
          confirmButton: 'my-swal-button'} })
      return;
    }
    if (values.Newpassword !== values.Confirmpassword) {
        Swal.fire({ position: "top", text: "Password and Confirm Password should be same"
          ,customClass: {container: 'my-swal',
          confirmButton: 'my-swal-button'} })
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
if (!passwordRegex.test(values.Newpassword)) {
    Swal.fire({ position: "top", text:   "Password must be at least 6 characters long and contain at least one letter and one number."
          ,customClass: {container: 'my-swal',
          confirmButton: 'my-swal-button'} })
  return;
}



    const token = localStorage.getItem("token");
    axios
      .put(`${BASE_URL}secure`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((result) => {
        if (result.data) {
          Swal.fire({ position: "top", text: result.data.msg
          ,customClass: {container: 'my-swal',
          confirmButton: 'my-swal-button'} });
          setValues({ Newpassword: "", Oldpassword: "", Confirmpassword: "" }); // Reset the state here
        }
      })
      .catch((err) => {
        if (err.response) {
          Swal.fire({ position: "top", text: err.response.data.msg
          ,customClass: {container: 'my-swal',
          confirmButton: 'my-swal-button'} })
        }
      });
  };

  return (
    <>
      <Header />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        {getSidebar()}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Security
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                  To change your password, please fill in the following fields.
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Oldpassword"
                    label="Old password"
                    type="password"
                    id="Oldpassword"
                   value={values.Oldpassword}
                   onChange={(e) =>
                     setValues({ ...values, Oldpassword: e.target.value })
                   }
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Newpassword"
                    label="New password"
                    type="password"
                    id="Newpassword"
                   value={values.Newpassword}
                   onChange={(e) =>
                     setValues({ ...values, Newpassword: e.target.value })
                   }
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Confirmpassword"
                    label="Confirm password"
                    type="password"
                    id="Confirmpassword"
                    value={values.Confirmpassword}
                    onChange={(e) =>
                      setValues({ ...values, Confirmpassword: e.target.value })
                    }
                  />

<Box display="flex" justifyContent="space-between">
  <Box width="45%">
    <Button
      type="button"
      fullWidth
      variant="outlined"
      sx={{ mt: 3, mb: 2 }}
      onClick={(event) => {
        event.preventDefault();
        setValues({ Newpassword: "", Oldpassword: "", Confirmpassword: "" });
      }}
    >
      Cancel
    </Button>
  </Box>
  <Box width="45%">
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Change
    </Button>
  </Box>
</Box>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </Box>
    </>
  );
}
