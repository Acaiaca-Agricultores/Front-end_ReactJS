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
  Flex,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import ImageAgricultor from "../../assets/agricultor-forms.jpg";
import IconInfo from "../../assets/icons/info.png";
import IconVoice from "../../assets/icons/voice-command.png";
import { useAppStepperControls } from "./AppStepper";
import AppSelect from "../configuração/AppSelect";
import axios from "axios";
import IAcaiBalloon from "./IAcaiBalloon";
import IAcaiCadastro from "../../assets/IAcai.png";
import IAcaiCadastro2 from "../../assets/IAcai-cadastro.png";
import IAcaiCadastro3 from "../../assets/Aicai-mapa.png";
import IAcaiCadastroFinal from "../../assets/IAcai-cadastro-final.png";
import { FiMic } from "react-icons/fi";

const AppCadastro = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { activeStep, goToNext, goToPrevious } = useAppStepperControls();
  const [selectedEstado, setSelectedEstado] = useState("");
  const [selectedCidade, setSelectedCidade] = useState("");
  const [stepsState, setStepsState] = useState([
    { title: "Etapa 1", description: "Dados Pessoais" },
    { title: "Etapa 2", description: "Endereço da Propriedade" },
    { title: "Etapa 3", description: "Tipo de Usuário" },
  ]);
  const [recognition, setRecognition] = useState(null);
  const [recordingField, setRecordingField] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    trigger,
    setValue,
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

  useEffect(() => {
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      toast({
        title: "Navegador incompatível",
        description:
          "Seu navegador não suporta a funcionalidade de gravação de voz.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.lang = "pt-BR";
    rec.interimResults = false;
    setRecognition(rec);
  }, [toast]);

  const handleToggleRecording = (fieldName) => {
    if (!recognition) return;

    if (recordingField) {
      if (recordingField === fieldName) {
        recognition.stop();
      }
      return;
    }

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript;

      if (fieldName === "email") {
        transcript = transcript.replace(/\s/g, "").toLowerCase();
      } else if (fieldName === "password" || fieldName === "confirmPassword") {
        transcript = transcript.replace(/\s/g, "");
      } else if (fieldName === "phone") {
        transcript = formatPhone(transcript);
      }

      setValue(fieldName, transcript, { shouldValidate: true });
      toast({
        title: "Texto reconhecido!",
        description: `O texto foi inserido no campo.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      toast({
        title: "Erro no reconhecimento de voz",
        description: `Erro: ${event.error}. Verifique as permissões do microfone.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    };

    recognition.onend = () => {
      setRecordingField(null);
    };

    recognition.start();
    setRecordingField(fieldName);
  };

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
    if (activeStep === 1) {
      fieldsToValidate = ["username", "email", "password", "confirmPassword"];
    } else if (activeStep === 2) {
      fieldsToValidate = ["phone"];
      if (watch("role") !== "consumidor") {
        fieldsToValidate.push("propertyName");
      }
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

    if (activeStep === 2) {
      if (!selectedEstado || !selectedCidade) {
        toast({
          title: "Erro de validação",
          description: "Selecione um estado e uma cidade.",
          status: "error",
          duration: 4000,
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
      farmerStory,
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
      ...(role === "agricultor" && { farmerStory }),
    };
    Object.keys(payload).forEach(
      (key) =>
        (payload[key] === undefined || payload[key] === "") &&
        delete payload[key]
    );

    try {
      const response = await axios.post(API_URL + "/auth/register", payload, {
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

  const role = watch("role");
  useEffect(() => {
    if (role === "agricultor") {
      setStepsState([
        { title: "Etapa 1", description: "Dados Pessoais" },
        { title: "Etapa 2", description: "Endereço da Propriedade" },
        { title: "Etapa 3", description: "Tipo de Usuário" },
        { title: "Etapa 4", description: "História do Agricultor" },
      ]);
    } else {
      setStepsState([
        { title: "Etapa 1", description: "Dados Pessoais" },
        { title: "Etapa 2", description: "Endereço da Propriedade" },
        { title: "Etapa 3", description: "Tipo de Usuário" },
      ]);
    }
  }, [role]);

  const stepImages = [
    IAcaiCadastro,
    IAcaiCadastro2,
    IAcaiCadastro3,
    IAcaiCadastroFinal,
  ];

  function getPasswordStrengthMessage(password) {
    if (!password) return "Digite sua senha";
    const errors = [];
    if (password.length < 6) errors.push("Pelo menos 6 caracteres");
    if (!/[A-Z]/.test(password)) errors.push("Uma letra maiúscula");
    if (!/[a-z]/.test(password)) errors.push("Uma letra minúscula");
    if (!/[0-9]/.test(password)) errors.push("Um número");
    if (!/[^A-Za-z0-9]/.test(password)) errors.push("Um caractere especial");
    if (errors.length === 0) return "Senha forte definida!";
    return `Senha fraca: falta ${errors.join(", ")}`;
  }

  const getBalloonText = () => {
    if (activeStep === 0) {
      const perfil = watch("role");
      if (perfil === "agricultor")
        return "Você escolheu Agricultor! Vamos cultivar juntos.";
      if (perfil === "consumidor")
        return "Você escolheu Consumidor! Boas compras!";
      return "Escolha seu perfil para começar!";
    }
    if (activeStep === 1) {
      const nome = watch("username");
      const email = watch("email");
      const senha = watch("password");
      const confirma = watch("confirmPassword");
      if (!nome) return "Digite seu nome e sobrenome";
      if (!email) return `Nome e sobrenome digitado: ${nome}`;
      if (!senha) return `O e-mail digitado: ${email}`;
      if (!confirma) return getPasswordStrengthMessage(senha);
      if (confirma !== senha) return "As senhas não coincidem!";
      return `Senha confirmada!`;
    }
    if (activeStep === 2) {
      const propriedade = watch("propertyName");
      const telefone = watch("phone");
      if (watch("role") !== "consumidor") {
        if (!propriedade) return "Digite o nome da sua propriedade";
        if (propriedade && !selectedEstado)
          return `Nome da propriedade digitado: ${propriedade}`;
      }
      if (!selectedEstado) return `Estado: selecione o estado`;
      if (selectedEstado && !selectedCidade)
        return `Estado selecionado: ${selectedEstado}`;
      if (selectedCidade && !telefone)
        return `Cidade selecionada: ${selectedCidade}`;
      if (telefone) return `Telefone digitado: ${telefone}`;
      return "Preencha os dados da propriedade!";
    }
    if (activeStep === 3 && role === "agricultor") {
      const historia = watch("farmerStory");
      if (!historia) return "Conte sua história como agricultor";
      return `História registrada!`;
    }
    return "Bem-vindo ao cadastro!";
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
          <IAcaiBalloon
            imageSrc={stepImages[activeStep]}
            balloonText={getBalloonText()}
          />

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

            {activeStep === 1 && (
              <>
                <FormControl isInvalid={errors.username}>
                  <FormLabel>Nome e Sobrenome</FormLabel>
                  <InputGroup>
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
                    <InputRightElement
                      h={"100%"}
                      width={"4.5rem"}
                      alignItems="center"
                    >
                      <Button
                        variant="ghost"
                        _hover={{ background: "transparent" }}
                        onClick={() => handleToggleRecording("username")}
                        isLoading={recordingField === "username"}
                        aria-label="Gravar nome e sobrenome"
                      >
                        <Image
                          src={IconVoice}
                          alt="Ícone de comando de voz"
                          width={"1.5rem"}
                          height={"1.5rem"}
                        />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email}>
                  <FormLabel>E-mail</FormLabel>
                  <InputGroup>
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
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/\s/g, "")
                          .toLowerCase();
                      }}
                    />
                    <InputRightElement
                      h={"100%"}
                      width={"4.5rem"}
                      alignItems="center"
                    >
                      <Button
                        variant="ghost"
                        _hover={{ background: "transparent" }}
                        onClick={() => handleToggleRecording("email")}
                        isLoading={recordingField === "email"}
                        aria-label="Gravar e-mail"
                      >
                        <Image
                          src={IconVoice}
                          alt="Ícone de comando de voz"
                          width={"1.5rem"}
                          height={"1.5rem"}
                        />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
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
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /\s/g,
                          ""
                        );
                      }}
                    />
                    <InputRightElement
                      h={"100%"}
                      width={"6.5rem"}
                      display="flex"
                      alignItems="center"
                    >
                      <Button
                        variant="ghost"
                        _hover={{ background: "transparent" }}
                        onClick={() => setShowCurrent((v) => !v)}
                        aria-label="Mostrar/ocultar senha"
                      >
                        {showCurrent ? (
                          <ViewOffIcon color={"#83a11d"} />
                        ) : (
                          <ViewIcon color={"#83a11d"} />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        _hover={{ background: "transparent" }}
                        onClick={() => handleToggleRecording("password")}
                        isLoading={recordingField === "password"}
                        aria-label="Gravar senha"
                      >
                        <Image
                          src={IconVoice}
                          alt="Ícone de comando de voz"
                          width={"1.5rem"}
                          height={"1.5rem"}
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
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
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
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /\s/g,
                          ""
                        );
                      }}
                    />
                    <InputRightElement
                      h={"100%"}
                      width={"6.5rem"}
                      display="flex"
                      alignItems="center"
                    >
                      <Button
                        variant="ghost"
                        _hover={{ background: "transparent" }}
                        onClick={() => setShowConfirm((v) => !v)}
                        aria-label="Mostrar/ocultar senha"
                      >
                        {showConfirm ? (
                          <ViewOffIcon color={"#83a11d"} />
                        ) : (
                          <ViewIcon color={"#83a11d"} />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        _hover={{ background: "transparent" }}
                        onClick={() => handleToggleRecording("confirmPassword")}
                        isLoading={recordingField === "confirmPassword"}
                        aria-label="Gravar confirmação de senha"
                      >
                        <Image
                          src={IconVoice}
                          alt="Ícone de comando de voz"
                          width={"1.5rem"}
                          height={"1.5rem"}
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

            {activeStep === 2 && (
              <>
                {watch("role") !== "consumidor" && (
                  <FormControl isInvalid={errors.propertyName}>
                    <FormLabel>Nome da Propriedade</FormLabel>
                    <InputGroup>
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
                      <InputRightElement
                        h={"100%"}
                        width={"4.5rem"}
                        alignItems="center"
                      >
                        <Button
                          variant="ghost"
                          _hover={{ background: "transparent" }}
                          onClick={() => handleToggleRecording("propertyName")}
                          isLoading={recordingField === "propertyName"}
                          aria-label="Gravar nome da propriedade"
                        >
                          <Image
                            src={IconVoice}
                            alt="Ícone de comando de voz"
                            width={"1.5rem"}
                            height={"1.5rem"}
                          />
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.propertyName && errors.propertyName.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
                <AppSelect
                  selectedEstado={selectedEstado}
                  setSelectedEstado={setSelectedEstado}
                  selectedCidade={selectedCidade}
                  setSelectedCidade={setSelectedCidade}
                  toast={toast}
                />
                <FormControl isInvalid={errors.phone}>
                  <FormLabel>Telefone</FormLabel>
                  <InputGroup>
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
                    <InputRightElement
                      h={"100%"}
                      width={"4.5rem"}
                      alignItems="center"
                    >
                      <Button
                        variant="ghost"
                        _hover={{ background: "transparent" }}
                        onClick={() => handleToggleRecording("phone")}
                        isLoading={recordingField === "phone"}
                        aria-label="Gravar telefone"
                      >
                        <Image
                          src={IconVoice}
                          alt="Ícone de comando de voz"
                          width={"1.5rem"}
                          height={"1.5rem"}
                        />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.phone && errors.phone.message}
                  </FormErrorMessage>
                </FormControl>
              </>
            )}

            {role === "agricultor" && activeStep === 3 && (
              <FormControl isInvalid={errors.farmerStory}>
                <FormLabel>
                  Conte um pouco da sua história como agricultor
                </FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Fale sobre sua experiência, desafios, conquistas..."
                    _placeholder={{ color: "#b0b0b0" }}
                    border={"2px solid  #83a11d"}
                    aria-required="true"
                    width={"100%"}
                    height={"3rem"}
                    _focus={{
                      borderColor: "#c0ab8e",
                      boxShadow: "0 0 0 1px #e5d1b0",
                    }}
                    {...register("farmerStory", {
                      required: "Conte sua história para continuarmos",
                    })}
                  />
                  <InputRightElement
                    h={"100%"}
                    width={"4.5rem"}
                    alignItems="center"
                  >
                    <Button
                      variant="ghost"
                      _hover={{ background: "transparent" }}
                      onClick={() => handleToggleRecording("farmerStory")}
                      isLoading={recordingField === "farmerStory"}
                      aria-label="Gravar história do agricultor"
                    >
                      <Image
                        src={IconVoice}
                        alt="Ícone de comando de voz"
                        width={"1.5rem"}
                        height={"1.5rem"}
                      />
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.farmerStory && errors.farmerStory.message}
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
                  aria-label="Voltar para etapa anterior"
                >
                  Anterior
                </Button>
              )}
              {activeStep < stepsState.length - 1 && (
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
                  aria-label="Ir para próxima etapa"
                >
                  Próximo
                </Button>
              )}
              {activeStep === stepsState.length - 1 && (
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
                  aria-label="Finalizar cadastro"
                  isLoading={isSubmitting}
                  loadingText="Fazendo cadastro..."
                  spinnerPlacement="end"
                >
                  Cadastre-se
                </Button>
              )}
            </ButtonGroup>
            {recordingField && (
              <Flex align="center" gap={2} mt={2}>
                <FiMic color="#83a11d" size={16} />
                <Text fontSize="sm" color="#83a11d" fontWeight="medium">
                  Use os botões de microfone para preencher os campos com voz
                </Text>
              </Flex>
            )}
          </form>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default AppCadastro;
