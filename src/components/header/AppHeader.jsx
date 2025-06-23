import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
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
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import LogoSrc from "../../assets/logo_semfundo.png";
import ImageAccountSrc from "../../assets/icons/user.svg";
import AppMenu from "./AppMenu";
import "./style-header.css";

const PATHS = {
  HOME: "/home",
  LOGIN: "/login",
  CADASTRO: "/cadastro",
  NOT_FOUND: "/404",
  SOBRE: "/sobre",
  CONFIGURACOES: "/configurações",
  PERFIL: "/perfil",
  ROOT: "/",
  CADASTRO_PRODUTO: "/cadastro/produto",
};

const AUTH_PAGES = [PATHS.LOGIN, PATHS.CADASTRO, PATHS.NOT_FOUND];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isOnRootPage = useMemo(
    () => location.pathname === PATHS.ROOT,
    [location.pathname]
  );

  const [lastScrollY, setLastScrollY] = useState(0);
  const [showTokenExpiryAlert, setShowTokenExpiryAlert] = useState(false);

  const isLoggedIn = useMemo(() => Boolean(localStorage.getItem("token")), []);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const scrollThreshold = useMemo(() => {
    const currentPath = location.pathname;
    if (currentPath === PATHS.HOME) {
      return 100;
    }
    if (currentPath === PATHS.ROOT) {
      return isMobile ? 300 : 600;
    }
    return 50;
  }, [location.pathname, isMobile]);

  const isCurrentPage = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );
  const isAuthPage = AUTH_PAGES.includes(location.pathname);
  const isOnSobrePage = isCurrentPage(PATHS.SOBRE);
  const isOnConfigPage = isCurrentPage(PATHS.CONFIGURACOES);

  const shouldRenderLandingPageNav =
    !isAuthPage && !isOnSobrePage && !isOnConfigPage && isOnRootPage;

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpireTime");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    navigate(PATHS.ROOT);
    window.location.reload();
  }, [navigate]);

  const handleScroll = useCallback(() => {
    setLastScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setLastScrollY(window.scrollY);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    let alertTimeoutId;
    const checkTokenExpiration = () => {
      const tokenExpireTime = localStorage.getItem("tokenExpireTime");
      if (tokenExpireTime && Date.now() > parseInt(tokenExpireTime, 10)) {
        setShowTokenExpiryAlert(true);
        if (alertTimeoutId) clearTimeout(alertTimeoutId);
        alertTimeoutId = setTimeout(() => {
          setShowTokenExpiryAlert(false);
          handleLogout();
        }, 5000);
      }
    };
    const intervalId = setInterval(checkTokenExpiration, 1000 * 60);
    checkTokenExpiration();
    return () => {
      clearInterval(intervalId);
      if (alertTimeoutId) clearTimeout(alertTimeoutId);
    };
  }, [handleLogout]);

  useEffect(() => {
    if (
      isLoggedIn &&
      (location.pathname === PATHS.LOGIN ||
        location.pathname === PATHS.CADASTRO)
    ) {
      window.location.href = PATHS.HOME;
      setTimeout(() => window.location.reload(), 100);
    }
  }, [isLoggedIn, location.pathname]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const headerBgColor = useMemo(() => {
    if (location.pathname === "/esqueci-senha") {
      return "rgba(82, 96, 26, 0.8)";
    }
    if (isOnRootPage) {
      return lastScrollY < scrollThreshold
        ? "transparent"
        : "rgba(82, 96, 26, 0.8)";
    } else {
      if (lastScrollY > scrollThreshold) return "rgba(82, 96, 26, 0.80);";
      if (lastScrollY > 0 && lastScrollY <= scrollThreshold) {
        return `rgba(82, 96, 26, ${0.95 * (lastScrollY / scrollThreshold)})`;
      }
      return "transparent";
    }
  }, [isOnRootPage, lastScrollY, scrollThreshold, location.pathname]);

  const desktopLogoEffectiveOpacity = useMemo(() => {
    if (isOnRootPage) {
      return lastScrollY >= 100 ? 1 : 0;
    }
    return 1;
  }, [isOnRootPage, lastScrollY]);

  const navLinkStyles = {
    variant: "link",
    color: "white",
    fontSize: { base: "0.8rem", md: "1.1rem" },
    _hover: { color: "#c0ab8e", textDecoration: "none" },
    fontFamily: "Onest, sans-serif",
  };

  const menuCommonItemStyles = {
    background: "transparent",
    _hover: { bg: "rgba(255, 255, 255, 0.1)" },
    _focus: { bg: "rgba(255, 255, 255, 0.1)", boxShadow: "none" },
    borderRadius: "md",
    px: "0.8rem",
    py: "0.6rem",
    fontFamily: "Onest, sans-serif",
  };

  return (
    <Box
      as="header"
      padding={{ base: "0.5rem 1rem", md: "0.5rem 2rem" }}
      bg={headerBgColor}
      position="fixed"
      top="0"
      left="0"
      right="0"
      width="100%"
      zIndex="1000"
      transition="background 0.3s ease-in-out"
    >
      {showTokenExpiryAlert && (
        <Box
          position="fixed"
          top={{ base: "60px", md: "80px" }}
          left="50%"
          transform="translateX(-50%)"
          bg="orange.400"
          color="white"
          p={3}
          borderRadius="md"
          boxShadow="lg"
          zIndex="1001"
        >
          <Text>Sua sessão expirou. Você será desconectado em breve.</Text>
        </Box>
      )}

      <Flex
        justify="space-between"
        align="center"
        wrap="nowrap"
        maxW="container.xl"
        mx="auto"
      >
        <Flex
          width="100%"
          display={{ base: "flex", md: "none" }}
          align="center"
          justify="space-between"
        >
          <Link
            as={RouterLink}
            to={PATHS.ROOT}
            aria-label="Página Inicial"
            opacity={
              isOnRootPage && isMobile ? (lastScrollY >= 100 ? 1 : 0) : 1
            }
            transition={
              isOnRootPage && isMobile ? "opacity 0.3s ease-in-out" : "none"
            }
          >
            <Image src={LogoSrc} alt="Logo" w={{ base: "7rem", sm: "9rem" }} />
          </Link>
          <AppMenu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        </Flex>
        <Link
          as={RouterLink}
          to={PATHS.ROOT}
          aria-label="Página Inicial"
          display={{ base: "none", md: "block" }}
          opacity={desktopLogoEffectiveOpacity}
          transition={
            isOnRootPage && !isMobile ? "opacity 0.3s ease-in-out" : "none"
          }
        >
          <Image src={LogoSrc} alt="Logo" w="10rem" padding="0.5rem 0" />
        </Link>
        <Flex
          as="nav"
          display={{ base: "none", md: "flex" }}
          align="center"
          gap={{ md: "1.5rem", lg: "2rem" }}
        >
          {isLoggedIn && (
            <>
              <Link as={RouterLink} to={PATHS.HOME} {...navLinkStyles}>
                Home
              </Link>
            </>
          )}
          <Link
            as={RouterLink}
            to={PATHS.ROOT}
            {...navLinkStyles}
            onClick={(e) => {
              if (isCurrentPage(PATHS.ROOT)) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            Início
          </Link>

          {shouldRenderLandingPageNav && (
            <>
              <Link
                onClick={(e) => scrollToSection(e, "apptecplat")}
                {...navLinkStyles}
              >
                Plataforma
              </Link>
              <Link
                onClick={(e) => scrollToSection(e, "appsubs")}
                {...navLinkStyles}
              >
                Assinatura
              </Link>
            </>
          )}

          <Link as={RouterLink} to={PATHS.SOBRE} {...navLinkStyles}>
            Sobre
          </Link>

          {shouldRenderLandingPageNav && (
            <Link
              onClick={(e) => scrollToSection(e, "appforms")}
              {...navLinkStyles}
            >
              Fale Conosco
            </Link>
          )}
        </Flex>
        <Box display={{ base: "none", md: "block" }}>
          {isLoggedIn ? (
            <Menu placement="bottom-end">
              <MenuButton
                as={Button}
                variant="unstyled"
                p={0}
                h="auto"
                borderRadius="full"
                _focus={{ boxShadow: "outline" }}
                aria-label="User menu"
              >
                <Image
                  src={ImageAccountSrc}
                  alt="User Account"
                  boxSize="2.5rem"
                  borderRadius="full"
                  objectFit="cover"
                  border="2px solid transparent"
                  _hover={{ opacity: 0.85 }}
                />
              </MenuButton>
              <MenuList
                background="rgba(82, 96, 26, 0.8)"
                backdropFilter="blur(8px)"
                color="white"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="lg"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
                p="0.5rem"
                minW="180px"
              >
                <MenuItem
                  as={RouterLink}
                  to={PATHS.PERFIL}
                  {...menuCommonItemStyles}
                  aria-label="Perfil"
                >
                  Perfil
                </MenuItem>
                <Divider borderColor="rgba(255, 255, 255, 0.2)" my="0.3rem" />
                <MenuItem
                  as={RouterLink}
                  to={PATHS.CONFIGURACOES}
                  {...menuCommonItemStyles}
                  aria-label="Configurações"
                >
                  Configurações
                </MenuItem>
                <Divider borderColor="rgba(255, 255, 255, 0.2)" my="0.3rem" />
                <MenuItem
                  onClick={handleLogout}
                  {...menuCommonItemStyles}
                  _hover={{
                    ...menuCommonItemStyles._hover,
                    bg: "rgba(255, 100, 100, 0.15)",
                    color: "#FFDDDD",
                  }}
                  aria-label="Sair"
                >
                  Sair
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              onClick={() =>
                navigate(
                  isCurrentPage(PATHS.LOGIN) ? PATHS.CADASTRO : PATHS.LOGIN
                )
              }
              w="12rem"
              color="#52601a"
              bg="white"
              borderRadius="8px"
              fontFamily="Onest, sans-serif"
              p="0.75rem 1.5rem"
              fontSize="1rem"
              _hover={{ bg: "#e0d6c7", color: "#404b14" }}
            >
              {isCurrentPage(PATHS.LOGIN) ? "Cadastre-se" : "Login"}
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
