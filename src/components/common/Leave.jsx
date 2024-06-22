import React, { useState, useEffect } from 'react';
import axios from "axios";
import { BASE_URL } from "../../config";
import './Calendar.css';
import { Table, 
         TableBody, 
         TableCell, 
         TableContainer, 
         TableHead, 
         TableRow,
         Paper, 
         Typography, 
         Box,
         Avatar } from '@mui/material';


const LeaveManagement = () => {
    const [leaveApplications, setLeaveApplications] = useState([]);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        userId: '', 
        leaveDate: '',
        reason: '',
    });
    const token = localStorage.getItem('token');


    useEffect(() => {
      axios.get(`${BASE_URL}allusers`, { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        const fetchedUsers = result.data.users;
        setUsers(fetchedUsers);
      })
      .catch((err) => console.log(err));
    }, [token]);

    useEffect(() => {
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
    }, [token]);

   

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table className="root">
          <TableHead>
          <TableRow>
            <TableCell align="left"><b>Name</b></TableCell>
            <TableCell align='center'><b>Reason</b></TableCell>
            <TableCell align='center'><b>Leave Date</b></TableCell>
            <TableCell align='center'><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {leaveApplications.map((leaveApplication) => (
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
                      <Box sx={{ 
                        p: '2px', 
                        border: 2, 
                        borderColor: 'lightblue', 
                        borderRadius: '6px', 
                        display: 'inline-block' 
                      }}>
                        <Typography className={leaveApplication.status === 'Approved' ? 'statusApproved' : 'statusPending'}>
                          {leaveApplication.status}
                        </Typography>
                      </Box>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
};

export default LeaveManagement;