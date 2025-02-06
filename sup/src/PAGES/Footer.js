import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import "./STYLESHEETS/Footer.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footerContainer}>
      <div style={styles.footerContent}>
        {/* Contact Information */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Contact Us</h4>
          <p style={styles.text}>Email: support@sportsportal.com</p>
          <p style={styles.text}>Phone: +91 3234567890</p>
          <p style={styles.text}>Address: MUJ, Jaipur, India</p>
        </div>

        {/* Social Media */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Follow Us</h4>
          <div style={styles.socialIcons}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <XIcon />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <p style={styles.bottomText}>© {currentYear} Sports Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footerContainer: {
    backgroundColor: "#fd8916",
    color: "#ffffff",
    padding: "20px 0",
    marginTop: "40px",
  },
  footerContent: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexWrap: "wrap",
    padding: "0 20px",
  },
  section: {
    flex: "1 1 200px",
    margin: "10px",
  },
  heading: {
    fontSize: "18px",
    marginBottom: "10px",
    borderBottom: "2px solid #ffebd0",
    paddingBottom: "5px",
  },
  text: {
    fontSize: "14px",
    marginBottom: "5px",
  },
  socialIcons: {
    display: "flex",
    gap: "10px",
  },
  footerBottom: {
    textAlign: "center",
    padding: "10px",
    borderTop: "1px solid #ffebd0",
    marginTop: "20px",
  },
  bottomText: {
    fontSize: "14px",
    color: "#ffebd0",
  },
};

export default Footer;
