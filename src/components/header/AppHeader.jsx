import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Flex,
  Image,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Divider,
} from "@chakra-ui/react";
import Logo from "../../assets/logo_semfundo.png";
import ImageAccount from "../../assets/icons/user.svg";
import AppMenu from "./AppMenu";
import "./style-header.css";
import "../../global-styles.css";

const scroll = () =>
  window.innerWidth < 768 ? 300 : location.pathname === "/home" ? 100 : 600;

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();
  const navigation = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const isAuthPage = useMemo(
    () => ["/login", "/cadastro", "/404"].includes(location.pathname),
    [location.pathname]
  );
  const isSobre = location.pathname === "/sobre";

  const shouldRenderButtons =
    !isAuthPage && !isSobre && location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpireTime");
    navigation("/");
  };

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

  useEffect(() => {
    const checkTokenExpiration = () => {
      const tokenExpireTime = localStorage.getItem("tokenExpireTime");
      if (tokenExpireTime && Date.now() > parseInt(tokenExpireTime, 10)) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpireTime");
          navigation("/");
        }, 5000);
      }
    };

    const interval = setInterval(checkTokenExpiration, 1000 * 60);
    return () => clearInterval(interval);
  }, [navigation]);

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
          width="100%"
          display={{ base: "flex", md: "none" }}
          align="center"
          justify="space-between"
        >
          <Image src={Logo} alt="Logo" w="9rem" padding="0.5rem" />
          <AppMenu />
        </Flex>
        <Image
          src={Logo}
          alt="Logo"
          w="10rem"
          opacity={
            location.pathname === "/home" ||
            isSobre ||
            isAuthPage ||
            lastScrollY > scroll()
              ? 1
              : 0
          }
          transition="opacity 0.5s"
          padding="0.5rem"
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
          {isLoggedIn && (
            <Button
              variant="link"
              color="inherit"
              onClick={() => navigation("/home")}
              _hover={{ color: "#83a11d" }}
            >
              Home
            </Button>
          )}
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
          {!isLoggedIn && location.pathname !== "/home" && !isAuthPage && (
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
          )}
          <Menu>
            {isLoggedIn && (
              <>
                <MenuButton
                  as={Button}
                  variant="link"
                  color="inherit"
                  p={0}
                  borderRadius="full"
                  _focus={{ boxShadow: "none" }}
                  _hover={{ opacity: 0.9 }}
                  aria-label="User menu"
                >
                  <Image
                    src={ImageAccount}
                    alt="User Account"
                    w="2.5rem"
                    h="2.5rem"
                    borderRadius="full"
                    objectFit="cover"
                  />
                </MenuButton>
                <MenuList
                  background="rgba(137, 134, 134, 0.2)"
                  backdropFilter="blur(10px)"
                  color="#FFFFFF"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  borderRadius="lg"
                  fontFamily="Onest"
                  boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
                  p="0.5rem"
                  minW="180px"
                >
                  <MenuItem
                    background="transparent"
                    _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                    _focus={{
                      bg: "rgba(255, 255, 255, 0.08)",
                      boxShadow: "none",
                    }}
                    borderRadius="md"
                    px="0.8rem"
                    py="0.6rem"
                    aria-label="Configurações"
                  >
                    Configurações
                  </MenuItem>
                  <Divider borderColor="rgba(255, 255, 255, 0.2)" my="0.5rem" />
                  <MenuItem
                    background="transparent"
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.08)",
                      color: "#FFDDDD",
                    }}
                    _focus={{
                      bg: "rgba(255, 255, 255, 0.08)",
                      boxShadow: "none",
                    }}
                    borderRadius="md"
                    px="0.8rem"
                    py="0.6rem"
                    onClick={handleLogout}
                    aria-label="Sair"
                  >
                    Sair
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
