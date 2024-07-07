import React, { useState, useEffect } from "react";
import Internsidebar from "../../components/common/Internsidebar";
import Header from "../../components/common/Header";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import { tokens } from "../admin_page/theme/theme";
import Calendar from "../../components/common/Calendar";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Email from "../../components/common/SendEmail";
import Barchart from "../../components/project/projectbarchart";
import officeImage from '../../assets/office.png';

export default function InternDashboard() {
  const colors = tokens;
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const userRole = decodedToken.role;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  if (userRole !== "intern") {
    return null; // Do not render the component
  }
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const response = await axios.get(`${BASE_URL}task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = Array.isArray(response.data)
      ? response.data
      : [response.data];
    setTasks(responseData);

    setLoading(false);
  };

  const todoTasks = tasks.filter((task) => !task.isVerified).length;
  const doneTasks = tasks.filter((task) => task.isVerified).length;
  const totalTasks = todoTasks + doneTasks;
  console.log(`To Do Tasks: ${todoTasks}`);

  console.log(`Done Tasks: ${doneTasks}`);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteSchedule = async (eventId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}schedule/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setData((prevData) => ({
          ...prevData,
          schedules: prevData.schedules.filter(
            (schedule) => schedule._id !== eventId
          ),
        }));
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
      alert("Failed to delete the event");
    }
  };

  return (
    <>
      <Header />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Internsidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* GRID & CHARTS */}
          <Box
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(12, 1fr)' }}
            gridAutoRows="minmax(100px, auto)"
            gap="13px"
          >
            {/* ROW 1 */}
            <Box
              gridColumn={{ xs: 'span 12', md: 'span 9' }}
              gridRow="span 2"
              borderRadius={4}
              boxShadow="1px 2px 5px rgba(0, 0, 0, 0.2)"
              style={{ backgroundColor: "lightsteelblue" }}
              sx={{
                maxWidth: 5000,
                backgroundImage: `url(${officeImage})`,
                backgroundSize: { xs: '122%',sm: '100%', md: '50%' },
                backgroundPosition: { xs: 'right', md: 'right' },
                backgroundRepeat: "no-repeat",
              }}
            >
              <Box mt="1px" p="1px" display="inline" alignItems="right">
                <Box sx={{ paddingLeft: "20px" }}>
                  <Typography variant="h4" fontWeight="bold" color="#000066">
                    Hello{" "}
                    <span style={{ color: colors.blueAccent[500] }}>
                      {data.fname}
                    </span>
                    ..!
                  </Typography>
                  <Typography
                    fontSize={14}
                    fontWeight="100"
                    color={colors.blueAccent[300]}
                    style={{ padding: "2px", marginBottom: "20px" }}
                  >
                    Welcome to the Intern Management System
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* ROW 2 */}
            <Box
              gridColumn={{ xs: 'span 12', md: 'span 3' }}
              gridRow="span 4"
              boxShadow="2px 2px 5px rgba(0, 0, 0, 0.2)"
              display="flex"
              alignItems="center"
              borderRadius="18px"
              flexDirection="column"
              width="100%"
            >
              <Box
                sx={{
                  backgroundColor: colors.blueAccent[300], 
                  color: "white",
                  borderRadius: "12px 12px 0 0",
                  width: "100%",
                  textAlign: "left",
                  padding: "9px 15px",
                  position: "relative",
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontSize: "1.2rem" }}
                >
                  Work Schedule
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ fontSize: "1rem", color: "#E97451" }}
                >
                  {currentDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Typography>
                <IconButton
                  variant="outlined"
                  color="warning"
                  onClick={handleOpen}
                  sx={{
                    position: "absolute",
                    bottom: "5%",
                    right: "8px",
                    padding: "12px 24px",
                  }}
                >
                  <CalendarMonthRoundedIcon
                    sx={{ color: "#E97451", fontSize: "3rem" }}
                  />
                </IconButton>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="calendar-modal-title"
                  aria-describedby="calendar-modal-description"
                >
                  <Box
                    sx={{
                      marginTop: "5%",
                      marginLeft: "auto",
                      marginRight: "5%",
                      height: "500px",
                      width: "400px",
                      backgroundColor: "background.default",
                      position: "relative",
                      padding: "20px",
                    }}
                  >
                    <IconButton
                      onClick={handleClose}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "grey",
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <Calendar fetchUserData={fetchUserData} />
                  </Box>
                </Modal>
              </Box>
              <Calendar fetchUserData={fetchUserData} />
              <hr
                style={{
                  width: "85%",
                  borderColor: "darkblue",
                  border: "2px solid darkblue",
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  maxHeight: "300px",
                  overflowY: "auto",
                  padding: "1px 8px",
                  backgroundColor: "white",
                  borderRadius: "0 0 12px 12px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "white white",
                  marginTop: "-5px",
                }}
              >
                <Typography variant="h5" sx={{ marginBottom: '20px', color: '#000066', fontWeight: 'bold', textAlign: 'center' }}>
                Scheduled events
                </Typography>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {data.schedules &&
                    data.schedules.map((schedule, index) => (
                      <li
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          border: "1px solid lightblue",
                          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                          backgroundColor: "white",
                          borderRadius: "8px",
                          padding: "8px",
                          color: "gray",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="body1"
                            style={{ color: "darkblue" }}
                          >
                            {schedule.title}
                          </Typography>
                          <IconButton
                            onClick={() => deleteSchedule(schedule._id)}
                            sx={{ fontSize: "15px" }}
                          >
                            <DeleteOutlineIcon sx={{ fontSize: "inherit" }} />
                          </IconButton>
                        </div>
                        <div style={{ alignSelf: "flex-start" }}>
                          <Typography variant="body2">
                            {new Date(schedule.start).toLocaleString()} -{" "}
                            {new Date(schedule.end).toLocaleString()}
                          </Typography>
                        </div>
                      </li>
                    ))}
                </ul>
              </Box>
            </Box>

            <Box
              gridColumn={{ xs: 'span 12', md: 'span 2' }}
              gridRow="span 1"
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
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    position: "absolute",
                    top: -40,
                    left: 10,
                    color: "#000066",
                  }}
                >
                  To Do tasks
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    position: "absolute",
                    top: 2,
                    left: 10,
                    color: colors.greenAccent[500],
                  }}
                >
                  {`${todoTasks}`}
                </Typography>
              </Box>
            </Box>

            <Box
              gridColumn={{ xs: 'span 12', md: 'span 2' }}
              gridRow="span 1"
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
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    position: "absolute",
                    top: -40,
                    left: 10,
                    color: "#000066",
                  }}
                >
                  Done tasks
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    position: "absolute",
                    top: 2,
                    left: 10,
                    color: colors.greenAccent[500],
                  }}
                >
                  {`${doneTasks}`}
                </Typography>
              </Box>
            </Box>

            <Box
              gridColumn={{ xs: 'span 12', md: 'span 2' }}
              gridRow="span 1"
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
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    position: "absolute",
                    top: -40,
                    left: 10,
                    color: "#000066",
                  }}
                >
                  Total tasks
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    position: "absolute",
                    top: 2,
                    left: 10,
                    color: colors.greenAccent[500],
                  }}
                >
                  {`${totalTasks}`}
                </Typography>
              </Box>
            </Box>

            {/* ROW 4 */}
            <Box
              gridColumn={{ xs: 'span 12', md: 'span 3' }}
              gridRow="span 2"
              overflow="auto"
              borderRadius={1}
              p="1px"
              sx={{ marginTop: '10px' }}
            >
              <Typography variant="h5" sx={{ marginBottom: '20px', color: '#000066', fontWeight: 'bold' }}>
                 Send your Email here
               </Typography>
              <Card sx={{ backgroundColor: '#D3E1F6' }}>
                <CardContent>
                  <Email />
                </CardContent>
              </Card>
            </Box>
            <Box
              gridColumn={{ xs: 'span 12', md: 'span 6' }}
              gridRow="span 2"
              overflow="auto"
              borderRadius={2}
              p="1px"
              sx={{ marginTop: '20px' }}
            >
              <Card sx={{ backgroundColor: colors.blueAccent[900] }}>
                <CardContent>
                  <Typography variant="h6"> Task Overview</Typography>
                  <Container maxWidth="sm">
                    {loading ? (
                      <Box display="flex" justifyContent="center">
                        <CircularProgress />
                      </Box>
                    ) : tasks.length > 0 ? (
                      <Box my={4}>
                        <Barchart tasks={tasks} />
                      </Box>
                    ) : (
                      <Typography align="center">No tasks found</Typography>
                    )}
                  </Container>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}