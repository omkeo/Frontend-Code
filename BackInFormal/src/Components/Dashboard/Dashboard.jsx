import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar';
import ListInvoice from '../Invoice/ListInvoice';
import CreateInvoice from '../Invoice/CreateInvoiocePage';
import SettingMaster from '../SettingMaster/SettingMaster';
import EditInvoice from '../Invoice/EditInvoice';

const Dashboard = () => {
  const [navTitle, setNavTitle] = useState('Create Invoice')

  return (
    <>
      <div style={{ overflowX: 'hidden' }}>
        <NavigationBar navTitle={navTitle} setNavTitle={setNavTitle} />
        <Routes>
          <Route path="/" element={<CreateInvoice />} />
          <Route path="/listinvoice" element={<ListInvoice />} />
          <Route path="/settings" element={<SettingMaster />} />
          <Route path="/editinvoice/:invoiceId" element={<EditInvoice setNavTitle={setNavTitle} />} />
          

        </Routes>
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
