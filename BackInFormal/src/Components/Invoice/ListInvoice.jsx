import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Form, Pagination } from 'react-bootstrap';
import printIcon from '../../assets/printIcon.png';
import editIcon from '../../assets/editIcon.png';
import deleteIcon from '../../assets/DeleteIcon.png';
import axios from 'axios';
import './invoicelist.css';
import printHelp from './PrintInvoice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ListInvoice() {
  const [invoiceList, setInvoiceList] = useState([]);
  const [filteredInvoiceList, setFilteredInvoiceList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/invoice/invoice-list');
        setInvoiceList(response.data);
        setFilteredInvoiceList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    fetchInvoices();
  }, []);

  useEffect(() => {
    filterInvoices();
  }, [searchTerm, startDate, endDate, invoiceList]);

  const filterInvoices = () => {
    let filtered = invoiceList;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(invoice =>
        invoice.custName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.uniqueInvoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (startDate || endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter(invoice => {
        const invoiceDate = new Date(invoice.createdOn);
        return (!startDate || invoiceDate >= start) && (!endDate || invoiceDate <= end);
      });
    }

    setFilteredInvoiceList(filtered);
  };

  const handlePrintInvoice = async (invoiceId) => {
    const response = await axios.get(`http://localhost:8080/api/invoice/${invoiceId}`);
    const invoice = response.data;
    const billedForData = {
      companyName: invoice.customer.custName,
      gstNo: invoice.customer.custGSTIN,
      email: invoice.customer.custEmail,
      address: invoice.customer.custAddress,
      panNo: invoice.customer.custPAN,
      phone: invoice.customer.custMobile,
      invoiceNo: invoice.uniqueInvoiceNumber,
    };
    const invoiceStat = {
      subTotal: invoice.subTotal,
      netTotal: invoice.netTotal,
      taxAmount: (invoice.netTotal - invoice.subTotal).toFixed(2),
    };
    printHelp(billedForData, invoice.invoiceListId.itemDataList, invoiceStat);
  };

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInvoiceList.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const totalAmt = filteredInvoiceList.reduce((acc, row) => acc + row.netTotal, 0);
  const receivedAmt = filteredInvoiceList.reduce((acc, row) => acc + row.amtReceived, 0);
  const amtUnpaid = filteredInvoiceList.reduce((acc, row) => acc + row.amtUnpaid, 0);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredInvoiceList.length / itemsPerPage);

  const handleEditInvoice = (invoiceId) => {
    navigate(`/dashboard/editinvoice/${invoiceId}`); // Navigate to EditInvoice with the invoiceId
  };

  return (
    <div className='mainDivForListInvicePage'>
      <div className='filterSection'>
        <Row className="mb-3">
          <Col xs={2}></Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Search by Customer Name or Invoice Number"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </Col>
        </Row>
      </div>
      {
        filteredInvoiceList.length > 0 ?
          <div className='listInvoiceDiv'>
            <Table bordered hover responsive className='tableOfInvoiceItem'>
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>Invoice Number</th>
                  <th style={{ width: '20%' }}>Customer Name</th>
                  <th style={{ width: '10%' }}>Date</th> 
                  <th style={{ width: '10%' }}>Total</th>
                  <th style={{ width: '10%' }}>Received Amount</th>
                  <th style={{ width: '10%' }}>Due Amount</th>
                  <th style={{ width: '5%' }}>Print</th>
                  <th style={{ width: '5%' }}>Edit</th>
                  <th style={{ width: '5%' }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(data => (
                  <tr key={data.uniqueInvoiceNumber}>
                    <td>{data.uniqueInvoiceNumber}</td>
                    <td>{data.custName}</td>
                    <td>{data.createdOn}</td>
                    <td>{(data.netTotal).toFixed(2)}</td>
                    <td>{data.amtReceived.toFixed(2)}</td>
                    <td>{data.amtUnpaid.toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }} onClick={() => handlePrintInvoice(data.uniqueInvoiceNumber)}>
                      <img src={printIcon} alt="Print" style={{ width: '20px', marginRight: '10px', cursor: 'pointer' }} />
                    </td>
                    <td style={{ textAlign: 'center' }} onClick={() => handleEditInvoice(data.uniqueInvoiceNumber)}>
                      <img src={editIcon} alt="Edit" style={{ width: '20px', marginRight: '10px', cursor: 'pointer' }} />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <img src={deleteIcon} alt="Delete" style={{ width: '20px', marginRight: '10px', cursor: 'pointer' }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Row>
              <Col xs={10}></Col>
              <Col xs={2}>
                <Pagination>
                  <Pagination.Prev
                    onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </Col>
            </Row>
          </div>
          :
          <h3>No Invoices Found</h3>
      }
      <Row>
        <Col xs={12}>
          <Table bordered hover responsive>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>Total Invoices</th>
                <th>Total Amount</th>
                <th>Received Amount</th>
                <th>Due Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: 'center' }}>
                <td>{filteredInvoiceList.length}</td>
                <td>{totalAmt.toFixed(2)}</td>
                <td>{receivedAmt.toFixed(2)}</td>
                <td>{amtUnpaid.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default ListInvoice;
