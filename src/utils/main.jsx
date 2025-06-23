import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, useLocation } from "react-router-dom";
import VLibras from "@djpfs/react-vlibras";
import ScrollToTop from "./ScrollToTop.jsx";

import Header from "../components/header/AppHeader.jsx";
import Footer from "../components/footer/AppFooter.jsx";
import AppRouters from "./routers.jsx";
import AppButton from "../pages/landingpage/AppButton.jsx";
import AppChat from "../components/chat/AppChat.jsx";
import AppAccessibility from "../components/accessibility/AppAccessibility.jsx";
import "../styles/accessibility.css";

function App() {
  const location = useLocation();

  return (
    <>
      <AppChat />
      <AppAccessibility />
      {location.pathname !== "/404" && <Header display="flex" />}
      <AppRouters />
      <AppButton />
      {location.pathname !== "/login" &&
        location.pathname !== "/404" &&
        location.pathname !== "/cadastro" && <Footer display="flex" />}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <VLibras />
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
