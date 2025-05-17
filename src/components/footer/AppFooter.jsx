import packageJson from "../../../package.json";
import Logo from "../../assets/logo_semfundo.png";
import GithubIcon from "../../assets/icons/github.svg";
import InstagramIcon from "../../assets/icons/instagram.svg";
import LinkedInIcon from "../../assets/icons/linkedin.svg";

import { Divider, Box, Flex, Image, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      aria-label="Rodapé da página"
      background="#52601a"
      color="white"
      padding="2rem"
      display={{ base: "block", md: "flex" }}
      flexDirection="column"
      justifyContent={"space-between"}
      alignItems="center"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        gap={{ base: "3rem", md: "10rem" }}
        maxWidth="1200px"
        margin="0 auto"
      >
        <Box>
          <Image src={Logo} alt="Logo da Plataforma Acaiaca" margin="0 auto" />
        </Box>

        <Flex
          as="nav"
          aria-label="Redes sociais"
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          gap="1.5rem"
        >
          <Link
            href="https://github.com/Acaiaca-Agricultores"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            _hover={{ textDecoration: "none", color: "#c0ab8e" }}
            aria-label="Acesse nosso Github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={GithubIcon} alt="Ícone do Github" boxSize="40px" />
            <Text>Github</Text>
          </Link>
          <Link
            href="https://www.instagram.com/acaiaca.plataforma/"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            _hover={{ textDecoration: "none", color: "#c0ab8e" }}
            aria-label="Acesse nosso Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={InstagramIcon}
              alt="Ícone do Instagram"
              boxSize="40px"
            />
            <Text>Instagram</Text>
          </Link>
          <Link
            href="#"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            _hover={{ textDecoration: "none", color: "#c0ab8e" }}
            aria-label="Acesse nosso LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={LinkedInIcon} alt="Ícone do LinkedIn" boxSize="40px" />
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
        <Text>&copy; 2025 Acaiaca. Todos os direitos reservados.</Text>
        <Flex gap="1rem" direction={{ base: "column", md: "row" }}>
          <Link href="#" aria-label="Política de Privacidade">
            Política de Privacidade
          </Link>
          <Link href="#" aria-label="Termos e Condições">
            Termos e Condições
          </Link>
          <Link href="#" aria-label="Política de Cookies">
            Política de Cookies
          </Link>
        </Flex>
      </Flex>
      <pre aria-label="Versão do sistema">{`v${packageJson.version}`}</pre>
    </Box>
  );
};

export default Footer;
