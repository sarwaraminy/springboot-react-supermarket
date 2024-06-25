import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserEmail } from '../../auth/useUserEmail';

const ProductForm = ({ fetchProduct }) => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        category_id: '',
        price: '',
        quantity: '',
        discount: ''
    });
    const [categories, setCategories] = useState([]);
    const loggedEmail = useUserEmail();

    useEffect(() => {
        if (id) {
            fetch(`/api/products/${id}`)
                .then(response => response.json())
                .then(data => setProduct(data));
        }
        fetch(`${process.env.REACT_APP_API_SERVER}/api/categories/${loggedEmail}`)
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
        const url = id ? `${process.env.REACT_APP_API_SERVER}/api/product/${id}` : `${process.env.REACT_APP_API_SERVER}/api/product/add`;
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(() => {
            fetchProduct(); // refresh the product list
            setProduct({name: '', category_id: '', price: '', quantity: '', discount:''});
        });
    }

    return (
        <div className="container-fluid">
        <h1 id="form-title">Add New Product</h1>
        <form id="product-form" onSubmit={handleSubmit}>
            <div className="form-row align-items-end">
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
                <div className="form-group col-md-1">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" className="form-control" id="quantity" name="quantity" required value={product.quantity} onChange={handleChange} />
                </div>
                <div className="form-group col-md-1">
                    <label htmlFor="discount">Discount</label>
                    <input type="number" className="form-control" id="discount" name="discount" required value={product.discount} onChange={handleChange} />
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
