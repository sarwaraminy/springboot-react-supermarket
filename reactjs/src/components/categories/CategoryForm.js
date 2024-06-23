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
        <div>
            <h1>{id ? 'Edit Category' : 'Add New Category'}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={category.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Save</Button>
            </Form>
        </div>
    );
}

export default CategoryForm;
