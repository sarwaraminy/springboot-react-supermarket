import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faReply } from '@fortawesome/free-solid-svg-icons';
import useFormatter from '../hooks/useFormatter';
import { useUserEmail } from '../../auth/useUserEmail';
import axios from 'axios';

const ProductInformation = ({ items, dcountSign, onResetBuyList, totalDiscount, grandTotal, getTotalPrk=0, getTax, totalItem, q_note, collect, payVal, showNote, onBack }) => {
    const calculatePrice = (item) => (item.quantity * item.price) ;
    const { formatCurrency } = useFormatter();
    const printRef = useRef();

    const loggedEmail = useUserEmail();
    
    
    const [saleData, setSaleData] = useState({
        user: {email: loggedEmail},
        totalAmount: grandTotal,
        paymentMethod: 'Cash',
        status: 'completed',
        saleItems: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount || 0
        }))
    });

    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0px';
        iframe.style.height = '0px';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(`
            <html>
            <head>
                <title>Print</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        color: #333
                    }
                    .invoice-header {
                      text-align: center;
                      margin-bottom: 20px;
                    }
                      .invoice-header h1 {
                        margin: 0;
                    }
                    .invoice-header p {
                        margin: 2px 0;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .sticky-header th {
                       top: 0;
                       background-color: #007bff; /* Change the background color to your preferred color */
                       color: white; /* Change the text color */
                       border-bottom: 1px solid #dee2e6 !important;
                       text-align: right;
                       padding-right: 5px;
                    }
                    .sticky-header th:nth-of-type(1) {
                       text-align: left;
                    }
                    td {
                        border: 1px solid #000;
                        padding: 8px;
                        text-align: left;
                    }
                    .subtotal-row td {
                        border-top: none !important;
                        border-left: none !important;
                        border-right: none !important;
                        border-bottom: 1px solid #dee2e6 !important;
                        text-align: right;
                    }
                    .subtotal-row td:nth-of-type(1) {
                       text-align: left;
                       padding-left: 0px;
                    }
                    .table-striped:nth-of-type(even) {
                        background-color: #f9f9f9;
                    }
                    .border-0 td{
                       border: 0 !important;
                    }
                    
                    .border-0 td:nth-of-type(2){
                       text-align: right;
                    }
                    .mb-3 { margin-bottom: 1rem !important; }
                    
                </style>
            </head>
            <body>
                ${printContent}
            </body>
            </html>
        `);
        doc.close();

        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        document.body.removeChild(iframe);
    };

    const handleSaveSale = async () => {
        try { 
            const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/sale/save`, saleData);
            console.log('Sale saved:', response.data);
            onResetBuyList(); // Call the reset function
        } catch (error) {
            console.error('Error saving sale:', error);
        }
    };

    const sortedItems = [...items].sort((a, b) => a.categoryName.localeCompare(b.categoryName));

    return (
        <div className="table-container">
            <div className="row container ">
                <div className="col-sm-4">
                    <FontAwesomeIcon icon={faReply} className="text-success" onClick={onBack} style={{cursor: 'pointer'}} title="Back to Payment Page" />
                </div>
                <div className="col-sm-4">
                    <FontAwesomeIcon icon={faPrint} className="text-success" onClick={handlePrint} style={{cursor: 'pointer'}} title="Print your Sale Info" />
                </div>
                <div className="col-sm-4">
                    <button className="btn btn-sm btn-success mb-2" onClick={handleSaveSale} title="Save your sale information to database!">Save Sale</button>
                </div>
            </div>
            <div id="forPrint" ref={printRef}>
                <div className="invoice-header">
                    <h1>SHOP NAME</h1>
                    <p>Address: District 7, Gulbagh, Kabul Afghanistan</p>
                    <p>Telephone: 1234567890</p>
                    <hr />
                </div>

                <table className="table table-striped table-bordered table-hover mb-3">
                    <thead className="sticky-header">
                        <tr>
                            <th className="border-0 text-underline">Items</th>
                            <th className="border-0 text-underline">Price</th>
                            <th className="border-0 text-underline">Qty</th>
                            <th className="border-0 text-right text-underline">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedItems.map((item, index) => (
                            <tr key={index} className="subtotal-row">
                                <td>{item.name}</td>
                                <td>{formatCurrency(item.price)}</td>
                                <td>{item.quantity}</td>
                                <td className="text-right">{formatCurrency(calculatePrice(item))}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                    <table className="table table-borderless">
                        <tbody>
                        <tr className="border-0">
                           <td colSpan={3}>Sub-Total</td>
                           <td className="text-right table-borderless">{formatCurrency((grandTotal + getTotalPrk + totalDiscount))}</td>
                        </tr>
                        <tr className="border-0">
                           <td colSpan={3}>Additional Discount</td>
                           <td className="text-right">
                               {dcountSign === '%' ? (
                                   <label>-{formatCurrency((totalDiscount / 100) * (grandTotal + getTotalPrk))}</label>
                               ) : (
                                   <label>-{formatCurrency(totalDiscount)}</label>
                               )}
                           </td>
                      </tr>
                      <tr className="border-0">
                          <td colSpan={3}>Tax No Tax</td>
                          <td className="text-right">{getTax}</td>
                      </tr>
                      <tr className="border-0">
                          <td colSpan={3}>SALE TOTAL {totalItem } item</td>
                          <td className="text-right">
                              {dcountSign === '%' ? (
                                  <label>{formatCurrency((grandTotal + getTotalPrk) - ((totalDiscount / 100) * (grandTotal + getTotalPrk)))}</label>
                              ) : (
                                  <label>{formatCurrency(grandTotal + getTotalPrk)}</label>
                              )}
                          </td>
                      </tr>
                      {showNote && (
                          <tr className="border-0">
                              <td  colSpan={4}><label>Note: {q_note}</label></td>
                          </tr>
                      )}
                      <tr className="border-0">
                          <td colSpan={3}><label>Cash on</label> <span>{new Date().getFullYear()}-{new Date().getMonth()+1}-{new Date().getDate()}</span></td>
                          <td className="text-right">{formatCurrency(collect)}</td>
                      </tr>
                      <tr className="border-0">
                          <td colSpan={3}>Changed</td>
                          <td className="text-right">{formatCurrency(collect - payVal)}</td>
                      </tr>
                      <tr className="border-0">
                          <td colSpan={3}>To Pay</td>
                          <td className="text-right">{payVal > collect ? `${formatCurrency(payVal - collect)}` : `0`}</td>
                      </tr>
                      <tr className="border-0">
                          <td colSpan={3}>TOTAL SAVINGS</td>
                          <td className="text-right">
                              {dcountSign === '%' ? (
                                  <label>{formatCurrency((totalDiscount / 100) * (grandTotal + getTotalPrk))}</label>
                              ) : (
                                  <label>{formatCurrency(totalDiscount)}</label>
                              )}
                          </td>
                      </tr>
                    </tbody>
                </table>
                <div className="mb-2"> <hr /></div>
                <div className="invoice-header">
                    <p>THANK YOU!</p>
                    <p>Bill ID: #12345678</p>
                </div>
            </div>
        </div>
    );
};

export default ProductInformation;
