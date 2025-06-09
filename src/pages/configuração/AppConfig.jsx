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
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";

import ImagemFeira from "../../assets/feira.jpg";
import IconPassword from "../../assets/icons/atualizar-senha.svg";
import IconProfile from "../../assets/icons/editar-conta.svg";
import IconDelete from "../../assets/icons/delete.png";

const AppConfig = () => {
  const navigation = useNavigate();
  const [userName, setUserName] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigation("/login");
      return;
    }
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, [navigation]);

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

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      await axios.delete(`${API_URL}user/${userId}`, {
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

      navigation("/");
      window.location.reload();
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
        navigation("/login");
      }
    }
  };

  const handleOpenPasswordModal = () => setPasswordModalOpen(true);
  const handleClosePasswordModal = () => {
    setPasswordModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Preencha todos os campos.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: "As senhas não coincidem.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      await axios.put(
        `${API_URL}user/${userId}/password`,
        {
          oldPassword: currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast({
        title: "Senha alterada com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleClosePasswordModal();
    } catch (err) {
      toast({
        title: "Erro ao alterar senha.",
        description: err.response?.data?.msg || "Tente novamente mais tarde.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
            <Image width={"3rem"} src={IconPassword} alt="Alterar Plano" />
            <Button
              background={"transparent"}
              color={"#000000"}
              onClick={handleOpenPasswordModal}
            >
              Alterar Senha
            </Button>
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

      <Modal
        isOpen={isPasswordModalOpen}
        onClose={handleClosePasswordModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar Senha</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box as="form" display="flex" flexDirection="column" gap={4}>
              <Text>Digite sua senha atual e a nova senha:</Text>
              <InputGroup>
                <Input
                  border={"2px solid  #83a11d"}
                  _focus={{
                    borderColor: "#c0ab8e",
                    boxShadow: "0 0 0 1px #e5d1b0",
                  }}
                  type={showCurrent ? "text" : "password"}
                  placeholder="Senha atual"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Button
                  variant="ghost"
                  onClick={() => setShowCurrent((v) => !v)}
                >
                  {showCurrent ? (
                    <ViewOffIcon color={"#83a11d"} />
                  ) : (
                    <ViewIcon color={"#83a11d"} />
                  )}
                </Button>
              </InputGroup>
              <InputGroup>
                <Input
                  border={"2px solid  #83a11d"}
                  _focus={{
                    borderColor: "#c0ab8e",
                    boxShadow: "0 0 0 1px #e5d1b0",
                  }}
                  type={showNew ? "text" : "password"}
                  placeholder="Nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button variant="ghost" onClick={() => setShowNew((v) => !v)}>
                  {showNew ? (
                    <ViewOffIcon color={"#83a11d"} />
                  ) : (
                    <ViewIcon color={"#83a11d"} />
                  )}
                </Button>
              </InputGroup>
              <InputGroup>
                <Input
                  border={"2px solid  #83a11d"}
                  _focus={{
                    borderColor: "#c0ab8e",
                    boxShadow: "0 0 0 1px #e5d1b0",
                  }}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirmar nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button variant="ghost" onClick={() => setShowConfirm((v) => !v)}>
                  {showConfirm ? (
                    <ViewOffIcon color={"#83a11d"} />
                  ) : (
                    <ViewIcon color={"#83a11d"} />
                  )}
                </Button>
              </InputGroup>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClosePasswordModal}>
              Cancelar
            </Button>
            <Button background={"#83a11d"} onClick={handleChangePassword}>
              Alterar Senha
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppConfig;
