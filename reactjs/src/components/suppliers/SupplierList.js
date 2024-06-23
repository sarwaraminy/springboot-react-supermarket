import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetch('/api/suppliers')
            .then(response => response.json())
            .then(data => setSuppliers(data));
    }, []);

    return (
        <div>
            <h1>Suppliers</h1>
            <Link to="/suppliers/new">
                <Button variant="primary" className="mb-3">Add New Supplier</Button>
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact Info</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(supplier => (
                        <tr key={supplier.id}>
                            <td>{supplier.id}</td>
                            <td>{supplier.name}</td>
                            <td>{supplier.contact_info}</td>
                            <td>
                                <Link to={`/suppliers/edit/${supplier.id}`}>
                                    <Button variant="warning" className="mr-2">Edit</Button>
                                </Link>
                                <Button variant="danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default SupplierList;
