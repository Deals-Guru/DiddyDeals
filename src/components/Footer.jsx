import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container container">
        <div className="footer-col">
          <h3>About Us</h3>
          <p>AffiliateHub is your one-stop destination for the best deals and products across the web.</p>
          <div className="social-links">
            <a href="#"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
            <a href="#"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
            <a href="#"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
            <a href="#"><FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a>
          </div>
        </div>
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Deals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">New Arrivals</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Newsletter</h3>
          <p>Subscribe to get special offers and updates.</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit" className="btn">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} AffiliateHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;