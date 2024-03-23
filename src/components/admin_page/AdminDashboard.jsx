import React from 'react';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import BarChart from "./charts/BarChart";
import PieChart from './charts/PieChart';


export default function AdminDashboard() {
  return (
    <>
    <div className="bgcolor">
    <Header />
    <Box height={70} />
    <Box sx={{ display: 'flex' }}>
    <Sidebar />
    
    <Box  component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack spacing={2} direction="row">
                <Card sx={{ maxWidth: 49 + "%", height: 140 }} className="gradient">
                     <CardContent>
                      <div>
                       <SwitchAccountIcon />
                      </div>
                        <Typography gutterBottom variant="h6" component="div">
                          43
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div" sx={{color:"#13135f"}}>
                          Total Interns
                        </Typography>
                       
                      </CardContent>
                </Card>
                <Card sx={{ maxWidth: 49 + "%", height: 140 }} className="gradient">
                     <CardContent>
                      <div>
                        <ContactPageIcon />
                      </div>
                        <Typography gutterBottom variant="h6" component="div">
                          15
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div" sx={{color:"#13135f"}}>
                          New Interns
                        </Typography>
                      
                      </CardContent>
                </Card>
              </Stack>
            </Grid>
        <Grid item xs={4}>
        <Stack spacing={2} >
                  <Card sx={{ maxWidth: 345 }}>
                     <CardContent>
                     <Stack spacing={2} direction="row">
                        <div className="iconstyle">
                         <PublishedWithChangesIcon />
                         </div>
                         <div className='paddingall'>
                          <span className='progressPercentage'>40%</span>
                          <br />
                          <span className='progressName'>Evalauation Progress</span>
                         </div>
                      </Stack>
                      </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                     <CardContent>
                     <Stack spacing={2} direction="row">
                        <div className="iconstyle">
                         <EventRepeatIcon />
                         </div>
                         <div className='paddingall'>
                          <span className='progressPercentage'>70%</span>
                          <br />
                          <span className='progressName'>Mentoring Progress</span>
                         </div>
                      </Stack>
                      </CardContent>
                </Card>
        </Stack>    
        </Grid>
          </Grid>
        <Box height={20} />
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Card sx={{ height: 60 + "vh" }}>
                     <CardContent>
                          <BarChart />
                      </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ height: 60 + "vh"  }}>
                     <CardContent>
                         <PieChart />
                      </CardContent>
                </Card>
            </Grid>
          </Grid>
     
  </Box>
  </Box>
  </div>
  </>
  );
}
