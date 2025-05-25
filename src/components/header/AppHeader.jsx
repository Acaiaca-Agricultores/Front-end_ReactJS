import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Flex, Image } from "@chakra-ui/react";
import Logo from "../../assets/logo_semfundo.png";
import AppMenu from "./AppMenu";
import "./style-header.css";
import "../../global-styles.css";

const scroll = () => (window.innerWidth < 768 ? 300 : 600);

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigation = useNavigate();

  const isAuthPage = useMemo(
    () => ["/login", "/cadastro", "/404"].includes(location.pathname),
    [location.pathname]
  );
  const isSobre = location.pathname === "/sobre";
  const shouldRenderButtons = !isAuthPage && !isSobre;

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const threshold = scroll();
    setShowHeader(scrollY < threshold || scrollY < lastScrollY);
    setLastScrollY(scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const bgColor =
    lastScrollY === 0
      ? "transparent"
      : lastScrollY < scroll()
      ? "transparent"
      : "rgba(82, 96, 26, 0.8)";

  return (
    <Box
      as="header"
      padding={{ base: "1rem", md: "0 2rem" }}
      background={bgColor}
      position={{ base: "absolute", md: "fixed" }}
      width="100%"
      zIndex="10"
      transition="background 1s"
    >
      <Flex justify="space-between" align="center" wrap="wrap" px="1rem">
        <Flex
          w="100%"
          display={{ base: "flex", md: "none" }}
          align="center"
          justify="space-between"
        >
          <Image src={Logo} alt="Logo" w="9rem" p="0.5rem" />
          <AppMenu />
        </Flex>
        <Image
          src={Logo}
          alt="Logo"
          w="10rem"
          opacity={isSobre || isAuthPage || lastScrollY > scroll() ? 1 : 0}
          transition="opacity 0.5s"
          p="0.5rem"
          display={{ base: "none", md: "block" }}
        />
        <Flex
          as="nav"
          display={{ base: "none", md: "flex" }}
          align="center"
          gap="2rem"
          fontSize={{ base: "0.8rem", md: "1.2rem" }}
          color="#fff"
        >
          <Button
            variant="link"
            color="inherit"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" }) || navigation("/")
            }
            _hover={{ color: "#83a11d" }}
          >
            Início
          </Button>

          {shouldRenderButtons && (
            <>
              <Button
                variant="link"
                color="inherit"
                onClick={(e) => scrollTo(e, "apptecplat")}
                _hover={{ color: "#83a11d" }}
              >
                Plataforma
              </Button>
              <Button
                variant="link"
                color="inherit"
                onClick={(e) => scrollTo(e, "appsubs")}
                _hover={{ color: "#83a11d" }}
              >
                Assinatura
              </Button>
            </>
          )}

          <Button
            variant="link"
            color="inherit"
            onClick={() => navigation("/sobre")}
            _hover={{ color: "#83a11d" }}
          >
            Sobre
          </Button>

          {shouldRenderButtons && (
            <Button
              variant="link"
              color="inherit"
              onClick={(e) => scrollTo(e, "appforms")}
              _hover={{ color: "#83a11d" }}
            >
              Fale Conosco
            </Button>
          )}
        </Flex>

        <Box display={{ base: "none", md: "block" }}>
          <Button
            onClick={() =>
              navigation(
                location.pathname === "/login" ? "/cadastro" : "/login"
              )
            }
            w="13rem"
            color="#52601a"
            bg="#fff"
            borderRadius="10px"
            fontFamily="Onest"
            p="1.5rem"
            _hover={{ bg: "#c0ab8e", color: "#fff" }}
          >
            {location.pathname === "/login" ? "Cadastre-se" : "Login"}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
