import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductCard = ({ product }) => {
  const handleBuyNow = () => {
    // In a real app, this would call the redirect API
    console.log(`Buying product: ${product._id}`);
    window.location.href = product.affiliateLink;
  };

  return (
    <div className="product-card">
      <div 
        className="product-img" 
        style={{ backgroundImage: `url(${product.imageUrl})` }}
      ></div>
      <div className="product-content">
        <h3>{product.name}</h3>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <div className="product-description">{product.description}</div>
        <div className="product-meta">
          <div className="rating">
            <FontAwesomeIcon icon="star" />
            <FontAwesomeIcon icon="star" />
            <FontAwesomeIcon icon="star" />
            <FontAwesomeIcon icon="star" />
            <FontAwesomeIcon icon="star-half-alt" />
            <span>(128)</span>
          </div>
          <div className="actions">
            <button className="btn" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;