import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        <div className="container-fluid">
            <h1>Add New User</h1>
            <form id="user-form" onSubmit={handleSubmit}>
                <div className="form-row align-items-end">
                    <div className="form-group col">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" id="username" value={user.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" id="email" value={user.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" id="password" value={user.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" value={user.confirmPassword} onChange={handleChange} required />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="role">Role </label>
                        <select  className="form-control" id="role" value={user.role} onChange={handleChange}>
                            <option value="USER">User</option>
                            <option value="ADMIN">Administrator</option>
                        </select>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="langCode">User Language </label>
                        <select  className="form-control" id="langCode" value={user.langCode} onChange={handleChange}>
                            <option value="en">English</option>
                            <option value="fa">دری</option>
                            <option value="ps">پشتو</option>
                        </select>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="firstname">First Name</label>
                        <input className="form-control" id="firstname" placeholder="First Name"
                            value={user.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="lastname">Last Name</label>
                        <input className="form-control" id="lastname" placeholder="Last Name"
                            value={user.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col">
                    <button 
                       type="submit" 
                       className="btn btn-primary"
                       disabled={!user.email || !user.username  || !user.password || user.password !==  user.confirmPassword}
                       >
                         Add
                       </button>
                </div>
                </div>
            </form>
        </div>
    );
}

export default UserForm;
