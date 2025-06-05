import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import LandingPageApp from "./components/landingpage/app.jsx";
import AppAbout from "./components/landingpage/AppAbout.jsx";
import AppLogin from "./components/login/AppLogin.jsx";
import AppHome from "./components/home/AppHome.jsx";
import AppPage404 from "./components/pagina 404/AppPage404.jsx";
import AppCadastro from "./components/cadastro/AppCadastro.jsx";
import AppConfig from "./components/configuração/AppConfig.jsx";
import AppPerfil from "./components/perfil/AppPerfil.jsx";
import AppSenha from "./components/configuração/AppSenha.jsx";

const AppRouters = () => {
  return (
    <Routes>
      <Route path="/home" element={<AppHome />} />
      <Route path="/perfil" element={<AppPerfil />} />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/404" element={<AppPage404 />} />
      <Route path="/" element={<LandingPageApp />} />
      <Route path="/sobre" element={<AppAbout />} />
      <Route path="/login" element={<AppLogin />} />
      <Route path="/cadastro" element={<AppCadastro />} />
      <Route path="/configurações" element={<AppConfig />} />
      <Route path="/esqueci-senha" element={<AppSenha />} />
    </Routes>
  );
};

export default AppRouters;
