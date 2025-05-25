import React from "react";
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
  InputRightElement,
  InputGroup,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
// import VLibras from "@djpfs/react-vlibras";

import ImageAgricultor from "../../assets/agricultor-forms.jpg";
import IconHidden from "../../assets/icons/hidden.svg";
import IconVisible from "../../assets/icons/show.png";

const AppLogin = () => {
  const [value, setValue] = React.useState("agricultor");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigation = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, role } = data;
    if (role === "consumidor" && value === "agricultor") {
      setAlertMessage(
        "Você selecionou o perfil errado. Por favor, escolha 'Agricultor'."
      );
      setAlertType("error");
      return;
    }

    if (role === "agricultor" && value === "consumidor") {
      setAlertMessage(
        "Você selecionou o perfil errado. Por favor, escolha 'Consumidor'."
      );
      setAlertType("error");
      return;
    }
    const url = "http://localhost:3000/auth/login";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    };

    try {
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(
          `Erro: ${response.status} - ${
            responseData.message || response.statusText
          }`
        );
      }
      const token = responseData.token;
      localStorage.setItem("token", token);
      if (role === "agricultor") {
        navigation("/HomeAgricultor");
      }
      if (role === "consumidor") {
        navigation("/HomeConsumidor");
      }
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
        objectFit="cover"
        backgroundPosition="center"
        width="100vw"
        height="100vh"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding={{ base: "2rem", md: "0 20rem" }}
          width={"100%"}
          height={"100%"}
          background="rgba(0, 0, 0, 0.6)"
          backdropFilter="blur(8px)"
          color={"white"}
          paddingTop="6rem !important"
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
              height: "100%",
            }}
          >
            <Text as={"h1"} fontSize="2rem" color={"#ffffff"}>
              Login
            </Text>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                _placeholder={{ color: "#b0b0b0" }}
                border={"2px solid  #83a11d"}
                aria-required="true"
                autoComplete="email"
                width={"100%"}
                height={"4rem"}
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
            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  placeholder="Digite sua senha"
                  _placeholder={{ color: "#b0b0b0" }}
                  border={"2px solid  #83a11d"}
                  aria-required="true"
                  autoComplete="email"
                  width={"100%"}
                  height={"4rem"}
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
                <InputRightElement height={"4rem"} width={"4.5rem"}>
                  <Button
                    h="100%"
                    onClick={handleClick}
                    background="transparent"
                    boxSize={"100%"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{
                      background: "transparent",
                    }}
                  >
                    <img
                      src={show ? IconVisible : IconHidden}
                      alt={show ? "Mostrar senha" : "Ocultar senha"}
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.role}>
              <FormLabel htmlFor="role">Tipo de usuário</FormLabel>
              <RadioGroup
                {...register("role", {
                  required: "Selecione o tipo de usuário",
                })}
                onChange={(val) => setValue(val)}
                value={value}
              >
                <Stack
                  direction="row"
                  spacing={5}
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"space-around"}
                >
                  <Radio
                    value="agricultor"
                    _checked={{
                      bg: "#83a11d",
                      borderColor: "#83a11d",
                      color: "white",
                    }}
                  >
                    <Text fontSize={{ base: "1rem", md: "1.2rem" }}>
                      Agricultor
                    </Text>
                  </Radio>
                  <Radio
                    fontSize={{ base: "1rem", md: "1.2rem" }}
                    value="consumidor"
                    _checked={{
                      bg: "#83a11d",
                      borderColor: "#83a11d",
                      color: "white",
                    }}
                  >
                    <Text fontSize={{ base: "1rem", md: "1.2rem" }}>
                      Consumidor
                    </Text>
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {errors.role && errors.role.message}
              </FormErrorMessage>
            </FormControl>
            <ButtonGroup w={"100%"} gap="1rem" alignItems={"center"}>
              <Link _hover={{ color: "#c0ab8e" }} fontSize="1rem" width={"30%"}>
                Esqueceu a senha?
              </Link>
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
                Entrar
              </Button>
            </ButtonGroup>
          </form>
          {alertMessage && (
            <Alert
              status={alertType}
              position="absolute"
              top="0vh"
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
