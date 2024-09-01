import React from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap';
import printIcon from '../../assets/printIcon.png'
import editIcon from '../../assets/editIcon.png'
import deleteIcon from '../../assets/DeleteIcon.png'

import './invoicelist.css'

const invoiceList = [
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "Date": Date.now(),
    "amount": 1000.00,
    "CGST": 50,
    "SGST": 40
  },
  {
    "id": 2,
    "name": "Omkar Pagade",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "Date": Date.now(),
    "amount": 1000.00,
    "CGST": 50,
    "SGST": 80

  }
]

function ListInvoice() {
  return (
    <>
      {
        invoiceList.length > 0 ?
          <div className='listInvoiceDiv'>
            <Table bordered hover responsive className='tableOfInvoiceItem'>
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>Id</th>
                  <th style={{ width: '20%' }}>Customer Name</th>
                  <th style={{ width: '10%' }}>Date</th>
                  <th style={{ width: '10%' }}>Amount</th>
                  <th style={{ width: '10%' }}>GST( CGST+SGST )</th>
                  <th style={{ width: '10%' }}>Total</th>
                  <th style={{ width: '5%' }}>Print</th>
                  <th style={{ width: '5%' }}>Edit</th>
                  <th style={{ width: '5%' }}>Delete</th>
                </tr>
              </thead>

              <tbody>
                {invoiceList.map(data => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.Date}</td>
                    <td>{data.amount}</td>
                    <td>{data.CGST + data.SGST}</td>
                    <td>{data.amount + data.CGST + data.SGST}</td>
                    <td style={{textAlign:'center'}}>
                      <img src={printIcon} alt="" style={{ width: '20px', marginRight: '10px',cursor:'pointer' }} />
                      
                    </td>
                    <td style={{textAlign:'center'}}>
                      <img src={editIcon} alt="" style={{ width: '20px', marginRight: '10px',cursor:'pointer' }} />

                    </td>
                    <td style={{textAlign:'center'}}>
                      <img src={deleteIcon} alt="" style={{ width: '20px', marginRight: '10px',cursor:'pointer' }} />

                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          :
          <h3>No Invoices Found</h3>
      }

    </>
  )
}

export default ListInvoice
