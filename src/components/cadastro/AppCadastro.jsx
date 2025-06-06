import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import ImageAgricultor from "../../assets/agricultor-forms.jpg";
import IconInfo from "../../assets/icons/info.png";
import AppStepper, { steps, useAppStepperControls } from "./AppStepper";
import AppSelect from "../configuração/AppSelect";
import axios from "axios";

const AppCadastro = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { activeStep, goToNext, goToPrevious } = useAppStepperControls();
  const [selectedEstado, setSelectedEstado] = useState("");
  const [selectedCidade, setSelectedCidade] = useState("");

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

  const toast = useToast();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigation = useNavigate();

  const formatPhone = (value) => {
    if (!value) return value;
    value = value.replace(/\D/g, "");
    if (value.length <= 10) {
      return value
        .replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
        .replace(/-$/, "");
    } else {
      return value
        .replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3")
        .replace(/-$/, "");
    }
  };

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
    setIsSubmitting(true);
    const {
      username,
      email,
      password,
      confirmPassword,
      role,
      propertyName,
      phone,
    } = data;

    if (!selectedEstado || !selectedCidade) {
      toast({
        title: "Erro de validação",
        description: "Selecione um estado e uma cidade.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    const payload = {
      username,
      email,
      password,
      confirmpassword: confirmPassword,
      role,
      propertyName,
      state: selectedEstado,
      city: selectedCidade,
      phoneNumber: phone,
    };
    Object.keys(payload).forEach(
      (key) =>
        (payload[key] === undefined || payload[key] === "") &&
        delete payload[key]
    );
    console.log(payload)

    try {
      const response = await axios.post(API_URL + "auth/register", payload, {
        headers: { "Content-Type": "application/json" },
      });

      const responseData = response.data;
      const { token, username: name, id } = responseData;
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
        window.location.reload();
      } else if (role === "consumidor") {
        navigation("/home");
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
      if (error.response && error.response.data) {
        console.log("Erro detalhado do backend:", error.response.data);
        let msg =
          error.response.data.msg ||
          error.message ||
          "Erro ao fazer cadastro. Tente novamente.";
        const detalhes = Object.entries(error.response.data)
          .filter(([k]) => k !== "msg")
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");
        if (detalhes) msg += "\n" + detalhes;
        toast({
          title: "Erro no cadastro",
          description: msg,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Erro no cadastro",
          description:
            error.message || "Erro ao fazer cadastro. Tente novamente.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setIsSubmitting(false);
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
                      type={showCurrent ? "text" : "password"}
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
                        validate: (value) =>
                          /[A-Z]/.test(value) ||
                          ("A senha deve conter pelo menos uma letra maiúscula" &&
                            /[a-z]/.test(value)) ||
                          ("A senha deve conter pelo menos uma letra minúscula" &&
                            /[^A-Za-z0-9]/.test(value)) ||
                          "A senha deve conter pelo menos um caractere especial",
                      })}
                    />
                    <InputRightElement h={"100%"} width={"4.5rem"}>
                      <Button
                        variant="ghost"
                        _hover={{ background: "transparent" }}
                        onClick={() => setShowCurrent((v) => !v)}
                      >
                        {showCurrent ? (
                          <ViewOffIcon color={"#83a11d"} />
                        ) : (
                          <ViewIcon color={"#83a11d"} />
                        )}
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
                      type={showConfirm ? "text" : "password"}
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
                        minLength: {
                          value: 6,
                          message: "A senha deve ter pelo menos 6 caracteres",
                        },
                        validate: (value) => {
                          if (value !== watch("password")) {
                            return "As senhas não coincidem";
                          }
                          if (!/[A-Z]/.test(value)) {
                            return "A senha deve conter pelo menos uma letra maiúscula";
                          }
                          if (!/[a-z]/.test(value)) {
                            return "A senha deve conter pelo menos uma letra minúscula";
                          }
                          if (!/[^A-Za-z0-9]/.test(value)) {
                            return "A senha deve conter pelo menos um caractere especial";
                          }
                          return true;
                        },
                      })}
                    />
                    <InputRightElement h={"100%"} width={"4.5rem"}>
                      <Button
                        variant="ghost"
                        _hover={{ background: "transparent" }}
                        onClick={() => setShowConfirm((v) => !v)}
                      >
                        {showConfirm ? (
                          <ViewOffIcon color={"#83a11d"} />
                        ) : (
                          <ViewIcon color={"#83a11d"} />
                        )}
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
                <AppSelect
                  selectedEstado={selectedEstado}
                  setSelectedEstado={setSelectedEstado}
                  selectedCidade={selectedCidade}
                  setSelectedCidade={setSelectedCidade}
                  toast={toast}
                />
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
                        value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
                        message:
                          "Formato de telefone inválido. Use (XX) XXXXX-XXXX ou (XX) XXXX-XXXX",
                      },
                    })}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      e.target.value = formatted;
                    }}
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
                  isLoading={isSubmitting}
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
