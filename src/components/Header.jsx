import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ onClick, setProducts, allProducts, searchBar=true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchInputRef.current.blur();
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) || 
        product.description.some(str => str.toLowerCase().includes(term.toLowerCase()))
      );
      setProducts(filtered);
    }
  };

  return (
    <header>
      <div className="header-container container">
        <div className="logo" onClick={onClick}>
          <img src="/logo.png" alt="Diddy Deals Logo" className='logoImg' />
          <span style={{color: 'rgb(212 179 72)', fontWeight: 600}}>Diddy Deals</span>
          <div className='logoLine'></div>
        </div>
        
        {searchBar && <div className="search-box">
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search products"
            onKeyDown={handleKeyDown}
          />
          <FontAwesomeIcon icon="search" className="search-icon" />
        </div>}
      </div>
    </header>
  );
};

export default Header;