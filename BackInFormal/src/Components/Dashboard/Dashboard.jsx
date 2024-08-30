import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar';
import ListInvoice from '../Invoice/ListInvoice';
import CreateInvoice from '../Invoice/CreateInvoiocePage';

const Dashboard = () => {
  return (
    <>
      <div style={{ overflowX: 'hidden' }}>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<CreateInvoice />} />
          <Route path="/listinvoice" element={<ListInvoice />} />
        </Routes>
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
