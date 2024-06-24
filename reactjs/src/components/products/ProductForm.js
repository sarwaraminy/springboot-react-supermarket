import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const ProductForm = ({ fetchProduct }) => {
    const { id } = useParams();
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
            fetchProduct(); // refresh the product list
        });
    }

    return (
        <div className="container-fluid">
        <h1 id="form-title">Add New Product</h1>
        <form id="product-form" onSubmit={handleSubmit}>
            <div className="form-row align-items-end">
                <div className="form-group col-md-2">
                    <label htmlFor="sku">SKU</label>
                    <input type="text" className="form-control" id="sku" name="sku" required value={product.sku} onChange={handleChange} />
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" required value={product.name} onChange={handleChange} />
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="category_id">Category</label>
                    <select className="form-control" id="category_id" name="category_id" required value={product.category_id} onChange={handleChange}>
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" id="price" name="price" required value={product.price} onChange={handleChange} />
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" className="form-control" id="quantity" name="quantity" required value={product.quantity} onChange={handleChange} />
                </div>
                <div className="form-group col-md-2">
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </div>
            </div>
        </form>
    </div>
    );
}

export default ProductForm;
