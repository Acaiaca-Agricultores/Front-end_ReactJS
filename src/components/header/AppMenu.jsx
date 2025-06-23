import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

const AppMenu = ({ setLastScrollY }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const isAuthPage = useMemo(
    () => ["/login", "/cadastro", "/404"].includes(location.pathname),
    [location.pathname]
  );
  const isSobre = location.pathname === "/sobre";

  const shouldRenderButtons = !isAuthPage && !isSobre && !isLoggedIn;

  const scrollTo = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (setLastScrollY) {
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setLastScrollY]);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        color={"white"}
        borderRadius={"none"}
        fontFamily={"Onest"}
        padding={"0.75rem 1.25rem"}
        background={"#83a11d"}
        _hover={{
          background: "#c0ab8e",
        }}
      >
        Menu
      </MenuButton>
      <MenuList zIndex={20}>
        {isLoggedIn && (
          <MenuItem
            onClick={() => navigate("/home")}
            _hover={{ textDecoration: "none", color: "#83a11d" }}
          >
            Home
          </MenuItem>
        )}
        {isLoggedIn && (
          <MenuItem
            onClick={() => navigate("/produto/cadastrar")}
            _hover={{ textDecoration: "none", color: "#83a11d" }}
          >
            Cadastrar Produto
          </MenuItem>
        )}
        <MenuItem
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" }) || navigate("/")
          }
          _hover={{ textDecoration: "none", color: "#83a11d" }}
        >
          Início
        </MenuItem>
        <MenuItem
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" }) || navigate("/login")
          }
          _hover={{ textDecoration: "none", color: "#83a11d" }}
        >
          Login
        </MenuItem>
        <MenuItem
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" }) || navigate("/cadastro")
          }
          _hover={{ textDecoration: "none", color: "#83a11d" }}
        >
          Cadastro
        </MenuItem>
        {shouldRenderButtons && (
          <>
            <MenuItem
              onClick={(e) => scrollTo(e, "apptecplat")}
              _hover={{ textDecoration: "none", color: "#83a11d" }}
            >
              Plataforma
            </MenuItem>
            <MenuItem
              onClick={(e) => scrollTo(e, "appsubs")}
              _hover={{ textDecoration: "none", color: "#83a11d" }}
            >
              Assinatura
            </MenuItem>
          </>
        )}
        <MenuItem
          onClick={() => navigate("/sobre")}
          _hover={{ textDecoration: "none", color: "#83a11d" }}
        >
          Sobre
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/perfil")}
          _hover={{ textDecoration: "none", color: "#83a11d" }}
        >
          Perfil
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/configurações")}
          _hover={{ textDecoration: "none", color: "#83a11d" }}
        >
          Configurações
        </MenuItem>
        {shouldRenderButtons && (
          <MenuItem
            onClick={(e) => scrollTo(e, "appforms")}
            _hover={{ textDecoration: "none", color: "#83a11d" }}
          >
            Fale Conosco
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default AppMenu;
