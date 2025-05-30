import {
  Box,
  Heading,
  Text,
  Center,
  Image,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

import ImagemFeira from "../../assets/feira.jpg";
import IconPassword from "../../assets/icons/atualizar-senha.svg";
import IconPlan from "../../assets/icons/alterar-plano.svg";
import IconProfile from "../../assets/icons/editar-conta.svg";
import IconDetails from "../../assets/icons/editar-foto.svg";

const AppConfig = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <>
      <Flex
        as="section"
        role="region"
        aria-label="Seção configuração de conta"
        backgroundImage={`url(${ImagemFeira})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        position="relative"
        overflow="hidden"
        objectFit="cover"
        h={{ base: "auto", md: "60vh" }}
      >
        <Box
          position="absolute"
          inset="0"
          background="rgba(0, 0, 0, 0.5)"
          backdropFilter="blur(2px)"
          zIndex="1"
        />
        <Center
          zIndex="2"
          gap="2rem"
          padding={{ base: "1.5rem", md: "4.5rem" }}
          color="white"
          width={"100vw"}
          height={"60vh"}
          position="relative"
          flexDirection={"column"}
        >
          <Text fontSize={{ base: "2rem", md: "2.5rem" }} fontWeight="bold">
            <Typewriter
              words={[`Bem-vindo a Acaiacá, ${userName}!`]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </Text>
        </Center>
      </Flex>
      <Box
        textAlign={"center"}
        p={4}
        maxW="800px"
        mx="auto"
        padding={{ base: "1rem", md: "2rem" }}
      >
        <Heading padding={10}>Detalhes da Conta</Heading>
        <Center flexDirection="column" gap={10} mt={4}>
          <Box
            display={"flex"}
            alignItems="center"
            gap={2}
            cursor="pointer"
          >
            <Image width={"3rem"} src={IconPassword} alt="Atualizar Senha" />
            <Text>Atualizar Senha</Text>
          </Box>
          <Divider />
          <Box display={"flex"} alignItems="center" gap={2}>
            <Image width={"3rem"} src={IconPlan} alt="Alterar Plano" />
            <Text>Alterar Plano</Text>
          </Box>
          <Divider />

          <Box display={"flex"} alignItems="center" gap={2}>
            <Image width={"3rem"} src={IconProfile} alt="Editar Perfil" />
            <Text>Editar Perfil</Text>
          </Box>
          <Divider />

          <Box display={"flex"} alignItems="center" gap={2}>
            <Image width={"3rem"} src={IconDetails} alt="Editar Detalhes" />
            <Text>Editar Foto do Perfil</Text>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default AppConfig;
