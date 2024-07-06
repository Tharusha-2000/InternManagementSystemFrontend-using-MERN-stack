import React, { useState, useEffect } from "react";
import Barchart from './components/project/projectbarchart';
import Typography from "@mui/material/Typography";
import axios from "axios";
import { BASE_URL } from "./config";
import { Box, CircularProgress, Container } from "@mui/material";

function Counter() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

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


  

  return (
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
  );
}

export default Counter;