import {
  Box,
  FormControl,
  FormLabel,
  Image,
  Input,
  Link,
  Text,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

import CenouraImg from "../../assets/cenoura.jpg";
import { useNavigate } from "react-router-dom";

function AppCadastro() {
  const navigation = useNavigate();
  return (
    <Box
      id="appforms"
      as="section"
      role="region"
      aria-label="Formulário de contato"
      backgroundImage={`url(${CenouraImg})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      objectFit={"cover"}
      backgroundPosition="center"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width="100vw"
      height="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={{ base: "2rem", md: "0 25rem" }}
        width={"100vw"}
        height={"100vh"}
        background="rgba(0, 0, 0, 0.6)"
        backdropFilter="blur(8px)"
        color={"white"}
      >
        <form
          role="form"
          aria-label="Formulário de login"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem",
            width: "100%",
            height: "100%",
            padding: "2rem",
          }}
        >
          <Text as={"h1"} fontSize="2rem" color={"#ffffff"}>
            Cadastro
          </Text>
          
            <FormControl>
              <FormLabel>Nome e Sobrenome</FormLabel>
              <Input
                type="text"
                placeholder="Digite seu nome e sobrenome"
                _placeholder={{ color: "#b0b0b0" }}
                border={"2px solid  #83a11d"}
                aria-required="true"
                boxSize={"100%"}
                _focus={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 0 1px #e5d1b0",
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                _placeholder={{ color: "#b0b0b0" }}
                border={"2px solid  #83a11d"}
                aria-required="true"
                autoComplete="email"
                boxSize={"100%"}
                _focus={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 0 1px #e5d1b0",
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                placeholder="Digite sua senha"
                _placeholder={{ color: "#b0b0b0" }}
                border={"2px solid  #83a11d"}
                aria-required="true"
                autoComplete="password"
                boxSize={"100%"}
                _focus={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 0 1px #e5d1b0",
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Confirmar Senha</FormLabel>
              <Input
                type="password"
                placeholder="Confirme sua senha"
                _placeholder={{ color: "#b0b0b0" }}
                border={"2px solid  #83a11d"}
                aria-required="true"
                autoComplete="password"
                boxSize={"100%"}
                _focus={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 0 1px #e5d1b0",
                }}
              />
            </FormControl>
          

          <Box
            display={"flex"}
            flexDirection={{ base: "column", md: "row" }}
            alignItems={"center"}
            justifyContent={"space-around"}
            w={"100%"}
            paddingTop={"1.5rem"}
          >
            <Text>
              {" "}
              Você ja tem uma conta?{" "}
              <Link _hover={{ color: "#52601A" }} href="/login">Fazer login</Link>
            </Text>
          </Box>

          <ButtonGroup w={"100%"} gap="1rem">
            <Button
              onClick={() => navigation("/")}
              w={"100%"}
              color="#c0ab8e"
              background="transparent"
              border={"1px solid #c0ab8e"}
              borderRadius="10px"
              fontFamily="Onest"
              padding="1.5rem"
              _hover={{
                background: "#c0ab8e",
                color: "#ffffff",
              }}
              aria-label="Fazer login"
            >
              Voltar
            </Button>
            <Button
              type="submit"
              w={"100%"}
              color="#ffffff"
              background="#52601A"
              borderRadius="10px"
              fontFamily="Onest"
              padding="1.5rem"
              _hover={{
                background: "#c0ab8e",
                color: "#ffffff",
              }}
              aria-label="Fazer login"
              isLoading={false}
              loadingText="Fazendo login..."
              spinnerPlacement="end"
            >
              Cadastre-se
            </Button>
          </ButtonGroup>
        </form>
      </Box>
    </Box>
  );
}

export default AppCadastro;
