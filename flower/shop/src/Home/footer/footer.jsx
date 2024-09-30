/* eslint-disable react/no-unescaped-entities */
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import "./footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section reminder">
        <p>
          Remember to offer beautiful flowers from Kyiv LuxeBouquets for
          Valentine's Day, Mother's Day, Christmas...
        </p>
        <p>Reminds you 7 days before. No spam or sharing your address.</p>
        <div className="email-reminder">
          <input type="email" placeholder="Your Email" />
          <button>REMIND</button>
        </div>
      </div>

      <div className="footer-section contact">
        <h3>Contact Us</h3>
        <p>Address</p>
        <p>15/4 Khreshchatyk Street, Kyiv</p>
        <p>Phone</p>
        <p>+380980099777</p>
        <p>General Enquiry</p>
        <p>Kiev.Florist.Studio@gmail.com</p>
      </div>

      <div className="footer-section follow-us">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaWhatsapp />
          </a>
        </div>
      </div>

      <div className="footer-section shop">
        <h3>Shop</h3>
        <ul>
          <li>All Products</li>
          <li>Fresh Flowers</li>
          <li>Dried Flowers</li>
          <li>Live Plants</li>
          <li>Designer Vases</li>
          <li>Aroma Candles</li>
          <li>Freshener Diffuser</li>
        </ul>
      </div>

      <div className="footer-section service">
        <h3>Service</h3>
        <ul>
          <li>Flower Subscription</li>
          <li>Wedding & Event Decor</li>
        </ul>
      </div>

      <div className="footer-section about-us">
        <h3>About Us</h3>
        <ul>
          <li>Our Story</li>
          <li>Blog</li>
          <li>Shipping & Returns</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
