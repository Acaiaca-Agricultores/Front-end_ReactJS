import {
  Box,
  Heading,
  Text,
  Center,
  Image,
  Flex,
  Divider,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";

import ImagemFeira from "../../assets/feira.jpg";
import IconPlan from "../../assets/icons/alterar-plano.svg";
import IconProfile from "../../assets/icons/editar-conta.svg";
import IconDelete from "../../assets/icons/delete.png";

const AppConfig = () => {
  const navigation = useNavigate();
  const [userName, setUserName] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleDeleteAccount = async () => {
    onOpen();
  };

  const executeDelete = async () => {
    onClose();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast({
        title: "Erro de autenticação",
        description:
          "Token ou ID do usuário não encontrado. Faça login novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Conta deletada com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
      setUserName("");

      navigate("/login");
    } catch (err) {
      console.error(
        "Erro ao deletar conta:",
        err.response?.data?.msg || err.message
      );
      toast({
        title: "Erro ao deletar conta.",
        description: err.response?.data?.msg || "Tente novamente mais tarde.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
        setUserName("");
        navigate("/login");
      }
    }
  };

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
          <Box display={"flex"} alignItems="center" gap={2}>
            <Image width={"3rem"} src={IconPlan} alt="Alterar Plano" />
            <Text>Alterar Plano</Text>
          </Box>
          <Divider />

          <Box display={"flex"} alignItems="center" gap={2}>
            <Image width={"3rem"} src={IconProfile} alt="Editar Perfil" />
            <Button
              onClick={() => navigation("/perfil")}
              background={"transparent"}
              color={"#000000"}
            >
              Editar Conta
            </Button>
          </Box>
          <Divider />

          <Box display={"flex"} alignItems="center" gap={2}>
            <Image width={"3rem"} src={IconDelete} alt="Deletar Conta" />
            <Button
              backgroundColor="transparent"
              color="#973a34"
              onClick={handleDeleteAccount}
              colorScheme="red"
              _hover={{
                backgroundColor: "rgba(151, 58, 52, 0.1)",
                color: "#973a34",
              }}
            >
              Deletar Conta
            </Button>
          </Box>
        </Center>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Exclusão de Conta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Tem certeza que deseja deletar sua conta? Esta ação não pode ser
              desfeita.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={executeDelete}>
              Deletar Conta
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppConfig;
