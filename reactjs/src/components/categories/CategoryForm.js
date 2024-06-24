import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const CategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        if (id) {
            fetch(`/api/categories/${id}`)
                .then(response => response.json())
                .then(data => setCategory(data));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/categories/${id}` : '/api/categories';
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        }).then(() => {
            navigate('/categories');
        });
    }

    return (
        <div className="container-fluid">
            <h1>Add New Category</h1>
            <form id="category-form" onSubmit={handleSubmit}>
                <div className="form-row align-items-end">
                    <div className="form-group col-md-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={category.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" className="form-control" rows={3} value={category.description} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3">
                        <button type="submit" className="btn btn-primary">Add Category</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CategoryForm;
