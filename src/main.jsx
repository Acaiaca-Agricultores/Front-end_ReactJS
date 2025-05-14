import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import App from "./components/landingpage/app.jsx";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <Header />
      <App />
      <Footer />
    </ChakraProvider>
  </StrictMode>
);
