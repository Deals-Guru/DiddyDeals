import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ProductCard = ({ product }) => {
  const handleBuyNow = () => {
    console.log(`Buying product: ${product._id}`);
    window.open(product.affiliateLink, '_blank');
  };

  const copyHandler = (event) => {
    navigator.clipboard.writeText(`https://diddy-deals.netlify.app/product?code=${product.shareCode}`);
    event.stopPropagation();
  }

  return (
  <div className="product-card" onClick={handleBuyNow}>
    <div className="affiliate-icon">
      <FontAwesomeIcon icon={faLink} onClick={copyHandler} />
    </div>
    
    <div className="product-img-container">
      <img 
        className="product-img" 
        src={product.imageUrl}
        alt={product.name}
      />
    </div>
    
    <div className="product-content">
      <h3 className="product-title">{product.name}</h3>
      
      <div className="pricing-section">
        <div className="product-price">₹{product.price.toFixed(2)}</div>
        {product.mrp && (
          <div className="off-price">
            <span className="original-price">₹{product.mrp}</span>
            {product.off && (
              <span className="discount-percent">-{product.off}%</span>
            )}
          </div>
        )}
      </div>
      
      <div className="product-description">{product.description}</div>
      
      <div className="product-meta">
        <button className="buy-btn">Buy Now</button>
      </div>
    </div>
  </div>
);
};

export default ProductCard;