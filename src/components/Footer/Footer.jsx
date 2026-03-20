import footercss from "./footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={footercss.footer}>
      <div className={footercss.footerContainer}>
        <div className={footercss.logoSection}>
          <h2>resultmunch.com</h2>
          <p>Latest Government Jobs, Results and Admit Cards Updates</p>
        </div>

        <div className={footercss.linkSection}>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/jobs">Latest Jobs</Link>
            </li>
            <li>
              <Link to="/results">Results</Link>
            </li>
            <li>
              <Link to="/admit-card">Admit Card</Link>
            </li>
            <li>
              <Link to="/answer-key">Answer Key</Link>
            </li>
          </ul>
        </div>

        <div className={footercss.linkSection}>
          <h4>Important</h4>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/disclaimer">Disclaimer</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={footercss.bottom}>
        © {new Date().getFullYear()} resultmunch.com | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
