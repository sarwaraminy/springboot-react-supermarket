import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TranslationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [translation, setTranslation] = useState({
        tableName: 'products',
        columnName: '',
        rowId: '',
        translation: ''
    });
    const [columns, setColumns] = useState([
        { value: 'name', label: 'product.name' },
        { value: 'description', label: 'product.description' }
    ]);

    const tableColumns = {
        products: [
            { value: 'name', label: 'product.name' },
            { value: 'description', label: 'product.description' }
        ],
        categories: [
            { value: 'name', label: 'category.name' },
            { value: 'description', label: 'category.description' }
        ],
        orders: [
            { value: 'status', label: 'order.status' }
        ],
        suppliers: [
            { value: 'name', label: 'supplier.name' },
            { value: 'contactInfo', label: 'supplier.contactinfo' }
        ]
    };

    useEffect(() => {
        if (id) {
            fetch(`/api/translations/${id}`)
                .then(response => response.json())
                .then(data => setTranslation(data));
        }
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setTranslation({ ...translation, [id]: value });

        if (id === 'tableName') {
            setColumns(tableColumns[value] || []);
            setTranslation({ ...translation, tableName: value, columnName: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/translations/${id}` : '/api/translations';
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(translation)
        }).then(() => {
            navigate('/translations');
        });
    }

    return (
        <div className="container-fluid">
            <h1 id="form-title">Add New Translation</h1>
            <form id="translation-form" onSubmit={handleSubmit}>
                <div className="form-row align-items-end">
                    <div className="form-group col">
                        <label htmlFor="langCode">Language </label>
                        <select  className="form-control" id="langCode" value={translation.langCode} onChange={handleChange}>
                            <option value="en">English</option>
                            <option value="fa">دری</option>
                            <option value="ps">پشتو</option>
                        </select>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="tableName">Table Name </label>
                        <select  className="form-control" id="tableName" value={translation.tableName} onChange={handleChange}>
                            <option value="products">Product Data Table</option>
                            <option value="categories">Categories Data Table</option>
                            <option value="orders">Orders Data Table</option>
                            <option value="suppliers">Suppliers Data Table</option>
                        </select>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="columnName">Column Name </label>
                        <select className="form-control" id="columnName" value={translation.columnName} onChange={handleChange}>
                            <option value="">Please Select a Column</option>
                            {columns.map(column => (
                                <option key={column.value} value={column.value}>{column.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col">
                    <label htmlFor="rowId">Row Id </label>
                        <input type="number" className="form-control" name="rowId" id="rowId" value={translation.rowId} onChange={handleChange} required />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="translation">Translation</label>
                        <textarea name="translation" id="translation" className="form-control" rows={3} value={translation.translation} onChange={handleChange} required />
                    </div>
                    <div className="form-group col">
                        <button type="submit" className="btn btn-primary">Add Product</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TranslationForm;
