import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import LandingPageApp from "../pages/landingpage/app.jsx";
import AppAbout from "../pages/landingpage/AppAbout.jsx";
import AppLogin from "../pages/login/AppLogin.jsx";
import AppHome from "../pages/home/AppHome.jsx";
import AppPage404 from "../pages/pagina 404/AppPage404.jsx";
import AppCadastro from "../pages/cadastro/AppCadastro.jsx";
import AppConfig from "../pages/configuração/AppConfig.jsx";
import AppPerfil from "../pages/perfil/AppPerfil.jsx";
import AppSenha from "../pages/configuração/AppSenha.jsx";

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
