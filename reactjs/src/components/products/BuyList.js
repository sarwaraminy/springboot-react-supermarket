import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PaymentComponent from './PaymentComponent'; // Adjust the import path as necessary

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

const formatInteger = (value) => {
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
    }).format(value);
};

const BuyList = ({ buyList, setBuyList }) => {
    const [openItems, setOpenItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        const calculateTotals = () => {
            let total = 0;
            let discount = 0;
            let totItems = 0;

            buyList.forEach(item => {
                const itemTotal = item.quantity * item.price;
                const itemDiscount = (item.discount / 100) * itemTotal;
                total += itemTotal - itemDiscount;
                discount += itemDiscount;
                totItems += item.quantity;
            });

            setGrandTotal(total.toFixed(2)); // Ensure grandTotal is formatted to 2 decimal places
            setTotalDiscount(discount.toFixed(2));
            setTotalItem(totItems);
        };

        calculateTotals();
    }, [buyList]);

    const handleInputChange = (index, field, value) => {
        const newBuyList = [...buyList];
        newBuyList[index][field] = parseFloat(value);
        setBuyList(newBuyList);
    };

    const removeItem = (index) => {
        const newBuyList = buyList.filter((_, i) => i !== index);
        setBuyList(newBuyList);
    };

    const toggleOpenItem = (index) => {
        if (openItems.includes(index)) {
            setOpenItems(openItems.filter(i => i !== index));
        } else {
            setOpenItems([...openItems, index]);
        }
    };

    const handlePaymentClick = () => {
        setShowPayment(true);
    };

    const handleEditClick = () => {
        setShowPayment(false); // Set showPayment to false to display BuyList again
    };

    return (
        <>
            {!showPayment && (
                <div className="table-container">
                    {buyList.map((item, index) => (
                        <div key={index} className="card mb-3 border">
                            <div className="card-header d-flex justify-content-between align-items-center" onClick={() => toggleOpenItem(index)} style={{ cursor: 'pointer' }}>
                                <div className="row w-100">
                                    <div className="col-sm-1">
                                        <FontAwesomeIcon 
                                            icon={openItems.includes(index) ? faChevronDown : faChevronRight} 
                                            className="mr-2"
                                        />
                                    </div>
                                    <div className="col-sm-2"><label>{formatInteger(item.quantity)}</label></div>
                                    <div className="col-sm-6"><label>{item.name}</label></div>
                                    <div className="col-sm-2 text-right text-danger">
                                        <label>
                                            {formatCurrency(item.quantity * item.price - (item.discount / 100) * (item.quantity * item.price))}
                                        </label>
                                    </div>
                                    <div className="col-sm-1 text-right">
                                        <a href="#">
                                            <FontAwesomeIcon icon={faTrashAlt} className="text-success" onClick={() => removeItem(index)} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {openItems.includes(index) && (
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <label>Quantity</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={item.quantity}
                                                onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                            />
                                        </div>
                                        <div className="col">
                                            <label>Price</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={item.price}
                                                onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                            />
                                        </div>
                                        <div className="col">
                                            <label>Discount (%)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={item.discount}
                                                onChange={(e) => handleInputChange(index, 'discount', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12">
                                            <label>Note</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={item.note || ''}
                                                onChange={(e) => handleInputChange(index, 'note', e.target.value)}
                                                placeholder="Type to add note..."
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12 text-right text-success">
                                            <button className="btn btn-link" onClick={() => console.log('Show Inventory & Details')}>
                                                Show Inventory & Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {!showPayment && totalDiscount != 0 && (
                <div className="row m-1">
                    <div className="col-9 fw-bold">Total Saving</div>
                    <div className="col-3 text-secondary">{formatCurrency(totalDiscount)}</div>
                </div>
            )}
            {!showPayment && grandTotal != 0 && (
                <div className="row bg-success m-1 p-2 align-items-center rounded fw-bold text-light" onClick={handlePaymentClick} style={{ cursor: 'pointer' }}>
                    <div className="col-6 text-left">Pay for {formatInteger(totalItem)} Item</div>
                    <div className="col-sm-5 pr-0 text-right">{formatCurrency(grandTotal)}</div>
                </div>
            )}

            {/* Conditionally render PaymentComponent */}
            {showPayment && (
                <PaymentComponent
                    payVal={parseFloat(grandTotal)}
                    buyList={buyList}
                    setBuyList={setBuyList}
                    onEditClick={handleEditClick} // Pass callback to handle edit click
                    formatCurrenc={formatCurrency}
                />
            )}
        </>
    );
};

export default BuyList;
