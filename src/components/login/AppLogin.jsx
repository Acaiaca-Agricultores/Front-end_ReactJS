import "../../global-styles.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Box,
  Text,
  Button,
  Input,
  ButtonGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Link,
} from "@chakra-ui/react";

import ImageAgricultor from "../../assets/agricultor-forms.jpg";

const AppLogin = () => {
  const navigation = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const url = "http://localhost:3000/auth/login";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();
      const token = responseData.token;
      localStorage.setItem("token", token);

      navigation("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setAlertMessage("Erro ao fazer login. Tente novamente.");
      setAlertType("error");
    }
  };

  return (
    <>
      <Box
        id="appforms"
        as="section"
        role="region"
        aria-label="Formulário de contato"
        backgroundImage={`url(${ImageAgricultor})`}
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
          gap="2rem"
          width={"100vw"}
          height={"100vh"}
          background="rgba(0, 0, 0, 0.6)"
          backdropFilter="blur(8px)"
          color={"white"}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            role="form"
            aria-label="Formulário de login"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              width: "100%",
              padding: "2rem",
            }}
          >
            <Text as={"h1"} fontSize="2rem" color={"#ffffff"}>
              Login
            </Text>
            <FormControl isInvalid={errors.email} mb={4}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                _placeholder={{ color: "#b0b0b0" }}
                border={"2px solid  #83a11d"}
                aria-required="true"
                autoComplete="email"
                boxSize={"100%"}
                _focus={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 0 1px #e5d1b0",
                }}
                {...register("email", {
                  required: "Email obrigatório",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email inválido",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} mb={4}>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                _placeholder={{ color: "#b0b0b0" }}
                border={"2px solid  #83a11d"}
                aria-required="true"
                autoComplete="email"
                boxSize={"100%"}
                _focus={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 0 1px #e5d1b0",
                }}
                {...register("password", {
                  required: "Senha obrigatória",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Box display={"flex"} justifyContent={"space-around"} w={"100%"}>
              <Link>Cadastre-se</Link>
              <Link>Esqueceu a senha?</Link>
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
                Login
              </Button>
            </ButtonGroup>
          </form>
          {alertMessage && (
            <Alert
              status={alertType}
              position="absolute"
              top="12vh"
              left="50%"
              transform="translateX(-50%)"
              zIndex="999"
              width="80%"
              maxWidth="400px"
              color={"black"}
            >
              <AlertIcon />
              {alertMessage}
            </Alert>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AppLogin;
