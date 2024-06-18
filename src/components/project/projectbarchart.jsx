import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function TaskBarChart({ tasks }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const todoTasks = months.map(month => tasks.filter(task => !task.isVerified && new Date(task.updatedAt || task.createdAt).getMonth() === months.indexOf(month)).length);
  const doneTasks = months.map(month => tasks.filter(task => task.isVerified && new  Date(task.updatedAt || task.createdAt).getMonth() === months.indexOf(month)).length);
 console.log(todoTasks)
 console.log(doneTasks)
  const data = {
    labels: months,
    datasets: [
      {
        label: 'ToDo Tasks',
        data: todoTasks,
        backgroundColor: 'red',
      },
      {
        label: 'Done Tasks',
        data: doneTasks,
        backgroundColor: 'green',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14, // Increase the font size for x-axis labels
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14, // Increase the font size for y-axis labels
          },
        },
      },
    },
    }

  return (
    <div style={{ position: 'relative', width: '100%', margin: 'auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default TaskBarChart;