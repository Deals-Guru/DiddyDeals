// ProductModal.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProductModal = ({ product, onCreate, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    rating: '',
    reviews: '',
    mrp: '',
    images: [''],
    highlights: [''],
    specifications: [{ key: '', value: '' }],
    deals: [
      {
        platform: "Amazon",
        price: '',
        discount: '',
        shareCode: '',
        logo: "🛒",
        color: "bg-orange-500",
        link: '',
        badge: "Best Seller"
      }
    ],
    description: [''],
    category: ''
  });
  
  const categories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Home & Kitchen' },
    { id: '3', name: 'Fashion' },
    { id: '4', name: 'Beauty' },
    { id: '5', name: 'Featured' },
    { id: '6', name: 'Fitness'}
  ];

  const platforms = [
    { name: "Amazon", logo: "🛒", color: "bg-orange-500" },
    { name: "Flipkart", logo: "🛍️", color: "bg-blue-500" },
    { name: "Meesho", logo: "🏪", color: "bg-pink-500" },
    { name: "Myntra", logo: "👕", color: "bg-purple-500" },
    { name: "Nykaa", logo: "💄", color: "bg-pink-400" }
  ];
  
  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        images: product.images || [''],
        highlights: product.highlights || [''],
        specifications: product.specifications || [],
        deals: product.deals || [{
          platform: "Amazon",
          price: '',
          discount: '',
          shareCode: '',
          logo: "🛒",
          color: "bg-orange-500",
          link: '',
          badge: "Best Seller"
        }],
        description: Array.isArray(product.description) ? product.description : [product.description || '']
      });
    } else {
      setFormData({
        name: '',
        brand: '',
        rating: '',
        reviews: '',
        mrp: '',
        images: [''],
        highlights: [''],
        specifications: [{ key: '', value: '' }],
        deals: [
          {
            platform: "Amazon",
            price: '',
            discount: '',
            shareCode: '',
            logo: "🛒",
            color: "bg-orange-500",
            link: '',
            badge: "Best Seller"
          }
        ],
        description: [''],
        category: ''
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

  const handleArrayChange = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

const handleSpecificationChange = (index, field, value) => {
  setFormData(prev => {
    const newSpecs = [...prev.specifications];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    return {
      ...prev,
      specifications: newSpecs
    };
  });
};

const addSpecification = () => {
  setFormData(prev => ({
    ...prev,
    specifications: [...prev.specifications, { key: '', value: '' }]
  }));
};

const removeSpecification = (index) => {
  setFormData(prev => ({
    ...prev,
    specifications: prev.specifications.filter((_, i) => i !== index)
  }));
};


  const handleDealChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      deals: prev.deals.map((deal, i) => 
        i === index ? { ...deal, [field]: value } : deal
      )
    }));
  };

  const handlePlatformChange = (index, platformName) => {
    const platform = platforms.find(p => p.name === platformName);
    if (platform) {
      setFormData(prev => ({
        ...prev,
        deals: prev.deals.map((deal, i) => 
          i === index ? { 
            ...deal, 
            platform: platform.name,
            logo: platform.logo,
            color: platform.color
          } : deal
        )
      }));
    }
  };

  const addDeal = () => {
    setFormData(prev => ({
      ...prev,
      deals: [...prev.deals, {
        platform: "Amazon",
        price: '',
        discount: '',
        shareCode: '',
        logo: "🛒",
        color: "bg-orange-500",
        link: '',
        badge: ""
      }]
    }));
  };

  const removeDeal = (index) => {
    if (formData.deals.length > 1) {
      setFormData(prev => ({
        ...prev,
        deals: prev.deals.filter((_, i) => i !== index)
      }));
    }
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
      <div className="modal-content max-h-screen overflow-y-auto">
        <div className="modal-header">
          <h2 className="modal-title">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="modal-close">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form space-y-4">
          {/* Basic Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="form-label">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="form-input"
                  step="0.1"
                  min="0"
                  max="5"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Reviews Count</label>
                <input
                  type="number"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Original Price (Rs)</label>
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
            </div>
          </div>

          {/* Images */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Product Images</h3>
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'images')}
                  className="form-input flex-1"
                  placeholder="Image URL"
                  required={index === 0}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'images')}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={formData.images.length === 1}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('images')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Image
            </button>
          </div>

          {/* Highlights */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Product Highlights</h3>
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'highlights')}
                  className="form-input flex-1"
                  placeholder="Product highlight"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'highlights')}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={formData.highlights.length === 1}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('highlights')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Highlight
            </button>
          </div>

          {/* Specifications */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Specifications</h3>
            {formData.specifications.map((spec, index) => (
  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
    <input
      type="text"
      value={spec.key}
      onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
      className="form-input md:col-span-2"
      placeholder="Specification name"
    />
    <input
      type="text"
      value={spec.value}
      onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
      className="form-input md:col-span-2"
      placeholder="Specification value"
    />
    <button
      type="button"
      onClick={() => removeSpecification(index)}
      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  </div>
))}
            <button
              type="button"
              onClick={addSpecification}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Specification
            </button>
          </div>

          {/* Deals */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Platform Deals</h3>
            {formData.deals.map((deal, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="form-label">Platform</label>
                    <select
                      value={deal.platform}
                      onChange={(e) => handlePlatformChange(index, e.target.value)}
                      className="form-input"
                    >
                      {platforms.map(platform => (
                        <option key={platform.name} value={platform.name}>
                          {platform.logo} {platform.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Price (Rs)</label>
                    <input
                      type="number"
                      value={deal.price}
                      onChange={(e) => handleDealChange(index, 'price', e.target.value)}
                      className="form-input"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Discount (%)</label>
                    <input
                      type="number"
                      value={deal.discount}
                      onChange={(e) => handleDealChange(index, 'discount', e.target.value)}
                      className="form-input"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">shareCode</label>
                    <input
                      type="text"
                      value={deal.shareCode}
                      onChange={(e) => handleDealChange(index, 'shareCode', e.target.value)}
                      className="form-input"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Affiliate Link</label>
                    <input
                      type="url"
                      value={deal.link}
                      onChange={(e) => handleDealChange(index, 'link', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Badge</label>
                    <input
                      type="text"
                      value={deal.badge}
                      onChange={(e) => handleDealChange(index, 'badge', e.target.value)}
                      className="form-input"
                      placeholder="e.g., Best Seller, Limited Offer"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-3">
                  <button
                    type="button"
                    onClick={() => removeDeal(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
                    disabled={formData.deals.length === 1}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Remove Deal
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addDeal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Deal
            </button>
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Product Description</h3>
            {formData.description.map((desc, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <textarea
                  value={desc}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'description')}
                  className="form-input form-textarea flex-1"
                  rows="3"
                  placeholder="Description paragraph"
                  required={index === 0}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'description')}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 self-start"
                  disabled={formData.description.length === 1}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('description')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Description Paragraph
            </button>
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