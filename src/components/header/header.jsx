import React from "react";
import "./style.css";

const Header = () => {
  return (
    <header>
      <img src="/src/assets/logo_semfundo.png" alt="" />
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#home">Inicio</a>
          </li>
          <li>
            <a href="#about">Sobre</a>
          </li>
          <li>
            <a href="#menu">Plataforma</a>
          </li>
        </ul>
      </nav>
      <div className="button-group">
        <button>Login/Cadastro</button>
      </div>
    </header>
  );
};
export default Header;
