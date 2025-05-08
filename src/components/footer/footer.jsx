import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/src/assets/logo_semfundo.png" alt="Logo" />
        </div>
        <div className="footer-social-media">
          <a href="#">
            <img src="/src/assets/github.png" alt="Github" />
            <p>Github</p>
          </a>
          <a href="#">
            <img src="/src/assets/instagram.png" alt="instagram" />
            <p>Instagram</p>
          </a>
          <a href="#">
            <img src="/src/assets/linkedin.svg" alt="LinkedIn" />
            <p>LinkedIn</p>
          </a>
        </div>
      </div>
      <div className="footer-links">
        <p>&copy; 2025 Acaiaca. All rights reserved.</p>
        <p>Política de Privacidade</p>
        <p>Termos e Condições</p>
        <p>Política de Cookies</p>
      </div>
    </footer>
  );
};
export default Footer;
