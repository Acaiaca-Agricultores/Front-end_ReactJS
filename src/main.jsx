import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/header/AppHeader.jsx";
import Footer from "./components/footer/AppFooter.jsx";
import LandingPageApp from "./components/landingpage/app.jsx";
import AppAbout from "./components/landingpage/AppAbout.jsx";
import AppButton from "./components/landingpage/AppButton.jsx";
import { AppLogin } from "./components/login/AppLogin.jsx";
import AppHome from "./components/home/AppHome.jsx";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPageApp />} />
        <Route path="/about" element={<AppAbout />} />
        <Route path="/login" element={<AppLogin />} />
        <Route path="/home" element={<AppHome />} />
      </Routes>
      <AppButton />
      {location.pathname !== "/login" && <Footer display="flex" />}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
