import React from "react";
import "./style.css";

import { Divider } from "@chakra-ui/react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/src/assets/logo_semfundo.png" alt="Logo" />
        </div>
        <div className="footer-social-media">
          <a href="#">
            <img src="/src/assets/icons/github60.svg" alt="Github" />
            <p>Github</p>
          </a>
          <a href="#">
            <img src="/src/assets/icons/instagram50.svg" alt="instagram" />
            <p>Instagram</p>
          </a>
          <a href="#">
            <img src="/src/assets/icons/linkedin50.svg" alt="LinkedIn" />
            <p>LinkedIn</p>
          </a>
        </div>
      </div>
      <Divider />
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
