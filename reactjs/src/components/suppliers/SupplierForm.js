import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SupplierForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState({
        name: '',
        contact_info: ''
    });

    useEffect(() => {
        if (id) {
            fetch(`/api/suppliers/${id}`)
                .then(response => response.json())
                .then(data => setSupplier(data));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/suppliers/${id}` : '/api/suppliers';
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(supplier)
        }).then(() => {
            navigate('/suppliers');
        });
    }

    return (
        <div>
            <h1>{id ? 'Edit Supplier' : 'Add New Supplier'}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={supplier.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="contact_info">
                    <Form.Label>Contact Info</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="contact_info"
                        value={supplier.contact_info}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Save</Button>
            </Form>
        </div>
    );
}

export default SupplierForm;
