import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useUserEmail } from '../../auth/useUserEmail'

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    const loggedEmail = useUserEmail(); // send the logged in user eamil to check user language

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/orders/${loggedEmail}`);
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
