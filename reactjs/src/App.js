import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";
import './App.css';
import { LoginPage } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUp";

import Dashboard from './components/Dashboard';
import ProductList from './components/products/ProductList';
import ProductForm from './components/products/ProductForm';
import CategoryList from './components/categories/CategoryList';
import CategoryForm from './components/categories/CategoryForm';
import OrderList from './components/orders/OrderList';
import OrderDetail from './components/orders/OrderDetail';
import UserList from './components/users/UserList';
import UserForm from './components/users/UserForm';
import SupplierList from './components/suppliers/SupplierList';
import SupplierForm from './components/suppliers/SupplierForm';
import TranslationList from './components/translations/TranslationList';
import TranslationForm from './components/translations/TranslationForm';

const App = () => {
    return (
        <Router>
            <div className="container mt-4">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/" element={<PrivateRoute />}>
                        <Route index element={<Dashboard />} />
                        <Route path="products" element={<ProductList />} />
                        <Route path="products/new" element={<ProductForm />} />
                        <Route path="products/edit/:id" element={<ProductForm />} />
                        <Route path="categories" element={<CategoryList />} />
                        <Route path="categories/new" element={<CategoryForm />} />
                        <Route path="categories/edit/:id" element={<CategoryForm />} />
                        <Route path="orders" element={<OrderList />} />
                        <Route path="orders/:id" element={<OrderDetail />} />
                        <Route path="users" element={<UserList />} />
                        <Route path="users/new" element={<UserForm />} />
                        <Route path="users/edit/:id" element={<UserForm />} />
                        <Route path="suppliers" element={<SupplierList />} />
                        <Route path="suppliers/new" element={<SupplierForm />} />
                        <Route path="suppliers/edit/:id" element={<SupplierForm />} />
                        <Route path="translations" element={<TranslationList />} />
                        <Route path="translations/new" element={<TranslationForm />} />
                        <Route path="translations/edit/:id" element={<TranslationForm />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
