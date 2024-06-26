import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUserEmail } from '../../auth/useUserEmail';
import ProductForm from './ProductForm';
import BuyList from './BuyList';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [buyList, setBuyList] = useState([]);

    const loggedEmail = useUserEmail();

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/products/${loggedEmail}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addToBuyList = (product) => {
        const index = buyList.findIndex(item => item.id === product.id);
        if (index !== -1) {
            const newBuyList = [...buyList];
            newBuyList[index].quantity += 1;
            setBuyList(newBuyList);
        } else {
            setBuyList([...buyList, { ...product, quantity: 1 }]);
        }
    };

    const saveSales = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/sales`, { buyList });
            console.log('Sales saved:', response.data);
            setBuyList([]); // Clear the buy list after saving
        } catch (error) {
            console.error('Error saving sales:', error);
        }
    };

    return (
        <>
            <ProductForm fetchProduct={fetchProduct} />
            <div className="row">
                <div className="col-md-8">
                    <div>
                        <h1>Products List</h1>
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Discount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(products) && products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.categoryName ? product.categoryName : 'No Category'}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.discount}</td>
                                        <td>
                                            <Link to={`/products/edit/${product.id}`}>
                                                <button className="btn btn-warning mr-2">Edit</button>
                                            </Link>
                                            <button className="btn btn-success" onClick={() => addToBuyList(product)}>Add to Buy List</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-4">
                    <div>
                        <h2>Buy List</h2>
                        <BuyList buyList={buyList} setBuyList={setBuyList} />
                        <button className="btn btn-primary mt-3" onClick={saveSales}>Save Sales</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;
