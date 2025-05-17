import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import formImg from "../../assets/agricultor.jpg";

const AppForms = () => {
  return (
    <SimpleGrid
      id="appforms"
      as="section"
      role="region"
      aria-label="Formulário de contato"
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 0, md: 10 }}
      padding={{ base: "2rem", md: "4.5rem 12.5rem" }}
      background={"#ECE1DA"}
    >
      <Box>
        <Image
          src={formImg}
          alt="Pessoa agricultora sorrindo, ilustrando contato"
          boxSize={"100%"}
        />
      </Box>
      <Box border={"2px solid  #83a11d"} borderRadius="8px" p={6}>
        <form role="form" aria-label="Formulário de contato">
          <FormControl id="nome" mb={4} isRequired>
            <FormLabel htmlFor="nome">Nome</FormLabel>
            <Input
              type="text"
              id="nome"
              name="nome"
              placeholder="Seu nome"
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
    </SimpleGrid>
  );
};

export default AppForms;
