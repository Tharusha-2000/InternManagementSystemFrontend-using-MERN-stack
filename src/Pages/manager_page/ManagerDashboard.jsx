import React, { useState, useEffect } from 'react';
import Managersidebar from '../../components/common/Managersidebar';
import Header from '../../components/common/Header';
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate } from 'react-router-dom';
import { Box, 
        Typography,
        Modal, 
        TableRow,
        TableCell,
        Avatar,
        Button,
        IconButton,  
        Menu, 
        MenuItem,
        Table,
        TableBody,
        TableContainer,
        TableHead,
        Paper,
        Select,
        TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from "../admin_page/theme/theme";
import Calendar from '../../components/common/Calendar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LeaveManagement from '../../components/common/Leave';
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import officeImage from '../../assets/office.png';

export default function ManagerDashboard() {

  const [data, setData] = useState({

    fname: "",
    lname: "",
    dob: "",
    gender: "",
    email: "",
    jobtitle: '',
    department: '',
    employmentType: '',
    schedules: [],
  });
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const colors = tokens;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [value, setValue] = useState('0');
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };
  const [internData, setInternData] = useState([]);
  const [mentorData, setMentorData] = useState([]);
  const [evaluatorData, setEvaluatorData] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const [adminData, setAdminData] = useState([]);

  const token = localStorage.getItem('token');


    

   const decodedToken = jwtDecode(token);
   const userRole = decodedToken.role;
   if (userRole !== 'manager') {
     return null; // Do not render the component
   }

  const [userCount, setUserCount] = useState(0);
  const [internCount, setInternCount] = useState(0);
  const [mentorCount, setMentorCount] = useState(0);
  const [evaluatorCount, setEvaluatorCount] = useState(0);  
  const [managerCount, setManagerCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);

  const fetchUserData = () => {
    axios.get(`${BASE_URL}user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
        setData(result.data.user);
        let leaveCount = result.data.user.leaveApplications.filter(application => application.status === 'Approved').length;
        leaveCount = 30- leaveCount ;
        setLeaveCount(leaveCount);

        console.log(result.data.user);
    })
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserData();
  }, [token]); // Dependency array to re-fetch when token changes
  


    // set the date 
    useEffect(() => {
      axios.get(`${BASE_URL}allusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        const fetchedUsers = result.data.users;
        setUsers(fetchedUsers);

        const fetchedInterns = fetchedUsers.filter(user => user.role === 'intern');
        const fetchedMentors = fetchedUsers.filter(user => user.role === 'mentor');
        const fetchedEvaluators = fetchedUsers.filter(user => user.role === 'evaluator');
        const fetchedManagers = fetchedUsers.filter(user => user.role === 'manager');
        const fetchedAdmins = fetchedUsers.filter(user => user.role === 'admin');
 

        setInternData(fetchedInterns);
        setMentorData(fetchedMentors);
        setEvaluatorData(fetchedEvaluators);
        setManagerData(fetchedManagers);
        setAdminData(fetchedAdmins);

        setUserCount(result.data.users.length);
        setInternCount(fetchedInterns.length);
        setMentorCount(fetchedMentors.length);
        setEvaluatorCount(fetchedEvaluators.length);
        setAdminCount(fetchedAdmins.length);
        setManagerCount(fetchedManagers.length);
      })
      .catch((err) => console.log(err));
    }, [token]);

      
      useEffect(() => {
          const timer = setInterval(() => {
            setCurrentDate(new Date());
          }, 60000);
          return () => {
            clearInterval(timer);
          };
        }, []);



        const [showInternList, setShowInternList] = useState(false);
        const [internAnchorEl, setInternAnchorEl] = useState(null);
        const handleInternListClick = (event) => {
          setInternAnchorEl(event.currentTarget);
          setShowInternList(!showInternList);
        };
        const handleInternListClose = () => {
          setInternAnchorEl(null);
          setShowInternList(false);
        };
        
        const [showMentorList, setShowMentorList] = useState(false);
        const [mentorAnchorEl, setMentorAnchorEl] = useState(null);
        const handleMentorListClick = (event) => {
          setMentorAnchorEl(event.currentTarget);
          setShowMentorList(!showMentorList);
        };        
        const handleMentorListClose = () => {
          setMentorAnchorEl(null);
          setShowMentorList(false);
        };

        const [showEvaluatorList, setShowEvaluatorList] = useState(false);
        const [evaluatorAnchorEl, setEvaluatorAnchorEl] = useState(null);
        const handleEvaluatorListClick = (event) => {
          setEvaluatorAnchorEl(event.currentTarget);
          setShowEvaluatorList(!showEvaluatorList);
        };
        const handleEvaluatorListClose = () => {
          setEvaluatorAnchorEl(null);
          setShowEvaluatorList(false);
        };


        const [showManagerList, setShowManagerList] = useState(false);  
        const [managerAnchorEl, setManagerAnchorEl] = useState(null);
        const handleManagerListClick = (event) => {
          setManagerAnchorEl(event.currentTarget);
          setShowManagerList(!showManagerList);
        }
        const handleManagerListClose = () => {
          setManagerAnchorEl(null);
          setShowManagerList(false);
        };

        const [open, setOpen] = useState(false);

        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);


        
        const deleteSchedule = async (eventId) => {
          try {
            const response = await axios.delete(`${BASE_URL}schedule/${eventId}`, {
              headers: {
                'Authorization': `Bearer ${token}` 
              }
            });
            console.log(response); 
            if (response.status === 200) {
              setData((prevData) => ({
                ...prevData,
                schedules: prevData.schedules.filter(schedule => schedule._id !== eventId)
              }));
            }
          } catch (error) {
            console.error('Error deleting schedule:', error);
            alert('Failed to delete the event');
          }
        };
        

        const [leaveOpen, setLeaveOpen] = useState(false);
        const [formData, setFormData] = useState({ userId: '', leaveDate: '', reason: '' });
        const [errors, setErrors] = useState({ leaveDate: '', reason: '' });
        const [leaveApplications, setLeaveApplications] = useState([]);
        const handleLeaveClickOpen = () => {
          setLeaveOpen(true);
        };
      
        const handleLeaveClose = () => {
          setLeaveOpen(false);

          setErrors({ leaveDate: '', reason: '' }); // Clear errors when closing the form

        };
      
        const handleLeaveChange = (event) => {
          const { name, value } = event.target;
          setFormData({ ...formData, [name]: value });
        };
      
        const validateForm = () => {
          const newErrors = { leaveDate: '', reason: '' };
          const leaveDate = new Date(formData.leaveDate);
          const today = new Date();
          
          // Set the time to 00:00:00 for both dates to compare only the date part
          leaveDate.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);
      
          if (leaveDate < today) {
            newErrors.leaveDate = "Date cannot be in the past.";
          }
      
          if (!formData.reason) {
            newErrors.reason = "Reason for leave is required.";
          }
      
          setErrors(newErrors);
          return !newErrors.leaveDate && !newErrors.reason;
        };
      
        const handleSubmit = () => {
          if (validateForm()) {
            axios.post(`${BASE_URL}applyLeave`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(() => {
              handleLeaveClose();
              axios.get(`${BASE_URL}getLeaveApplications`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((result) => {
                const leaveApplications = result.data.leaveApplications.flatMap(application => ({
                  ...application,
                  user: {
                    fname: application.user.fname,
                    lname: application.user.lname,
                    jobTitle: application.user.jobtitle,
                    imageUrl: application.user.imageUrl, 
                  }
                }));
                setLeaveApplications(leaveApplications);
              })
              .catch((err) => console.log(err));
            })
            .catch((error) => console.log(error));
          } else {
            Swal.fire({
              position: "top",
              text: "Please fix the errors before submitting.",
              customClass: {
                container: 'my-swal',
                confirmButton: 'my-swal-button',
              }
            });
          }
        };
     

      return (
      <>
      <Header />
      <Box height={60} />
      <Box sx={{ display: 'flex' }}>
      <Managersidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>

      {/* GRID & CHARTS */}
        <Box
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(12, 1fr)' }}
            gridAutoRows="minmax(100px, auto)"
            gap="13px"
          >
            {/* ROW 1 */}
            <Box
              gridColumn={{ xs: 'span 12', md: 'span 8' }}
              gridRow="span 2"
              borderRadius={4}
              boxShadow="1px 2px 5px rgba(0, 0, 0, 0.2)"
              sx={{

                backgroundColor: 'lightsteelblue',

                backgroundImage: `url(${officeImage})`,
                backgroundSize: { xs: '122%',sm: '100%', md: '50%' },
                backgroundPosition: { xs: 'right', md: 'right' },
                backgroundRepeat: 'no-repeat',
                maxWidth: '5000px',
              }}
            >
              <Box mt="1px" p="1px" display="inline" alignItems="right">
                <Box sx={{ paddingLeft: '20px' }}>
                  <Typography  fontWeight="bold" color="#000066" sx={{
                    fontSize: {
                      xs: '1.4rem',  
                      sm: '1.9rem',   
                      md: '2rem',  
                      lg: '2rem',   
                    },
                  }}>
                    Hello <span style={{ color: colors.blueAccent[500] }}>{data.fname}</span>..!
                  </Typography>
                  <Typography fontSize={14} fontWeight="100" color={colors.blueAccent[300]} style={{ padding: '2px', marginBottom: '20px' }}>
                    Welcome to the Intern Management System
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* ROW 2 */}
            <Box
              gridColumn={{ xs: 'span 12', md: 'span 4' }}
              gridRow={{ xs: 'span 5', md: 'span 5' }}
              boxShadow="2px 2px 5px rgba(0, 0, 0, 0.2)"
              display="flex"
              alignItems="center"
              borderRadius="18px"
              flexDirection="column"
              sx={{ backgroundColor: 'white', width: '100%' }}
            >
              <Box
                sx={{
                  backgroundColor: colors.blueAccent[300],
                  color: 'white',
                  borderRadius: '12px 12px 0 0',
                  width: '100%',
                  textAlign: 'left',
                  padding: '9px 15px',
                  position: 'relative',
                }}
              >
                <Typography variant="h6" component="h3" sx={{ fontSize: '1.2rem' }}>
                  Work Schedule
                </Typography>
                <Typography variant="subtitle1" component="div" sx={{ fontStyle: 'bold',fontSize: '0.8rem', color: '#E97451' }}>
                  {currentDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Typography>
                <IconButton
                  variant="outlined"
                  color="warning"
                  onClick={handleOpen}
                  sx={{
                    position: 'absolute',
                    bottom: '5%',
                    right: '8px',
                    padding: '12px 24px',
                  }}
                >
                  <CalendarMonthRoundedIcon sx={{ color: '#E97451', fontSize: '3rem' }} />
                </IconButton>
                <Modal open={open} onClose={handleClose} aria-labelledby="calendar-modal-title" aria-describedby="calendar-modal-description">
                  <Box sx={{ 
                    marginTop: '5%', 
                    marginLeft: '25%', 
                    height: '600px', 
                    width: '700px', 
                    backgroundColor: 'background.default', 
                    position: 'relative' 
                    }}>
                    {/* Close Icon Button */}
                    <IconButton
                      onClick={handleClose}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'grey',
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <Calendar fetchUserData={fetchUserData} />
                  </Box>
                </Modal>
              </Box>
              <Calendar fetchUserData={fetchUserData} />
              <hr style={{ width: '85%', borderColor: 'darkblue', border: '2px solid darkblue' }} />
              <Box sx={{ width: '100%', maxHeight: '300px', overflowY: 'auto', padding: '1px 8px', backgroundColor: 'white', borderRadius: '0 0 12px 12px' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {data.schedules && data.schedules.map((schedule, index) => (
                    <li key={index} style={{ display: 'flex', flexDirection: 'column', border: '1px solid lightblue', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', justifyContent: 'space-between', marginBottom: '8px', backgroundColor: 'white', borderRadius: '8px', padding: '8px', color: 'gray' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body1" style={{ color: 'darkblue' }}>
                          {schedule.title}
                        </Typography>
                        <IconButton onClick={() => deleteSchedule(schedule._id)} sx={{ fontSize: '15px' }}>
                          <DeleteOutlineIcon sx={{ fontSize: 'inherit' }} />
                        </IconButton>
                      </div>
                      <div style={{ alignSelf: 'flex-start' }}>
                        <Typography variant="body2">
                          {new Date(schedule.start).toLocaleString()} - {new Date(schedule.end).toLocaleString()}
                        </Typography>
                      </div>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
        {/* ROW 3 */}

          <Box
            gridColumn={{ xs: 'span 12', md: 'span 2' }}
            backgroundColor="white"
            border="2px solid #91C1DE"
            boxShadow="2px 2px 5px rgba(0, 0, 0, 0.2)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            <Box
              width="100%"
              m="0 1px"
              position="relative"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <IconButton
                aria-label="settings"
                sx={{
                  position: 'absolute',
                  top: -40,
                  right: 0,
                }}
                onClick={handleInternListClick}
              >
                <ExpandMoreIcon />
              </IconButton>
              <Menu
                id="intern-menu"
                anchorEl={internAnchorEl}
                keepMounted
                open={Boolean(internAnchorEl)}
                onClose={handleInternListClose}
              >
                {showInternList && users.map((user) => (
                  user.role.toLowerCase() === 'intern' && (
                    <MenuItem key={user._id} onClick={handleInternListClose}>
                      <Avatar src={user.imageUrl} alt={`${user.fname} ${user.lname}`} style={{ marginRight: '20px' }} />
                      <div>
                        {`${user.fname} ${user.lname}`}
                        <Typography variant="body2" color="textSecondary" style={{ fontSize: '0.7rem' }}>
                          {user.jobtitle}
                        </Typography>
                      </div>
                    </MenuItem>
                  )
                ))}
              </Menu>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  position: 'absolute',
                  top: -40,
                  left: 10,
                  color: '#000066'
                }}
              >
                Interns
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  position: 'absolute',
                  top: 2,
                  left: 50,
                  color: colors.greenAccent[500]
                }}
              >
                {`${internCount}`}
              </Typography>
            </Box>
          </Box>

          <Box
            gridColumn={{ xs: 'span 12', md: 'span 2' }}
            backgroundColor="white"
            border="2px solid #91C1DE"
            boxShadow="2px 2px 5px rgba(0, 0, 0, 0.2)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            <Box
              width="100%"
              m="0 1px"
              position="relative"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <IconButton
                aria-label="settings"
                sx={{
                  position: 'absolute',
                  top: -40,
                  right: 0,
                }}
                onClick={handleMentorListClick}
              >
                <ExpandMoreIcon />
              </IconButton>
              <Menu
                id="mentor-menu"
                anchorEl={mentorAnchorEl}
                keepMounted
                open={Boolean(mentorAnchorEl)}
                onClose={handleMentorListClose}
              >
                {showMentorList && users.map((user) => (
                  user.role.toLowerCase() === 'mentor' && (
                    <MenuItem key={user._id} onClick={handleMentorListClose}>
                      <Avatar src={user.imageUrl} alt={`${user.fname} ${user.lname}`} style={{ marginRight: '20px' }} />
                      <div>
                        {`${user.fname} ${user.lname}`}
                        <Typography variant="body2" color="textSecondary" style={{ fontSize: '0.7rem' }}>
                          {user.jobtitle}
                        </Typography>
                      </div>
                    </MenuItem>
                  )
                ))}
              </Menu>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  position: 'absolute',
                  top: -40,
                  left: 10,
                  color: '#000066'
                }}
              >
                Mentors
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  position: 'absolute',
                  top: 2,
                  left: 50,
                  color: colors.greenAccent[500]
                }}
              >
                {`${mentorCount}`}
              </Typography>
            </Box>
          </Box>

          <Box
            gridColumn={{ xs: 'span 12', md: 'span 2' }}
            backgroundColor="white"
            border="2px solid #91C1DE"
            boxShadow="2px 2px 5px rgba(0, 0, 0, 0.2)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            <Box
              width="100%"
              m="0 1px"
              position="relative"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <IconButton
                aria-label="settings"
                sx={{
                  position: 'absolute',
                  top: -40,
                  right: 0,
                }}
                onClick={handleEvaluatorListClick}
              >
                <ExpandMoreIcon />
              </IconButton>
              <Menu
                id="evaluator-menu"
                anchorEl={evaluatorAnchorEl}
                keepMounted
                open={Boolean(evaluatorAnchorEl)}
                onClose={handleEvaluatorListClose}
              >
                {showEvaluatorList && users.map((user) => (
                  user.role.toLowerCase() === 'evaluator' && (
                    <MenuItem key={user._id} onClick={handleEvaluatorListClose}>
                      <Avatar src={user.imageUrl} alt={`${user.fname} ${user.lname}`} style={{ marginRight: '20px' }} />
                      <div>
                        {`${user.fname} ${user.lname}`}
                        <Typography variant="body2" color="textSecondary" style={{ fontSize: '0.7rem' }}>
                          {user.jobtitle}
                        </Typography>
                      </div>
                    </MenuItem>
                  )
                ))}
              </Menu>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  position: 'absolute',
                  top: -40,
                  left: 10,
                  color: '#000066'
                }}
              >
                Evaluators
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  position: 'absolute',
                  top: 2,
                  left: 50,
                  color: colors.greenAccent[500]
                }}
              >
                {`${evaluatorCount}`}
              </Typography>
            </Box>
          </Box>

          <Box
            gridColumn={{ xs: 'span 12', md: 'span 2' }}
            backgroundColor="white"
            border="2px solid #91C1DE"
            boxShadow="2px 2px 5px rgba(0, 0, 0, 0.2)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            <Box
              width="100%"
              m="0 1px"
              position="relative"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
          
              <Typography
                variant="h12" 
                fontWeight="bold"
                sx={{
                  position: 'absolute',
                  top: -40,
                  left: 10,
                  color: 'red'
                }}
              >Leave Remaining
              </Typography>
              <Typography
                variant="h8"
                fontWeight="bold"
                sx={{ 
                  position: 'absolute',
                  top: 12, 
                  left: 50,
                  color: 'red'
                }}
              >
              {`${leaveCount}`}
              </Typography>
            </Box>
            </Box>
          {/* ROW 4 */}
            <Box
              gridColumn={{ xs: 'span 12', md: 'span 8' }}
              gridRow="span 2"
              borderRadius={4}
              boxShadow="1px 2px 5px rgba(0, 0, 0, 0.2)"
              sx={{
                maxWidth: '5000px',
              }}
            >
              <TableContainer component={Paper} sx={{ borderRadius: '8px', width: '100%' }}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#3f51b5' }}>
                      <TableCell align="center" sx={{ height: '10px' }}>
                        <Typography variant="h6" component="h3" sx={{ fontSize: '1.2rem', color: 'white' }}>
                          Employee Leave
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <Box className="buttonContainer" sx={{ textAlign: 'center' }}>
                      {!leaveOpen && (
                        <Button
                          variant="contained"
                          className="button"
                          onClick={handleLeaveClickOpen}
                          sx={{ margin: '10px 0' }}
                        >
                          + Apply Leave
                        </Button>
                      )}
                      {leaveOpen && (
                        <Box
                          sx={{
                            marginTop: '22px',
                            maxWidth: '600px',
                            margin: '0 auto',
                            padding: '20px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#fff',
                            textAlign: 'left'
                          }}
                        >
                          <Box>
                            <TextField
                              label="Name"
                              value={data.fname}
                              onChange={handleLeaveChange}
                              inputProps={{ 'aria-label': 'Without label', readOnly: true }}
                              fullWidth
                              sx={{ marginBottom: '20px' }}
                            />
                            <TextField
                              margin="dense"
                              name="leaveDate"
                              label="Leave Date"
                              type="date"
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              value={formData.leaveDate}
                              onChange={handleLeaveChange}
                              error={!!errors.leaveDate}
                              helperText={errors.leaveDate}
                              sx={{ marginBottom: '20px' }}
                            />
                          </Box>
                          <Box>
                            <TextField
                              margin="dense"
                              name="reason"
                              label="Reason For Leave"
                              type="text"
                              fullWidth
                              multiline
                              rows={4}
                              value={formData.reason}
                              onChange={handleLeaveChange}
                              error={!!errors.reason}
                              helperText={errors.reason}
                              sx={{ marginBottom: '20px' }}
                            />
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleSubmit} sx={{ marginRight: '10px' }}>Apply</Button>
                            <Button onClick={handleLeaveClose}>Cancel</Button>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </TableHead>
                  {!leaveOpen && (
                    <TableBody>
                      <LeaveManagement />
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Box>
         </Box>
        </Box>
      </Box>
    </>
  )}