import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Flex, Image } from "@chakra-ui/react";
import {} from "@chakra-ui/react";
import Logo from "../../assets/logo_semfundo.png";
import AppMenu from "./AppMenu";

import "./style-header.css";
import "../../global-styles.css";

const handleSmoothScroll = (e, id) => {
  e.preventDefault();
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowHeader(true);
        setLastScrollY(window.scrollY);
        return;
      }
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const shouldRenderButtons =
    location.pathname !== "/about" && location.pathname !== "/login";

  return (
    <Box
      as="header"
      padding="0 1rem"
      role="banner"
      background={
        location.pathname === "/about" || location.pathname === "/login"
          ? lastScrollY < 50
            ? "#52601a"
            : "rgba(82, 96, 26, 0.8)"
          : !showHeader
          ? "rgba(82, 96, 26, 0.8)"
          : lastScrollY < 50
          ? { base: "#52601a", md: "transparent" }
          : "rgba(82, 96, 26, 0.8)"
      }
      display="block"
      position={
        location.pathname === "/login"
          ? "relative"
          : { base: "relative", md: "fixed" }
      }
      top={location.pathname === "/login" ? "0" : showHeader ? "0" : "-100%"}
      left="0"
      width="100%"
      zIndex="1000"
      transition="top 0.3s, background 0.3s"
    >
      <Flex
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
        margin="auto"
      >
        <Image
          src={Logo}
          alt="Logo da Plataforma Açaíaca"
          width={{ base: "10rem", md: "14rem" }}
          role="img"
          aria-label="Logo da Plataforma Açaíaca"
        />
        <Box display={{ base: "block", md: "none" }}>
          <AppMenu aria-label="Abrir menu de navegação" />
        </Box>
        <Flex
          as="nav"
          aria-label="Navegação principal"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap="2rem"
          fontSize={{ base: "0.8rem", md: "1.2rem" }}
          color="#ffffff"
          role="navigation"
        >
          <Button
            variant="link"
            color="inherit"
            onClick={() => navigate("/")}
            aria-current={location.pathname === "/" ? "page" : undefined}
            _hover={{
              color:
                location.pathname === "/about" || location.pathname === "/login"
                  ? "#e5d1b0"
                  : "#83a11d",
            }}
          >
            Início
          </Button>
          {shouldRenderButtons && (
            <>
              <Button
                variant="link"
                color="inherit"
                onClick={(e) => handleSmoothScroll(e, "apptecplat")}
                aria-label="Ir para Plataforma"
                _hover={{ color: "#83a11d" }}
              >
                Plataforma
              </Button>
              <Button
                variant="link"
                color="inherit"
                onClick={(e) => handleSmoothScroll(e, "appsubs")}
                aria-label="Ir para Assinatura"
                _hover={{ color: "#83a11d" }}
              >
                Assinatura
              </Button>
            </>
          )}
          <Button
            variant="link"
            color="inherit"
            onClick={() => navigate("/about")}
            aria-label="Sobre"
            _hover={{
              color:
                location.pathname === "/about" || location.pathname === "/login"
                  ? "#e5d1b0"
                  : "#83a11d",
            }}
          >
            Sobre
          </Button>
          {shouldRenderButtons && (
            <Button
              variant="link"
              color="inherit"
              onClick={(e) => handleSmoothScroll(e, "appforms")}
              aria-label="Fale Conosco"
              _hover={{ color: "#83a11d" }}
            >
              Fale Conosco
            </Button>
          )}
        </Flex>
        <Box display={{ base: "none", md: "block" }}>
          <Button
            onClick={() => navigate("/login")}
            width={"13rem"}
            color="#52601a"
            background="#ffffff"
            borderRadius="10px"
            fontFamily="Onest"
            padding="1.5rem"
            _hover={{
              background: "#c0ab8e",
              color: "#ffffff",
            }}
            aria-label="Fazer login"
          >
            Login
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
