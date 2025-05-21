import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Flex, Image } from "@chakra-ui/react";
import Logo from "../../assets/favicon.ico";
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

  const shouldRenderButtons = location.pathname !== "/login" && location.pathname !== "/404" && location.pathname !== "/cadastro";

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      as="header"
      padding={
        location.pathname === "/sobre" || location.pathname === "/login" || location.pathname === "/cadastro"
          ? "0px 2rem"
          : lastScrollY > 100
          ? "0px 2rem"
          : "1.3rem"
      }
      role="banner"
      background={
        location.pathname === "/sobre" && lastScrollY > 50
          ? "rgba(82, 96, 26, 0.8)"
          : location.pathname === "/sobre"
          ? "#52601a"
          : lastScrollY < 50
          ? { base: "#52601a", md: "transparent" }
          : "rgba(82, 96, 26, 0.8)"
      }
      display="block"
      position={{ base: "relative", md: "fixed" }}
      width="100%"
      zIndex="1000"
      transition="background 1s"
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
          width="7rem"
          padding={"0.5rem"}
          role="img"
          aria-label="Logo da Plataforma Açaíaca"
          display={
            ["/sobre", "/404", "/login", "/cadastro"].includes(
              location.pathname
            ) || lastScrollY > 100
              ? "block"
              : "none"
          }
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
            onClick={() => navigate("/") || backToTop()}
            aria-label="Ir para a página inicial"
            aria-current={location.pathname === "/" ? "page" : undefined}
            _hover={{
              color: ["/login", "/sobre", "/404"].includes(location.pathname)
                ? "#e5d1b0"
                : "#83a11d",
            }}
          >
            Início
          </Button>
          {location.pathname !== "/sobre" && shouldRenderButtons && (
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
            onClick={() => navigate("/sobre")}
            aria-label="Sobre"
            _hover={{
              color: ["/login", "/sobre", "/404"].includes(location.pathname)
                ? "#e5d1b0"
                : "#83a11d",
            }}
          >
            Sobre
          </Button>
          {location.pathname !== "/sobre" && shouldRenderButtons && (
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
            onClick={() =>
              location.pathname === "/login"
                ? navigate("/cadastro")
                : navigate("/login")
            }
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
            aria-label={
              location.pathname === "/login" ? "Fazer cadastro" : "Fazer login"
            }
          >
            {location.pathname === "/login" ? "Cadastre-se" : "Login"}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
