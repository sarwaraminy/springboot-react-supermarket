import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import useFormatter from '../hooks/useFormatter';
import ProductInformation from './ProductInformation';
import axios from 'axios';

function PaymentCollect({ collect, payVal, isCash, isSQuot, onResetBuyList, buyList, cart, dcountSign, totalDiscount, grandTotal, getTotalPrk, getTax, totalItem, getTotalQty, q_note, date, payVl, showNote }) {
  const [cstmr, setCstmr] = useState('');
  const [showPaymentC, setShowPaymentC] = useState(false);
  const [showProductInfo, setShowProductInfo] = useState(false);

  const token = localStorage.getItem('token');
    
  const [saleData, setSaleData] = useState({
      totalAmount: grandTotal,
      paymentMethod: 'Cash',
      status: 'completed',
      saleItems: buyList.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          discount: item.discount || 0
      }))
  });

  const navigate = useNavigate();
  const { formatCurrency } = useFormatter();

  const printDiv = (id) => {
    // Add your print logic here
    setShowProductInfo(true);
    setShowPaymentC(true);
  };

  const competPay = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/sale/save`, saleData, {
        headers: {
          'Authorization': `${token}`
        }
      });
      console.log('Sale saved:', response.data);
      onResetBuyList(); // Call the reset function
      navigate('/products'); // Navigate to products page
      setShowPaymentC(true);
    } catch (error) {
      console.error('Error saving sale:', error);
    }
  };

  const handleBack = () => {
    setShowProductInfo(false);
    setShowPaymentC(false);
  };

  return (
    <>
      {!showPaymentC && (
        <>
            <div className="row mb-4 mt-3">
               {isCash && collect > payVal && (
                 <div className="col-9 ml-4">
                   <span className="h2">Give {formatCurrency(collect - payVal)} Change</span>
                 </div>
               )}
               {isSQuot && (
                 <div className="col-9 ml-4">
                   <span className="h2">Sale Quoted.</span>
                 </div>
               )}
               {collect === payVal && (
                 <div className="col-9 ml-4">
                   <span className="h2">Payment Received.</span>
                 </div>
               )}
               </div>
               <button type="button" className="btn btn-lg btn-success pr-5 pl-5 ml-4 mb-3" onClick={() => printDiv('psale')}>Print</button>
               <div className="row">
                 <div className="col-sm-11">
                   <div className="mb-3">
                     <div className="input-group ml-4">
                       <span className="input-group-text" id="basic-addon3"><FontAwesomeIcon icon={faUser} className="text-success" /></span>
                       <input
                         type="text"
                         value={cstmr}
                         onChange={(e) => setCstmr(e.target.value)}
                         className="form-control"
                         placeholder="Add a Customer to pay with the following option"
                       />
                     </div>
                   </div>
                 </div>
               </div>
               <div className="row">
                 <div className="col-sm-9 ml-4">
                   <div className="mb-3">
                     <div className="input-group">
                       <button type="button" className="btn btn-lg btn-success pl-7 pr-7" onClick={competPay}>Complete Tutorial</button>
                     </div>
                   </div>
                 </div>
            </div>
        </>
      )}
      {showProductInfo && (
        <ProductInformation 
          items={buyList}
          cart={cart}
          dcountSign={dcountSign}
          totalDiscount={totalDiscount}
          grandTotal={grandTotal}
          getTotalPrk={getTotalPrk}
          getTax={getTax}
          totalItem={totalItem}
          getTotalQty={getTotalQty}
          q_note={q_note}
          date={date}
          collect={collect}
          payVal={payVal}
          showNote={showNote}
          onBack={handleBack}
          onResetBuyList={onResetBuyList}
        />
      )}
    </>
  );
}

export default PaymentCollect;
