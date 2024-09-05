import React, { useState, useEffect } from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { toast } from 'react-toastify';

import "./Bank_details.css";
import axios from "axios";

const BusinessDetails = ({ settings,fetchSettings }) => {
    const [compName, setCompName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [panNo, setPanNo] = useState('');
    const [imageLogo, setImageLogo] = useState(null);
    const [email, setEmail] = useState('');
    const [gstNo, setGstNo] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (settings && settings.settingMaster) {
            const { settingMaster } = settings;
            setCompName(settingMaster.companyName || '');
            setContactNumber(settingMaster.companyMobile || '');
            setPanNo(settingMaster.panNumber || '');
            setEmail(settingMaster.companyEmail || '');
            setGstNo(settingMaster.gstin || '');
            setAddress(settingMaster.companyAddress || '');
        }
    }, [settings]);

    const handleInputChange = (setter) => (e) => setter(e.target.value);

    const handleFileChange = (e) => setImageLogo(e.target.files[0]);

    const handleBusinessUpdate = async (e) => {
        e.preventDefault();
    
        try {
            // Create the JSON object
            const settingsData = {
                companyName: compName,
                companyAddress: address,
                companyMobile: contactNumber,
                companyEmail: email,
                gstin: gstNo,
                panNumber: panNo,
            };
    
            // Create a Blob from the JSON data
            const jsonBlob = new Blob([JSON.stringify(settingsData)], { type: 'application/json' });
    
            // Create a new FormData instance
            const formdata = new FormData();
    
            // Append the Blob as a single field
            formdata.append('settingObj', jsonBlob, 'settings.json');
    
            // Append the file if it exists
            if (imageLogo) {
                formdata.append('image', imageLogo);
            }
    
            // Make the PUT request
            const response = await axios.put('http://localhost:8080/settings/update-setting', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data', // This lets axios handle the boundary automatically
                },
            });
    
            // Check response status
            if (response.status === 200) {
                fetchSettings()
                toast.success('Business settings updated successfully');
            } else {
                toast.error('Failed to update settings');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while updating settings');
        }
    };
    

    return (
        <div style={{ border: '1px solid black', margin: '25px', marginTop: '30px', padding: '25px', borderRadius: '10px' }}>
            <h3 className="mb-4 formHeadingSetting">Business Details</h3>
            <form onSubmit={handleBusinessUpdate}>
                <Row>
                    <Col xs={6}>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInputCompanyName" label="Company Name" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={compName}
                                        onChange={handleInputChange(setCompName)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInputContactNumber" label="Contact Number" className="mb-3">
                                    <Form.Control
                                        type="tel"
                                        placeholder=""
                                        value={contactNumber}
                                        onChange={handleInputChange(setContactNumber)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInputPanNo" label="PAN No" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={panNo}
                                        onChange={handleInputChange(setPanNo)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInputImageLogo" label="Upload Logo" className="mb-3">
                                    <Form.Control
                                        type="file"
                                        onChange={(e)=>handleFileChange(e)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6}>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInputCompanyEmail" label="Company Email" className="mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder=""
                                        value={email}
                                        onChange={handleInputChange(setEmail)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInputGstin" label="GSTIN" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={gstNo}
                                        onChange={handleInputChange(setGstNo)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInputAddress" label="Company Address" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={address}
                                        onChange={handleInputChange(setAddress)}
                                    />
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
