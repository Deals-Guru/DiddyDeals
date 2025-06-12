import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({onClick}) => {
  return (
    <header>
      <div className="header-container container">
        <div className="logo" onClick={onClick}>
          {/* <FontAwesomeIcon icon="bolt" /> */}
          <img src="/logo.png" alt="Diddy Deals Logo" className='logoImg' />
          <span style={{color: 'rgb(212 179 72)', fontWeight: 600}}>Diddy Deals</span>
          <div className='logoLine'></div>
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