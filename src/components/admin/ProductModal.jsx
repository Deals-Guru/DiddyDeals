// ProductModal.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ProductModal = ({ product, onCreate, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    mrp: '',
    off: '',
    affiliateLink: '',
    shareCode: '',
    category: '',
    imageUrl: ''
  });
  
  const categories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Home & Kitchen' },
    { id: '3', name: 'Fashion' },
    { id: '4', name: 'Beauty' },
    { id: '5', name: 'Featured' },
    { id: '6', name: 'Fitness'}
  ];
  
  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        mrp: '',
        off: '',
        affiliateLink: '',
        shareCode: '',
        category: '',
        imageUrl: ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product) {
      onUpdate(product.id, formData);
    } else {
      onCreate(formData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="modal-close">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input form-textarea"
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label">Price (Rs)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">M.R.P. (Rs)</label>
            <input
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              className="form-input"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">off (%)</label>
            <input
              type="number"
              name="off"
              value={formData.off}
              onChange={handleChange}
              className="form-input"
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Affiliate Link</label>
            <input
              type="url"
              name="affiliateLink"
              value={formData.affiliateLink}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Share Code</label>
            <input
              type="text"
              name="shareCode"
              value={formData.shareCode}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;