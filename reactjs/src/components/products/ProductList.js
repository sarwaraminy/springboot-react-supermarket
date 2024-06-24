import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUserEmail } from '../../auth/useUserEmail'


import ProductForm from './ProductForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const loggedEmail = useUserEmail(); // send the logged in user eamil to check user language

    useEffect(() => {
        fetchProduct();
    }, []);

    // create the productFech
    const fetchProduct = async () => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/products/${loggedEmail}`);
            setProducts(response.data);
        } catch (error){
            console.error('Error fetching products:', error);
        }
    }

    return (
        <>
           <ProductForm fetchProduct = {fetchProduct} />
           <div>
               <h1>Products Lists</h1>
               <Table striped bordered hover>
                   <thead>
                       <tr>
                           <th>ID</th>
                           <th>SKU</th>
                           <th>Name</th>
                           <th>Category</th>
                           <th>Price</th>
                           <th>Quantity</th>
                           <th>Actions</th>
                       </tr>
                   </thead>
                   <tbody>
                       {Array.isArray(products) && products.map(product => (
                           <tr key={product.id}>
                               <td>{product.id}</td>
                               <td>{product.sku}</td>
                               <td>{product.name}</td>
                               <td>{product.category}</td>
                               <td>{product.price}</td>
                               <td>{product.quantity}</td>
                               <td>
                                   <Link to={`/products/edit/${product.id}`}>
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

export default ProductList;
