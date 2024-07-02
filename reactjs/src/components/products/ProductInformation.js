import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faReply } from '@fortawesome/free-solid-svg-icons';
import useFormatter from '../hooks/useFormatter';

const ProductInformation = ({ items, cart, dcountSign, totalDiscount, grandTotal, getTotalPrk=0, getTax, totalItem, getTotalQty, q_note, date, collect, payVal, showNote, onBack }) => {
    const calculatePrice = (item) => (item.quantity * item.price) ;
    const { formatCurrency } = useFormatter();
    const printRef = useRef();

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
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #000;
                        padding: 8px;
                        text-align: left;
                    }
                    .subtotal-row td {
                        border-top: none !important;
                        border-left: none !important;
                        border-right: none !important;
                        border-bottom: 1px solid #dee2e6 !important;
                    }
                    .table-striped:nth-of-type(even) {
                        background-color: #f9f9f9;
                    }
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

    const handleSaveSale = () => {
        console.log("Sale information is saved!");
    };

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
                <table className="table table-striped table-bordered table-hover">
                    <thead className="sticky-header">
                        <tr>
                            <th className="border-0 text-underline">Items</th>
                            <th className="border-0 text-underline">Name</th>
                            <th className="border-0 text-underline">Price</th>
                            <th className="border-0 text-right text-underline">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.quantity}</td>
                                <td>{item.name}</td>
                                <td>{formatCurrency(item.price)}</td>
                                <td className="text-right">{formatCurrency(calculatePrice(item))}</td>
                            </tr>
                        ))}
                        <tr className="subtotal-row">
                           <td colSpan={3}>Sub-Total</td>
                           <td className="text-right table-borderless">{formatCurrency((grandTotal + getTotalPrk + totalDiscount))}</td>
                        </tr>
                        <tr className="subtotal-row">
                           <td colSpan={3}>Additional Discount</td>
                           <td className="text-right">
                               {dcountSign === '%' ? (
                                   <label>-{formatCurrency((totalDiscount / 100) * (grandTotal + getTotalPrk))}</label>
                               ) : (
                                   <label>-{formatCurrency(totalDiscount)}</label>
                               )}
                           </td>
                      </tr>
                      <tr className="subtotal-row">
                          <td colSpan={3}>Tax No Tax</td>
                          <td className="text-right">{getTax}</td>
                      </tr>
                      <tr className="subtotal-row">
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
                          <tr className="subtotal-row">
                              <td  colSpan={4}><label>Note: {q_note}</label></td>
                          </tr>
                      )}
                      <tr className="subtotal-row">
                          <td colSpan={3}><label>Cash on</label> <span>{new Date().getFullYear()}-{new Date().getMonth()+1}-{new Date().getDate()}</span></td>
                          <td className="text-right">{formatCurrency(collect)}</td>
                      </tr>
                      <tr className="subtotal-row">
                          <td colSpan={3}>Changed</td>
                          <td className="text-right">{formatCurrency(collect - payVal)}</td>
                      </tr>
                      <tr className="subtotal-row">
                          <td colSpan={3}>To Pay</td>
                          <td className="text-right">{payVal > collect ? `${formatCurrency(payVal - collect)}` : `0`}</td>
                      </tr>
                      <tr className="subtotal-row">
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
            </div>
        </div>
    );
};

export default ProductInformation;
