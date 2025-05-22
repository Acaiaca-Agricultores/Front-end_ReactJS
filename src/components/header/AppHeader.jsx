import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Flex, Image } from "@chakra-ui/react";
import Logo from "../../assets/logo_semfundo.png";
import AppMenu from "./AppMenu";

import "./style-header.css";
import "../../global-styles.css";

const SCROLL_THRESHOLD = 50;

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

  const isAuthPage = useMemo(
    () => ["/login", "/cadastro", "/404"].includes(location.pathname),
    [location.pathname]
  );

  const isSobre = location.pathname === "/sobre";

  const shouldRenderButtons = !isAuthPage && !isSobre;

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < SCROLL_THRESHOLD) {
      setShowHeader(true);
    } else {
      setShowHeader(currentScrollY < lastScrollY);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const goTo = (path) => navigate(path);

  const headerPadding =
    isSobre || isAuthPage || lastScrollY > 100 ? "0px 2rem" : "1.3rem";

  const backgroundColor = isSobre
    ? lastScrollY > SCROLL_THRESHOLD
      ? "rgba(82, 96, 26, 0.8)"
      : "#52601a"
    : lastScrollY < SCROLL_THRESHOLD
    ? { base: "#52601a", md: "transparent" }
    : "rgba(82, 96, 26, 0.8)";

  return (
    <Box
      as="header"
      padding={headerPadding}
      background={backgroundColor}
      position={{ base: "relative", md: "fixed" }}
      width="100%"
      zIndex="10"
      transition="background 1s"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        px="1rem"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          display={{ base: "flex", md: "none" }}
        >
          <Image
            src={Logo}
            alt="Logo da Plataforma Açaíaca"
            width="9rem"
            role="img"
            aria-label="Logo da Plataforma Açaíaca"
          />
          <AppMenu aria-label="Abrir menu de navegação" />
        </Flex>

        <Image
          src={Logo}
          alt="Logo da Plataforma Açaíaca"
          width="12rem"
          role="img"
          aria-label="Logo da Plataforma Açaíaca"
          display={{
            base: "none",
            md: isSobre || isAuthPage || lastScrollY > 100 ? "block" : "none",
          }}
        />

        <Flex
          as="nav"
          aria-label="Navegação principal"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap="2rem"
          fontSize={{ base: "0.8rem", md: "1.2rem" }}
          color="#ffffff"
        >
          <Button
            variant="link"
            color="inherit"
            onClick={() => goTo("/")}
            aria-current={location.pathname === "/" ? "page" : undefined}
            aria-label="Ir para a página inicial"
            _hover={{
              color: isSobre || isAuthPage ? "#e5d1b0" : "#83a11d",
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
            onClick={() => goTo("/sobre")}
            aria-label="Sobre"
            _hover={{
              color: isSobre || isAuthPage ? "#e5d1b0" : "#83a11d",
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
            onClick={() =>
              location.pathname === "/login"
                ? goTo("/cadastro")
                : goTo("/login")
            }
            width="13rem"
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
