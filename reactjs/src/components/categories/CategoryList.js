import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CategoryForm from './CategoryForm'

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/categories`, {}, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setCategories(response.data);
        } catch (error){
            console.error('Error fetching products:', error);
        }
        
    };

    return (
        <>
            <CategoryForm />
            <div>
                <h1>Categories Lists</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    <Link to={`/categories/edit/${category.id}`}>
                                        <Button variant="warning" className="mr-2">Edit</Button>
                                    </Link>
                                    <Button variant="danger">Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default CategoryList;
