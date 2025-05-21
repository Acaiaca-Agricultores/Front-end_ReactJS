import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const handleSmoothScroll = (e, id) => {
  e.preventDefault();
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const AppMenu = ({ setLastScrollY }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
      <MenuList>
        <MenuItem
          as="a"
          onClick={() => navigate("/")}
          _hover={{
            textDecoration: "none",
            color: location.pathname === "/sobre" ? "#e5d1b0" : "#83a11d",
          }}
        >
          Inicio
        </MenuItem>
        {location.pathname !== "/login" && location.pathname !== "/sobre" && (
          <>
            <MenuItem
              onClick={() => navigate("/login")}
              _hover={{ textDecoration: "none", color: "#83a11d" }}
            >
              login
            </MenuItem>
            <MenuItem
              onClick={(e) => handleSmoothScroll(e, "apptecplat")}
              _hover={{ textDecoration: "none", color: "#83a11d" }}
            >
              Plataforma
            </MenuItem>
            <MenuItem
              onClick={(e) => handleSmoothScroll(e, "appsubs")}
              _hover={{ textDecoration: "none", color: "#83a11d" }}
            >
              Assinatura
            </MenuItem>
            <MenuItem
              as="a"
              onClick={() => navigate("/sobre")}
              _hover={{ textDecoration: "none", color: "#83a11d" }}
            >
              Sobre
            </MenuItem>
            <MenuItem
              onClick={(e) => handleSmoothScroll(e, "appforms")}
              _hover={{ textDecoration: "none", color: "#83a11d" }}
            >
              Fale Conosco
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default AppMenu;
