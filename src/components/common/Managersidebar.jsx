
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import {useNavigate} from "react-router-dom";
import { useAppStore } from './appStore';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TuneIcon from '@mui/icons-material/Tune';
import { useUserData } from '../Contexts/UserContext.jsx';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Managersidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);
  const [selected, setSelected] = useState("");
  const location = useLocation();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const { data, fetchUserData } = useUserData();
  useEffect(() => {
    const currentPath = location.pathname;
    
    if (currentPath.includes("/profile")) {
      setSelected("Profile");
    } else if (currentPath.includes("/managerevaluation")) {
      setSelected("Evaluation");
    } else if (currentPath.includes("/managerviewInternDetails")) {
      setSelected("View Profile & Task");
    } else if (currentPath.includes("/security")) {
      setSelected("Security");
    } else {
      setSelected("Dashboard");
    }
  }, [location]);

  if (userRole !== 'manager') {
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
    fetchUserData();
  }, [fetchUserData]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={open} 
          sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#3949ab', 
        },
      }}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>   
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3, marginBottom: 5 }}>
            <Box
              sx={{
                position: 'relative',
                display: 'inline-block',
                borderRadius: '50%',
                padding: '5px',
                background: 'linear-gradient(to right, #00C8FF, #8A2BE2)'

              }}
            >
              <Avatar 
                src={data?.imageUrl} 
                sx={{ 
                  width: open ? 100 : 45, 
                  height: open ? 100 : 45, 
                }} 
              />
            </Box>
            {open && (
              <>
                <Typography variant="h6" sx={{ marginTop: 1, fontWeight: 'bold', color: "lightcyan" }}>
                  {data?.fname} {data?.lname}
                </Typography>
                <Typography variant="body2" sx={{ color: "lightblue" }}>
                  {data?.jobtitle}
                </Typography>
              </>
            )}
          </Box>
       

        <List>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>{setSelected("Dashboard"); navigate("/managerdashboard")}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: '1px',
                  padding: 1.5,
                  color: 'silver',
                  border: '5px solid #3949ab',
                  backgroundColor: selected === "Dashboard" ? 'rgba(100, 149, 237, 0.5)' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'royalblue',
                    borderRadius: '1px',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <DashboardOutlinedIcon sx={{ color: "white" }} /> 
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

      
            <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=>{setSelected("Profile"); navigate("/profile")}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: '1px',
                  padding: 1.5,
                  color: 'silver',
                  border: '5px solid #3949ab',
                  backgroundColor: selected === "Profile" ? 'rgba(100, 149, 237, 0.5)' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'royalblue',
                    borderRadius: '1px',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <SwitchAccountOutlinedIcon sx={{ color: "white" }} /> 
                </ListItemIcon>
                <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>


            <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=>{setSelected("Evaluation"); navigate("/managerevaluation")}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: '1px',
                  padding: 1.5,
                  color: 'silver',
                  border: '5px solid #3949ab',
                  backgroundColor: selected === "Evaluation" ? 'rgba(100, 149, 237, 0.5)' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'royalblue',
                    borderRadius: '1px',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <FactCheckOutlinedIcon sx={{ color: "white" }} /> 
                </ListItemIcon>
                <ListItemText primary="Evaluation" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        
                  
                  
            <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=>{setSelected("View Profile & Task"); navigate("/managerviewInternDetails")}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: '1px',
                  padding: 1.5,
                  color: 'silver',
                  border: '5px solid #3949ab',
                  backgroundColor: selected === "View Profile & Task" ? 'rgba(100, 149, 237, 0.5)' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'royalblue',
                    borderRadius: '1px',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PermContactCalendarOutlinedIcon sx={{ color: "white" }} /> 
                </ListItemIcon>
                <ListItemText primary="View Profile & Task" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        

            <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=>{setSelected("Security"); navigate("/security")}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: '1px',
                  padding: 1.5,
                  color: 'silver',
                  border: '5px solid #3949ab',
                  backgroundColor: selected === "Security" ? 'rgba(100, 149, 237, 0.5)' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'royalblue',
                    borderRadius: '1px',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <SettingsApplicationsOutlinedIcon sx={{ color: "white" }} /> 
                </ListItemIcon>
                <ListItemText primary="Security" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        
        
        </List>
      </Drawer>

    </Box>
  );
}