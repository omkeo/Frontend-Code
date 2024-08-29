import React from 'react'
import NavigationBar from '../NavigationBar/NavigationBar'
import { Outlet, Route, Routes } from 'react-router-dom'
import CreateInvoice from '../Invoice/CreateInvoiocePage'
import ListInvoice from '../Invoice/ListInvoice'

function Dashboard() {
    return (

        <>
            <div style={{
                overflowX: 'hidden'
            }}>
                <NavigationBar />


                <Routes>
                    <Route path="/" element={<CreateInvoice />} />
                    <Route path="/listinvoice" element={<ListInvoice />} />

                </Routes>
                <Outlet />

            </div>


        </>

    )
}

export default Dashboard
