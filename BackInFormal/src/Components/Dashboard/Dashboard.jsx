import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar';
import ListInvoice from '../Invoice/ListInvoice';
import CreateInvoice from '../Invoice/CreateInvoiocePage';
import SettingMaster from '../SettingMaster/SettingMaster';

const Dashboard = () => {
  return (
    <>
      <div style={{ overflowX: 'hidden' }}>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<CreateInvoice />} />
          <Route path="/listinvoice" element={<ListInvoice />} />
          <Route path="/settings" element={<SettingMaster />} />

        </Routes>
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
