 import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Bank_details from './BankMaster'
import BusinessDetails from './BusinessDetails'
 
 function SettingMaster() {
   return (
     <div>
       <Row>
        <Col xs={6}>
        
        <Bank_details/>
        </Col>
        <Col xs={6}> 
        <BusinessDetails/>
        </Col>

       </Row>
     </div>
   )
 }
 
 export default SettingMaster
 