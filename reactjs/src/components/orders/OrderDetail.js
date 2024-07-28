import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchOrderDetail();
    }, [id]);

    const fetchOrderDetail = async () => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/orders/${id}`, {}, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setOrder(response.data);
            setOrderItems(response.data.orderItems);
        } catch (error){
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div>
            <h1>Order Details</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.product}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <strong>Total Amount: </strong>{order.total_amount}
            </div>
            <div>
                <strong>Status: </strong>{order.status}
            </div>
            <Button variant="primary" className="mt-3">Complete Order</Button>
        </div>
    );
}

export default OrderDetail;
