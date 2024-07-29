import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CategoryForm = ({ fetchCategory }) => {
    const { id } = useParams();
    const [category, setCategory] = useState({
        name: '',
        description: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`/api/category/${id}`)
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
        const url = id ? `${process.env.REACT_APP_API_SERVER}/api/category/${id}` : `${process.env.REACT_APP_API_SERVER}/api/category/add`;
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        }).then(() => {
            fetchCategory();
            setCategory({name:"", description:""});
            setMessage("Record added Successfully");
        });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8"><h4>Add New Category</h4></div>
                <div className="col-md-4 text-success">{message}</div>
            </div>
            
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
