import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BASE_URL } from "../../config";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import image3 from "../../assets/Unknown_person.jpg";
import Swal from "sweetalert2";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { MenuItem } from "@mui/material";
import { jwtDecode } from "jwt-decode";

function interndetails({ internId,onDataChange }) {
  const [open, setOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [selectedMentorName, setSelectedMentorName] = useState("");
  const [selectedMentorEmail, setSelectedMentorEmail] = useState("");
  const [changeRoleId, setChangeRoleId] = useState(null);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    dob: "",
    role: "",
    gender: "",
    email: "",
    mentorEmail: "", 
    mentor: "", 
  });
  const [imageUrl, setImageUrl] = useState(null);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

  if (userRole === 'intern') {
     return null; // Do not render the component
   }

  useEffect(() => {
    if (open) {
     
      axios
        .get(`${BASE_URL}interns/${internId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          setData(result.data.intern);
          setImageUrl(result.data.intern.imageUrl);
          // Pre-fill mentor email and name if available in the data
          if (result.data.intern.mentorEmail && result.data.intern.mentor) {
            setSelectedMentorEmail(result.data.intern.mentorEmail);
            setSelectedMentorName(result.data.intern.mentor);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [open]);

  const handleClickOpen = () => {
    setChangeRoleId(internId);
    setOpen(true);
  };

  const handleClose = () => {
    setChangeRoleId(null);
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dob = new Date(data.dob);
    const today = new Date();
    
    if (
      !data.fname ||
      !data.lname ||
      !data.dob ||
      !data.role ||
      !data.gender ||
      !data.email ||
      !data.GPA||
      !data.interviewScore ||
      !data.interviewFeedback ||
      !data.mentorEmail 
    ) {
      Swal.fire({
        position: "top",
        text: "Please fill the required fields",
        customClass: {
          container: "my-swal",
          confirmButton: "my-swal-button",
        },
      });
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
      // window.alert("name must only contain letters.");
      return;
    }

    if (dob >= today) {
      Swal.fire({ position: "top",
      text:"Date of birth must be in the past.",
      customClass: {
        container: 'my-swal',
        confirmButton: 'my-swal-button' 
      }
      })
     // window.alert('Date of birth must be in the past.');
      return;
    }

    const token = localStorage.getItem("token");
    axios
      .put(`${BASE_URL}interns/${internId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        Swal.fire({
          position: "top",
          text: response.data.msg,
          customClass: {
            container: "my-swal",
            confirmButton: "my-swal-button",
          },
        })
          //  window.alert(response.data.msg);
          .then(() => {
           // window.location.reload();
            onDataChange(internId, data); 
            handleClose();
            console.log(response.data.msg);
          });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "top",
          text: "Failed to update",
          customClass: {
            container: "my-swal",
            confirmButton: "my-swal-button",
          },
        });
        // window.alert("Failed to update");
        handleClose();
      });
  };

  // Fetch mentors from the backend
  useEffect(() => {
    axios
      .get(`${BASE_URL}getAllMentors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMentors(response.data); // Assuming response.data is an array of mentor objects
       
      })
      .catch((error) => {
        console.error("There was an error fetching mentors!", error);
      });
  }, []);

  // Mentor selection handler
  const handleMentorChange = (event) => {
    const selectedMentorEmail = event.target.value;
    console.log("Selected email:", selectedMentorEmail); // Debugging: Check selected email

    const selectedMentor = mentors.find((mentor) => mentor.email === selectedMentorEmail);
    console.log("Selected mentor:", selectedMentor); // Debugging: Check selected mentor object

    if (selectedMentor) {

      setSelectedMentorEmail(selectedMentor.email);
      setSelectedMentorName(selectedMentor.fullName);
        // Access the mentor's first and last name
       console.log  (selectedMentor.fullName)
       console.log( selectedMentorName)
       console.log( selectedMentorEmail)
        setData((prevData) => ({
          ...prevData,
          mentorEmail: selectedMentorEmail,
          mentor: selectedMentor.fullName,
        }));
        console.log(data);
     }
  };

  return (
    <div>
     <Button
          onClick={() => handleClickOpen()}
        variant="contained"
        sx={{
          border: "1px solid rgb(46, 51, 181)",
          color: changeRoleId === internId ? "#fff":"rgb(46, 51, 181)",
          backgroundColor: changeRoleId === internId ? "#0056b3":"rgba(42, 45, 141, 0.438)",
          padding: "0px 13px",
          fontSize: "0.875rem",
          minWidth: "auto",
          "&:hover": {
            backgroundColor: "#0056b3",
            color: "#fff",
          },
          '& .MuiSvgIcon-root': {
            fontSize: '1.5rem', // Adjust icon size if necessary
          }
        }}
      >

      
        <AccountCircleIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {" "}
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Box sx={{ flex: 1, width: "100%", justifyContent: "center" }}>
              <Stack
                spacing={4}
                sx={{
                  display: "flex",
                  maxWidth: "800px",
                  mx: "auto",
                  px: { xs: 2, md: 6 },
                  py: { xs: 2, md: 3 },
                  justifyContent: "center",
                }}
              >
                <Card>
                  <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">Personal info</Typography>
                    <Typography level="body-sm">
                      Customize how your profile information will apper to the
                      networks.
                    </Typography>
                  </Box>
                  <Divider />
                  <Stack
                    direction="row"
                    spacing={3}
                    sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
                  >
                    <Stack direction="column" spacing={1}>
                      <AspectRatio
                        ratio="1"
                        maxHeight={200}
                        sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
                      >
                        <img src={imageUrl || image3} loading="lazy" alt="" />
                      </AspectRatio>
                      
                    </Stack>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                      <Stack spacing={1}>
                        <FormLabel>Name</FormLabel>
                        <Grid item xs={12} sm={6}>
                          <FormControl
                            sx={{
                              display: { sm: "flex-column", md: "flex-row" },
                              gap: 2,
                            }}
                          >
                            <Input
                              readOnly={userRole !== 'admin'} 
                              size="sm"
                              value={data.fname}
                              onChange={(e) =>
                                setData({ ...data, fname: e.target.value })
                              }
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl
                            sx={{
                              display: { sm: "flex-column", md: "flex-row" },
                              gap: 2,
                            }}
                          >
                            <Input
                              readOnly={userRole !== 'admin'} 
                              size="sm"
                              value={data.lname}
                              onChange={(e) =>
                                setData({ ...data, lname: e.target.value })
                              }
                              sx={{ flexGrow: 1 }}
                            />
                          </FormControl>
                        </Grid>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Grid item xs={3} sm={3}>
                          <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input size="sm" value={data.role} readOnly />
                          </FormControl>
                        </Grid>
                        <Grid item xs={3} sm={4}>
                          <FormControl>
                            <FormLabel>phone number</FormLabel>
                            <Input
                              readOnly={userRole !== 'admin'} 
                              size="sm"
                              value={data.phonenumber}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  phonenumber: e.target.value,
                                })
                              }
                            />
                          </FormControl>
                        </Grid>
                      </Stack>

                      <div>
                        <Stack direction="row" spacing={2}>
                          <Grid item xs={3} sm={3}>
                            <FormControl sx={{ flexGrow: 1 }}>
                              <FormLabel>Gender</FormLabel>
                              <Input
                                readOnly={userRole !== 'admin'} 
                                size="sm"
                                value={data.gender}
                                onChange={(e) =>
                                  setData({ ...data, gender: e.target.value })
                                }
                                type="text"
                                fullWidth
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={3} sm={4}>
                            <FormControl sx={{ flexGrow: 1 }}>
                              <FormLabel>Date of Birth</FormLabel>
                              <Input
                                readOnly={userRole !== 'admin'} 
                                size="sm"
                                value={data.dob}
                                type="date"
                                onChange={(e) =>
                                  setData({ ...data, dob: e.target.value })
                                }
                                fullWidth
                              />
                            </FormControl>
                          </Grid>
                        </Stack>
                      </div>
                    </Stack>
                  </Stack>
                  <Stack
                    direction="column"
                    spacing={2}
                    sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
                  >
                    <Stack direction="row" spacing={2}>
                      <Stack direction="column" spacing={1}>
                        <AspectRatio
                          ratio="1"
                          maxHeight={108}
                          sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
                        >
                          <img src={imageUrl || image3} loading="lazy" alt="" />
                        </AspectRatio>
                        <IconButton
                          aria-label="upload new picture"
                          size="sm"
                          variant="outlined"
                          color="neutral"
                          sx={{
                            bgcolor: "background.body",
                            position: "absolute",
                            zIndex: 2,
                            borderRadius: "50%",
                            left: 85,
                            top: 180,
                            boxShadow: "sm",
                          }}
                        >
                          <EditRoundedIcon />
                        </IconButton>
                      </Stack>
                      <Stack spacing={1} sx={{ flexGrow: 1 }}>
                        <FormLabel>Name</FormLabel>
                        <FormControl
                          sx={{
                            display: {
                              sm: "flex-column",
                              md: "flex-row",
                            },
                            gap: 2,
                          }}
                        >
                          <Input
                            readOnly={userRole !== 'admin'} 
                            size="sm"
                            value={data.fname}
                            onChange={(e) =>
                              setData({ ...data, fname: e.target.value })
                            }
                          />
                        </FormControl>
                        <FormControl
                          sx={{
                            display: {
                              sm: "flex-column",
                              md: "flex-row",
                            },
                            gap: 2,
                          }}
                        >
                          <Input
                            readOnly={userRole !== 'admin'} 
                            size="sm"
                            value={data.lname}
                            onChange={(e) =>
                              setData({ ...data, lname: e.target.value })
                            }
                          />
                        </FormControl>
                      </Stack>
                    </Stack>
                    <FormControl>
                      <FormLabel>Role</FormLabel>
                      <Input size="sm" value={data.role} readOnly />
                    </FormControl>
                    <FormControl>
                      <FormLabel>phone number</FormLabel>
                      <Input
                        readOnly={userRole !== 'admin'} 
                        size="sm"
                        value={data.phonenumber}
                        onChange={(e) =>
                          setData({ ...data, phonenumber: e.target.value })
                        }
                      />
                    </FormControl>

                    <div>
                      <FormControl sx={{ display: { sm: "contents" } }}>
                        <FormLabel>Gender</FormLabel>
                        <Input
                          readOnly={userRole !== 'admin'} 
                          size="sm"
                          value={data.gender}
                          type="text"
                          onChange={(e) =>
                            setData({ ...data, gender: e.target.value })
                          }
                          fullWidth
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Date of Birth</FormLabel>
                        <Input
                          readOnly={userRole !== 'admin'} 
                          size="sm"
                          value={data.dob}
                          type="date"
                          onChange={(e) =>
                            setData({ ...data, dob: e.target.value })
                          }
                          fullWidth
                        />
                      </FormControl>
                    </div>
                  </Stack>
                </Card>
                <Card>
                  <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">Other info</Typography>
                  </Box>
                  <Divider />
                  <Stack
                    direction="row"
                    spacing={3}
                    sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
                  >
                    <Stack direction="column" spacing={1}></Stack>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                      <Stack spacing={1}></Stack>

                      <Stack spacing={1}>
                        <FormLabel>University Name</FormLabel>
                        <FormControl
                          sx={{
                            display: { sm: "flex-column", md: "flex-row" },
                            gap: 2,
                          }}
                        >
                          <Input
                          readOnly={userRole !== 'admin'} 
                            size="sm"
                            placeholder="University Name"
                            value={data.university}
                            type="text"
                            onChange={(e) =>
                              setData({ ...data, university: e.target.value })
                            }
                          />
                        </FormControl>
                      </Stack>

                      <Stack direction="row" spacing={2}>
                        <FormControl>
                          <FormLabel>GPA</FormLabel>
                          <Input
                          readOnly={userRole !== 'admin'} 
                            size="sm"
                            placeholder="GPA"
                            value={data.GPA}
                            type="text"
                            onChange={(e) =>
                              setData({ ...data, GPA: e.target.value })
                            }
                          />
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                          <FormLabel>Email</FormLabel>
                          <Input
                            readOnly={userRole !== 'admin'} 
                            size="sm"
                            type="email"
                            startDecorator={<EmailRoundedIcon />}
                            value={data.email}
                            onChange={(e) =>
                              setData({ ...data, email: e.target.value })
                            }
                            sx={{ flexGrow: 1 }}
                          />
                        </FormControl>
                      </Stack>

                      <Stack direction="row" spacing={2}>
                        <FormControl>
                          <FormLabel>Interview Score</FormLabel>
                          <Input
                            readOnly={userRole !== 'admin'} 
                            size="sm"
                            placeholder="Interview Score"
                            value={data.interviewScore}
                            type="text"
                            onChange={(e) =>
                              setData({
                                ...data,
                                interviewScore: e.target.value,
                              })
                            }
                          />
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                          <FormLabel>Interview FeedBack</FormLabel>
                          <Input
                           readOnly={userRole !== 'admin'} 
                            size="sm"
                            value={data.interviewFeedback}
                            type="text"
                            onChange={(e) =>
                              setData({
                                ...data,
                                interviewFeedback: e.target.value,
                              })
                            }
                            placeholder="Interview FeedBack"
                          />
                        </FormControl>
                      </Stack>
                       <Stack direction="row" spacing={1}>
                  
                        <FormControl sx={{ flexGrow: 1 }}>
                          <FormLabel>mentor Email </FormLabel>
                          <select
                            readOnly={userRole !== 'admin'} 
                            value={selectedMentorEmail} 
                            onChange={handleMentorChange}
                            aria-label="Select mentor"
                            style={{
                              appearance: "none",
                              width: "100%",
                              padding: "3px 0px 8px 12px",
                              border: "1px solid #C0C4CC",
                              borderRadius: "8px",
                              background:
                                "white url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'><polyline points='6 9 12 15 18 9'></polyline></svg>\") no-repeat right 10px center",
                              cursor: "pointer",
                              fontSize: "14px",
                              color: "#20262D",
                            }}
                          >
                            <option value="" disabled>
                              Select email
                            </option>
                            {mentors.map((mentor, index) => (
                              <option key={index} value={mentor.email}>
                                {mentor.email}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormControl
                          sx={{
                            flexGrow: 1,
                            position: "relative",
                            minWidth: 100,
                            maxWidth: "178px",
                          }}
                        >
                          
                          <FormLabel
                            htmlFor="mentor-select"
                            sx={{ mb: 1, color: "#20262D" }}
                          >
                            mentor Name
                          </FormLabel>
                          <Input
                            size="sm"
                            placeholder="mentor name"
                             value={selectedMentorName}
                            readOnly
                            onChange={(e) =>
                              setSelectedMentorName(e.target.value)
                            }
                            type="text"
                            disabled={true}
                            style={{ color: "#36454F" }} // Adjust the color here to make it darker
                          />
                        </FormControl>
                      </Stack>

                    </Stack>
                  </Stack>
                </Card>

                <Card>
                  <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">Bio</Typography>
                    <Typography level="body-sm">
                      Write a short introduction to be displayed on your profile
                    </Typography>
                  </Box>
                  <Divider />
                  <Stack spacing={2} sx={{ my: 1 }}>
                    <Textarea
                      size="sm"
                      minRows={4}
                      sx={{ mt: 1.5 }}
                      value={data.Bio}
                      readOnly
                      type="text"
                      onChange={(e) =>
                        setData({ ...data, Bio: e.target.value })
                      }
                      placeholder="Description"
                    />
                    <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
                      275 characters left
                    </FormHelperText>
                  </Stack>
                   {userRole === 'admin' && (
                  <CardOverflow
                    sx={{ borderTop: "1px solid", borderColor: "divider" }}
                  >
                    <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                      <Button
                        size="sm"
                        variant="solid"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={userRole !== 'admin'}
                      >
                        Save
                      </Button>
                    </CardActions>
                  </CardOverflow>
                  )}
                </Card>
              </Stack>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default interndetails;
