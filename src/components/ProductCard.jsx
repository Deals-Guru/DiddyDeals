import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductCard = ({ product }) => {
  const handleBuyNow = () => {
    console.log(`Buying product: ${product._id}`);
    window.open(product.affiliateLink, '_blank');
  };

  return (
    <div className="product-card" onClick={(handleBuyNow)}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img 
          className="product-img" 
          src={`${product.imageUrl}`}
        />
      </div>
      <div className="product-content">
        <h3>{product.name}</h3>
        <div class="pricing-section">
        <div className="product-price">₹ {product.price.toFixed(2)}</div>
        <div class="off-price">
          {product.mrp && <span class="original-price">₹ {product.mrp}</span>}
          {product.off && <span class="discount-percent">- {product.off}%</span>}
        </div>
      </div>
        <div className="product-description">{product.description}</div>
        <div className="product-meta">
          <div className="actions">
            <button className="btn" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;