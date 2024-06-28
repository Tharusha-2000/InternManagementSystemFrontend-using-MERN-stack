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
         Avatar,
         TablePagination } from '@mui/material';


const LeaveManagement = () => {
    const [leaveApplications, setLeaveApplications] = useState([]);
    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(3);
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
        const today = new Date();
        const leaveApplications = result.data.leaveApplications
        .filter(application => new Date(application.leaveDate) >= today)
        .map(application => ({
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

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0); // Reset page to 0 when changing rows per page
  };
   

  return (
    <Box>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left"><b>Name</b></TableCell>
              <TableCell align='left'><b>Reason</b></TableCell>
              <TableCell align='left'><b>Leave Date</b></TableCell>
              <TableCell align='center'><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveApplications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((leaveApplication) => (
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
                  <TableCell align="left">{leaveApplication.reason}</TableCell>
                  <TableCell align="left">
                    {new Date(leaveApplication.leaveDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell align="center">
                      <Box sx={{   
                        display: 'inline-block' 
                      }}>
                        <Typography className={
                          leaveApplication.status === 'Approved' ? 'statusApproved' : 
                          leaveApplication.status === 'Pending' ? 'statusPending' : 
                          'statusRejected'
                        }>
                          {leaveApplication.status}
                        </Typography>
                      </Box>
                      </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={[3, 5, 25]}
            component="div"
            count={leaveApplications.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeaveManagement;