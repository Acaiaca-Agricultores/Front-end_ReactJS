import React from "react";
import "./style-footer.css";
import packageJson from "../../../package.json";

import { Divider, Box, Flex, Image, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" background="#839e6b" color="white" padding="2rem">
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        gap={{base: "3rem", md: "10rem"}}
        maxWidth="1200px"
        margin="0 auto"
      >
        <Box>
          <Image
            src="/src/assets/logo_semfundo.png"
            alt="Logo"
            margin="0 auto"
          />
        </Box>

        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          gap="1.5rem"
        >
          <Link href="https://github.com/Acaiaca-Agricultores" display="flex" alignItems="center" gap="0.5rem">
            <Image
              src="/src/assets/icons/github60.svg"
              alt="Github"
              boxSize="30px"
            />
            <Text>Github</Text>
          </Link>
          <Link href="https://www.instagram.com/acaiaca.plataforma/" display="flex" alignItems="center" gap="0.5rem">
            <Image
              src="/src/assets/icons/instagram50.svg"
              alt="Instagram"
              boxSize="30px"
            />
            <Text>Instagram</Text>
          </Link>
          <Link href="#" display="flex" alignItems="center" gap="0.5rem">
            <Image
              src="/src/assets/icons/linkedin50.svg"
              alt="LinkedIn"
              boxSize="30px"
            />
            <Text>LinkedIn</Text>
          </Link>
        </Flex>
      </Flex>

      <Divider marginY="1.5rem" borderColor="whiteAlpha.600" />

      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        textAlign={{ base: "center", md: "left" }}
        gap="1rem"
        fontSize="0.9rem"
      >
        <Text>&copy; 2025 Acaiaca. All rights reserved.</Text>
        <Flex gap="1rem" direction={{ base: "column", md: "row" }}>
          <Link href="#">Política de Privacidade</Link>
          <Link href="#">Termos e Condições</Link>
          <Link href="#">Política de Cookies</Link>
        </Flex>
      </Flex>
       <pre>{`v${packageJson.version}`}</pre>
    </Box>
  );
};

export default Footer;
