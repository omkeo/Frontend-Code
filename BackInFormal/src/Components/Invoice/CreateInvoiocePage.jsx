import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import './createinvoice.css'
import InvoiceTable from './InvoiceTable'

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
    const totalAmt = rows.reduce((acc, row) => {
      return acc + row.amount;
    }, 0);
    const taxAmt = rows.reduce((acc, row) => {
      return acc + row.cgst + row.sgst;
    }, 0);

    setStats({
      subTotal: totalAmt,
      taxAmount: taxAmt,
      netTotal: totalAmt + taxAmt
    })
  }, [rows])


  const handleInputChange = (id, field, value) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        const quantity = field === 'quantity' ? value : row.quantity;
        const rate = field === 'rate' ? value : row.rate;
        const amount = quantity * rate;
        const gstRate = row.gstRate ? parseFloat(row.gstRate) / 100 : 0;
        const cgst = amount * gstRate / 2;
        const sgst = amount * gstRate / 2;
        const total = amount + cgst + sgst;

        return {
          ...row,
          [field]: value,
          amount,
          cgst,
          sgst,
          total,
        };
      }
      return row;
    }));
  };

  const handleSaveInvoice = (event) => {
    event.preventDefault()
    const billedFor = {
      companyName: compName,
      gstNo: gstNo,
      email: email,
      address: address,
      panNo: panNo,
      phone: phone,
      invoiceNo: Date.now(),
    }
    console.log(rows);
    console.log(stats);
    console.log(billedFor);
    alert(`${billedFor,rows,stats}`)


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
                  <input type="text" placeholder='Company name' required />
                  <input type="text" placeholder='GSTIN' required />
                  <input type="email" placeholder='Email' required />
                </div>
                <div className="col-md-6">
                  <input type="text" placeholder='Address' required />
                  <input type="text" placeholder='PAN' required />
                  <input type="tel" placeholder='Phone' required />
                </div>

              </Row>


            </div>

          </div>
        </Row>
        <Row>
          <Col className='invoicetableRenderDiv '>
            <InvoiceTable createEmptyRow={createEmptyRow} rows={rows}
              setRows={setRows} handleInputChange={handleInputChange} stats={stats} />
          </Col>

        </Row>
        <Row>
          <Col xs={10}>

            <textarea name="" className="paraNotesOnInvoice" placeholder='Type notes here...........'></textarea>
          </Col>
          <Col xs={2} className='SaveInvoiceBtnDiv'>
            <Button className='SaveInvoiceBtn' type='submit'>Save Invoice</Button>
          </Col>

        </Row>
      </form>
    </div>
  )
}

export default CreateInvoice
