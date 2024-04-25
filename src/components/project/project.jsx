import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  FormControlLabel
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { BASE_URL } from "../../config";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import TaskIcon from '@mui/icons-material/Task';

function internTaskTable({ internId }) {
  // State for tasks and data
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  

  const token = localStorage.getItem("token");

  const handleClickOpen = (task) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&::after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks
  const fetchTasks = async () => {
    const response = await axios.get(`${BASE_URL}task/${internId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = Array.isArray(response.data)
      ? response.data
      : [response.data];
    setTasks(responseData);
    console.log(responseData);
  };




  // Render component
  return (
  <div>
   
    <IconButton
        size="small"
        color="primary"
        style={{ marginRight: "10px" }}
        onClick={() => handleClickOpen()}
     >
        <TaskIcon />
     </IconButton>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"  maxWidth="lg"  >
    <DialogTitle id="form-dialog-title"> PROJECT TASK LIST <IconButton onClick={handleClose} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
    <DialogContent>
    <div>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "1500px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography
              level="title-md"
              style={{ fontSize: "18px", fontWeight: "bold", color: "red" }}
            >
              TO DO LIST
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <TableContainer>
              <Table>
                <TableBody>
                  {tasks
                    .filter((task) => !task.isVerified)
                    .map((task) => (
                      <TableRow key={task._id} >
                        <TableCell sx={{ width: "75%" }}>
                          {task.title}
                        </TableCell>

                        <TableCell >
                      
                          <FormControlLabel
                            control={
                              <Android12Switch
                                checked={task.isComplete}
                               />
                            }
                            label="complete"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Card>

        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography
              level="title-md"
              style={{ fontSize: "18px", fontWeight: "bold", color: "green" }}
            >
              DONE LIST{"  "}
              <DoneAllIcon style={{ color: "green" }} fontSize="medium" />
            </Typography>
            <Typography level="body-sm">
              completed task and verified by mentor
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <TableContainer>
              <Table>
                <TableBody>
                  {tasks
                    .filter((task) => task.isVerified)
                    .map((task) => (
                      <TableRow key={task._id} sx={{ height: '10px' }}>
                        <TableCell>{task.title}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Card>
      </Stack>

    </div>

    </DialogContent>
   </Dialog>
   </div>
  );
}

export default internTaskTable;
