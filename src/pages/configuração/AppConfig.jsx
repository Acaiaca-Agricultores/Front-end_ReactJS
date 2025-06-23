import {
  Box,
  Heading,
  Text,
  Image,
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
  InputRightElement,
  Stack,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";
import { FaUserEdit, FaKey, FaTrashAlt, FaRegCreditCard } from "react-icons/fa";

import ImagemConfig from "../../assets/configuração.jpg";
import IconVoice from "../../assets/icons/voice-command.png";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";

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
  const { handleToggleRecording, recordingField } = useSpeechRecognition({});
  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.95)",
    "rgba(26,32,44,0.95)"
  );
  const cardShadow = useColorModeValue("lg", "dark-lg");

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
      await axios.delete(`${API_URL}/user/${userId}`, {
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
        `${API_URL}/user/${userId}/password`,
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
      <Box
        w="100%"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={{ base: 4, md: 8 }}
        pt={{ base: 24, md: 32 }}
        position="relative"
        backgroundImage={`url(${ImagemConfig})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        overflow="hidden"
      >
        <Box
          position="absolute"
          inset="0"
          background="rgba(0, 0, 0, 0.5)"
          backdropFilter="blur(2px)"
          zIndex="1"
        />
        <Box
          zIndex="2"
          position="relative"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontSize={{ base: "2.2rem", md: "2.8rem" }}
            fontWeight="extrabold"
            letterSpacing="wide"
            textShadow="0 2px 8px #0008"
            color="white"
            mb={8}
            textAlign="center"
          >
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
          <Card
            bg={cardBg}
            boxShadow={cardShadow}
            borderRadius="2xl"
            maxW="420px"
            w="100%"
            p={{ base: 4, md: 8 }}
            transition="box-shadow 0.2s"
            _hover={{ boxShadow: "2xl" }}
            position="relative"
            zIndex="2"
            mt={{ base: 12, md: 20 }}
          >
            <CardHeader textAlign="center" pb={2}>
              <Heading size="lg" color="#83a11d">
                Configurações da Conta
              </Heading>
              <Text fontSize="md" color="gray.500" mt={2}>
                Gerencie sua conta de forma segura e prática.
              </Text>
            </CardHeader>
            <CardBody>
              <Stack spacing={6}>
                <Button
                  leftIcon={<FaKey size={22} color="#83a11d" />}
                  variant="outline"
                  colorScheme="green"
                  size="lg"
                  fontWeight="bold"
                  borderRadius="xl"
                  borderWidth={2}
                  borderColor="#83a11d"
                  _hover={{ bg: "#f7fafc", borderColor: "#c0ab8e" }}
                  onClick={handleOpenPasswordModal}
                  transition="all 0.2s"
                >
                  Alterar Senha
                </Button>
                <Button
                  leftIcon={<FaRegCreditCard size={22} color="#83a11d" />}
                  variant="outline"
                  colorScheme="green"
                  size="lg"
                  fontWeight="bold"
                  borderRadius="xl"
                  borderWidth={2}
                  borderColor="#83a11d"
                  _hover={{ bg: "#f7fafc", borderColor: "#c0ab8e" }}
                  onClick={() => navigation("/pagamento")}
                  transition="all 0.2s"
                >
                  Trocar Plano
                </Button>
                <Button
                  leftIcon={<FaTrashAlt size={22} color="#973a34" />}
                  variant="outline"
                  colorScheme="red"
                  size="lg"
                  fontWeight="bold"
                  borderRadius="xl"
                  borderWidth={2}
                  borderColor="#973a34"
                  _hover={{ bg: "#fff5f5", borderColor: "#c53030" }}
                  onClick={handleDeleteAccount}
                  transition="all 0.2s"
                >
                  Deletar Conta
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </Box>
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
            <Stack spacing={4}>
              <InputGroup>
                <Input
                  placeholder="Senha Atual"
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /\s/g,
                      ""
                    );
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowCurrent(!showCurrent)}
                  >
                    {showCurrent ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                  <Button
                    variant="ghost"
                    _hover={{ background: "transparent" }}
                    onClick={() =>
                      handleToggleRecording("currentPassword", {
                        setter: setCurrentPassword,
                        trim: true,
                      })
                    }
                    isLoading={recordingField === "currentPassword"}
                  >
                    <Image src={IconVoice} w="16px" />
                  </Button>
                </InputRightElement>
              </InputGroup>
              <InputGroup>
                <Input
                  placeholder="Nova Senha"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /\s/g,
                      ""
                    );
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowNew(!showNew)}
                  >
                    {showNew ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                  <Button
                    variant="ghost"
                    _hover={{ background: "transparent" }}
                    onClick={() =>
                      handleToggleRecording("newPassword", {
                        setter: setNewPassword,
                        trim: true,
                      })
                    }
                    isLoading={recordingField === "newPassword"}
                  >
                    <Image src={IconVoice} w="16px" />
                  </Button>
                </InputRightElement>
              </InputGroup>
              <InputGroup>
                <Input
                  placeholder="Confirmar Nova Senha"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /\s/g,
                      ""
                    );
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                  <Button
                    variant="ghost"
                    _hover={{ background: "transparent" }}
                    onClick={() =>
                      handleToggleRecording("confirmPassword", {
                        setter: setConfirmPassword,
                        trim: true,
                      })
                    }
                    isLoading={recordingField === "confirmPassword"}
                  >
                    <Image src={IconVoice} w="16px" />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
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
