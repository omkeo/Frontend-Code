import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import "./Bank_details.css";
const Bank_details = () => {
    return (
        <div style={{border:'1px solid black',margin:'25px',marginTop:'30px',padding:'25px',borderRadius:'10px'}}>
            <h3 className="mb-4 formHeadingSetting">Bank Details</h3>
            <Row>
                <Col xs={6}>
                    <Row>
                        <Col md={12}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Bank Name"
                                className="mb-3 "
                            >
                                <Form.Control type="name" placeholder="" />
                            </FloatingLabel>
                        </Col>
                       
                    </Row>
                    <Row>
                        
                        <Col md={12}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Account holder Name"
                                className="mb-3"
                            >
                                <Form.Control type="name" placeholder="" />
                            </FloatingLabel>
                        </Col>
                        
                    </Row>
                    <Row>
                         
                        <Col md={12}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Account No."
                                className="mb-3"
                            >
                                <Form.Control type="name" placeholder="" />
                            </FloatingLabel>
                        </Col>
                         
                    </Row>
                    <Row>
                        
                        <Col md={12}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Branch Address"
                                className="mb-3"
                            >
                                <Form.Control type="name" placeholder="" />
                            </FloatingLabel>
                        </Col>
                       
                    </Row>
                </Col>
                <Col xs={6}>
                <Row>
                        
                        <Col md={12}>
                            <FloatingLabel controlId="floatingSelect" className="mb-3">
                                <Form.Select placeholder="">
                                    <option value="">Select Type</option>
                                    <option value="1">Saving Account</option>
                                    <option value="2">Current Account</option>
                                    <option value="3">Recurring Account</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                      
                    </Row>

                    <Row>
                       
                        <Col md={12}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="IFSC Code"
                                className="mb-3"
                            >
                                <Form.Control type="name" placeholder="" />
                            </FloatingLabel>
                        </Col>
                      
                    </Row>
                    <Row>
                         
                        <Col md={12}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Branch Name"
                                className="mb-3"
                            >
                                <Form.Control type="name" placeholder="" />
                            </FloatingLabel>
                        </Col>
                        
                    </Row>
                    
                    <Row>
                        <Col md={2}></Col>
                        <Col md={8}>
                            <button className="save-detail">Update Details</button>
                        </Col>
                        <Col md={2}></Col>
                    </Row>
                </Col>

            </Row>





        </div>
    );
};

export default Bank_details;
