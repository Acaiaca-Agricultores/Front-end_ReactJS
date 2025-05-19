import { Image, Button, Box, Flex, Text, Heading } from "@chakra-ui/react";
import NotFoundImage from "../../assets/IAcai404.png";
import { useNavigate } from "react-router-dom";

const AppPage404 = () => {
  const navigate = useNavigate();
  return (
    <Flex
      h={{ base: "auto", md: "100vh" }}
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      padding={{ base: "2rem", md: "4rem" }}
      gap={{ base: "2rem", md: "0" }}
    >
      {/* Image Section */}
      <Box
        w={{ base: "100%", md: "50%" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={{ base: "1rem", md: "4rem" }}
      >
        <Image
          src={NotFoundImage}
          alt="404 Not Found"
          maxWidth={{ base: "18.75rem", md: "31.25rem" }}
          width="100%"
        />
      </Box>

      {/* Text and Button Section */}
      <Box
        w={{ base: "100%", md: "50%" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        padding={{ base: "1rem", md: "4rem" }}
        gap={{ base: "1rem", md: "2rem" }}
      >
        <Text fontSize={{ base: "1.5rem", md: "2rem" }} fontWeight="bold">
          Erro
        </Text>
        <Heading fontSize={{ base: "3rem", md: "5rem" }}>404</Heading>
        <Text fontSize={{ base: "1rem", md: "1.5rem" }}>
          Que pena, essa página não existe ou não pode ser carregada.
        </Text>
        <Button
          onClick={() => navigate("/")}
          color="white"
          background="#52601A"
          borderRadius="10px"
          fontFamily="Onest"
          fontSize={{ base: "1rem", md: "1.2rem" }}
          fontWeight={400}
          lineHeight="150%"
          width={{ base: "100%", md: "auto" }}
          padding={{ base: "1rem", md: "1.5rem" }}
          _hover={{
            background: "#c0ab8e",
          }}
          aria-label="Voltar para a página inicial"
        >
          Voltar para a página inicial
        </Button>
      </Box>
    </Flex>
  );
};

export default AppPage404;
