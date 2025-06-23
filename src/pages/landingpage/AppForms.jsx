import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import IconVoice from "../../assets/icons/voice-command.png";

const API_URL = "http://localhost:8080/sending-email";

const AppForms = () => {
  const toast = useToast();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [titulo, setTitulo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { handleToggleRecording, recordingField } = useSpeechRecognition({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      ownerRef: nome,
      emailFrom: email,
      emailTo: "alissonsartori33@gmail.com",
      title: titulo,
      text: mensagem,
    };
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast({
          title: "Mensagem enviada com sucesso",
          status: "success",
          duration: 3000,
        });
        setNome("");
        setEmail("");
        setMensagem("");
        setTitulo("");
      } else {
        toast({
          title: "Erro ao enviar mensagem",
          status: "error",
          duration: 3000,
        });
      }
    } catch (_err) {
      toast({ title: "Erro de rede", status: "error", duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      id="appforms"
      as="section"
      role="region"
      aria-label="Formulário de contato"
      backgroundImage={`url(${"https://images.unsplash.com/photo-1674212466654-fccc10a1b594?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})`}
      backgroundSize="cover"
      objectFit={"cover"}
      backgroundPosition="center"
      padding={"2rem"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        border={"2px solid  #83a11d"}
        borderRadius="8px"
        p={6}
        margin={"4rem"}
        background="rgba(0, 0, 0, 0.5)"
        backdropFilter="blur(8px)"
        width={{ base: "100%", md: "50%" }}
        color={"white"}
      >
        <Text as={"h1"} color={"#ffffff"} textAlign={"center"} fontSize="2xl">
          Fomulário de Contato
        </Text>
        <form
          role="form"
          aria-label="Formulário de contato"
          onSubmit={handleSubmit}
        >
          <FormControl id="nome" mb={4} isRequired>
            <FormLabel htmlFor="nome">Nome</FormLabel>
            <InputGroup>
              <Input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                _placeholder={{ color: "#b0b0b0" }}
                border={"2px solid  #83a11d"}
                aria-required="true"
                autoComplete="name"
                _focus={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 0 1px #e5d1b0",
                }}
              />
              <InputRightElement
                h={"100%"}
                width={"4.5rem"}
                alignItems="center"
              >
                <Button
                  variant="ghost"
                  onClick={() =>
                    handleToggleRecording("nome", { setter: setNome })
                  }
                  isLoading={recordingField === "nome"}
                  aria-label="Gravar nome"
                  _hover={{ background: "transparent" }}
                >
                  <Image src={IconVoice} w="16px" />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="email" mb={4} isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputGroup>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email"
                _placeholder={{ color: "#b0b0b0" }}
                border={"2px solid  #83a11d"}
                aria-required="true"
                autoComplete="email"
                _focus={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 0 1px #e5d1b0",
                }}
              />
              <InputRightElement
                h={"100%"}
                width={"4.5rem"}
                alignItems="center"
              >
                <Button
                  variant="ghost"
                  onClick={() =>
                    handleToggleRecording("email", {
                      setter: setEmail,
                      trim: true,
                      toLowerCase: true,
                    })
                  }
                  isLoading={recordingField === "email"}
                  aria-label="Gravar e-mail"
                  _hover={{ background: "transparent" }}
                >
                  <Image src={IconVoice} w="16px" />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="titulo" mb={4} isRequired>
            <FormLabel htmlFor="titulo">Titulo</FormLabel>
            <InputGroup>
              <Input
                type="text"
                id="titulo"
                name="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Seu título"
                _placeholder={{ color: "#b0b0b0" }}
                border={"2px solid  #83a11d"}
                aria-required="true"
                _focus={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 0 1px #e5d1b0",
                }}
              />
              <InputRightElement
                h={"100%"}
                width={"4.5rem"}
                alignItems="center"
              >
                <Button
                  variant="ghost"
                  onClick={() =>
                    handleToggleRecording("titulo", { setter: setTitulo })
                  }
                  isLoading={recordingField === "titulo"}
                  aria-label="Gravar título"
                  _hover={{ background: "transparent" }}
                >
                  <Image src={IconVoice} w="16px" />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="mensagem" mb={4} isRequired>
            <FormLabel htmlFor="mensagem">Mensagem</FormLabel>
            <InputGroup>
              <Textarea
                id="mensagem"
                name="mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Digite sua mensagem"
                _placeholder={{ color: "#b0b0b0" }}
                rows={5}
                border={"2px solid  #83a11d"}
                aria-required="true"
                _focus={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 0 1px #e5d1b0",
                }}
              />
              <InputRightElement
                h={"100%"}
                width={"4.5rem"}
                alignItems="center"
              >
                <Button
                  variant="ghost"
                  onClick={() =>
                    handleToggleRecording("mensagem", { setter: setMensagem })
                  }
                  isLoading={recordingField === "mensagem"}
                  aria-label="Gravar mensagem"
                  _hover={{ background: "transparent" }}
                >
                  <Image src={IconVoice} w="16px" />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
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
            aria-label="Enviar mensagem"
            isLoading={isLoading}
            loadingText="Enviando mensagem..."
            spinnerPlacement="end"
          >
            Enviar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AppForms;
