import React, { useEffect } from "react";
import "../../global-styles.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Button,
  Input,
  ButtonGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link,
  InputRightElement,
  InputGroup,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";

import ImageAgricultor from "../../assets/agricultor-forms.jpg";
import IconHidden from "../../assets/icons/hidden.svg";
import IconVisible from "../../assets/icons/show.png";

const AppLogin = () => {
  const toast = useToast();
  const [value, setValue] = React.useState("agricultor");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => setShow(!show);
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "agricultor") {
        navigation("/Home");
      } else if (userRole === "consumidor") {
        navigation("/Home");
      }
    }
  }, [navigation]);

  const onSubmit = async (data) => {
    const { email, password, role } = data;
    setIsLoading(true);

    if (role === "consumidor" && value === "agricultor") {
      toast({
        title: "Erro",
        description:
          "Você selecionou o perfil errado. Por favor, escolha 'Agricultor'.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    if (role === "agricultor" && value === "consumidor") {
      toast({
        title: "Erro",
        description:
          "Você selecionou o perfil errado. Por favor, escolha 'Consumidor'.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    const url = import.meta.env.VITE_LOGIN_API_URL;

    try {
      const response = await axios.post(
        url,
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;
      const token = responseData.token;
      const userName = responseData.username || "Usuário";
      const userId =
        responseData.user?.id ||
        responseData.id ||
        responseData._id ||
        responseData.userId;

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", userName);
      if (userId) {
        localStorage.setItem("userId", userId);
      }

      toast({
        title: "Sucesso",
        description: "Login realizado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      if (role === "agricultor") {
        navigation("/perfil");
      }
      if (role === "consumidor") {
        navigation("/Home");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      let errorMessage =
        "Erro ao tentar fazer login. Tente novamente mais tarde.";
      if (error.response) {
        errorMessage = `Erro: ${error.response.status} - ${
          error.response.data?.message ||
          error.response.data?.msg ||
          error.response.statusText ||
          "Erro desconhecido da API"
        }`;
      } else if (error.request) {
        errorMessage =
          "Não foi possível conectar ao servidor. Verifique sua conexão.";
      }

      toast({
        title: "Erro",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
                isLoading={isLoading}
                loadingText="Fazendo login..."
                spinnerPlacement="end"
              >
                Entrar
              </Button>
            </ButtonGroup>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AppLogin;
