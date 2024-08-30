import React, { useState } from 'react'
import './navbar.css'
import logo from './image.png'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Authentification/AuthContext';
import { toast } from 'react-toastify';


function NavigationBar() {
  const [navTitle, setNavTitle] = useState('Create Invoice')
  const { logout } = useAuth();






  return (
    <div className='navbarDiv'>
      <Row>
        <Col xs={10}>
          <Row>
            <h3 style={{marginLeft:'15px'}}>{navTitle}</h3>
          </Row>
          <Row>
            <Col xs={2}>
              <NavLink to="/dashboard/" className="nav-link">
                <Button className='navCreateInvoiceBtn' onClick={()=>setNavTitle('Create Invoice')}>Create Invoice</Button>
              </NavLink>
            </Col>
            <Col xs={2}>
              <NavLink to="/dashboard/listinvoice" className="nav-link">
                <Button className='navListInvoiceBtn' onClick={()=>setNavTitle('List Invoice')}>List Invoice</Button>
              </NavLink>
            </Col>
            <Col xs={2}><Button className='navLogoutBtn' onClick={logout}>Logout</Button></Col>



          </Row>
        </Col>
        <Col xs={2}>
          <img src={logo} alt="Logo" className="logo" />
        </Col>
      </Row>
    </div>
  )
}

export default NavigationBar
