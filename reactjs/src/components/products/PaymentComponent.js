import React, { useState } from "react";
import PaymentCash from "./PaymentCash";
import useFormatter from "../hooks/useFormatter";

const PaymentComponent = ({ payVal, onEditClick, buyList, onResetBuyList, grandTotal, totalItem, totalDiscount }) => {
    const [showPaymentCollect, setShowPaymentCollect] = useState(false);

    const { formatCurrency } = useFormatter();

    const handleGoBackBuyList = () => {
        setShowPaymentCollect(false);
    };

    const handleEditClick = () => {
        onEditClick(); // Invoke the callback to go back to BuyList
    };

    const showPayModl = () => {
        setShowPaymentCollect(true);
    };

    const showLayby = () => {
        console.log('Layby Payment', payVal);
    };

    const showStCrd = () => {
        console.log('Store Credit Payment', payVal);
    };

    const showAnAccount = () => {
        console.log('On Account Payment', payVal);
    };

    const formattedPayVal = typeof payVal === 'number' ? payVal.toFixed(2) : '0.00';

    return (
        <>   
            {!showPaymentCollect && (
                <>
                    <div className="row mb-4 mt-3">
                        <div className="col-sm-4"><span className="h4">Amount to Pay</span></div>
                        <div className="col-sm-7">
                            <div className="input-group">
                                <button
                                    type="button"
                                    className="btn btn-pill btn-outline-primary form-control text-right"
                                    disabled
                                >
                                    {formatCurrency(formattedPayVal)} {/* Ensure formatCurrenc is defined */}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3 mb-2">
                        <div className="col-sm-12 text-success">
                            <a href="#" onClick={handleEditClick}>Edit to make partial payment.</a>
                        </div>
                    </div>
                    <button type="button" className="btn btn-sm btn-success btn-block" onClick={showPayModl}>
                        <label className="h4">Cash</label>
                    </button>
                    <button type="button" className="btn btn-sm btn-secondary btn-block" onClick={showLayby}>
                        <label className="h4">Layby</label>
                    </button>
                    <button type="button" className="btn btn-sm btn-warning btn-block" onClick={showStCrd}>
                        <label className="h4">Store Credit</label>
                    </button>
                    <button type="button" className="btn btn-sm btn-info btn-block" onClick={showAnAccount}>
                        <label className="h4">On Account</label>
                    </button>
                </>
            )}
            {showPaymentCollect && (
                <PaymentCash
                    payVal={parseFloat(payVal)} // Ensure payVal is parsed as float if necessary
                    onEditClick={handleGoBackBuyList}
                    onResetBuyList={onResetBuyList} // Pass the reset function to PaymentCash
                    buyList={buyList}
                    grandTotal={grandTotal}
                    totalItem={totalItem}
                    totalDiscount={totalDiscount}
                />
            )}
        </>
    );
};

export default PaymentComponent;
