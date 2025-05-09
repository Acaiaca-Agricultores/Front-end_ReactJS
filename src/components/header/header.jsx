import React from "react";
import { Button, Box, Flex, Image } from "@chakra-ui/react";
import Logo from "../../assets/logo_semfundo.png";
import AppMenu from "./AppMenu";

import "./style-header.css";
import "../../global-styles.css";

const Header = () => {
  return (
    <Box as="header" padding="1rem" background="#839e6b" display={"block"}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        margin="0 auto"
      >
        <Image src={Logo} alt="Logo" />
        <Box display={{ base: "block", md: "none" }}>
          <AppMenu />
        </Box>
        <Flex
          as="nav"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap="1.5rem"
          fontSize={{ base: "0.8rem", md: "1rem" }}
          color={"#ffffff"}
          >
          <a href="#home">
            <p>Inicio</p>
          </a>
          <a href="#about">
            <p>Sobre</p>
          </a>
          <a href="#menu">
            <p>Plataforma</p>
          </a>
        </Flex>

        <Box display={{ base: "none", md: "block" }}>
          <Button
            color="white"
            background="#52601A"
            borderRadius="none"
            fontFamily="Onest"
            padding="0.75rem 1.25rem"
            _hover={{
              background: "#c0ab8e",
            }}
          >
            Login / Registrar
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
