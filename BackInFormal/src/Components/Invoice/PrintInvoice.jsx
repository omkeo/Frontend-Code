import Invoice from './Invoice';
import ReactDOMServer from 'react-dom/server';

const printHelp=(billedForData,rows,stats)=>{
    const printWindow = window.open('', '_blank');
    const printContent = ReactDOMServer.renderToString(
      <Invoice billedForData={billedForData} rows={rows} stats={stats} />
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
  text-align: center;
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



export default printHelp