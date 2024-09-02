import React, { useState } from "react";
import "./SettingMaster.css";
import { Col, Form, Row, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const SettingMaster = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [panNo, setPanNo] = useState("");
    const [gstNo, setGstNo] = useState("");
    const [logo, setLogo] = useState("");

    const handleUpdates = (e) => {
        e.preventDefault();
        const data ={
        'name':name,
        'email':email,
         'phone':phone,
       'address':address,
        'panNo':panNo,
       'gstNo':gstNo,
         'logo':logo,
        }

        console.log(data);
        

    }





    return (
        <div>
            <Form onSubmit={(e) => handleUpdates(e)}>
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
                                <Form.Control type="name" placeholder="name@example.com"
                                    value={name} onChange={(e) => setName(e.target.value)} />
                            </FloatingLabel>
                        </Col>
                        <Col xs={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email Address"
                                className="mb-3"
                            >
                                <Form.Control type="Email" placeholder="name@example.com"
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
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
                                <Form.Control type="Name" placeholder="1234569875"
                                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </FloatingLabel>
                        </Col>
                        <Col xs={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Business Address"
                                className="mb-3"
                            >
                                <Form.Control type="Name" placeholder="1234569875"
                                    value={address} onChange={(e) => setAddress(e.target.value)} />
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
                                <Form.Control type="Name" placeholder="QWE2334IN"
                                    value={panNo} onChange={(e) => setPanNo(e.target.value)} />
                            </FloatingLabel>
                        </Col>
                        <Col xs={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="GSTIN"
                                className="mb-3"
                            >
                                <Form.Control type="Name" placeholder="QWE2334IN"
                                    value={gstNo} onChange={(e) => setGstNo(e.target.value)} />

                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="r4">
                        <Col>
                            <div className="row4">
                                <Form.Group controlId="formFile" className="mb-3 updatelogo">
                                    <Form.Label>Update logo..</Form.Label>
                                    <Form.Control type="file"
                                        onChange={(e) => setLogo(e.target.files[0])} />
                                </Form.Group>
                            </div>
                        </Col>
                        <Col className="BtnInSetting">
                            <Row>
                                <Col xs={8}>

                                </Col>
                                <Col xs={4}>
                                    <Button type="submit" className="btncol" style={{ marginLeft: '20px' }}>
                                        Update
                                    </Button>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    );
};

export default SettingMaster;
