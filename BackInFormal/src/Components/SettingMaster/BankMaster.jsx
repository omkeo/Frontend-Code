import React, { useState, useEffect } from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { toast } from 'react-toastify';
import "./Bank_details.css";

const Bank_details = ({ settings,fetchSettings }) => {
    // State hooks for each form field
    const [bankName, setBankName] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [branchAddress, setBranchAddress] = useState('');
    const [accountType, setAccountType] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [branchName, setBranchName] = useState('');

    // Effect hook to populate form with existing data
    useEffect(() => {
        if (settings) {
            setBankName(settings.bankName || '');
            setAccountHolderName(settings.accountHolderName || '');
            setAccountNumber(settings.accountNumber || '');
            setBranchAddress(settings.branchAddress || '');
            setAccountType(settings.accountType || '');
            setIfscCode(settings.ifscCode || '');
            setBranchName(settings.branchName || '');
        }
    }, [settings]);

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8080/api/bankDetails/update-bank/1', {
                bankName,
                accountHolderName,
                accountNumber,
                branchAddress,
                accountType,
                ifscCode,
                branchName,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Handle success (e.g., show a success message)
                fetchSettings()
                toast.success('Bank Details updated successfully');
            }
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error updating bank details', error);
        }
    };

    return (
        <div style={{ border: '1px solid black', margin: '25px', marginTop: '30px', padding: '25px', borderRadius: '10px' }}>
            <h3 className="mb-4 formHeadingSetting">Bank Details</h3>
            <form onSubmit={handleFormSubmit}>
                <Row>
                    <Col xs={6}>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInputBankName" label="Bank Name" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={bankName}
                                        onChange={(e) => setBankName(e.target.value)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInputAccountHolderName" label="Account Holder Name" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={accountHolderName}
                                        onChange={(e) => setAccountHolderName(e.target.value)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInputAccountNumber" label="Account No." className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInputBranchAddress" label="Branch Address" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={branchAddress}
                                        onChange={(e) => setBranchAddress(e.target.value)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6}>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingSelectAccountType" className="mb-3">
                                    <Form.Select
                                        placeholder=""
                                        value={accountType}
                                        onChange={(e) => setAccountType(e.target.value)}
                                    >
                                        <option value="Not Selected">Select Type</option>
                                        <option value="saving">Saving Account</option>
                                        <option value="current">Current Account</option>
                                        <option value="recurring">Recurring Account</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInputIfscCode" label="IFSC Code" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={ifscCode}
                                        onChange={(e) => setIfscCode(e.target.value)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInputBranchName" label="Branch Name" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={branchName}
                                        onChange={(e) => setBranchName(e.target.value)}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={8}>
                                <button type="submit" className="save-detail">Update Details</button>
                            </Col>
                            <Col md={2}></Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        </div>
    );
};

export default Bank_details;
