import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
        <div className="container-fluid">
            <h1>Add New Supplier</h1>
            <form id="category-form" onSubmit={handleSubmit}>
                <div className="form-row align-items-end">
                    <div className="form-group col-md-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={supplier.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="contact">Contact Info</label>
                        <textarea name="contact" id="contact" className="form-control" rows={3} value={supplier.contact_info} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3">
                        <button type="submit" className="btn btn-primary">Add Supplier</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SupplierForm;
