import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutButton } from '../auth/LogoutButton';

const NavigationBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Admin Panel</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basic-navbar-nav" aria-controls="basic-navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse col-md-10" id="basic-navbar-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/categories">Categories</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/orders">Orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/suppliers">Suppliers</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/translations">Translations</Link>
                    </li>
                </ul>
            </div>
            <div className="col-md-1">
                <LogoutButton  />
            </div>
        </nav>
    );
}

export default NavigationBar;
