import { useState, useEffect } from 'react';
import axios from 'axios';
export const RoleContext = React.createContext();
import { BASE_URL } from '../../config';
import Adminsidebar from '../common/AdminSidebar';
import Mentorsidebar from '../common/Mentorsidebar';

export const RoleBasedComponent = () => {
  const [role, setRole] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${BASE_URL}user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setRole(result.data.role);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <RoleContext.Provider value={role}>
        <Adminsidebar/>
        <Mentorsidebar/>

    </RoleContext.Provider>
  );
};