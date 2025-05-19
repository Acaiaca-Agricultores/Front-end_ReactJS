import { Image, Button, Box, Flex } from "@chakra-ui/react";
import NotFoundImage from "../../assets/IAcai404.png";
import { useNavigate } from "react-router-dom";

const AppPage404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        h={{ base: "auto", md: "100vh" }}
        display={"flex"}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box
          w={{ base: "100%", md: "50%" }}
          display="flex"
          alignItems="center"
          padding={"10rem"}
        >
          <Image src={NotFoundImage} alt="404 Not Found" width={"31.25rem"} />
        </Box>
        <Box
          w={{ base: "100%", md: "50%" }}
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          padding="10rem"
          gap={"1rem"}
        >
          <p>Erro</p>
          <h1>404</h1>
          <p>Que pena, essa página não existe ou não pode ser carregada.</p>
          <Button
            onClick={() => navigate("/")}
            color={"white"}
            background={"#52601A"}
            borderRadius={"10px"}
            fontFamily={"Onest"}
            fontSize={"1.2rem"}
            fontWeight={400}
            lineHeight={"150%"}
            width={"100%"}
            padding={"1.5rem"}
            _hover={{
              background: "#c0ab8e",
            }}
            aria-label="Fechar vídeo de apresentação"
          >
            Voltar para a página inicial
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default AppPage404;
