import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        sku: '',
        name: '',
        category_id: '',
        price: '',
        quantity: ''
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (id) {
            fetch(`/api/products/${id}`)
                .then(response => response.json())
                .then(data => setProduct(data));
        }
        fetch('/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/products/${id}` : '/api/products';
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(() => {
            navigate('/products');
        });
    }

    return (
        <div>
            <h1>{id ? 'Edit Product' : 'Add New Product'}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="sku">
                    <Form.Label>SKU</Form.Label>
                    <Form.Control
                        type="text"
                        name="sku"
                        value={product.sku}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="category_id">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        name="category_id"
                        value={product.category_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Save</Button>
            </Form>
        </div>
    );
}

export default ProductForm;
