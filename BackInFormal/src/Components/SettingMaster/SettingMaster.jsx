import React from "react";
import "./SettingMaster.css";
import { Col, Form, Row, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const SettingMaster = () => {
    return (
        <div>
            <div className="table-detail">
                <div className="header">
                    {/* <h2>Setting Master</h2> */}
                </div>
                <Row className="r1">
                    <Col xs={6}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3"
                        >
                            <Form.Control type="name" placeholder="name@example.com" />
                        </FloatingLabel>
                    </Col>
                    <Col xs={6}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email Address"
                            className="mb-3"
                        >
                            <Form.Control type="Email" placeholder="name@example.com" />
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className="r2">
                    <Col xs={6}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Mobile No."
                            className="mb-3"
                        >
                            <Form.Control type="Name" placeholder="1234569875" />
                        </FloatingLabel>
                    </Col>
                    <Col xs={6}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Business Address"
                            className="mb-3"
                        >
                            <Form.Control type="Name" placeholder="1234569875" />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="r3">
                    <Col xs={6}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="PAN No."
                            className="mb-3"
                        >
                            <Form.Control type="Name" placeholder="QWE2334IN" />
                        </FloatingLabel>
                    </Col>
                    <Col xs={6}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="GSTIN"
                            className="mb-3"
                        >
                            <Form.Control type="Name" placeholder="QWE2334IN" />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="r4">
                    <Col>
                        <div className="row4">
                            <Form.Group controlId="formFile" className="mb-3 updatelogo">
                                <Form.Label>Update logo..</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        </div>
                    </Col>
                    <Col className="BtnInSetting">
                        <Row>
                            <Col xs={8}>

                            </Col>
                            <Col xs={4}>
                                <Button type="submit" className="btncol" style={{marginLeft:'20px'}}>
                                    Update
                                </Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default SettingMaster;
