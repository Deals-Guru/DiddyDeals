// AdminDashboardPage.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import AuthForm from './AuthForm';
import ProductTable from './ProductTable';
import SliderGrid from './SliderGrid';
import ProductModal from './ProductModal';
import SliderModal from './SliderModal';

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
      // Mock products data
      setProducts([
        {
          id: '1',
          name: 'Wireless Headphones',
          description: 'Premium sound quality with noise cancellation',
          price: 89.99,
          affiliateLink: 'https://example.com/headphones',
          category: 'Electronics',
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: '2',
          name: 'Smart Watch',
          description: 'Track fitness and notifications',
          price: 199.99,
          affiliateLink: 'https://example.com/smartwatch',
          category: 'Electronics',
          imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
        }
      ]);
      
      // Mock sliders data
      setSliders([
        {
          id: '1',
          title: "Premium Headphones",
          description: "Experience crystal clear sound with noise cancellation",
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          link: "/products/1"
        },
        {
          id: '2',
          title: "Smart Watches",
          description: "Track your fitness and stay connected",
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          link: "/products/2"
        }
      ]);
    }
  }, [authenticated]);

  const handleTokenSubmit = (token) => {
    localStorage.setItem('adminToken', token);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAuthenticated(false);
    setToken('');
  };

  const handleCreateProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      price: parseFloat(productData.price)
    };
    setProducts([...products, newProduct]);
    setShowProductModal(false);
  };

  const handleUpdateProduct = (id, productData) => {
    setProducts(products.map(p => p.id === id ? {
      ...productData,
      id,
      price: parseFloat(productData.price)
    } : p));
    setEditingProduct(null);
    setShowProductModal(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleCreateSlider = (sliderData) => {
    const newSlider = {
      ...sliderData,
      id: Date.now().toString()
    };
    setSliders([...sliders, newSlider]);
    setShowSliderModal(false);
  };

  const handleUpdateSlider = (id, sliderData) => {
    setSliders(sliders.map(s => s.id === id ? {
      ...sliderData,
      id
    } : s));
    setEditingSlider(null);
    setShowSliderModal(false);
  };

  const handleDeleteSlider = (id) => {
    setSliders(sliders.filter(s => s.id !== id));
  };

  if (!authenticated) {
    return <AuthForm onSubmit={handleTokenSubmit} error={error} />;
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