import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  ButtonGroup,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

import ImageAgricultor from "../../assets/agricultor-forms.jpg";
import IconInfo from "../../assets/icons/info.png";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const AppCadastro = () => {
  const [value, setValue] = React.useState("agricultor");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { username, email, password, role } = data;
    const url = "http://localhost:3000/auth/register";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmpassword: password,
        role,
      }),
    };

    try {
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      if (!response.ok) {
        console.error("Server response:", responseData);
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
      } else if (role === "consumidor") {
        navigation("/HomeConsumidor");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setAlertMessage("Erro ao fazer login. Tente novamente.");
      setAlertType("error");
    }
  };
  return (
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
      boxSize={"100%"}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={{ base: "2rem", md: "0 25rem" }}
        boxSize={"100%"}
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
            gap: "3rem",
            width: "100%",
            height: "100%",
            padding: "2rem",
          }}
        >
          <Text as={"h1"} fontSize="2rem" color={"#ffffff"}>
            Cadastro
          </Text>
          <FormControl isInvalid={errors.username}>
            <FormLabel>Nome e Sobrenome</FormLabel>
            <Input
              type="text"
              placeholder="Digite seu nome e sobrenome"
              _placeholder={{ color: "#b0b0b0" }}
              border={"2px solid  #83a11d"}
              aria-required="true"
              width={"100%"}
              height={"4rem"}
              _focus={{
                borderColor: "#c0ab8e",
                boxShadow: "0 0 0 1px #e5d1b0",
              }}
              {...register("username", {
                required: "Seu nome e sobrenome é obrigatório",
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
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
            <InputGroup boxSize={"100%"}>
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
              <InputRightElement h={"100%"} width={"4.5rem"}>
                <Button
                  h="100%"
                  onClick={handleClick}
                  background="#83a11d"
                  boxSize={"100%"}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Confirmar senha</FormLabel>
            <InputGroup boxSize={"100%"}>
              <Input
                id="confirmPassword"
                type={show ? "text" : "password"}
                placeholder="Confirme sua senha"
                _placeholder={{ color: "#b0b0b0" }}
                border={"2px solid  #83a11d"}
                aria-required="true"
                width={"100%"}
                height={"4rem"}
                _focus={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 0 1px #e5d1b0",
                }}
                {...register("confirmPassword", {
                  required: "Confirmação de senha obrigatória",
                  validate: (value) =>
                    value === watch("password") || "As senhas não coincidem",
                })}
              />
              <InputRightElement h={"100%"} width={"4.5rem"}>
                <Button
                  h="100%"
                  onClick={handleClick}
                  background="#83a11d"
                  boxSize={"100%"}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
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
                  display="flex"
                  alignItems="center"
                  gap={"1rem"}
                  _checked={{
                    bg: "#83a11d",
                    borderColor: "#83a11d",
                    color: "white",
                  }}
                >
                  <Box display={"flex"} alignItems="center" gap={"1rem"}>
                    <Text fontSize={{ base: "1rem", md: "1.2rem" }}>
                      Agricultor
                    </Text>
                    <Popover>
                      <PopoverTrigger>
                        <Image
                          src={IconInfo}
                          alt="Ícone animado representando informação"
                          width={"1.5rem"}
                          height={"1.5rem"}
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Text color={"#000000"} fontSize={"1rem"}>
                            Agricultor é a pessoa que cultiva a terra e produz
                            alimentos, este perfil é voltado para quem deseja
                            vender seus produtos agrícolas.
                          </Text>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>
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
                  {" "}
                  <Box display={"flex"} alignItems="center" gap={"1rem"}>
                    <Text fontSize={{ base: "1rem", md: "1.2rem" }}>
                      Consumidor
                    </Text>
                    <Popover>
                      <PopoverTrigger>
                        <Image
                          src={IconInfo}
                          alt="Ícone animado representando informação"
                          width={"1.5rem"}
                          height={"1.5rem"}
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Text color={"#000000"} fontSize={"1rem"}>
                            Consumidor é a pessoa que compra produtos agrícolas,
                            este perfil é voltado para quem deseja comprar
                            produtos frescos e saudáveis.
                          </Text>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </Radio>
              </Stack>
            </RadioGroup>
            <FormErrorMessage>
              {errors.role && errors.role.message}
            </FormErrorMessage>
          </FormControl>
          <ButtonGroup w={"100%"} gap="1rem">
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
  );
};

export default AppCadastro;
