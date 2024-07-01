import React, { useState } from 'react';
import useFormatter from '../hooks/useFormatter';
import PaymentCollect from './PaymentCollect';

const PaymentCash = ({ payVal, onEditClick, onResetBuyList, buyList, grandTotal, totalItem, totalDiscount }) => {
    const [payed, setPayed] = useState(0);
    const [showCollect, setShowCollect] = useState(false);

    const { formatCurrency, getCurrencySign } = useFormatter();

    const handlePayedChange = (e) => {
        setPayed(parseFloat(e.target.value));
    };

    const handleCollect = () => {
        setShowCollect(true);
    };

    const handleCancel = () => {
        onEditClick();
    };

    return (
        <>
           {!showCollect && (
              <div className="modal-content">
                <div className="modal-header">
                    <div className="container row">
                        <div className="col-sm-7 h4">Amount to pay</div>
                        <div className="col-sm-5 text-right h4">{formatCurrency(payVal.toFixed(2))}</div>
                    </div>
                </div>
                <div className="modal-body">
                    <p className="h3">Amount Given by Customer</p>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-light">{getCurrencySign()}</span>
                                    <input
                                        type="number"
                                        className="form-control text-right"
                                        placeholder="0.00"
                                        value={payed}
                                        onChange={handlePayedChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-3">
                                <div className="input-group">
                                    {payed !== payVal && payed < payVal && (
                                        <span className="btn btn-gray text-right">
                                            { formatCurrency((payVal - payed).toFixed(2)) }
                                        </span>
                                    )}
                                    {payed === payVal || payed > payVal ? (
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={handleCollect}
                                        >
                                            Collect {formatCurrency(payed.toFixed(2))}
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-success" type="button" onClick={handleCancel}>
                        Close
                    </button>
                </div>
            </div>
           )}
           {showCollect && (
             <PaymentCollect 
                collect={payed}
                payVal={payVal}
                isCash={true}
                isSQuot={false}
                onResetBuyList={onResetBuyList} // Pass the reset function to PaymentCollect
                buyList={buyList}
                grandTotal={grandTotal}
                totalItem={totalItem}
                totalDiscount={totalDiscount}
                date={new Date().getDate}
             />
           )}
        </>
    );
};

export default PaymentCash;
