import React, { useState } from 'react';

const PaymentCash = ({ payVal, showPayModl, formatCurrenc }) => {
    const [payed, setPayed] = useState(0);

    const handlePayedChange = (e) => {
        setPayed(parseFloat(e.target.value));
    };

    const handleCollect = () => {
        // Handle collection logic here, e.g., pass payed value to parent component
        console.log(`Collecting payment: ${payed}`);
        // Optionally, reset payed amount after collection
        setPayed(0);
    };

    const handleCancel = () => {
        // Handle cancel logic here
        console.log("Payment collection canceled");
        // Optionally, reset payed amount on cancel
        setPayed(0);
        // Close modal or perform any other actions as needed
    };

    return (
        <div className="modal-content">
            <div className="modal-header">
                <div className="row">
                    <div className="col-sm-6 h3">Amount to pay</div>
                    <div className="col-sm-5 text-right h3">{formatCurrenc(payVal.toFixed(2))}</div>
                </div>
            </div>
            <div className="modal-body">
                <p className="h3">Amount Given by Customer</p>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text bg-light">{formatCurrenc(0)}</span>
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
                                        { formatCurrenc((payVal - payed).toFixed(2)) }
                                    </span>
                                )}
                                {payed === payVal || payed > payVal ? (
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handleCollect}
                                    >
                                        Collect {formatCurrenc(payed.toFixed(2))}
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
    );
};

export default PaymentCash;
