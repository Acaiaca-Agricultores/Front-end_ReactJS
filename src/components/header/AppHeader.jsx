import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Box,
  Flex,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
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

  return (
    <Box
      as="header"
      padding="0 1rem"
      role="banner"
      background={
        location.pathname === "/about"
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
      position={{ base: "relative", md: "fixed" }}
      top={{ base: "0", md: showHeader ? "0" : "-100px" }}
      left="0"
      width="100vw"
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
          gap="6.25rem"
          fontSize={{ base: "0.8rem", md: "1.2rem" }}
          color={"#ffffff"}
          role="navigation"
        >
          <Breadcrumb separator="" aria-label="Breadcrumb">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                aria-current={location.pathname === "/" ? "page" : undefined}
                _hover={{
                  textDecoration: "none",
                  color: location.pathname === "/about" ? "#e5d1b0" : "#83a11d",
                }}
              >
                Inicio
              </BreadcrumbLink>
            </BreadcrumbItem>
            {location.pathname !== "/about" && (
              <>
                <Breadcrumb separator="">
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      _hover={{ textDecoration: "none", color: "#83a11d" }}
                      onClick={(e) => handleSmoothScroll(e, "apptecplat")}
                      aria-label="Ir para Plataforma"
                    >
                      Plataforma
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      _hover={{ textDecoration: "none", color: "#83a11d" }}
                      onClick={(e) => handleSmoothScroll(e, "appsubs")}
                      aria-label="Ir para Assinatura"
                    >
                      Assinatura
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/about"
                      aria-current={
                        location.pathname === "/about" ? "page" : undefined
                      }
                      _hover={{ textDecoration: "none", color: "#83a11d" }}
                      aria-label="Sobre"
                    >
                      Sobre
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/#appforms"
                      _hover={{ textDecoration: "none", color: "#83a11d" }}
                      onClick={(e) => handleSmoothScroll(e, "appforms")}
                      aria-label="Fale Conosco"
                    >
                      Fale Conosco
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </>
            )}
          </Breadcrumb>
        </Flex>
        <Box display={{ base: "none", md: "block" }}>
          <Button
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
