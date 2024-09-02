// GlobalDataContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Retrieve data from localStorage
    const savedData = localStorage.getItem('globalData');
    return savedData ? JSON.parse(savedData) : {
      name: '',
      email: '',
      phone: '',
      address: '',
      panNo: '',
      gstNo: '',
      logo: ''
    };
  });

  useEffect(() => {
    // Store data in localStorage whenever it changes
    localStorage.setItem('globalData', JSON.stringify(data));
  }, [data]);

  return (
    <GlobalDataContext.Provider value={{ data, setData }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalDataContext);
