import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        langCode: '',
        firstname: '',
        lastname: ''
    });

    useEffect(() => {
        if (id) {
            fetch(`/api/users/${id}`)
                .then(response => response.json())
                .then(data => setUser(data));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/users/${id}` : '/api/users';
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(() => {
            navigate('/users');
        });
    }

    return (
        <div>
            <h1>{id ? 'Edit User' : 'Add New User'}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="langCode">
                    <Form.Label>Language Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="langCode"
                        value={user.langCode}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstname"
                        value={user.firstname}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastname"
                        value={user.lastname}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Save</Button>
            </Form>
        </div>
    );
}

export default UserForm;
