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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const ForgotPasswordScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (values) => {
    setSubmissionMessage("");
    setIsSuccess(false);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (values.email === "teste@exemplo.com") {
      setIsSuccess(true);
      setSubmissionMessage(
        "Se este e-mail estiver cadastrado, você receberá um link para redefinir sua senha em breve. Verifique sua caixa de entrada e spam."
      );
      toast({
        title: "Instruções enviadas!",
        description: "Verifique seu e-mail.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setIsSuccess(false);
      setSubmissionMessage("E-mail não encontrado em nosso sistema.");
      toast({
        title: "Erro ao solicitar",
        description: "O e-mail fornecido não foi encontrado.",
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
                  />
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
