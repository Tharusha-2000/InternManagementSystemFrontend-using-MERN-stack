import React, { useState, useEffect } from 'react';
import axios from "axios";
import { BASE_URL } from "../../config";
import AdminSidebar from '../../components/common/AdminSidebar';
import Header from '../../components/common/Header';
import { Box, 
        Typography, 
        Tabs, 
        Tab, 
        TableRow,
        TableCell,
        Avatar } from "@mui/material";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { tokens } from "./theme/theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
//import Header from "../../components/Header";
//import BarChart from "../admin_page/charts/BarChart";
//import LineChart from "../admin_page/charts/PieChart";
//import GeographyChart from "../../components/GeographyChart";
//import BarChart from "../../components/BarChart";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import CountBox from "./theme/CountBox";
import CountCircle from "./theme/CountCircle";



export default function AdminDashboard()  {
  const colors = tokens;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [value, setValue] = React.useState('0');
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };
  const [internData, setInternData] = useState([]);
  const [mentorData, setMentorData] = useState([]);
  const [evaluatorData, setEvaluatorData] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const token = localStorage.getItem('token');

  const [userCount, setUserCount] = useState(0);
  const [internCount, setInternCount] = useState(0);
  const [mentorCount, setMentorCount] = useState(0);
  const [evaluatorCount, setEvaluatorCount] = useState(0);  

  const progress1 = (internCount / userCount).toString();
  const progress2 = (mentorCount / userCount).toString();
  const progress3 = (evaluatorCount / userCount).toString();
  const internPercentage = ((internCount / userCount) * 100).toFixed(2);
  const mentorPercentage = ((mentorCount / userCount) * 100).toFixed(2);
  const evaluatorPercentage = ((evaluatorCount / userCount) * 100).toFixed(2);

    // set the date 
    useEffect(() => {
      axios
      .get(`${BASE_URL}users`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        const interns = result.data.users.filter(user => user.role === 'intern');
        const mentors = result.data.users.filter(user => user.role === 'mentor');
        const evaluators = result.data.users.filter(user => user.role === 'evaluator');
        const managers = result.data.users.filter(user => user.role === 'manager');
  
        setInternData(interns);
        setMentorData(mentors);
        setEvaluatorData(evaluators);
        setManagerData(managers);

        setUserCount(result.data.users.length);
        setInternCount(interns.length);
        setMentorCount(mentors.length);
        setEvaluatorCount(evaluators.length);
      })
      .catch((err) => console.log(err));
      }, []);

      
      useEffect(() => {
          const timer = setInterval(() => {
            setCurrentDate(new Date());
          }, 60000);
          return () => {
            clearInterval(timer);
          };
        }, []);

 

  return (
    <div className="bgcolor">
    <Header />
    <Box height={50} />
    <Box sx={{ display: 'flex' , backgroundColor: colors.primary[400]}}>
    <AdminSidebar />
    
   <Box  component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
      
      { /* Card 
      <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="10px 20px 20px 0px"
        >
      <Card sx={{ maxWidth: 5000,
      bgcolor: red[500],
        backgroundImage: `url('src/assets/CardBackgraound.jpg')`, // Add your image path here
        backgroundSize: 'cover', // This will make the image cover the entire card
        backgroundPosition: 'center', // This will center the image in the card
      }} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      </Card> 
      </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="100px"
        gap="15px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[700]}
          sx={{ maxWidth: 5000,
              backgroundImage: `url('src/assets/R.jpeg')`, // Add your image path here
              backgroundSize: 'cover', // This will make the image cover the entire card
              backgroundPosition: 'center', // This will center the image in the card
            }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="right"
          >
            <Box>
              
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.blueAccent[200]}
              >
                Welcome to IMS
              </Typography>
            </Box>
            <Box>
            <Typography
                variant="h6"
                fontWeight="700"
                color={colors.grey[100]}
              >
              <div>
                <p>{currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              </Typography>
            </Box>
          </Box>
          {/*<Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>*/}
        </Box>
        
        { /* User display box */ }

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[900]}
          overflow="auto"
          sx={{
            padding: '20px', 
            borderRadius: '10px', 
          }}
        >
          <Typography variant="h5" style={{ marginBottom: '10px',  fontWeight: 'bold'  }}>Recent users</Typography>
         
          <TabContext value={value}>
        <Box sx={{ borderBottom: 5, borderColor: 'divider' }} >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            textColor= "secondary"
            indicatorColor="secondary"
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
        <Tab value="0" label="Interns" />
        <Tab value="1" label="Mentors" />
        <Tab value="2" label="Evaluators" />
        <Tab value="4" label="Managers" />
          </Tabs>
        </Box>
        
        <TabPanel value="0" > 
           {[...internData].reverse().map((user) => (
            <TableRow key={user._id}>
              <TableCell sx={{ fontSize: "1em", display: 'flex', alignItems: 'center' }}>
              <Avatar>{user.fname[0]}{user.lname[0]}</Avatar>
              <span style={{ marginLeft: '10px' }}>{user.fname} {user.lname}</span>
              </TableCell>
             </TableRow>
           ))}
         </TabPanel>
         <TabPanel value="1">
              {[...mentorData].reverse().map((user) => (
                <TableRow key={user._id}>
                  <TableCell sx={{ fontSize: "1em", display: 'flex', alignItems: 'center' }}>
                  <Avatar>{user.fname[0]}{user.lname[0]}</Avatar>
                  <span style={{ marginLeft: '10px' }}>{user.fname} {user.lname}</span>
                  {/*<span style={{ marginLeft: '10px' }}>Last Login: {new Date(user.lastLogin).toLocaleString()}</span>*/}
                  </TableCell>
                </TableRow>
              ))}
          </TabPanel>
          <TabPanel value="2">  
              {[...evaluatorData].reverse().map((user) => (    
                <TableRow key={user._id}>
                  <TableCell sx={{ fontSize: "1em", display: 'flex', alignItems: 'center' }}>
                  <Avatar>{user.fname[0]}{user.lname[0]}</Avatar>
                  <span style={{ marginLeft: '10px' }}>{user.fname} {user.lname}</span>
                  </TableCell>
                </TableRow>
              ))}
          </TabPanel>
          <TabPanel value="4">
              {[...managerData].reverse().map((user) => (
                <TableRow key={user._id}>
                  <TableCell sx={{ fontSize: "1em", display: 'flex', alignItems: 'center' }}>
                  <Avatar>{user.fname[0]}{user.lname[0]}</Avatar>
                  <span style={{ marginLeft: '10px' }}>{user.fname} {user.lname}</span>
                  </TableCell>
                </TableRow>
              ))}
          </TabPanel>
            
          </TabContext>
          </Box>
            {/*{mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost} 
              </Box>
            </Box>
          ))} */}
       


        {/* ROW 2 */}

        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius= '8px'
        >
          <CountBox
            title={`${internCount} / ${userCount}`}
            subtitle="Interns"
            progress={progress1}
            increase={`${internPercentage}%`}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
              />
            }
          />  
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius= '8px'
        >
          <CountBox
            title={`${mentorCount} / ${userCount}`}
            subtitle="Mentors"
            progress={progress2}
            increase={`${mentorPercentage}%`}
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius= '8px'
        >
          <CountBox
            title={`${evaluatorCount} / ${userCount}`}
            subtitle="Evaluators"
            progress={progress3}
            increase={`${evaluatorPercentage}%`}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius= '8px'
        >
          <CountBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.75"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
              />
            }
          />
        </Box>


        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[900]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <CountCircle size="115" />
            {/*<Typography
              variant="h6"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography> 
          */}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[900]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            progress
          </Typography>
           
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[900]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            calender
          </Typography>
           
        </Box>


        </Box>
    </Box>
    </Box>
    </div>
  );
};