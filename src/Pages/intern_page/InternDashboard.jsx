import React, { useState } from 'react';
import Internsidebar from '../../components/common/Internsidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';


const otherSetting = {
  height: 300,
  yAxis: [{ label: 'Days' }],
  grid: { horizontal: true },
  sx: {
    [`& .${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

const dataset = [
  {
    taskName: 'Task 1',
    january: 5,
    february: 7,
    march: 6,
    april: 8,
    may: 9,
    june: 7,
  },
  
];


const valueFormatter = (value) => `${value}`;

export function BasicPie() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', transform: 'translate(350px, -350px)' }}>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'To do' },
              { id: 1, value: 15, label: 'Done' },
            ],
          },
        ]}
        width={400}
        height={400}
      />
    </div>
  );
}

export function BasicDateCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newValue) => {
    console.log('New Date:', newValue); // Debugging line
    setSelectedDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}


function FormatterDemoNoSnap() {
  return (
    <Box sx={{ width: '50%', marginLeft: '0', marginTop: '80px', border: '2px solid #B2BEB5', 
    borderRadius: '8px' }}> 
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'taskName',
            valueFormatter: (taskName, context) =>
              context.location === 'tick'
                ? `${taskName.slice(0, 3)} \n2023`
                : `${taskName} 2023`,
          },
        ]}
        series={[
          { dataKey: 'january', label: 'January', valueFormatter },
          { dataKey: 'february', label: 'February', valueFormatter },
          { dataKey: 'march', label: 'March', valueFormatter },
          { dataKey: 'april', label: 'April', valueFormatter },
          { dataKey: 'may', label: 'May', valueFormatter },
          { dataKey: 'june', label: 'June', valueFormatter },
          
        ]}
        barSize={5}
        {...otherSetting}
      />
    </Box>
  );
}


export default function InternDashboard() {
  
  const currentDate = new Date(); // Assuming you want to display the current date

  return (
    
    <div className="bgcolor">
      <Header />
      <Box height={50} />
      <Box sx={{ display: 'flex' }}>
        <Internsidebar />
        <Box  component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              sx={{ 
                maxWidth: 5000,
                backgroundImage: `url('src/assets/R.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '300px', // adjust this value
                width: '70%', 
              }}
            >
           {/* <img src="https://breaking-taboo.org/wp-content/uploads/iStock-1225434038.jpg" alt="Intern Image" style={{ width: '30%', height: '300px' }} /> */}
  
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
                  >
                    Welcome to IMS
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="700"
                  >
                    <div>
                      <p>{currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <FormatterDemoNoSnap />
          <BasicPie />
        </Box>
      </Box>
    </div>
  );
}

