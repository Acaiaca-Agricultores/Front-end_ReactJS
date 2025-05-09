import React from "react";
import { Button } from "@chakra-ui/react";
import Logo from "../../assets/logo_semfundo.png";

import "./style.css";
import "../../global-styles.css";

const Header = () => {
  return (
    <header>
      <img src={Logo} alt="" />
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#home">
              <p>Inicio</p>
            </a>
          </li>
          <li>
            <a href="#about">
              <p>Sobre</p>
            </a>
          </li>
          <li>
            <a href="#menu">
              <p>Plataforma</p>
            </a>
          </li>
        </ul>
      </nav>
      <div className="button-group">
        <Button
          color={"white"}
          background={"#52601A"}
          borderRadius={"none"}
          fontFamily={"Onest"}
          padding={"0.75rem 1.25rem"}
          _hover={{
            background: "#c0ab8e",
          }}
        >
          Login / Registrar
        </Button>
      </div>
    </header>
  );
};
export default Header;
