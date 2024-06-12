import * as React from 'react';
import { useEffect, useState } from 'react';
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
import { indigo } from '@mui/material/colors';
import {useNavigate} from "react-router-dom";
import { useAppStore } from './appStore';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";


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



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>   
        <Divider />
        <List>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>{setSelected("Dashboard"); navigate("/managerdashboard")}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: '18px',
                  padding: 1.5,
                  border: '5px solid white',
                  backgroundColor: selected === "Dashboard" ? 'lightblue' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'lightblue',
                    borderRadius: '18px',
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
                  <DashboardOutlinedIcon sx={{ color: indigo[900] }} /> 
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
                  borderRadius: '18px',
                  padding: 1.5,
                  border: '5px solid white',
                  backgroundColor: selected === "Profile" ? 'lightblue' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'lightblue',
                    borderRadius: '18px',
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
                  <SwitchAccountOutlinedIcon sx={{ color: indigo[900] }} /> 
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
                  borderRadius: '18px',
                  padding: 1.5,
                  border: '5px solid white',
                  backgroundColor: selected === "Evaluation" ? 'lightblue' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'lightblue',
                    borderRadius: '18px',
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
                  <FactCheckOutlinedIcon sx={{ color: indigo[900] }} /> 
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
                  borderRadius: '18px',
                  padding: 1.5,
                  border: '5px solid white',
                  backgroundColor: selected === "View Profile & Task" ? 'lightblue' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'lightblue',
                    borderRadius: '18px',
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
                  <PermContactCalendarOutlinedIcon sx={{ color: indigo[900] }} /> 
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
                  borderRadius: '18px',
                  padding: 1.5,
                  border: '5px solid white',
                  backgroundColor: selected === "Security" ? 'lightblue' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'lightblue',
                    borderRadius: '18px',
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
                  <SettingsApplicationsOutlinedIcon sx={{ color: indigo[900] }} /> 
                </ListItemIcon>
                <ListItemText primary="Security" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        
        
        </List>
      </Drawer>

    </Box>
  );
}

