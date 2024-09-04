import React, { useEffect, useState } from 'react';
import { Row, Col, Button, InputGroup, Form, Table } from 'react-bootstrap';
import './createinvoice.css';
import { toast } from 'react-toastify';
import rupeeIcon from '../../assets/rupee.png';
import saveIcon from '../../assets/saveIcon.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditInvoice({ setNavTitle }) {
    const { invoiceId } = useParams();

    const [invoice, setInvoice] = useState({});
    const [itemsOld, setItemsOld] = useState([]);
    const [customer, setCustomer] = useState({});

    useEffect(() => {
        setNavTitle('Edit Invoice');

        const fetchInvoice = async (invoiceId) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/invoice/${invoiceId}`);
                if (response.status === 200) {
                    setInvoice(response.data);
                    setItemsOld(response.data.invoiceListId.itemDataList || []);
                    setCustomer(response.data.customer || {});
                    console.log(response.data);
                    
                }
            } catch (error) {
                toast.error('Error fetching invoice');
            }
        };
        fetchInvoice(invoiceId);
    }, [invoiceId, setNavTitle]);

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...itemsOld];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: value
        };
        setItemsOld(updatedItems);
    };

    const calculateTotals = () => {
        return itemsOld.reduce(
            (acc, item) => {
                const amount = (item.itemPrice || 0) * (item.quantity || 0);
                const gst = (amount * (item.gstRate || 0)) / 100;
                const total = amount + gst;
                acc.subTotal += amount;
                acc.tax += gst * 2;
                acc.netTotal += total;
                return acc;
            },
            { subTotal: 0, tax: 0, netTotal: 0 }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedInvoice = {
                ...invoice,
                invoiceListId: {
                    ...invoice.invoiceListId,
                    itemDataList: itemsOld
                }
            };
            await axios.put(`http://localhost:8080/api/invoice/${invoiceId}`, updatedInvoice);
            toast.success('Invoice updated successfully');
        } catch (error) {
            toast.error('Error updating invoice');
        }
    };

    const totals = calculateTotals();

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Row>
                    <div className="col-md-4">
                        <div className='billedByInfoDiv'>
                            <h4>Billed By</h4>
                            <strong>Back In Formal</strong>
                            <p>Inside Sunderban Resort, Lane No 1. Koregaon park,</p>
                            <p>Pune, Maharashtra, India</p>
                            <p><strong>GSTIN:</strong> 27BBVPS2441E2ZB</p>
                            <p><strong>PAN:</strong> BBVPS2441E</p>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-7">
                        <div className='billedToDiv'>
                            <h4>Billed To</h4>
                            <Row>
                                <div className="col-md-6">
                                    <input type="text" placeholder='Company name' value={customer.custName || ''} readOnly />
                                    <input type="text" placeholder='GSTIN' value={customer.custGSTIN || ''} readOnly />
                                    <input type="email" placeholder='Email' value={customer.custEmail || ''} readOnly />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" placeholder='Address' value={customer.custAddress || ''} readOnly />
                                    <input type="text" placeholder='PAN' value={customer.custPAN || ''} readOnly />
                                    <input type="tel" placeholder='Phone' value={customer.custMobile || ''} readOnly />
                                </div>
                            </Row>
                        </div>
                    </div>
                </Row>
                <Row style={{ padding: '35px' }}>
                    <Table hover responsive bordered>
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>Item</th>
                                <th style={{ width: '10%' }}>GST(%)</th>
                                <th style={{ width: '10%' }}>Quantity</th>
                                <th style={{ width: '10%' }}>Rate</th>
                                <th style={{ width: '10%' }}>Amount</th>
                                <th style={{ width: '10%' }}>CGST</th>
                                <th style={{ width: '10%' }}>SGST</th>
                                <th style={{ width: '10%' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsOld.map((item, index) => (
                                <tr key={item.itemId}>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.itemName || ''}
                                            onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.gstRate || ''}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*\.?\d*$/.test(value) || value === '') {
                                                    handleItemChange(index, 'gstRate', value);
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.quantity || ''}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*\.?\d*$/.test(value) || value === '') {
                                                    handleItemChange(index, 'quantity', value);
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.itemPrice || ''}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*\.?\d*$/.test(value) || value === '') {
                                                    handleItemChange(index, 'itemPrice', value);
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>{((item.itemPrice || 0) * (item.quantity || 0)).toFixed(2)}</td>
                                    <td>{((((item.itemPrice || 0) * (item.quantity || 0)) * (item.gstRate || 0)) / 200).toFixed(2)}</td>
                                    <td>{((((item.itemPrice || 0) * (item.quantity || 0)) * (item.gstRate || 0)) / 200).toFixed(2)}</td>
                                    <td>{(((((item.itemPrice || 0) * (item.quantity || 0)) * (item.gstRate || 0)) / 100) + ((item.itemPrice || 0) * (item.quantity || 0))).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    <Col xs={6}>
                        <textarea name="" className="paraNotesOnInvoice" placeholder='Type notes here...........'></textarea>
                    </Col>
                    <Col xs={6} className='SaveInvoiceBtnDiv'>
                        <Row>
                            <Col xs={6}>
                                <Col xs={12}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text><strong>Sub Total</strong></InputGroup.Text>
                                        <Form.Control
                                            aria-label="Amount (to the nearest dollar)"
                                            className='displayStatInputField'
                                            value={totals.subTotal.toFixed(2)}
                                            readOnly
                                        />
                                        <InputGroup.Text><img src={rupeeIcon} alt="Rs" style={{ width: '20px' }} /></InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Col>
                            <Col xs={6}></Col>
                            <Row>
                                <Col xs={6}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text><strong>Tax</strong></InputGroup.Text>
                                        <Form.Control
                                            aria-label="Amount (to the nearest dollar)"
                                            className='displayStatInputField'
                                            value={totals.tax.toFixed(2)}
                                            readOnly
                                        />
                                        <InputGroup.Text><img src={rupeeIcon} alt="Rs" style={{ width: '20px' }} /></InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col xs={6}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text style={{ color: 'green' }}><strong>Paid Amount</strong></InputGroup.Text>
                                        <Form.Control aria-label="Amount (to the nearest dollar)" className='displayStatInputField' value={invoice.amtReceived}/>
                                        <InputGroup.Text><img src={rupeeIcon} alt="Rs" style={{ width: '20px' }} /></InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col xs={6}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text><strong>Net Total</strong></InputGroup.Text>
                                        <Form.Control
                                            aria-label="Amount (to the nearest dollar)"
                                            className='displayStatInputField'
                                            value={totals.netTotal.toFixed(2)}
                                            readOnly
                                        />
                                        <InputGroup.Text><img src={rupeeIcon} alt="Rs" style={{ width: '20px' }} /></InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col xs={6}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text style={{ color: 'red' }}><strong>Due Amount</strong></InputGroup.Text>
                                        <Form.Control aria-label="Amount (to the nearest dollar)" className='displayStatInputField' readOnly value={(totals.netTotal.toFixed(2)-invoice.amtReceived).toFixed(2)} />
                                        <InputGroup.Text><img src={rupeeIcon} alt="Rs" style={{ width: '20px' }} /></InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Row>
                        <Row>
                            <Col xs={3}></Col>
                            <Col xs={6}>
                                <Button type="submit" className='SaveInvoiceBtn' style={{ height: '50px' }}>
                                    <img src={saveIcon} style={{ height: '30px' }} alt="Save" /> Save Invoice
                                </Button>
                            </Col>
                            <Col xs={3}></Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        </div>
    );
}

export default EditInvoice;
