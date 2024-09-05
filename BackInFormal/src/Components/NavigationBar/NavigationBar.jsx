import React, { useState } from 'react';
import './navbar.css';
import logo from './image.png';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';
import createLogo from '../../assets/createInvoice.png';
import ListIcon from '../../assets/ListIcon.png';
import settingLogo from '../../assets/settingLogo.png';
import logoutIcon from '../../assets/logoutIcon.png';

function NavigationBar({ navTitle, setNavTitle }) {
  const { logout } = useAuth();

  return (
    <div className="navbarDiv">
      <Row>
        <Col xs={10}>
          <Row>
            <h3 style={{ marginLeft: '10px' }}>{navTitle}</h3>
          </Row>
          <Row>
            <Col xs={2}>
              <NavLink to="/dashboard/" className="nav-link">
                <Button
                  className="navCreateInvoiceBtn"
                  onClick={() => setNavTitle('Create Invoice')}
                >
                  <img
                    src={createLogo}
                    alt=""
                    style={{ width: '20px', marginRight: '5px' }}
                  />{' '}
                  Create Invoice
                </Button>
              </NavLink>
            </Col>
            <Col xs={2}>
              <NavLink to="/dashboard/listinvoice" className="nav-link">
                <Button
                  className="navListInvoiceBtn"
                  onClick={() => setNavTitle('List Invoice')}
                >
                  <img
                    src={ListIcon}
                    alt=""
                    style={{ width: '20px', marginRight: '10px' }}
                  />
                  List Invoice
                </Button>
              </NavLink>
            </Col>
            <Col xs={2}>
              <NavLink to="/dashboard/settings" className="nav-link">
                <Button
                  className="navBusinessSettingBtn"
                  onClick={() => setNavTitle('Business Setting')}
                >
                  <img
                    src={settingLogo}
                    alt=""
                    style={{ width: '20px', marginRight: '5px' }}
                  />
                  Business Setting
                </Button>
              </NavLink>
            </Col>
            <Col xs={2}>
              <Button className="navLogoutBtn" onClick={logout}>
                <img
                  src={logoutIcon}
                  alt=""
                  style={{ width: '18px', marginRight: '10px' }}
                />
                Logout
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={2}>
          <img src={logo} alt="Logo" className="logo" />
        </Col>
      </Row>
      {/* <hr /> */}
    </div>
  );
}

export default NavigationBar;
