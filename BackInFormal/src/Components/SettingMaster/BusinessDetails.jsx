import React, { useState } from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import "./Bank_details.css";
const BusinessDetails = () => {

    const [compName, setCompName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [panNo, setPanNo] = useState('')
    const [imageLogo, setImageLogo] = useState('')
    const [email, setEmail] = useState('')
    const [gstNo, setGstNo] = useState('')
    const [address, setAddress] = useState('')


    const handleBusinessUpdate=(e)=>{
        e.preventDefault()
        console.log(compName,contactNumber,panNo,imageLogo,email,gstNo,address)
    }

    return (
        <div style={{ border: '1px solid black', margin: '25px', marginTop: '30px', padding: '25px', borderRadius: '10px' }}>
            <h3 className="mb-4 formHeadingSetting">Business Details</h3>
            <form onSubmit={(e)=>handleBusinessUpdate(e)}>
                <Row>
                    <Col xs={6}>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Company Name"
                                    className="mb-3 "
                                >
                                    <Form.Control type="name" placeholder="" onChange={(e) => {
                                        setCompName(e.target.value)
                                    }} />
                                </FloatingLabel>
                            </Col>

                        </Row>
                        <Row>

                            <Col md={12}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Contact Number"
                                    className="mb-3"
                                >
                                    <Form.Control type="name" placeholder="" onChange={(e) => {
                                        setContactNumber(e.target.value)
                                    }} />
                                </FloatingLabel>
                            </Col>

                        </Row>
                        <Row>

                            <Col md={12}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="PAN No"
                                    className="mb-3"
                                >
                                    <Form.Control type="name" placeholder="" onChange={(e) => {
                                        setPanNo(e.target.value)
                                    }} />
                                </FloatingLabel>
                            </Col>

                        </Row>

                        <Row>

                            <Col md={12}>
                                <FloatingLabel controlId="floatingSelect" className="mb-3">
                                    <Form.Control type="file" placeholder="" onChange={(e) => {
                                        setImageLogo(e.target.files[0])
                                    }} />

                                </FloatingLabel>
                            </Col>

                        </Row>
                    </Col>
                    <Col xs={6}>

                        <Row>

                            <Col md={12}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Company Email"
                                    className="mb-3"
                                >
                                    <Form.Control type="name" placeholder="" onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} />
                                </FloatingLabel>
                            </Col>

                        </Row>
                        <Row>

                            <Col md={12}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="GSTIN"
                                    className="mb-3"
                                >
                                    <Form.Control type="name" placeholder="" onChange={(e) => {
                                        setGstNo(e.target.value)
                                    }} />
                                </FloatingLabel>
                            </Col>

                        </Row>
                        <Row>

                            <Col md={12}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Company Address"
                                    className="mb-3"
                                >
                                    <Form.Control type="name" placeholder="" onChange={(e) => {
                                        setAddress(e.target.value)
                                    }} />
                                </FloatingLabel>
                            </Col>

                        </Row>

                        <Row>
                            <Col md={2}></Col>
                            <Col md={8}>
                                <button type="submit" className="save-detail">Update details</button>
                            </Col>
                            <Col md={2}></Col>
                        </Row>
                    </Col>

                </Row>
            </form>
        </div>
    );
};

export default BusinessDetails;
