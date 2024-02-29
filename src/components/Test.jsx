import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Test() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users/user/tharusha')
      .then(response => {
        console.log('Data:', response.data._id); // Logging data
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    console.log('Users:', users); // Logging users array
  }, [users]); // Log whenever users state changes

  return (
    <div>
      <h1>User List</h1>
      <ul>
        <li>{users.email}</li>

      </ul>
    </div>
  );
}
