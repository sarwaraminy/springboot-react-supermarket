import React from 'react';
import useFormatter from '../hooks/useFormatter';

const ProductInformation = ({ items, cart, dcountSign, totalDiscount, grandTotal, getTotalPrk=0, getTax, totalItem, getTotalQty, q_note, date, collect, payVal, showNote }) => {
    const calculatePrice = (item) => (item.quantity * item.price) - ((item.discount / 100) * (item.quantity * item.price));
    const { formatCurrency } = useFormatter();

    return (
        <div className="table-container">
            <table className="table table-striped table-bordered table-hover">
                <thead className="sticky-header">
                    <tr>
                        <th className="border-0 text-underline">#</th>
                        <th className="border-0 text-underline">Name</th>
                        <th className="border-0 text-right text-underline">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.quantity}</td>
                            <td>{item.name}</td>
                            <td className="text-right">{formatCurrency(calculatePrice(item))}</td>
                        </tr>
                    ))}
                    <tr>
                       <td>&nbsp;</td>
                       <td>Sub-Total</td>
                       <td className="text-right">{formatCurrency((grandTotal + getTotalPrk))}</td>
                    </tr>
                    <tr>
                       <td>&nbsp;</td>
                       <td>Additional Discount</td>
                       <td className="text-right">
                           {dcountSign === '%' ? (
                               <label>-{formatCurrency((totalDiscount / 100) * (grandTotal + getTotalPrk))}</label>
                           ) : (
                               <label>-{formatCurrency(totalDiscount)}</label>
                           )}
                       </td>
                  </tr>
                  <tr>
                      <td>&nbsp;</td>
                      <td>Tax No Tax</td>
                      <td className="text-right">{getTax}</td>
                  </tr>
                  <tr>
                      <td>&nbsp;</td>
                      <td>SALE TOTAL {totalItem } item</td>
                      <td className="text-right">
                          {dcountSign === '%' ? (
                              <label>{formatCurrency((grandTotal + getTotalPrk) - ((totalDiscount / 100) * (grandTotal() + getTotalPrk)))}</label>
                          ) : (
                              <label>{formatCurrency((grandTotal + getTotalPrk) - totalDiscount)}</label>
                          )}
                      </td>
                  </tr>
                  {showNote && (
                      <tr>
                          <td>&nbsp;</td>
                          <td colSpan="2"><label>Note: {q_note}</label></td>
                      </tr>
                  )}
                  <tr>
                      <td>&nbsp;</td>
                      <td><label>Cash on</label> <span>{new Date().getFullYear()}-{new Date().getMonth()+1}-{new Date().getDate()}</span></td>
                      <td className="text-right">{formatCurrency(collect)}</td>
                  </tr>
                  <tr>
                      <td>&nbsp;</td>
                      <td>Changed</td>
                      <td className="text-right">{formatCurrency(collect - payVal)}</td>
                  </tr>
                  <tr>
                      <td>&nbsp;</td>
                      <td>To Pay</td>
                      <td className="text-right">{payVal > collect ? `${formatCurrency(payVal - collect)}` : `0`}</td>
                  </tr>
                  <tr>
                      <td>&nbsp;</td>
                      <td>TOTAL SAVINGS</td>
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
    );
};

export default ProductInformation;
