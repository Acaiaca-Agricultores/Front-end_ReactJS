import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Center } from "@chakra-ui/react";

import AppLoading from "./components/loading/AppLoading.jsx";
import LandingPageApp from "./components/landingpage/app.jsx";
import AppAbout from "./components/landingpage/AppAbout.jsx";
import AppLogin from "./components/login/AppLogin.jsx";
import AppHome from "./components/home/AppHome.jsx";
import AppPage404 from "./components/pagina 404/AppPage404.jsx";
import AppCadastro from "./components/cadastro/AppCadastro.jsx";
import AppConfig from "./components/configuração/AppConfig.jsx";
import AppPerfil from "./components/perfil/AppPerfil.jsx";

const AppRouters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/home"
        element={
          isLoading ? (
            <Center height="100vh">
              <AppLoading />
            </Center>
          ) : (
            <AppHome />
          )
        }
      />
      <Route
        path="/perfil"
        element={
          isLoading ? (
            <Center height="100vh">
              <AppLoading />
            </Center>
          ) : (
            <AppPerfil />
          )
        }
      />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/404" element={<AppPage404 />} />
      <Route path="/" element={<LandingPageApp />} />
      <Route path="/sobre" element={<AppAbout />} />
      <Route path="/login" element={<AppLogin />} />
      <Route path="/cadastro" element={<AppCadastro />} />
      <Route path="/configurações" element={<AppConfig />} />
    </Routes>
  );
};

export default AppRouters;
