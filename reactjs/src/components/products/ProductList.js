import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserEmail } from '../../auth/useUserEmail';
import ProductForm from './ProductForm';
import BuyList from './BuyList';
import SearchProduct from './SearchProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [buyList, setBuyList] = useState([]);
    const [filteredProductList, setFilteredProductList] = useState([]);
    const [messages, setMessages] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [editProductId, setEditProductId] = useState(null);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        categoryId: '',
        price: '',
        quantity: '',
        discount: ''
    });

    const loggedEmail = useUserEmail();

    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/products/${loggedEmail}`);
            setProducts(response.data);
            setFilteredProductList(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/categories/${loggedEmail}`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleEditClick = (product) => {
        setEditProductId(product.id);
        setFormData({
            id: product.id,
            name: product.name,
            categoryId: product.categoryId,
            price: product.price,
            quantity: product.quantity,
            discount: product.discount
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, categoryId: value });
    };

    const handleCancelClick = () => {
        setEditProductId(null);
        setFormData({ id: '', name: '', categoryId: '', price: '', quantity: '', discount: '' });
        setMessages('');
    };

    const handleSaveClick = async () => {
        try {
            console.log("handleSaveClick formData:", JSON.stringify(formData, null, 2));
            await axios.put(`${process.env.REACT_APP_API_SERVER}/api/product/${formData.id}`, formData);
            fetchProduct();
            setEditProductId(null);
            setMessages(`<font color="green">Record is updated Successfully!</font>`);
        } catch (error) {
            setMessages(`<font color="red">Error saving product: ${error}</font>`);
        }
    };

    const handleDeleteClick = async (productId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_SERVER}/api/product/${productId}`);
            setMessages(`<font color="green">Record is Deleted Successfully!</font>`);
            fetchProduct();
        } catch (error) {
            setMessages(`<font color="red">Error saving product: ${error}</font>`);
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

    const sortProducts = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedProduct = [...filteredProductList].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFilteredProductList(sortedProduct);
    };

    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
        }
        return '';
    };

    const handleSearch = (filteredProducts) => {
        setFilteredProductList(filteredProducts);
    };

    return (
        <>
            <ProductForm fetchProduct={fetchProduct} />
            <div className="row">
                <div className="col-md-8">
                    <div>
                        <div className="row border-bottom mb-3">
                           <div className="col-md-8">Product List</div>
                           <div className="col-md-4" dangerouslySetInnerHTML={{ __html: messages }}></div>
                        </div>
                        <div className="row">
                          <SearchProduct products={products} onSearch={handleSearch} />
                        </div>
                        <div className="table-container">
                            <table className="table table-striped table-bordered table-hover">
                                <thead className="sticky-header">
                                    <tr>
                                        <th role="button" title="Click here to sort data" onClick={() => sortProducts('id')}>Id{getSortArrow('id')}</th>
                                        <th role="button" title="Click here to sort data" onClick={() => sortProducts('name')}>Name{getSortArrow('name')}</th>
                                        <th role="button" title="Click here to sort data" onClick={() => sortProducts('categoryName')}>Category{getSortArrow('categoryName')}</th>
                                        <th role="button" title="Click here to sort data" onClick={() => sortProducts('price')}>Price{getSortArrow('price')}</th>
                                        <th role="button" title="Click here to sort data" onClick={() => sortProducts('quantity')}>Quantity{getSortArrow('quantity')}</th>
                                        <th role="button" title="Click here to sort data" onClick={() => sortProducts('discount')}>Discount{getSortArrow('discount')}</th>
                                        <th width="20%"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(filteredProductList) && filteredProductList.map(product => (
                                        <tr key={product.id}>
                                            {editProductId === product.id ? (
                                                <>
                                                   <td>{product.id}</td>
                                                   <td><input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} /></td>
                                                   <td>
                                                      <select className="form-control" name="categoryId" defaultValue={formData.categoryId} onChange={handleCategoryChange}>
                                                        {categories.map(category => (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        ))}
                                                      </select>
                                                   </td>
                                                   <td><input type="number" className="form-control" name="price" value={formData.price} onChange={handleInputChange} /></td>
                                                   <td><input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={handleInputChange} /></td>
                                                   <td><input type="number" className="form-control" name="discount" value={formData.discount} onChange={handleInputChange} /></td>
                                                   <td>
                                                      <button className="btn btn-success btn-sm" onClick={handleSaveClick}>Save</button>
                                                      <button className="btn btn-warning btn-sm ml-2" onClick={handleCancelClick}>Cancel</button>
                                                      <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteClick(product.id)}>Delete</button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>{product.id}</td>
                                                    <td> {product.name} </td>
                                                    <td 
                                                      className="editProductBtn"
                                                      onClick={() => handleEditClick(product)}>
                                                        {product.categoryName ? product.categoryName : 'No Category'}
                                                      </td>
                                                    <td
                                                       className="editProductBtn"
                                                       onClick={() => handleEditClick(product)}>
                                                        {product.price}
                                                    </td>
                                                    <td
                                                       className="editProductBtn"
                                                       onClick={() => handleEditClick(product)}>
                                                        {product.quantity}
                                                    </td>
                                                    <td
                                                       className="editProductBtn"
                                                       onClick={() => handleEditClick(product)}>
                                                        {product.discount}
                                                        
                                                    </td>
                                                    <td>
                                                      <a href="#" title="Add to buy list">
                                                         <FontAwesomeIcon icon={faShoppingCart} className="text-success" onClick={() => addToBuyList(product)} />
                                                      </a>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="row mt-3"><div className="col-md-12 text-center font-weight-bold">Number of records: {products.length}</div></div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div>
                        <h2>Buy List</h2>
                        <BuyList buyList={buyList} setBuyList={setBuyList} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;
