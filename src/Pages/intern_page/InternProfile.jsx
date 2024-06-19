import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Internsidebar from "../../components/common/Internsidebar";
import Header from "../../components/common/Header";
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import axios from 'axios';
import { BASE_URL } from "../../config";
import image3  from "../../assets/Unknown_person.jpg"
import Swal from "sweetalert2";

import {
  deleteObject,
  getDownloadURL,
  ref, uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebaseconfig"
import { uuidv4 } from '@firebase/util'




export default function InternProfile() {
 
 
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  

  const [data, setData] = useState({
    fname: "",
    lname: "",
    dob: "",
    gender: "",
    email: "",
   
  });


  const [originalData, setOriginalData] = useState({});


  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [oldImagePath, setOldImagePath] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [selectedMentorName, setSelectedMentorName] = useState("");
  const [selectedMentorEmail, setSelectedMentorEmail] = useState("");

  if (userRole !== 'intern') {
    Swal.fire({
      text: 'You do not have permission to access this function.',
      icon: 'error',
      width: '400px',
      customClass: {
        container: 'my-swal',
        confirmButton: 'my-swal-button' 
      }
    });
   
    return null; // Do not render the component
  }
  useEffect(() => {
    if (image) {
      uploadFile();
    }
  }, [image]);


 useEffect(() => {
   
    axios
      .get(`${BASE_URL}user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setData(result.data.user);
        setOriginalData(result.data.user);
        setImageUrl(result.data.user.imageUrl);
        console.log(result.data.user.imageUrl);
         // Pre-fill mentor email and name if available in the data
         if (result.data.user.mentorEmail && result.data.user.mentor) {
          setSelectedMentorEmail(result.data.intern.mentorEmail);
          setSelectedMentorName(result.data.intern.mentor);
        }
      })
      .catch((err) => console.log(err));
  }, []);

 const handleCancel = () => {
    // Reset the form data to the original data
    setData(originalData);
  };


 // Upload file
 const uploadFile =() => {

  if (image === null) {
     return;
  }
  const imagePath = `img/${image.name + uuidv4()}`;
  const imageRef = ref(storage,imagePath);
  const uploadFile = uploadBytesResumable(imageRef, image);

  uploadFile.on('state_changed', (snapshot) => {
    const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
    setProgress(progress)

  }, (err) => {
    console.log("error while uploading file", err);
  }, () => {
    setProgress(0);
    getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      console.log(progress);
    // Delete the previous image
    if (oldImagePath) {
      const oldImageRef = ref(storage, oldImagePath);
      deleteObject(oldImageRef).then(() => {
        console.log('Old image deleted');
      }).catch((error) => {
        console.log('Failed to delete old image', error);
      });
    }
    console.log(imagePath);
    // Save the path of the uploaded image
    setOldImagePath(imagePath);
    console.log(oldImagePath);
    setImageUrl(downloadURL)
    console.log(downloadURL);
    console.log(imageUrl);
     
      axios
         .put(`${BASE_URL}uploadImage`,{imageUrl:downloadURL}, {
           headers: { Authorization: `Bearer ${token}` },
         })
         .then((response) => {
            console.log(response.data.msg);
         })
         .catch((error) => {
           console.log(error);
         });

    });
    setImage(null);
  });
 
}


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
        console.log("Mentors fetched successfully!", response.data);
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
     }
  };


const handleSubmit = (e) => {

  
   e.preventDefault();
   const dob = new Date(data.dob);
   const today = new Date();
   
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
     //update photo after the click save button it not uersfrienly so commented it
    // uploadFile();

    //other details
 axios
    .put(`${BASE_URL}updateinterns`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      Swal.fire({ position: "top", text: response.data.msg 
                  ,customClass: {container: 'my-swal',
                   confirmButton: 'my-swal-button'} });
   //   window.alert(response.data.msg);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
 };
return (
  <>
  <Header />
  <Box height={60} />
      <Box sx={{ display: "flex" }}>  
      <Internsidebar />
    <Box sx={{ flex: 1, width: '100%' }}>
     
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
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
                  <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="icon-button-file"
                      type="file"
                      onChange={(event) => {
                        setImage(event.target.files[0]);
                      }}
                    />
                 <label htmlFor="icon-button-file">
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
                     component="span"
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </label>  
                </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                >
                  <Input size="sm" 
                      value={data.fname}
                      onChange={e => setData({ ...data, fname: e.target.value })}
                      />
                  <Input size="sm" sx={{ flexGrow: 1 }} 
                    value={data.lname}
                    onChange={e => setData({ ...data, lname: e.target.value })}
                   />
                </FormControl>
            </Stack>

            <Stack direction="row" spacing={2}>
            <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Date of Birth</FormLabel>
                      <Input size="sm" type="date" sx={{ flexGrow: 1 }} 
                        value={data.dob}
                        onChange={e => setData({ ...data, dob: e.target.value })}
                      />
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                     
                      <FormLabel>Gender</FormLabel>
                        <Input
                      size="sm"
                      value={data.gender}
                      onChange={e => setData({ ...data, gender: e.target.value })}
                      type="text"
                      fullWidth
                  
                    />
                  </FormControl>
                  </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input size="sm" 
                   value={data.phonenumber}
                   onChange={e => setData({ ...data, phonenumber: e.target.value })} 
                   />
                </FormControl>
                <FormControl>
                            <FormLabel>Role</FormLabel>
                        <Input size="sm" value={data.role} />
                    </FormControl>
                </Stack>
                </Stack>
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
                               readOnly
                          />
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                          <FormLabel>Interview FeedBack</FormLabel>
                          <Input
                            size="sm"
                            value={data.interviewFeedback}
                                type="text"
                                readOnly
                            placeholder="Interview FeedBack"
                          />
                        </FormControl>
                      </Stack>
 <Stack direction="row" spacing={2}>
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
                            mentor Email
                          </FormLabel>
                          <select
                            value={selectedMentorEmail} // Set the default value to the mentor email if available
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
                        <FormControl sx={{ flexGrow: 1 }}>
                          <FormLabel>mentor Name</FormLabel>
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
                        placeholder="Description"
                        value={data.Bio}
                                type="text"
                                onChange={(e) =>
                                      setData({ ...data, Bio: e.target.value })
                                  } 
                      />
                      <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
                        275 characters left
                      </FormHelperText>
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                      <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                      <Button variant="outlined"   color="neutral"   onClick={handleCancel} >
                          Cancel
                    </Button>
                    <Button variant="solid" type="submit"  onClick={handleSubmit}>
                        Save
                    </Button>
                      </CardActions>
                    </CardOverflow>
                  </Card>
      </Stack>
    </Box>
    </Box>
    </> 
  );
}


