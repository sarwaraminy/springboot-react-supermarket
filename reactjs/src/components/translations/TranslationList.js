import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TranslationList = () => {
    const [translations, setTranslations] = useState([]);

    useEffect(() => {
        fetch('/api/translations')
            .then(response => response.json())
            .then(data => setTranslations(data));
    }, []);

    const handleDelete = (id) => {
        fetch(`/api/translations/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setTranslations(translations.filter(translation => translation.id !== id));
        });
    }

    return (
        <div>
            <h1>Translations</h1>
            <Link to="/translations/new">
                <Button variant="primary" className="mb-3">Add New Translation</Button>
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Lang Code</th>
                        <th>Table</th>
                        <th>Column</th>
                        <th>Row ID</th>
                        <th>Translation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {translations.map(translation => (
                        <tr key={translation.id}>
                            <td>{translation.id}</td>
                            <td>{translation.lang_code}</td>
                            <td>{translation.table_name}</td>
                            <td>{translation.column_name}</td>
                            <td>{translation.row_id}</td>
                            <td>{translation.translation}</td>
                            <td>
                                <Link to={`/translations/edit/${translation.id}`}>
                                    <Button variant="warning" className="mr-2">Edit</Button>
                                </Link>
                                <Button variant="danger" onClick={() => handleDelete(translation.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TranslationList;
