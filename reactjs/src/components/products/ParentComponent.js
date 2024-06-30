import React, { useState } from 'react';
import BuyList from './BuyList';
import PaymentComponent from './PaymentComponent';

const ParentComponent = () => {
    const [buyList, setBuyList] = useState([]);
    const [payVal, setPayVal] = useState(0);
    const [cstmr, setCstmr] = useState('');

    const handlePayClick = (totalAmount) => {
        setPayVal(totalAmount);
    };

    return (
        <div>
            <BuyList buyList={buyList} setBuyList={setBuyList} handlePayClick={handlePayClick} />
            <PaymentComponent payVal={payVal} cstmr={cstmr} setCstmr={setCstmr} />
        </div>
    );
};

export default ParentComponent;
