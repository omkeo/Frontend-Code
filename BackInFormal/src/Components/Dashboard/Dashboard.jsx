import React from 'react'
import NavigationBar from '../NavigationBar/NavigationBar'
import { Outlet, Route, Routes } from 'react-router-dom'
import Demo from '../DemoCOmponent/Demo'
import Demo2 from '../DemoCOmponent/Demo2'

function Dashboard() {
    return (
         
            <>
                <NavigationBar />


                <Routes>
                    <Route path="/" element={<Demo/>} />
                    <Route path="/demo2" element={<Demo2/>} />

                </Routes>
                <Outlet />
             
        </>
    
  )
}

export default Dashboard
