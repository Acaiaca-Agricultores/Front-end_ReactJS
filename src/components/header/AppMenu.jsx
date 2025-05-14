import React from "react";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const AppMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        color={"white"}
        borderRadius={"none"}
        fontFamily={"Onest"}
        padding={"0.75rem 1.25rem"}
        _hover={{
          background: "#c0ab8e",
        }}
      >
        Menu
      </MenuButton>
      <MenuList>
        <MenuItem>Login / Cadastro</MenuItem>
        <MenuItem>Inicio</MenuItem>
        <MenuItem>Sobre</MenuItem>
        <MenuItem>Plataforma</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AppMenu;
