import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, PieController, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, CategoryScale, PieController, Tooltip, Legend);

function TaskPieChart({ tasks }) {
  const todoTasks = tasks.filter((task) => !task.isVerified).length;
  const doneTasks = tasks.filter((task) => task.isVerified).length;
  const totalTasks = todoTasks + doneTasks;

  const data = {
    labels: ['ToDo Tasks', 'Done Tasks'],
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
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          generateLabels: function(chart) {
            const dataset = chart.data.datasets[0];
            const labels = chart.data.labels;
            return labels.map((label, index) => {
              const value = dataset.data[index];
              const percentage = ((value / totalTasks) * 100).toFixed(2);
              return {
                text: `${label}: ${percentage}%`,
                fillStyle: dataset.backgroundColor[index],
                hidden: false,
                index: index
              };
              
            });
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label;
            const value = context.raw;
            const percentage = ((value / totalTasks) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '105%', margin: 'auto' }}>
      <Pie data={data} options={options} />
      <div style={{ position: 'absolute', right: '25%' }} id="legend" />
    </div>
  );
}

export default TaskPieChart;

