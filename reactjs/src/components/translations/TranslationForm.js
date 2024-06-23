import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const TranslationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [translation, setTranslation] = useState({
        lang_code: '',
        table_name: '',
        column_name: '',
        row_id: '',
        translation: ''
    });

    useEffect(() => {
        if (id) {
            fetch(`/api/translations/${id}`)
                .then(response => response.json())
                .then(data => setTranslation(data));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTranslation({ ...translation, [name]: value });
    }

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
        <div>
            <h1>{id ? 'Edit Translation' : 'Add New Translation'}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="lang_code">
                    <Form.Label>Language Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="lang_code"
                        value={translation.lang_code}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="table_name">
                    <Form.Label>Table Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="table_name"
                        value={translation.table_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="column_name">
                    <Form.Label>Column Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="column_name"
                        value={translation.column_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="row_id">
                    <Form.Label>Row ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="row_id"
                        value={translation.row_id}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="translation">
                    <Form.Label>Translation</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="translation"
                        value={translation.translation}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Save</Button>
            </Form>
        </div>
    );
}

export default TranslationForm;
