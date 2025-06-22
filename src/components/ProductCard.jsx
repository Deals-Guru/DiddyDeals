import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const ProductCard = ({ product }) => {
  const handleBuyNow = (event, deal) => {
    console.log(`Buying product: ${product._id} with deal: ${deal.link}`);
    window.open(deal.link, '_blank');
    event.stopPropagation();
  };
  const history = useHistory();

  const [cheapestDeal, setCheapestDeal] = useState(null);
  useEffect(() => {
    if (product && product.deals && product.deals.length > 0) {
    const cheapest = product.deals.reduce((min, current) => {
      return current.price < min.price ? current : min;
    });

    console.log(cheapest);
    
    setCheapestDeal(cheapest);
  }
  }, [product]);

  const copyHandler = (event) => {
    if (cheapestDeal && cheapestDeal.platform === 'Amazon') {
      navigator.clipboard.writeText(`https://diddy-deals.netlify.app/product?code=${cheapestDeal.shareCode}`);
    } else {
      navigator.clipboard.writeText(`${cheapestDeal.link}`);
    }
    event.stopPropagation();
  }

  return (
  <div className="product-card" onClick={() => history.push(`/product-info/${product._id}`)}>
    <div className="affiliate-icon">
      <FontAwesomeIcon icon={faLink} onClick={copyHandler} />
    </div>
    
    <div className="product-img-container">
      <img 
        className="product-img" 
        src={product.imageUrl || product.images[0]}
        alt={product.name}
      />
    </div>
    
    <div className="product-content">
      <h3 className="product-title">{product.name}</h3>
      
      <div className="pricing-section">
        <div className="product-price">₹{cheapestDeal?.price?.toFixed(2)}</div>
        {product.mrp && (
          <div className="off-price">
            <span className="original-price">₹{product.mrp}</span>
            {cheapestDeal?.discount && (
              <span className="discount-percent">-{cheapestDeal?.discount}%</span>
            )}
          </div>
        )}
      </div>
      
      <div className="product-description">{product.description}</div>
      
      <div className="product-meta">
        <button className="buy-btn" onClick={(e) => handleBuyNow(e, cheapestDeal)}>Buy Now</button>
      </div>
    </div>
  </div>
);
};

export default ProductCard;