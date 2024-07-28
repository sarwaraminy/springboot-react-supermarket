import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/orders`, {}, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setOrders(response.data);
        } catch (error){
            console.error('Error fetching products:', error);
        }
    };
    
    return (
        <div>
            <h1>Orders</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user}</td>
                            <td>{order.total_amount}</td>
                            <td>{order.status}</td>
                            <td>
                                <Link to={`/orders/${order.id}`}>
                                    <Button variant="primary" className="mr-2">View</Button>
                                </Link>
                                <Button variant="danger">Cancel</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default OrderList;
