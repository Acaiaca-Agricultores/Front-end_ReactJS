import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
  useToast,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl as ModalFormControl,
  FormLabel as ModalFormLabel,
  Input as ModalInput,
  FormErrorMessage as ModalFormError,
  InputGroup,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import IconVoice from "../../assets/icons/voice-command.png";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const ForgotPasswordScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit: handleResetSubmit,
    register: registerReset,
    formState: { errors: resetErrors, isSubmitting: isResetting },
    setValue: setResetValue,
  } = useForm();
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const { handleToggleRecording, recordingField } = useSpeechRecognition({
    setValue,
  });
  const {
    handleToggleRecording: handleResetToggleRecording,
    recordingField: resetRecordingField,
  } = useSpeechRecognition({ setValue: setResetValue });

  const onSubmit = async ({ email }) => {
    try {
      const response = await api.post("user", { email });
      const { user } = response.data;
      setUserId(user._id);
      console.log("Response data:", response.data);
      setSubmissionMessage(response.data.msg);
      setIsSuccess(true);
      onOpen();
      toast({
        title: "Sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: error.response?.data?.msg || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  };

  const onReset = async ({ newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      await api.put(`/user/${userId}/reset-password`, {
        newPassword,
        confirmPassword,
      });
      toast({
        title: "Sucesso",
        description: "Senha alterada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      navigate("/login");
    } catch (err) {
      toast({
        title: "Erro",
        description:
          err.response?.data?.msg || err.message || "Algo deu errado.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="gray.50"
    >
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="lg" textAlign="center">
            Esqueceu sua senha?
          </Heading>

          <Text textAlign="center" color="gray.600">
            Não se preocupe! Digite seu e-mail abaixo e enviaremos um link para
            você criar uma nova senha.
          </Text>

          {!isSuccess && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Endereço de e-mail</FormLabel>
                  <InputGroup>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      _focus={{
                        borderColor: "#c0ab8e",
                        boxShadow: "0 0 0 1px #e5d1b0",
                      }}
                      {...register("email", {
                        required: "O e-mail é obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Endereço de e-mail inválido",
                        },
                      })}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/\s/g, "")
                          .toLowerCase();
                      }}
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          handleToggleRecording("email", {
                            trim: true,
                            toLowerCase: true,
                          })
                        }
                        isLoading={recordingField === "email"}
                      >
                        <Image src={IconVoice} w="16px" />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  background="#52601a"
                  color={"#ffffff"}
                  isLoading={isSubmitting}
                  type="submit"
                  width="full"
                  _hover={{ bg: "gray.50", color: "#3f4d14" }}
                >
                  {isSubmitting ? (
                    <Spinner size="sm" />
                  ) : (
                    "Enviar Link de Recuperação"
                  )}
                </Button>
              </VStack>
            </form>
          )}

          {submissionMessage && (
            <Text
              textAlign="center"
              color={isSuccess ? "green.500" : "red.500"}
              fontWeight="medium"
              mt={4}
            >
              {submissionMessage}
            </Text>
          )}

          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Alterar Senha</ModalHeader>
              <ModalBody>
                <form onSubmit={handleResetSubmit(onReset)}>
                  <ModalFormControl isInvalid={resetErrors.newPassword} mb={4}>
                    <ModalFormLabel htmlFor="newPassword">
                      Nova Senha
                    </ModalFormLabel>
                    <InputGroup>
                      <ModalInput
                        id="newPassword"
                        type="password"
                        {...registerReset("newPassword", {
                          required: "Informe a nova senha",
                        })}
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /\s/g,
                            ""
                          );
                        }}
                      />
                      <InputRightElement>
                        <Button
                          variant="ghost"
                          onClick={() =>
                            handleResetToggleRecording("newPassword", {
                              trim: true,
                            })
                          }
                          isLoading={resetRecordingField === "newPassword"}
                        >
                          <Image src={IconVoice} w="16px" />
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <ModalFormError>
                      {resetErrors.newPassword &&
                        resetErrors.newPassword.message}
                    </ModalFormError>
                  </ModalFormControl>
                  <ModalFormControl
                    isInvalid={resetErrors.confirmPassword}
                    mb={4}
                  >
                    <ModalFormLabel htmlFor="confirmPassword">
                      Confirme a Senha
                    </ModalFormLabel>
                    <InputGroup>
                      <ModalInput
                        id="confirmPassword"
                        type="password"
                        {...registerReset("confirmPassword", {
                          required: "Confirme a senha",
                        })}
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /\s/g,
                            ""
                          );
                        }}
                      />
                      <InputRightElement>
                        <Button
                          variant="ghost"
                          onClick={() =>
                            handleResetToggleRecording("confirmPassword", {
                              trim: true,
                            })
                          }
                          isLoading={resetRecordingField === "confirmPassword"}
                        >
                          <Image src={IconVoice} w="16px" />
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <ModalFormError>
                      {resetErrors.confirmPassword &&
                        resetErrors.confirmPassword.message}
                    </ModalFormError>
                  </ModalFormControl>
                  <ModalFooter>
                    <Button
                      colorScheme="green"
                      mr={3}
                      isLoading={isResetting}
                      type="submit"
                    >
                      Alterar
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>

          <Text textAlign="center" mt={4}>
            Lembrou a senha?{" "}
            <ChakraLink color="#52601a" href="/login">
              Faça Login
            </ChakraLink>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

const AppSenha = ForgotPasswordScreen;
export default AppSenha;
