import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from "../../config";
import './Calendar.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//import listPlugin from "@fullcalendar/list";
import { Box, useTheme, Typography, Modal, TextField, Button } from "@mui/material";
import { tokens } from "../../Pages/admin_page/theme/theme";
import { jwtDecode } from "jwt-decode";


const EventModal = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    onSave(title);
    setTitle('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        top="25%"
        left="35%"
        transform="translate(-50%, -50%)"
        bgcolor="background.paper"
        p={4}
        boxShadow={24}
        borderRadius={2}
        minWidth={300}
      >
        <Typography variant="h6" gutterBottom>
          Please enter a new title for your event
        </Typography>
        <TextField
          label="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          style={{ marginTop: 16 }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default function Calendar({ fetchUserData }) {
  const [role, setRole] = useState("");
  const [currentEvents, setCurrentEvents] = useState([]);
  const theme = useTheme();
  const colors = tokens;
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(null);
  const calendarRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, []);



  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(currentEvents));
  }, [currentEvents]);

const createWorkSchedule = async (newEvent) => {
  try {
    const response = await axios.post(`${BASE_URL}workschedule`, {
      schedules: [newEvent],
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.updatedUser) {
      // This line already adds the event in real-time to the currentEvents array
      setCurrentEvents(prevEvents => [...prevEvents, newEvent]);
      fetchUserData();
    }
  } catch (error) {
    console.error("Error creating work schedule:", error.response.data);
  }
};

  const deleteWorkSchedule = async (eventId) => {
    try {
      const response = await axios.delete(`${BASE_URL}schedule/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        const updatedEvents = currentEvents.filter(event => event.id !== eventId);
        setCurrentEvents(updatedEvents);
      }
    } catch (error) {
      console.error("Error deleting work schedule:", error.response.data);
    }
  };

  const handleDateClick = (selected) => {
    setSelectedDate(selected);
    setModalOpen(true);
  };

  const handleEventClick = async (selected) => {
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
      await deleteWorkSchedule(selected.event.id);
    }
  };

  const handleModalSave = async (title) => {
    if (title && selectedDate) {
      const newEvent = {
        id: `${selectedDate.dateStr}-${title}`,
        title,
        start: selectedDate.startStr,
        end: selectedDate.endStr,
      };
      await createWorkSchedule(newEvent);
    }
  };


  return (
    <Box display="flex" justifyContent="space-between" className="calendar-container" width="100%">
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          //listPlugin,
        ]}
        headerToolbar={{
          left: "prev,today,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={currentEvents}
        select={handleDateClick}
        eventClick={handleEventClick}
        ref={calendarRef}
        dayCellClassNames="custom-day-cell"
        dayHeaderContent={(header) => {
          const dayShortNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
          return dayShortNames[header.date.getUTCDay()];
        }}
        
        selectAllow={(selectInfo) => {
          return selectInfo.start >= new Date();
        }}
      />
      <EventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleModalSave}
      />
    </Box>
  );
}