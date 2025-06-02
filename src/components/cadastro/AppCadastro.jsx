import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
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
  SimpleGrid,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import ImageAgricultor from "../../assets/agricultor-forms.jpg";
import IconInfo from "../../assets/icons/info.png";
import IconHidden from "../../assets/icons/hidden.svg";
import IconVisible from "../../assets/icons/show.png";
import AppStepper, { steps, useAppStepperControls } from "./AppStepper";
import axios from "axios";

const AppCadastro = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigation = useNavigate();
  const toast = useToast();

  const { activeStep, goToNext, goToPrevious } = useAppStepperControls();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      role: "agricultor",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      propertyName: "",
      state: "",
      city: "",
      phone: "",
    },
    mode: "onTouched",
  });

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (activeStep === 0) {
      fieldsToValidate = ["username", "email", "password", "confirmPassword"];
    } else if (activeStep === 1) {
      fieldsToValidate = ["propertyName", "state", "city", "phone"];
    }

    if (fieldsToValidate.length > 0) {
      const result = await trigger(fieldsToValidate);
      if (!result) {
        toast({
          title: "Erro de validação",
          description: "Por favor, preencha todos os campos obrigatórios.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }
    goToNext();
  };

  const onSubmit = async (data) => {
    const {
      username,
      email,
      password,
      confirmPassword,
      role,
      propertyName,
      state,
      city,
      phone,
    } = data;

    const url = import.meta.env.VITE_REGISTER_API_URL;

    const payload = {
      username,
      email,
      password,
      confirmpassword: confirmPassword,
      role,
      propertyName,
      state,
      city,
      phoneNumber: phone,
    };

    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const responseData = response.data;
      const { token, name, id } = responseData;
      localStorage.setItem("token", token);
      localStorage.setItem("userName", name || username);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userId", id);

      toast({
        title: "Cadastro realizado!",
        description: "Seu cadastro foi realizado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      if (role === "agricultor") {
        navigation("/perfil");
      } else if (role === "consumidor") {
        navigation("/perfil");
      }
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
      toast({
        title: "Erro no cadastro",
        description:
          error.response?.data?.msg ||
          JSON.stringify(error.response?.data) ||
          error.message ||
          "Erro ao fazer cadastro. Tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "agricultor") {
        toast({
          title: "Bem-vindo!",
          description: "Você já está logado.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigation("/perfil");
      } else if (userRole === "consumidor") {
        toast({
          title: "Bem-vindo!",
          description: "Você já está logado.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigation("/perfil");
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Não foi possível identificar seu tipo de usuário.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigation("/");
      }
    }
  }, [navigation, toast]);

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
      width="100%"
      height={{ base: "100vh", md: "100%" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        boxSize={"100%"}
        background="rgba(0, 0, 0, 0.6)"
        backdropFilter="blur(8px)"
        color={"white"}
        paddingTop="6rem !important"
      >
        <Text as={"h1"} fontSize="2rem" color={"#ffffff"}>
          Cadastro
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={10}
          width="100%"
          height={{ base: "none", md: "100vh" }}
          padding={{ base: "2rem", md: "5rem 20rem 5rem 20rem" }}
        >
          <AppStepper activeStep={activeStep} steps={steps} />

          <form
            onSubmit={handleSubmit(onSubmit)}
            role="form"
            aria-label="Formulário de cadastro"
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
            {activeStep === 0 && (
              <>
                <FormControl isInvalid={errors.username}>
                  <FormLabel>Nome e Sobrenome</FormLabel>
                  <Input
                    type="text"
                    placeholder="Digite seu nome e sobrenome"
                    _placeholder={{ color: "#b0b0b0" }}
                    border={"2px solid  #83a11d"}
                    aria-required="true"
                    width={"100%"}
                    height={"3rem"}
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
                    height={"3rem"}
                    _focus={{
                      borderColor: "#c0ab8e",
                      boxShadow: "0 0 0 1px #e5d1b0",
                    }}
                    {...register("email", {
                      required: "Email obrigatório",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                      autoComplete="new-password"
                      width={"100%"}
                      height={"3rem"}
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
                          alt={show ? "Ocultar senha" : "Mostrar senha"}
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.confirmPassword}>
                  <FormLabel htmlFor="confirmPassword">
                    Confirmar senha
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id="confirmPassword"
                      type={show ? "text" : "password"}
                      placeholder="Confirme sua senha"
                      _placeholder={{ color: "#b0b0b0" }}
                      border={"2px solid  #83a11d"}
                      aria-required="true"
                      width={"100%"}
                      height={"3rem"}
                      _focus={{
                        borderColor: "#c0ab8e",
                        boxShadow: "0 0 0 1px #e5d1b0",
                      }}
                      {...register("confirmPassword", {
                        required: "Confirmação de senha obrigatória",
                        validate: (value) =>
                          value === watch("password") ||
                          "As senhas não coincidem",
                      })}
                    />
                    <InputRightElement h={"100%"} width={"4.5rem"}>
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
                          alt={show ? "Ocultar senha" : "Mostrar senha"}
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </FormErrorMessage>
                </FormControl>
              </>
            )}

            {activeStep === 1 && (
              <>
                <FormControl isInvalid={errors.propertyName}>
                  <FormLabel>Nome da Propriedade</FormLabel>
                  <Input
                    type="text"
                    placeholder="Digite o nome da sua propriedade"
                    _placeholder={{ color: "#b0b0b0" }}
                    border={"2px solid  #83a11d"}
                    aria-required="true"
                    width={"100%"}
                    height={"3rem"}
                    _focus={{
                      borderColor: "#c0ab8e",
                      boxShadow: "0 0 0 1px #e5d1b0",
                    }}
                    {...register("propertyName", {
                      required: "Nome da propriedade é obrigatório",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.propertyName && errors.propertyName.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.state}>
                  <FormLabel>Estado</FormLabel>
                  <Input
                    type="text"
                    placeholder="Digite seu estado"
                    _placeholder={{ color: "#b0b0b0" }}
                    border={"2px solid  #83a11d"}
                    aria-required="true"
                    width={"100%"}
                    height={"3rem"}
                    _focus={{
                      borderColor: "#c0ab8e",
                      boxShadow: "0 0 0 1px #e5d1b0",
                    }}
                    {...register("state", {
                      required: "Estado é obrigatório",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.state && errors.state.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.city}>
                  <FormLabel>Cidade</FormLabel>
                  <Input
                    type="text"
                    placeholder="Digite sua cidade"
                    _placeholder={{ color: "#b0b0b0" }}
                    border={"2px solid  #83a11d"}
                    aria-required="true"
                    width={"100%"}
                    height={"3rem"}
                    _focus={{
                      borderColor: "#c0ab8e",
                      boxShadow: "0 0 0 1px #e5d1b0",
                    }}
                    {...register("city", {
                      required: "Cidade é obrigatória",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.city && errors.city.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.phone}>
                  <FormLabel>Telefone</FormLabel>
                  <Input
                    type="tel"
                    placeholder="Ex: (XX) XXXXX-XXXX"
                    _placeholder={{ color: "#b0b0b0" }}
                    border={"2px solid  #83a11d"}
                    aria-required="true"
                    width={"100%"}
                    height={"3rem"}
                    _focus={{
                      borderColor: "#c0ab8e",
                      boxShadow: "0 0 0 1px #e5d1b0",
                    }}
                    {...register("phone", {
                      required: "Telefone é obrigatório",
                      pattern: {
                        value: /^\(\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
                        message:
                          "Formato de telefone inválido. Use (XX) XXXXX-XXXX ou (XX) XXXX-XXXX",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.phone && errors.phone.message}
                  </FormErrorMessage>
                </FormControl>
              </>
            )}

            {activeStep === 2 && (
              <FormControl isInvalid={errors.role}>
                <FormLabel htmlFor="role">Tipo de usuário</FormLabel>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Selecione o tipo de usuário" }}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <Stack
                        direction="column"
                        spacing={5}
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
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
                          <Box
                            display={"flex"}
                            alignItems="center"
                            gap={"1rem"}
                          >
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
                                    Agricultor é a pessoa que cultiva a terra e
                                    produz alimentos, este perfil é voltado para
                                    quem deseja vender seus produtos agrícolas.
                                  </Text>
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Box>
                        </Radio>
                        <Radio
                          value="consumidor"
                          _checked={{
                            bg: "#83a11d",
                            borderColor: "#83a11d",
                            color: "white",
                          }}
                        >
                          <Box
                            display={"flex"}
                            alignItems="center"
                            gap={"1rem"}
                          >
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
                                    Consumidor é a pessoa que compra produtos
                                    agrícolas, este perfil é voltado para quem
                                    deseja comprar produtos frescos e saudáveis.
                                  </Text>
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Box>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  )}
                />
                <FormErrorMessage>
                  {errors.role && errors.role.message}
                </FormErrorMessage>
              </FormControl>
            )}

            <ButtonGroup w={"100%"} gap="1rem">
              {activeStep > 0 && (
                <Button
                  onClick={goToPrevious}
                  w={"100%"}
                  color="#ffffff"
                  background="#A0A0A0"
                  borderRadius="10px"
                  fontFamily="Onest"
                  padding="1.5rem"
                  _hover={{
                    background: "#808080",
                    color: "#ffffff",
                  }}
                >
                  Anterior
                </Button>
              )}
              {activeStep < steps.length - 1 && (
                <Button
                  onClick={handleNext}
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
                >
                  Próximo
                </Button>
              )}
              {activeStep === steps.length - 1 && (
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
                  aria-label="Fazer cadastro"
                  isLoading={false}
                  loadingText="Fazendo cadastro..."
                  spinnerPlacement="end"
                >
                  Cadastre-se
                </Button>
              )}
            </ButtonGroup>
          </form>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default AppCadastro;
