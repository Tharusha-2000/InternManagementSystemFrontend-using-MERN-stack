import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { BASE_URL } from '../../config';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setData(null);
      return;
    }

    try {
      const result = await axios.get(`${BASE_URL}user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(result.data.user);
    } catch (err) {
      console.log(err);
      setData(null);
    }
  }, []);

  const eraseUserData = useCallback(() => {
    setData(null);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    const handleTokenChange = () => {
      const newToken = localStorage.getItem('token');
      if (!newToken) {
        setData(null);
      } else {
        fetchUserData();
      }
    };

    handleTokenChange();
    window.addEventListener('storage', handleTokenChange);

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, [fetchUserData]);

  return (
    <UserContext.Provider value={{ data, fetchUserData, eraseUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);