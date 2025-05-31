import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

// Font Awesome Setup
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faBolt, faSearch, faUser, faShoppingCart, 
  faChevronLeft, faChevronRight, faStar, faStarHalfAlt 
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

library.add(
  faBolt, faSearch, faUser, faShoppingCart, 
  faChevronLeft, faChevronRight, faStar, faStarHalfAlt,
  faFacebookF, faTwitter, faInstagram, faLinkedinIn
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);