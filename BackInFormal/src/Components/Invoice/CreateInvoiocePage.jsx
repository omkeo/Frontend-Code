import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import './createinvoice.css'
import InvoiceTable from './InvoiceTable'
import { toast } from 'react-toastify';
import rupeeIcon from '../../assets/rupee.png'
import AddIcon from '../../assets/AddIcon.png'
import DeleteIcon from '../../assets/DeleteIcon.png'
import saveIcon from '../../assets/saveIcon.png'
import axios from 'axios';
import printHelp from './PrintInvoice';
 




function CreateInvoice({settings}) {
   


  const createEmptyRow = () => ({
    id: Date.now(),
    itemName: '',
    gstRate: '',
    quantity: '',
    itemPrice: '',
    amount: 0,
    cgst: 0,
    sgst: 0,
    totalPrice: 0,
    selected: false
  });

  const [rows, setRows] = useState([createEmptyRow()]);
  const [searchTerm, setSearchTerm] = useState('');
  const [companys, setCompanys] = useState([]);  //set companies after fetch @@@@@@@@@
  const [filteredCompany, setFilteredCompany] = useState([])
  const [stats, setStats] = useState({
    subTotal: 0,
    taxAmount: 0,
    netTotal: 0
  });
  const [compName, setCompName] = useState('')
  const [gstNo, setGstNo] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [panNo, setPanNo] = useState('')
  const [paidAmount, setPaidAmount] = useState('')
  const [remarkNote, setRemarkNote] = useState('')
  const [dueAmount, setDueAmount] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState(null)



  const fetchAllCompanies = async () => {
    const response = await axios.get('http://localhost:8080/api/customer/all-customers')
    if (response.status == 200) {
      setCompanys(response.data)
      // console.log(response.data,'@@@@@@@@');

    }
  };

  useEffect(() => {
    
    
    fetchAllCompanies()
  }, []);

  useEffect(() => {
    if (paidAmount != '') {
      setDueAmount(stats.netTotal - parseFloat(paidAmount))
    }

  }, [paidAmount])










  useEffect(() => {
    // Calculate totals
    const totalAmt = rows.reduce((acc, row) => acc + row.amount, 0);
    const taxAmt = rows.reduce((acc, row) => acc + row.cgst + row.sgst, 0);

    // Round values to two decimal places
    const roundedSubTotal = parseFloat(totalAmt.toFixed(2));
    const roundedTaxAmount = parseFloat(taxAmt.toFixed(2));
    const roundedNetTotal = parseFloat((totalAmt + taxAmt).toFixed(2));

    // Update state with rounded values
    setStats({
      subTotal: roundedSubTotal,
      taxAmount: roundedTaxAmount,
      netTotal: roundedNetTotal
    });
  }, [rows]);






  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCompany([]);
      setSelectedCustomer(null)
      setCompName('')
      setGstNo('')
      setEmail('')
      setPanNo('')
      setPhone('')
      setAddress('')
    } else {
      const filtered = companys.filter(company =>
        company.custName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.custMobile.includes(searchTerm)
      );
      console.log(filtered);

      setFilteredCompany(filtered);
    }
  }, [searchTerm, companys]);




  const handleAddRow = () => {
    setRows([...rows, createEmptyRow()]);
    

  };







  const handleCheckboxChange = (id) => {
    setRows(rows.map(row =>
      row.id === id ? { ...row, selected: !row.selected } : row
    ));
  };




  const handleDeleteSelectedRows = () => {
    setRows(rows.filter(row => !row.selected));
  };




  const handleInputChange = (id, field, value) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        // Parse values and handle default cases
        let quantity = field === 'quantity' ? parseFloat(value) || 0 : row.quantity;
        let itemPrice = field === 'itemPrice' ? parseFloat(value) || 0 : row.itemPrice;
        let gstRate = field === 'gstRate' ? parseFloat(value) / 100 || 0 : row.gstRate / 100;

        // Calculate the amount based on quantity and rate
        const amount = (quantity * itemPrice).toFixed(2);

        // Calculate CGST and SGST based on the amount and GST rate
        const cgst = (amount * gstRate / 2).toFixed(2);
        const sgst = (amount * gstRate / 2).toFixed(2);

        // Calculate the total
        const totalPrice = (parseFloat(amount) + parseFloat(cgst) + parseFloat(sgst)).toFixed(2);

        return {
          ...row,
          [field]: value,
          amount: parseFloat(amount),
          cgst: parseFloat(cgst),
          sgst: parseFloat(sgst),
          totalPrice: parseFloat(totalPrice),
        };
      }
      return row;
    }));
  };





  const handleSaveInvoice = async (event) => {
    event.preventDefault()

    // console.log(rows);
    // console.log(stats);
    // console.log(billedForData);
    let invoiceNumber = null;
    let customer = selectedCustomer;

    try {
      if (customer == null) {
        const custResponse = await axios.post('http://localhost:8080/api/customer/add-customer', {
          "custName": compName,
          "custMobile": phone,
          "custEmail": email,
          "custGSTIN": gstNo,
          "custPAN": panNo,
          "custAddress": address
        })
        if (custResponse.status == 201) {
          customer = custResponse.data
          setSelectedCustomer(custResponse.data)
        }
      }
      // else {
      //   console.log(selectedCustomer, 'selected');
      // }

      // console.log({
      //   "customer": selectedCustomer,
      //   "subTotal": 71,
      //   "netTotal": 541,
      //   "amtReceived": 400,
      //   "amtUnpaid": 141,
      //   "itemsList": rows
      // });

      console.log('initiallization............');

      const invoiceResponse = await axios.post('http://localhost:8080/api/invoice/add-invoice', {

        "customer": customer,
        "subTotal": stats.subTotal,
        "netTotal": stats.netTotal,
        "amtReceived": paidAmount,
        "amtUnpaid": dueAmount,
        "remarkNote": remarkNote,
        "itemsList": rows

      })
      if (invoiceResponse.status == 201) {
        invoiceNumber = invoiceResponse.data
        console.log(invoiceResponse.data, 'invoiceResponse@@@@@@@@@@@@@@@@@@@@@@');
        toast.success(`${invoiceResponse.data} saved successfully`);

      }
    } catch (error) {
      console.log(error, 'error@@@@@@@@@@@@@@@@@@@@');

    }
    const billedForData = {
      companyName: compName,
      gstNo: gstNo,
      email: email,
      address: address,
      panNo: panNo,
      phone: phone,
      invoiceNo: invoiceNumber,
    }


    // billedForData={billedForData} rows={rows} stats={stats}
    printHelp(billedForData, rows, stats,settings);
    setRows([createEmptyRow()]);
    setFilteredCompany([]);
      setSelectedCustomer(null)
      setCompName('')
      setGstNo('')
      setEmail('')
      setPanNo('')
      setDueAmount('')
      setPhone('')
      setAddress('')
    setPaidAmount('')


  }




  return (
    <div>
      <form onSubmit={(e) => handleSaveInvoice(e)}>
        <Row>
          <div className="col-md-4  " >
            <div className='billedByInfoDiv'>
              <h4>Billed By</h4>
              <strong>{ settings ? settings.settingMaster.companyName : <>Business Name</>}</strong>
              <p>{settings ? settings.settingMaster.companyAddress : <>Business Address</>}</p> 
              <p><strong>GSTIN:</strong> {settings ? settings.settingMaster.gstin : <>Business GSTIN</> }</p>
              <p><strong>PAN:</strong> {settings ? settings.settingMaster.panNumber : <>Business PAN</> }</p>


            </div>

          </div>
          <div className="col-md-1"></div>

          <div className="col-md-7">
            <div className='billedToDiv'>
              <h4>Billled To</h4>
              <Row>
                <div className="col-md-6">
                  <input type="text" placeholder='Company name' value={compName} required onChange={(e) => {
                    setCompName(e.target.value)
                    setSearchTerm(e.target.value)

                  }} />
                  {searchTerm && filteredCompany.length > 0 && (
                    selectedCustomer === null ?
                      <ul className="dropdown-menu show ml-3 p-0" style={{
                        position: 'absolute', width: '358px',
                        zIndex: 1000, border: '1px solid black',
                      }}>
                        {filteredCompany.map((customer, index) => (
                          <li key={index} className="dropdown-item LiInDropdown"
                            style={{ cursor: 'pointer' }}

                            onClick={() => {
                              setSearchTerm(customer.custName)
                              setCompName(customer.custName)
                              setGstNo(customer.custGSTIN)
                              setEmail(customer.custEmail)
                              setPanNo(customer.custPAN)
                              setPhone(customer.custMobile)
                              setAddress(customer.custAddress)
                              setSelectedCustomer(customer)


                            }}>
                            {customer.custName} ({customer.custMobile})
                          </li>
                        ))}
                      </ul> : <></>
                  )}
                  <input type="text" placeholder='GSTIN' value={gstNo} onChange={(e) => setGstNo(e.target.value)} />
                  <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <input type="text" placeholder='Address' value={address} required onChange={(e) => setAddress(e.target.value)} />
                  <input type="text" placeholder='PAN' value={panNo} onChange={(e) => setPanNo(e.target.value)} />
                  <input type="tel" placeholder='Phone' value={phone} required onChange={(e) => {
                    const value = e.target.value; 
                    const newValue = value.replace(/[^0-9]/g, '').slice(0, 10); 
                    setPhone(newValue)
                  }} />
                </div>

              </Row>

            </div>

          </div>
        </Row>
        <Row>
          <Col className='invoicetableRenderDiv '>
            <InvoiceTable createEmptyRow={createEmptyRow} rows={rows}
              setRows={setRows} handleInputChange={handleInputChange} stats={stats} settings={settings}
              handleCheckboxChange={handleCheckboxChange} handleDeleteSelectedRows={handleDeleteSelectedRows} />
          </Col>

        </Row>
        <Row>
          <Col xs={6}>
            <textarea name="" className="paraNotesOnInvoice" placeholder='Type notes here...........' onChange={(e) => setRemarkNote(e.target.value)}></textarea>
          </Col>
          <Col xs={6} className='SaveInvoiceBtnDiv'>
            <Row>
              <Col xs={6}>
                <Col xs={12}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text> <strong>Sub Total</strong> </InputGroup.Text>
                    <Form.Control aria-label="Amount (to the nearest dollar)" className='displayStatInputField' readOnly value={stats.subTotal} />
                    <InputGroup.Text><img src={rupeeIcon} alt="Rs" style={{ width: '20px' }} /></InputGroup.Text>
                  </InputGroup>
                </Col>
              </Col>
              <Col xs={6}  >
                <Button variant="primary" onClick={handleAddRow} className='mx-2 addRowBtn'>
                  <img src={AddIcon} alt="" style={{ width: '20px', marginRight: '10px' }} />
                  Add Row</Button>
                <Button variant="danger" onClick={handleDeleteSelectedRows} className='addRowBtn'>
                  <img src={DeleteIcon} alt="" style={{ width: '20px', marginRight: '10px' }} />
                  Delete</Button>
              </Col>

              <Row>
                <Col xs={6}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text> <strong>Tax</strong> </InputGroup.Text>
                    <Form.Control aria-label="Amount (to the nearest dollar)" className='displayStatInputField' readOnly value={stats.taxAmount} />
                    <InputGroup.Text> <img src={rupeeIcon} alt="Rs" style={{ width: '20px' }} /> </InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col xs={6}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text style={{ color: 'green' }}> <strong>Paid Amount</strong> </InputGroup.Text>
                    <Form.Control aria-label="Amount (to the nearest dollar)" required className='displayStatInputField' value={paidAmount}
                      onChange={(e) => {
                        if (/^\d*\.?\d*$/.test(e.target.value)) {
                          setPaidAmount(e.target.value)
                        } else if (e.target.value.length == 0) {
                          setPaidAmount(e.target.value)
                        }
                      }} />
                    <InputGroup.Text><img src={rupeeIcon} alt="Rs" style={{ width: '20px' }} /></InputGroup.Text>
                  </InputGroup>
                </Col>

                <Col xs={6}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text> <strong>Net Total</strong> </InputGroup.Text>
                    <Form.Control aria-label="Amount (to the nearest dollar)" className='displayStatInputField' readOnly value={stats.netTotal} />
                    <InputGroup.Text><img src={rupeeIcon} alt="Rs" style={{ width: '20px' }} /></InputGroup.Text>
                  </InputGroup>
                </Col>

                <Col xs={6}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text style={{ color: 'red' }}> <strong>Due Amount</strong> </InputGroup.Text>
                    <Form.Control aria-label="Amount (to the nearest dollar)" className='displayStatInputField' readOnly value={dueAmount} />
                    <InputGroup.Text><img src={rupeeIcon} alt="Rs" style={{ width: '20px' }} /></InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>

            </Row>
            <Row>
              <Col xs={3}></Col>

              <Col xs={6}>
                <Button type='submit' className='SaveInvoiceBtn'> <img src={saveIcon} alt="" style={{ width: '30px', marginRight: '10px' }} /> <strong>Print Invoice</strong> </Button>
              </Col>

              <Col xs={3}></Col>

            </Row>
          </Col>

        </Row>
      </form>
    </div>
  )
}

export default CreateInvoice
