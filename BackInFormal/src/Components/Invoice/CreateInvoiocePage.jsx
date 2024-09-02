import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import './createinvoice.css'
import InvoiceTable from './InvoiceTable'
import Invoice from './Invoice';
import ReactDOMServer from 'react-dom/server';
import AddIcon from '../../assets/AddIcon.png'
import DeleteIcon from '../../assets/DeleteIcon.png'
import saveIcon from '../../assets/saveIcon.png'




function CreateInvoice() {


  const createEmptyRow = () => ({
    id: Date.now(),
    item: '',
    gstRate: '',
    quantity: '',
    rate: '',
    amount: 0,
    cgst: 0,
    sgst: 0,
    total: 0,
    selected: false
  });




  const [rows, setRows] = useState([createEmptyRow()]);
  const [searchTerm, setSearchTerm] = useState('');
  const [companys, setCompanys] = useState([]);  //set companies after fetch @@@@@@@@@
  const [filteredCompany,setFilteredCompany]=useState([])
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
  const [phone, setPhone] = useState('')





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
    } else {
      const filtered = companys.filter(company =>
        company.compName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.phone.includes(searchTerm)
      );
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
        let rate = field === 'rate' ? parseFloat(value) || 0 : row.rate;
        let gstRate = field === 'gstRate' ? parseFloat(value) / 100 || 0 : row.gstRate / 100;
    
        // Calculate the amount based on quantity and rate
        const amount = (quantity * rate).toFixed(2);
    
        // Calculate CGST and SGST based on the amount and GST rate
        const cgst = (amount * gstRate / 2).toFixed(2);
        const sgst = (amount * gstRate / 2).toFixed(2);
    
        // Calculate the total
        const total = (parseFloat(amount) + parseFloat(cgst) + parseFloat(sgst)).toFixed(2);
    
        return {
          ...row,
          [field]: value,
          amount: parseFloat(amount),
          cgst: parseFloat(cgst),
          sgst: parseFloat(sgst),
          total: parseFloat(total),
        };
      }
      return row;
    }));
  };

  
  


  const handleSaveInvoice = (event) => {
    event.preventDefault()
    const billedForData = {
      companyName: compName,
      gstNo: gstNo,
      email: email,
      address: address,
      panNo: panNo,
      phone: phone,
      invoiceNo: Date.now(),
    }
    // console.log(rows);
    // console.log(stats);
    // console.log(billedForData);



    const printWindow = window.open('', '_blank');
    const printContent = ReactDOMServer.renderToString(
      <Invoice billedForData={billedForData} rows={rows} stats={stats}/>
    );

    printWindow.document.write(`
        <html>
          <head>
            <title>Bill Details</title>
            <style>
            body {
  justify-content: center;
  align-items: center;
}

.invoice-container {
  margin: 0;
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
  background-color: #fff;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.invoice-title p {
  font-size: 30px;
  color: #6539b1;
  margin: 0;
}

.invoice-details p {
  font-size: 14px;
  color: #333;
}
.invoice-details strong {
  margin-left: 8px;
}

.invoice-logo img {
  max-width: 130px;
  height: auto;
}

.billing-info {
  display: flex;
  justify-content: space-between;
  line-height: 0.5rem;
  padding: 8px;
}

.billed-by,
.billed-to {
  width: 45%;
  background-color: #f3e8ff;
  padding: 12px;
  border-radius: 4px;
  margin-left: -8px;
  margin-right: 10px;
}

.billed-by p1,
.billed-to p2 {
  font-size: 15px;
  color: #6539b1;
}

.billed-by p,
.billed-to p {
  font-size: 11px;
}

.billed-by strong {
  font-size: 12px;
}

/**** Table ***/

.invoice-table {
  width: 97%;
  border-collapse: collapse;
  border: #333;
  border-radius: 15px;
}
.invoice-table th:last-child {
  border-top-right-radius: 15px;
}
.invoice-table th:first-child {
  border-top-left-radius: 15px;
}

.invoice-table th {
  padding: 4px;
  text-align: center;
  font-size: 15px;
}
.invoice-table td {
  padding: 5px;
  text-align: left;
  font-size: 13px;
}

.invoice-table th {
  background-color: #6d28d9;
  color: #fff;
}
tr:nth-child(even) {
  background-color: #f3e8ff;
}
.totalwrd {
  font-size: 12px;
}

.total-details p {
  display: flex;
  justify-content: space-between;
  margin-right: 30px;
}

.total-details p:last-child {
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  padding: 5px 0;
  font-weight: bold;
}

.details-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.total-details {
  flex: 1;
  box-sizing: border-box;
}

.bank-details {
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  background-color: #f3e8ff;
  border-radius: 8px;
  margin-top: 65px;
  line-height: 0.5rem;
  margin-right: 18px;
}
.bank-details h4 {
  color: #6539b1;
}
.bank-details span {
  font-size: 12px;
}
.support {
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
  padding-top: 10px;
}

            </style>
          </head>
          <body>${printContent}</body>
          <script>
            window.print();
            window.onafterprint = function() { window.close(); };
          </script>
        </html>
      `);
    printWindow.document.close();
  }




  return (
    <div>
      <form onSubmit={(e) => handleSaveInvoice(e)}>
        <Row>
          <div className="col-md-4  " >
            <div className='billedByInfoDiv'>
              <h4>Billed By</h4>
              <strong>Back In Formal</strong>
              <p>Inside Sunderban Resort, Lane No 1. Koregaon park,</p>
              <p>Pune, Maharashtra, India </p>
              <p><strong>GSTIN:</strong> 27BBVPS2441E2ZB</p>
              <p><strong>PAN:</strong> BBVPS2441E</p>

            </div>

          </div>
          <div className="col-md-1"></div>

          <div className="col-md-7">
            <div className='billedToDiv'>
              <h4>Billled To</h4>
              <Row>
                <div className="col-md-6">
                  <input type="text" placeholder='Company name' required onChange={(e) =>{
                     setCompName(e.target.value)
                     setSearchTerm(e.target.value)

                     }} />
                  <input type="text" placeholder='GSTIN'   onChange={(e) => setGstNo(e.target.value)} />
                  <input type="email" placeholder='Email'   onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <input type="text" placeholder='Address' required onChange={(e) => setAddress(e.target.value)} />
                  <input type="text" placeholder='PAN'   onChange={(e) => setPanNo(e.target.value)} />
                  <input type="tel" placeholder='Phone' required onChange={(e) => setPhone(e.target.value)} />
                </div>

              </Row>


            </div>

          </div>
        </Row>
        <Row>
          <Col className='invoicetableRenderDiv '>
            <InvoiceTable createEmptyRow={createEmptyRow} rows={rows}
              setRows={setRows} handleInputChange={handleInputChange} stats={stats}
              handleCheckboxChange={handleCheckboxChange} handleDeleteSelectedRows={handleDeleteSelectedRows} />
          </Col>

        </Row>
        <Row>
          <Col xs={8}>
            <textarea name="" className="paraNotesOnInvoice" placeholder='Type notes here...........'></textarea>
          </Col>
          <Col xs={4} className='SaveInvoiceBtnDiv'>
            <Row>
              <Col xs={5}>  
              </Col>
              <Col xs={7}>
                <Button variant="primary" onClick={handleAddRow} className='mx-2 addRowBtn'> 
                  <img src={AddIcon} alt="" style={{width:'20px',marginRight:'10px'}}/>
                   Add Row</Button>
                <Button variant="danger" onClick={handleDeleteSelectedRows} className='addRowBtn'>
                <img src={DeleteIcon} alt="" style={{width:'20px',marginRight:'10px'}}/>
                Delete</Button>
              </Col>
            </Row>
            <Row style={{ marginTop: '10px' }} className='statsDisplayDiv'>
              <Col xs={3}></Col>
              <Col xs={9}>
                <Row>
                  <Col xs={12}>
                    <label htmlFor=""><strong>Sub Total:</strong></label>
                    <input type="text" name="" id="" readOnly
                      value={stats.subTotal.toFixed(2)} />
                  </Col>
                  <Col xs={12}>
                    <label htmlFor=""><strong>Tax Amount:</strong></label>
                    <input type="text" name="" id="" readOnly
                      value={stats.taxAmount.toFixed(2)} />
                  </Col>
                  <Col xs={12}>
                    <label htmlFor=""><strong>Net Total:</strong></label>
                    <input type="text" name="" id="" readOnly
                      value={stats.netTotal.toFixed(2)} />
                  </Col>
                </Row>
              </Col>

            </Row>
            <Row>
              <Col xs={7}></Col>
              <Col xs={5}>
                <Button className='SaveInvoiceBtn' type='submit'>
                <img src={saveIcon} alt="" style={{width:'20px',marginRight:'10px'}}/>
                Save Invoice</Button>
              </Col>
            </Row>

          </Col>

        </Row>
      </form>
    </div>
  )
}

export default CreateInvoice
