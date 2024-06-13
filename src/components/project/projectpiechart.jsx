// TaskPieChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, PieController } from 'chart.js';
Chart.register(ArcElement, CategoryScale, PieController);

function TaskPieChart({ tasks }) {
  const todoTasks = tasks.filter((task) => !task.isVerified).length;
  const doneTasks = tasks.filter((task) => task.isVerified).length;

  const data = {
    labels: ['To Do Tasks', 'Done Tasks'],
    datasets: [
      {
        data: [todoTasks, doneTasks],
        backgroundColor: ['red', 'green'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Pie data={data} options={options} />;
}

export default TaskPieChart;