import React, { useState } from "react";
import PaymentCash from "./PaymentCash";

const PaymentComponent = ({ payVal, onEditClick, formatCurrenc }) => {
    const [showPaymentCollect, setShowPaymentCollect] = useState(false);

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
                                    {formatCurrenc(formattedPayVal)} {/* Ensure formatCurrenc is defined */}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3 ml-1">
                        <div className="col-sm-12 text-success">
                            <a href="#" onClick={handleEditClick}>Edit to make partial payment.</a>
                        </div>
                    </div>
                    <button type="button" className="btn btn-lg btn-success btn-block p-3" onClick={showPayModl}>
                        <label className="h4">Cash</label>
                    </button>
                    <button type="button" className="btn btn-lg btn-secondary btn-block p-3" onClick={showLayby}>
                        <label className="h4">Layby</label>
                    </button>
                    <button type="button" className="btn btn-lg btn-warning btn-block p-3" onClick={showStCrd}>
                        <label className="h4">Store Credit</label>
                    </button>
                    <button type="button" className="btn btn-lg btn-info btn-block p-3" onClick={showAnAccount}>
                        <label className="h4">On Account</label>
                    </button>
                </>
            )}
            {showPaymentCollect && (
                <PaymentCash
                    payVal={parseFloat(payVal)} // Ensure payVal is parsed as float if necessary
                    formatCurrenc={formatCurrenc} // Pass formatCurrenc function to PaymentCash
                />
            )}
        </>
    );
};

export default PaymentComponent;
