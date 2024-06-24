import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CategoryForm from './CategoryForm'
import { useUserEmail } from '../../auth/useUserEmail'

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const loggedEmail = useUserEmail(); // send the logged in user eamil to check user language

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/categories/${loggedEmail}`);
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
