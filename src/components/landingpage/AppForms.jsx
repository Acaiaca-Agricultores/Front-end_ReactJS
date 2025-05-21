import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Text,
} from "@chakra-ui/react";

const AppForms = () => {
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
        <form role="form" aria-label="Formulário de contato">
          <FormControl id="nome" mb={4} isRequired>
            <FormLabel htmlFor="nome">Nome</FormLabel>
            <Input
              type="text"
              id="nome"
              name="nome"
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
          </FormControl>
          <FormControl id="email" mb={4} isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
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
          </FormControl>
          <FormControl id="mensagem" mb={4} isRequired>
            <FormLabel htmlFor="mensagem">Mensagem</FormLabel>
            <Textarea
              id="mensagem"
              name="mensagem"
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
          </FormControl>
          <Button
            type="submit"
            color="white"
            background="#52601A"
            borderRadius="10px"
            fontFamily="Onest"
            fontSize="1.2rem"
            fontWeight={400}
            lineHeight="150%"
            width="100%"
            aria-label="Enviar mensagem do formulário de contato"
            _hover={{
              background: "#c0ab8e",
            }}
          >
            Enviar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AppForms;
