import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
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
import image3  from "../../assets/Unknown_person.jpg"
function interndetails({ internId }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    dob: "",
    role: "",
    gender: "",
    email: "",
  });
  const [imageUrl, setImageUrl] = useState(null);
  console.log(data);

  useEffect(() => {
    if (open) {
       const token = localStorage.getItem("token");
      axios
        .get(`${BASE_URL}interns/${internId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then((result) => {
          setData(result.data.intern);
          console.log(result.data.intern);
          setImageUrl(result.data.intern.imageUrl);
        })
        .catch((err) => console.log(err));
    }
  }, [open]);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !data.fname ||
      !data.lname ||
      !data.dob ||
      !data.role ||
      !data.gender ||
      !data.email||
      !data.interviewScore||
      !data.interviewFeedback||
      !data.mentor
    ) {
      window.alert("Please fill the required fields");
      return;
    }

    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(data.fname) || !nameRegex.test(data.lname)) {
      window.alert("name must only contain letters.");
      return;
    }
    const token = localStorage.getItem("token");
  axios
     .put(`${BASE_URL}interns/${internId}`, data ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
     .then((response) => {
       window.alert(response.data.msg);
       window.location.reload(); 
       console.log(response.data.msg);
     })
     .catch((error) => {
       console.log(error);
       window.alert("Failed to update");
       handleClose();
     })

  };

  return (
    <div>
      <Button
        onClick={() => handleClickOpen(internId)}
        variant="contained"
        size="small"
        color="primary"
        sx={{ padding: "10px", marginLeft: "2%", fontSize: "0.8rem" }}
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
                         <img
                        src={imageUrl || image3} 
                        loading="lazy"
                        alt=""
                       />
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
                          left: 100,
                          top: 170,
                          boxShadow: "sm",
                        }}
                      >
                        <EditRoundedIcon />
                      </IconButton>
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
                            <Input size="sm" value={data.role} />
                          </FormControl>
                        </Grid>
                        <Grid item xs={3} sm={4}>
                          <FormControl>
                            <FormLabel>phone number</FormLabel>
                            <Input size="sm"
                                 value={data.phonenumber}
                                 onChange={(e) =>
                                  setData({ ...data, phonenumber: e.target.value })
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
                          <img
                           src={imageUrl || image3} 
                           loading="lazy"
                           alt=""
                       />
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
                      <Input size="sm" value={data.role} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>phone number</FormLabel>
                      <Input size="sm" value={data.phonenumber}
                       onChange={(e) =>
                        setData({ ...data, phonenumber: e.target.value })
                      }
                      />
                    </FormControl>

                    <div>
                      <FormControl sx={{ display: { sm: "contents" } }}>
                        <FormLabel>Gender</FormLabel>
                        <Input
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
                          <Input size="sm" 
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
                            size="sm"
                            placeholder="Interview Score"
                            value={data.interviewScore}
                                type="text"
                                onChange={(e) =>
                                 setData({ ...data, interviewScore: e.target.value })
                                 }
                          />
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                          <FormLabel>Interview FeedBack</FormLabel>
                          <Input
                            size="sm"
                            value={data.interviewFeedback}
                                type="text"
                                onChange={(e) =>
                                 setData({ ...data, interviewFeedback: e.target.value })
                                 }
                            placeholder="Interview FeedBack"
                          />
                        </FormControl>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <FormControl>
                          <FormLabel>mentor Name</FormLabel>
                          <Input
                            size="sm"
                            placeholder="mentor name"
                            value={data.mentor}  
                            onChange={(e) =>
                              setData({ ...data, mentor: e.target.value })
                            }
                            type="text"
                               
                          />
                       </FormControl>
                      <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Mentor Email</FormLabel>
                      <Input
                        size="sm"
                        type="email"
                        startDecorator={<EmailRoundedIcon />}
                        value={data.mentorEmail}
                        onChange={(e) =>
                          setData({ ...data, mentorEmail: e.target.value })
                        }
                        sx={{ flexGrow: 1 }}
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
                  <CardOverflow
                    sx={{ borderTop: "1px solid", borderColor: "divider" }}
                  >
                    <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                      <Button
                        size="sm"
                        variant="solid"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Save
                      </Button>
                    </CardActions>
                  </CardOverflow>
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
