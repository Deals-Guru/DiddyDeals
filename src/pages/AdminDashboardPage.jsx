// AdminDashboardPage.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import AuthForm from '../components/admin/AuthForm';
import ProductTable from '../components/admin/ProductTable';
import SliderGrid from '../components/admin/SliderGrid';
import ProductModal from '../components/admin/ProductModal';
import SliderModal from '../components/admin/SliderModal';
import './AdminDashboard.css';

import {
    fetchProducts,
    fetchSliders,
    createProduct,
    deleteProduct,
    updateProduct,
    createSlider,
    deleteSlider,
    updateSlider,
    checkAdminToken
} from '../api/apicalls';

const AdminDashboardPage = () => {
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(
        localStorage.getItem('adminToken') !== null
    );
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    const [products, setProducts] = useState([]);
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [sliders, setSliders] = useState([]);
    const [showSliderModal, setShowSliderModal] = useState(false);
    const [editingSlider, setEditingSlider] = useState(null);

    useEffect(() => {
        if (authenticated) {
            const loadData = async () => {
                try {
                    const [productsData, slidersData] = await Promise.all([
                        fetchProducts(),
                        fetchSliders()
                    ]);
                    setProducts(productsData);
                    setSliders(slidersData);
                } catch (error) {
                    console.error('Error loading data:', error);
                    setError('Failed to load data. Please try again later.');
                }
            };
            loadData();
        }
    }, [authenticated]);

    const handleTokenSubmit = async (e) => {
        e.preventDefault();
        const response = await checkAdminToken(token);
        if (!response.valid) {
            setError('Invalid admin token. Please try again.');
            return;
        } else {
            localStorage.setItem('adminToken', token);
            setAuthenticated(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setAuthenticated(false);
        setToken('');
    };

    const handleCreateProduct = async (productData) => {
        try {
            const newProduct = await createProduct(productData);
            setProducts([...products, newProduct]);
            setShowProductModal(false);
        } catch (error) {
            console.error('Error creating product:', error);
            setError('Failed to create product. Please try again.');
        }
    };


    const handleUpdateProduct = async (id, productData) => {
        try {
            const updatedProduct = await updateProduct(id, productData);
            setProducts(products.map(p => p.id === id ? updatedProduct : p));
            setEditingProduct(null);
            setShowProductModal(false);
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Failed to update product. Please try again.');
        }
    };

    const handleDeleteProduct = (id) => {
        try {
            deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
        } catch(error) {
            console.error('Error deleting product:', error);
            setError('Failed to delete product. Please try again.');
        }
    };

    const handleCreateSlider = async (sliderData) => {
        try {
            const newSlider = await createSlider(sliderData);
            setSliders([...sliders, newSlider]);
            setShowSliderModal(false);
        } catch (error) {
            console.error('Error creating slider:', error);
            setError('Failed to create slider. Please try again.');
        }
    };

    const handleUpdateSlider = async (id, sliderData) => {
        try {
            const updatedSlider = await updateSlider(id, sliderData);
            setSliders(sliders.map(s => s.id === id ? updatedSlider : s));
            setEditingSlider(null);
            setShowSliderModal(false);
        } catch (error) {
            console.error('Error updating slider:', error);
            setError('Failed to update slider. Please try again.');
        }
    };

    const handleDeleteSlider = async (id) => {
        try {
            await deleteSlider(id);
            setSliders(sliders.filter(s => s.id !== id));
        } catch (error) {
            console.error('Error deleting slider:', error);
            setError('Failed to delete slider. Please try again.');
        }
    };

    if (!authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Access</h2>
                    <p className="text-gray-600 mb-6 text-center">
                        Please enter your admin token to access the dashboard
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleTokenSubmit}>
                        <div className="mb-4">
                            <label htmlFor="token" className="block text-gray-700 mb-2">Admin Token</label>
                            <input
                                type="password"
                                id="token"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="header-title">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="logout-button"
                >
                    Logout
                </button>
            </div>

            <div className="dashboard-content">
                <ProductTable
                    products={products}
                    onAddProduct={() => {
                        setEditingProduct(null);
                        setShowProductModal(true);
                    }}
                    onEditProduct={(product) => {
                        setEditingProduct(product);
                        setShowProductModal(true);
                    }}
                    onDeleteProduct={handleDeleteProduct}
                />

                <SliderGrid
                    sliders={sliders}
                    onAddSlider={() => {
                        setEditingSlider(null);
                        setShowSliderModal(true);
                    }}
                    onEditSlider={(slider) => {
                        setEditingSlider(slider);
                        setShowSliderModal(true);
                    }}
                    onDeleteSlider={handleDeleteSlider}
                />
            </div>

            {showProductModal && (
                <ProductModal
                    product={editingProduct}
                    onCreate={handleCreateProduct}
                    onUpdate={handleUpdateProduct}
                    onClose={() => {
                        setEditingProduct(null);
                        setShowProductModal(false);
                    }}
                />
            )}

            {showSliderModal && (
                <SliderModal
                    slider={editingSlider}
                    onCreate={handleCreateSlider}
                    onUpdate={handleUpdateSlider}
                    onClose={() => {
                        setEditingSlider(null);
                        setShowSliderModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default AdminDashboardPage;