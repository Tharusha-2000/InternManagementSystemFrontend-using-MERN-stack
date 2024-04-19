import React from 'react';
import { BASE_URL } from "./config";
import axios from 'axios';
// This component represents a single notification
function Notification({ task, onVerify, onCancel }) {
  return (
    <div>
      <h2>{task.title}</h2>
      <button onClick={() => onVerify(task._id)}>Verify</button>
      <button onClick={() => onCancel(task._id)}>Cancel</button>
    </div>
  );
}

// This component fetches the tasks and renders the notifications
class NotificationList extends React.Component {
  state = {
    tasks: [],
  };
 
  componentDidMount() {
    const token = localStorage.getItem("token");
    // Fetch the tasks from the server
    axios
    .get(`${BASE_URL}taskNotify`, {
      headers: { Authorization: `Bearer ${token}` },
    }) 
    .then(response => {
      console.log(response.data);
      this.setState({ tasks: response.data });
    })
    .catch(error => {
      console.error(error);
    });
  }

  handleVerify = (taskId) => {
    // Code to handle verification goes here
    console.log(`Task ${taskId} has been verified.`);
    const token = localStorage.getItem("token");
    const isVerified = { isVerified: true };
    axios
       .put(`${BASE_URL}taskVerify/${taskId}`,isVerified)
       .then(response => {
          console.log(`Task ${taskId} has been verified.`);
          console.log(response);
      // Update the task in the state
        this.setState(prevState => ({
             tasks: prevState.tasks.map(task => 
             task._id === taskId ? { ...task, isVerified: true } : task )
      }));
    })
    .catch(error => {
       console.error(error);
    })
  };

  handleCancel = (taskId) => {
    // Code to handle cancellation goes here
    console.log(`Task ${taskId} has been cancelled.`);
    const isVerified = { isVerified: false};
    axios
       .put(`${BASE_URL}taskVerify/${taskId}`,isVerified)
       .then(response => {
          console.log(`Task ${taskId} has been verified.`);
          console.log(response);
          
     // Update the task in the state
      this.setState(prevState => ({
        tasks: prevState.tasks.filter(task => task._id !== taskId)
      }));
  
    })
    .catch(error => {
       console.error(error);
    })
    




  };

  render() {
    return (
      <div>
         {this.state.tasks.filter(task => !task.isVerified).map(task => (
        <Notification
          key={task._id}
          task={task}
          onVerify={this.handleVerify}
          onCancel={this.handleCancel}
        />
      ))}
      </div>
    );
  }
}

export default NotificationList;