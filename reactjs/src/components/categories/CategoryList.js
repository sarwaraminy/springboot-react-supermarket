import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CategoryForm from './CategoryForm'

const CategoryList = () => {
    const [categories, setCategories] = useState([]);    
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [messages, setMessages] = useState('');

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: ''
    });

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

    const handleEditClick = (category) => {
        setEditCategoryId(category.id);
        setFormData({
            id: category.id,
            name: category.name,
            description: category.description
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCancelClick = () => {
        setEditCategoryId(null);
        setFormData({ id: '', name: '', description: '' });
        setMessages('');
    };

    const handleSaveClick = async () => {
        try {
            console.log("handleSaveClick formData:", JSON.stringify(formData, null, 2));
            await axios.put(`${process.env.REACT_APP_API_SERVER}/api/category/${formData.id}`, formData);
            fetchCategory();
            setEditCategoryId(null);
            setMessages(`<font color="green">Record is updated Successfully!</font>`);
        } catch (error) {
            setMessages(`<font color="red">Error saving category: ${error}</font>`);
        }
    };

    const handleDeleteClick = async (categoryId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_SERVER}/api/category/${categoryId}`);
            setMessages(`<font color="green">Record is Deleted Successfully!</font>`);
            fetchCategory();
        } catch (error) {
            setMessages(`<font color="red">Error saving cattegory: ${error}</font>`);
        }
    };


    const sortCategories = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedCategory = [...categories].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setCategories(sortedCategory);
    };

    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
        }
        return '';
    };

    return (
        <>
            <CategoryForm fetchCategory = {fetchCategory} />
            <div>
                <div className="row border-bottom mb-3">
                    <div className="col-md-8">Category List</div>
                    <div className="col-md-4" dangerouslySetInnerHTML={{ __html: messages }}></div>
                </div>
                <div className="table-container">
                  <table className="table table-striped table-bordered table-hover">
                      <thead className="sticky-header">
                          <tr>
                          <th role="button" title="Click here to sort data" onClick={() => sortCategories('id')}>ID{getSortArrow('id')}</th>
                          <th role="button" title="Click here to sort data" onClick={() => sortCategories('name')}>Name{getSortArrow('name')}</th>
                          <th role="button" title="Click here to sort data" onClick={() => sortCategories('description')}>Description{getSortArrow('description')}</th>
                          <th width="20%"></th>
                          </tr>
                      </thead>
                      <tbody>
                          {categories && categories.map(category => (
                              <tr key={category.id}>
                                  {editCategoryId === category.id ? (
                                      <>
                                        <td>{category.id}</td>
                                        <td><input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} /></td>
                                        <td><textarea className="form-control" rows={3} name="description" value={formData.description} onChange={handleInputChange} /></td>
                                        <td>
                                            <button className="btn btn-success btn-sm" onClick={handleSaveClick}>Save</button>
                                            <button className="btn btn-warning btn-sm ml-2" onClick={handleCancelClick}>Cancel</button>
                                            <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteClick(category.id)}>Delete</button>
                                        </td>
                                      </>
                                  ) : (
                                      <>
                                        <td>{category.id}</td>
                                        <td
                                          className="editProductBtn"
                                          onClick={() => handleEditClick(category)}>
                                           {category.name}
                                        </td>
                                        <td
                                          className="editProductBtn"
                                          onClick={() => handleEditClick(category)}>
                                           {category.description}
                                        </td>
                                        <td></td>
                                      </>
                                  )}
                              </tr>
                          ))}
                      </tbody>
                  </table>
                </div>
            </div>
        </>
    );
}

export default CategoryList;
