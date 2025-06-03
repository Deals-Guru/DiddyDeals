import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  return (
    <header>
      <div className="header-container container">
        <div className="logo">
          {/* <FontAwesomeIcon icon="bolt" /> */}
          <img src="/logo.png" alt="Diddy Deals Logo" width={52} height={52} />
          <span>Diddy Deals</span>
          <div style={{height: '1px', width: '90%', backgroundColor: '#d2a533', position: 'absolute', top: '46px', left: '30px'}}></div>
        </div>
        {/* <nav>
          <ul>
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Deals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav> */}
        <div className="nav-icons">
          <FontAwesomeIcon icon="search" />
          {/* <FontAwesomeIcon icon="user" />
          <FontAwesomeIcon icon="shopping-cart" /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;