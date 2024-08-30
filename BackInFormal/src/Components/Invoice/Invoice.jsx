import React from "react";
import "./Invoice.css";
 
const Invoice = () => {
  const invoiceData = [
    {
      sr: "1.",
      item: "Custom Made T-Shirt",
      gstRate: "12%",
      quantity: 15,
      rate: "₹990.00",
      amount: "₹14,850.00",
      cgst: "₹891.00",
      sgst: "₹891.00",
      total: "₹16,632.00",
    },
    {
      sr: "2.",
      item: "Bandana With Logo",
      gstRate: "12%",
      quantity: 15,
      rate: "₹60.00",
      amount: "₹900.00",
      cgst: "₹54.00",
      sgst: "₹54.00",
      total: "₹1,008.00",
    },
    {
      sr: "3.",
      item: "Bandana With Logo",
      gstRate: "12%",
      quantity: 15,
      rate: "₹60.00",
      amount: "₹900.00",
      cgst: "₹54.00",
      sgst: "₹54.00",
      total: "₹1,008.00",
    },
    {
      sr: "4.",
      item: "Custom Made T-Shirt",
      gstRate: "12%",
      quantity: 15,
      rate: "₹990.00",
      amount: "₹14,850.00",
      cgst: "₹891.00",
      sgst: "₹891.00",
      total: "₹16,632.00",
    },
  ];

  return (
    <div className="invoice-container">
      <header className="invoice-header">
        <div className="invoice-title">
          <p>Invoice</p>
          <div className="invoice-details">
            <p>
              Invoice No #<strong> #1403</strong>
            </p>
            <p>
              Invoice Date <strong> Aug 27, 2024</strong>
            </p>
          </div>
        </div>
        <div className="invoice-logo">
          <img src="./invoice.png" alt="Company Logo" />
        </div>
      </header>

      <div className="billing-info">
        <div className="billed-by">
          <p1>Billed By</p1>
          <p>
            <strong>Back In Formal</strong>
          </p>
          <p>Inside Sunderban Resort, Lane No 1. Koregaon park,</p>
          <p>Pune,</p>
          <p>Maharashtra, India - 411001</p>
          <p>
            <strong>GSTIN:</strong> 27BBVPS2441E2ZB
          </p>
          <p>
            <strong>PAN:</strong> BBVPS2441E
          </p>
        </div>
        <div className="billed-to">
          <p2>Billed To</p2>
          <p>
            <strong>Etraveli India Pvt Ltd</strong>
          </p>
          <p>6th Floor D Block, Weikfield IT Park, </p>
          <p>Maharashtra, India</p>
          <p>
            <strong>GSTIN:</strong> 27AAGCE5704Q1Z6
          </p>
          <p>
            <strong>PAN:</strong> AAGCE5704Q
          </p>
          <p>
            <strong>Email:</strong> srirag.menon@etraveligroup.com
          </p>
          <p>
            <strong>Phone:</strong> +91 98334 83624
          </p>
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>GST Rate</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.map((row, index) => (
            <tr key={index}>
              <td>{row.sr}</td>
              <td className="itemtd">{row.item}</td>
              <td>{row.gstRate}</td>
              <td>{row.quantity}</td>
              <td>{row.rate}</td>
              <td>{row.amount}</td>
              <td>{row.cgst}</td>
              <td>{row.sgst}</td>
              <td>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totalwrd">
        {" "}
        <p>
          <strong>
            Total (in words): SEVENTEEN THOUSAND SIX HUNDRED FORTY RUPEES ONLY
          </strong>
        </p>
      </div>

      <div className="details-container">
        <div className="bank-details">
          <h4>Bank Details</h4>
          <p>
            <strong>Account Name:</strong> <span>BACK IN FORMAL</span>
          </p>
          <p>
            <strong>Account Number:</strong> <span>50200079665181</span>
          </p>
          <p>
            <strong>IFSC:</strong> <span>HDFC0000427</span>
          </p>
          <p>
            <strong>Account Type:</strong> <span>Current</span>
          </p>
          <p>
            <strong>Bank:</strong> <span>HDFC BANK</span>
          </p>
        </div>
        <div className="total-details">
          <p>
            Amount <span>₹15,750.00</span>
          </p>
          <p>
            CGST <span>₹891.00</span>
          </p>
          <p>
            SGST <span>₹891.00</span>
          </p>
          <p>
            <strong>Total (INR)</strong> ₹17,640.00
          </p>
        </div>
      </div>
      <div className="support">
        For any enquiry, reach out via email at
        <strong> support@backinformal.com</strong>,
        <strong>call on +91 93730 12123</strong>
      </div>
    </div>
  );
};

export default Invoice;
