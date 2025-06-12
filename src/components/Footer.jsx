import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container container">
        <div className="footer-col">
          <h3>About Us</h3>
          <p>Diddy Deals is your ultimate destination for unbeatable online bargains. We scour the internet daily to bring you the best affiliate deals on tech, fashion, home essentials, beauty, gadgets, and more. Whether you're looking to upgrade your lifestyle or just save a few bucks, we've got the top picks, trending products, and exclusive discounts—all in one place. Shop smarter and spend less with curated offers you can trust, only at Diddy Deals</p>
          <div className="social-links">
            <a href="#"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
            <a href="#"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
            <a href="https://www.instagram.com/diddydealz?igsh=dzN2dnc2NG9obnQ1" target='_blank'><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
            <a href="https://www.linkedin.com/in/tushar-verma-502a86204/" target='_blank'><FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a>
            <a href="https://www.amazon.in/stores/Ak-Verma/author/B0FBJWTLC8?ref=ap_rdr&isDramIntegrated=true&shoppingPortalEnabled=true" target='_blank'><FontAwesomeIcon icon={faBook} /></a>
          </div>
        </div>
        {/* <div className="footer-col">
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
        </div> */}
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Diddy Deals. All Rights Reserved.</p>
        <p>A platform built by AK Verma and Tushar Verma : Founders | Developers | Designers. Powered by passion, driven by deals.</p>
      </div>
    </footer>
  );
};

export default Footer;