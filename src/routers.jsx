import { Routes, Route, Navigate } from "react-router-dom";

import LandingPageApp from "./components/landingpage/app.jsx";
import AppAbout from "./components/landingpage/AppAbout.jsx";
import AppLogin from "./components/login/AppLogin.jsx";
import AppHome from "./components/home/AppHome.jsx";
import AppPage404 from "./components/pagina 404/AppPage404.jsx";

const AppRouters = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/404" element={<AppPage404 />} />
      <Route path="/" element={<LandingPageApp />} />
      <Route path="/about" element={<AppAbout />} />
      <Route path="/login" element={<AppLogin />} />
      <Route path="/home" element={<AppHome />} />
    </Routes>
  );
};

export default AppRouters;
