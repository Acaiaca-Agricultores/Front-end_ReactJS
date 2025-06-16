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
      bg="#52601a"
      color="#ffffff"
      paddingY={{ base: "1.5rem", md: "1rem" }}
      paddingX={{ base: "1rem", md: "2rem" }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        maxWidth="1200px"
        margin="0 auto"
        pb="1.5rem"
        gap={{ base: "1.5rem", md: "1rem" }}
      >
        <Box width={{ base: "100px", md: "150px" }}>
          <Image
            src={Logo}
            alt="Logo da Plataforma Acaiaca"
            width="100%"
            height="auto"
          />
        </Box>

        <Flex
          as="nav"
          aria-label="Redes sociais"
          alignItems="center"
          gap={{ base: "1rem", md: "1.5rem" }}
        >
          <Link
            href="https://github.com/Acaiaca-Agricultores"
            display="flex"
            alignItems="center"
            gap="0.3rem"
            _hover={{ textDecoration: "none", color: "#c0ab8e" }}
            aria-label="Acesse nosso Github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={GithubIcon} alt="Ícone do Github" boxSize="30px" />
            <Text fontSize="sm">Github</Text>
          </Link>
          <Link
            href="https://www.instagram.com/acaiaca.plataforma/"
            display="flex"
            alignItems="center"
            gap="0.3rem"
            _hover={{ textDecoration: "none", color: "#c0ab8e" }}
            aria-label="Acesse nosso Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={InstagramIcon}
              alt="Ícone do Instagram"
              boxSize="30px"
            />
            <Text fontSize="sm">Instagram</Text>
          </Link>
          <Link
            href="https://www.linkedin.com/company/acaiac%C3%A1/"
            display="flex"
            alignItems="center"
            gap="0.3rem"
            _hover={{ textDecoration: "none", color: "#c0ab8e" }}
            aria-label="Acesse nosso LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={LinkedInIcon} alt="Ícone do LinkedIn" boxSize="30px" />
            <Text fontSize="sm">LinkedIn</Text>
          </Link>
        </Flex>
      </Flex>

      <Divider borderColor="whiteAlpha.400" marginY="1rem" />

      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        textAlign={{ base: "center", md: "left" }}
        gap="0.75rem"
        fontSize="xs"
        maxWidth="1200px"
        margin="0 auto"
      >
        <Text>
          &copy; {new Date().getFullYear()} Acaiaca. Todos os direitos
          reservados.
        </Text>
        <Flex
          gap="1rem"
          direction={{ base: "column", md: "row" }}
          textAlign="center"
        >
          <Link
            href="#"
            aria-label="Política de Privacidade"
            _hover={{ color: "#c0ab8e" }}
          >
            Política de Privacidade
          </Link>
          <Link
            href="#"
            aria-label="Termos e Condições"
            _hover={{ color: "#c0ab8e" }}
          >
            Termos e Condições
          </Link>
          <Link
            href="#"
            aria-label="Política de Cookies"
            _hover={{ color: "#c0ab8e" }}
          >
            Política de Cookies
          </Link>
        </Flex>
      </Flex>
      <Flex justifyContent="center" mt="0.75rem">
        <Text
          fontSize="xx-small"
          color="gray.500"
          aria-label={`Versão do sistema ${packageJson.version}`}
        >
          v{packageJson.version}
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
