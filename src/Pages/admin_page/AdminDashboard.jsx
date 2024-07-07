import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/common/AdminSidebar';
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
        TablePagination } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from "../admin_page/theme/theme";
import Calendar from '../../components/common/Calendar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { jwtDecode } from "jwt-decode";
import officeImage from '../../assets/office.png';

export default function AdminDashboard() {

  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

   if(userRole !== 'admin'){
      return null; // Do not render the component
    }

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

  const [userCount, setUserCount] = useState(0);
  const [internCount, setInternCount] = useState(0);
  const [mentorCount, setMentorCount] = useState(0);
  const [evaluatorCount, setEvaluatorCount] = useState(0);  
  const [managerCount, setManagerCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

const fetchUserData = () => {
  axios.get(`${BASE_URL}user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((result) => {
      setData(result.data.user);
      console.log(result.data.user);
  })
  .catch((err) => console.log(err));
};

useEffect(() => {
  fetchUserData();
}, [token]); // Assuming `token` is a dependency for this effect


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

        const [leaveApplications, setLeaveApplications] = useState([]); 
        const updateLeaveStatus = (userId,leaveApplicationId, newStatus) => {

          console.log( userId,leaveApplicationId, newStatus);

          axios.put(`${BASE_URL}updateLeaveStatus`, {
            userId,
            leaveApplicationId,
            status: newStatus,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
          .then(() => {
            fetchLeaveApplications();
          })
          .catch((err) => console.error(err));
        };
        
        const fetchLeaveApplications = () => {
          axios.get(`${BASE_URL}getLeaveApplications`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            const leaveApplications = result.data.leaveApplications.flatMap(application => ({
              ...application,
              user: {
                id: application.user.userid,
                fname: application.user.fname,
                lname: application.user.lname,
                jobTitle: application.user.jobtitle,
                imageUrl: application.user.imageUrl, 
              }
            }));

            setLeaveApplications(leaveApplications);
            console.log(leaveApplications);
          })
          .catch((err) => console.log(err));
        };
        
        useEffect(() => {
          fetchLeaveApplications();
        }, [token]);
  

        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };
        const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0); // Reset page to 0 when changing rows per page
        };

  return (
    <>
    <Header />
    <Box height={60} />
    <Box sx={{ display: 'flex' }}>
    <AdminSidebar />
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
          style={{ backgroundColor: 'lightsteelblue', }}
          sx={{ maxWidth: 5000,
              backgroundImage: `url(${officeImage})`,
              backgroundSize: { xs: '122%',sm: '100%', md: '50%' },
              backgroundPosition: { xs: 'right', md: 'right' },
              backgroundRepeat: 'no-repeat',
            }}
        >
        <Box
            mt="1px" 
            p="1px"
            display="inline"
            alignItems="right"
          >
          <Box sx={{  paddingLeft: '20px'}}>
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
            <Typography
                fontSize={14}
                fontWeight="100"
                color={colors.blueAccent[300]}
                style={{ padding: '2px', marginBottom: '20px' }}
              >
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
              borderRadius='18px'
              flexDirection="column"
              width="100%"  
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
            <Typography variant="subtitle1" component="div" sx={{ fontSize: '0.8rem', color: '#E97451' }} >
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
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="calendar-modal-title"
                aria-describedby="calendar-modal-description"
              >
                <Box sx={{
                  marginTop: '5%', 
                  marginLeft: '25%',
                  height: '600px', 
                  width: '700px', 
                  backgroundColor: 'background.default', 
                  position: 'relative', 
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
              <Box
                sx={{
                  width: '100%',
                  maxHeight: '300px',
                  overflowY: 'auto', 
                  padding: '1px 8px',
                  backgroundColor: 'white', 
                  borderRadius: '0 0 12px 12px',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'white white',
                }}
              >
                 <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {data.schedules && data.schedules.map((schedule, index) => (
                      <li key={index} style={{ display: 'flex', flexDirection: 'column',border: '1px solid lightblue', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)' ,justifyContent: 'space-between', marginBottom: '8px', backgroundColor: 'white', borderRadius: '8px', padding: '8px', color: 'gray' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1" style={{ color: 'darkblue' }}>
                            {schedule.title}
                          </Typography>
                          <IconButton onClick={() => deleteSchedule(schedule._id)} sx={{ fontSize: '15px' }}>
                            <DeleteOutlineIcon sx={{ fontSize: 'inherit' }}/>
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
            border= "2px solid #91C1DE"	
            boxShadow="2px 2px 5px rgba(0, 0, 0, 0.2)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius= '8px'
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
                      <MenuItem onClick={handleInternListClose}>
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
            border= "2px solid #91C1DE"	
            boxShadow="2px 2px 5px rgba(0, 0, 0, 0.2)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius= '8px'
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
                  <MenuItem onClick={handleMentorListClose}>
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
            border= "2px solid #91C1DE"	
            boxShadow="2px 2px 5px rgba(0, 0, 0, 0.2)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius= '8px'
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
                      <MenuItem onClick={handleEvaluatorListClose}>
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
            border= "2px solid #91C1DE"	
            boxShadow="2px 2px 5px rgba(0, 0, 0, 0.2)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius= '8px'
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
                onClick={handleManagerListClick}
              >
                <ExpandMoreIcon />
              </IconButton>
              <Menu
                  id="manager-menu"
                  anchorEl={managerAnchorEl}
                  keepMounted
                  open={Boolean(managerAnchorEl)}
                  onClose={handleManagerListClose}
                >
                  {showManagerList && users.map((user) => (
                    user.role.toLowerCase() === 'manager' && (
                      <MenuItem onClick={handleManagerListClose}>
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
                Managers
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
               {`${managerCount}`}
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
                    <Table sx={{ width: '100%' }}  aria-label="simple table">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: colors.blueAccent[300] }}>
                          <TableCell align="center" colSpan={5} sx={{ height: '10px' }}>
                            <Typography variant="h6" component="h3" sx={{ fontSize: '1.2rem', color: 'white' }}>
                              Employee Leave
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left"><b>Name</b></TableCell>
                          <TableCell align="center"><b>Reason</b></TableCell>
                          <TableCell align="center"><b>Leave Date</b></TableCell>
                          <TableCell align="center"><b>Status</b></TableCell>
                          <TableCell align="center"><b>Actions</b></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {leaveApplications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((leaveApplication) => (
                          <TableRow key={leaveApplication._id}>
                            <TableCell align="left">
                              <Box display="flex" alignItems="center">
                                <Avatar src={leaveApplication.user.imageUrl} alt={`${leaveApplication.user.fname} ${leaveApplication.user.lname}`} style={{ marginRight: '20px' }} />
                                <Box>
                                  <Typography style={{ fontWeight: 'bold' }}>
                                    {leaveApplication.user.fname} {leaveApplication.user.lname}
                                  </Typography>
                                  <Typography color="textSecondary" style={{ fontSize: '0.7rem' }}>
                                    {leaveApplication.user.jobTitle}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align="center">{leaveApplication.reason}</TableCell>
                            <TableCell align="center">
                              {new Date(leaveApplication.leaveDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </TableCell>
                            <TableCell align="center">
                              <Box sx={{ display: 'inline-block' }}>
                                <Typography className={leaveApplication.status === 'Approved' ? 'statusApproved' : leaveApplication.status === 'Rejected' ? 'statusRejected' : 'statusPending'}>
                                  {leaveApplication.status}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => updateLeaveStatus( leaveApplication.user.id,leaveApplication._id, 'Approved')}
                                disabled={leaveApplication.status !== 'Pending'}
                                style={{ margin: '10px', fontWeight: 'bold' }}
                              >
                                Approve
                              </Button>
                              <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={() => updateLeaveStatus(leaveApplication.user.id,leaveApplication._id, 'Rejected')}
                                disabled={leaveApplication.status !== 'Pending'}
                                style={{ fontWeight: 'bold' }}
                              >
                                Reject
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Box display="flex" justifyContent="center" padding="16px">
                    <TablePagination
                      rowsPerPageOptions={[3, 5, 25]}
                      component="div"
                      count={leaveApplications.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Box>
                  </TableContainer>
                </Box>

            </Box>
         </Box>
      </Box>
      </>
  )}

