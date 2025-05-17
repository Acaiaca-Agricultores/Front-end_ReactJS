import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/AppHeader.jsx";
import Footer from "./components/footer/AppFooter.jsx";
import AppHome from "./components/landingpage/app.jsx";
import AppAbout from "./components/landingpage/AppAbout.jsx";
import AppButton from "./components/landingpage/AppButton.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/about" element={<AppAbout />} />
        </Routes>
        <AppButton />
      </BrowserRouter>
      <Footer />
    </ChakraProvider>
  </StrictMode>
);
