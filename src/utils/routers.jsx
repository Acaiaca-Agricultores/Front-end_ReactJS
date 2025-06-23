import { Routes, Route, Navigate } from "react-router-dom";

import LandingPageApp from "../pages/landingpage/app.jsx";
import AppAbout from "../pages/landingpage/AppAbout.jsx";
import AppLogin from "../pages/login/AppLogin.jsx";
import AppHome from "../pages/home/AppHome.jsx";
import AppPage404 from "../pages/pagina 404/AppPage404.jsx";
import AppCadastro from "../pages/cadastro/AppCadastro.jsx";
import AppConfig from "../pages/configuração/AppConfig.jsx";
import AppPerfil from "../pages/perfil/AppPerfil.jsx";
import AppSenha from "../pages/configuração/AppSenha.jsx";
import AppCadastroProduto from "../pages/cadastro/AppProduto.jsx";
import AppProduto from "../pages/produto/AppProduto.jsx";
import AppPagamento from "../pages/pagamento/AppPagamento.jsx";
import AppSubsPagamento from "../pages/pagamento/AppSubsPagamento.jsx";

const AppRouters = () => {
  return (
    <Routes>
      <Route path="/home" element={<AppHome />} />
      <Route path="/perfil" element={<AppPerfil />} />
      <Route path="/perfil/:id" element={<AppPerfil />} />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/404" element={<AppPage404 />} />
      <Route path="/" element={<LandingPageApp />} />
      <Route path="/sobre" element={<AppAbout />} />
      <Route path="/login" element={<AppLogin />} />
      <Route path="/cadastro" element={<AppCadastro />} />
      <Route path="/configurações" element={<AppConfig />} />
      <Route path="/esqueci-senha" element={<AppSenha />} />
      <Route path="/cadastro/produto" element={<AppCadastroProduto />} />
      <Route path="/produto/:id" element={<AppProduto />} />
      <Route path="/assinatura" element={<AppSubsPagamento />} />
      <Route path="/pagamento" element={<AppPagamento />} />
    </Routes>
  );
};

export default AppRouters;
