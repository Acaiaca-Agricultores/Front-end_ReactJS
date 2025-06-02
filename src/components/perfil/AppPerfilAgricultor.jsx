import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
  Flex,
  Avatar,
  IconButton,
  Tooltip,
  Center,
  Icon,
} from "@chakra-ui/react";
import {
  EditIcon,
  CheckIcon,
  CloseIcon,
  EmailIcon,
  PhoneIcon,
  AtSignIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";
import ImagemFeira from "../../assets/feira.jpg";

const ProfileDetailItem = ({
  icon,
  label,
  value,
  isEditing,
  name,
  formData,
  handleInputChange,
  placeholder,
  inputType = "text",
}) => {
  if (isEditing) {
    return (
      <FormControl id={name} mb={4}>
        <FormLabel display="flex" alignItems="center">
          {icon && <Icon as={icon} mr={2} />} {label}
        </FormLabel>
        <Input
          name={name}
          type={inputType}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder || `Seu ${label.toLowerCase()}`}
        />
      </FormControl>
    );
  }
  return (
    <Box mb={4}>
      <Text fontSize="sm" color="gray.500" display="flex" alignItems="center">
        {icon && <Icon as={icon} mr={2} />} {label}
      </Text>
      <Text
        fontSize="md"
        p={2}
        borderWidth="1px"
        borderRadius="md"
        minHeight="40px"
        borderColor="gray.200"
      >
        {value || "Não informado"}
      </Text>
    </Box>
  );
};

function FarmerProfile() {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    propertyName: "",
    cityName: "",
    stateName: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("username");

    if (storedUserName) {
      setUserName(storedUserName);
    }

    if (!token || !userId) {
      setError("Token ou ID do usuário não encontrado. Faça login novamente.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const farmerData = response.data.user;
      setUserData(farmerData);
      setFormData({
        username: farmerData.username || "",
        email: farmerData.email || "",
        propertyName: farmerData.propertyName || "",
        cityName: farmerData.cityName || "",
        stateName: farmerData.stateName || "",
        phoneNumber: farmerData.phoneNumber || "",
      });
      if (farmerData.username) {
        setUserName(farmerData.username);
        localStorage.setItem("username", farmerData.username);
      }
    } catch (err) {
      console.error(
        "Erro ao buscar dados do usuário:",
        err.response?.data?.msg || err.message
      );
      setError(
        err.response?.data?.msg ||
          "Falha ao carregar dados do perfil. Tente novamente."
      );
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing && userData) {
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
        propertyName: userData.propertyName || "",
        cityName: userData.cityName || "",
        stateName: userData.stateName || "",
        phoneNumber: userData.phoneNumber || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast({
        title: "Erro de Autenticação",
        description:
          "Token ou ID do usuário não encontrado. Faça login novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    const changedData = {};
    for (const key in formData) {
      if (formData[key] !== userData[key] && formData[key] !== "") {
        changedData[key] = formData[key];
      } else if (!userData[key] && formData[key] !== "") {
        changedData[key] = formData[key];
      }
    }

    if (Object.keys(changedData).length === 0) {
      toast({
        title: "Nenhuma alteração detectada.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/user/${userId}`,
        changedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedUser = response.data.user;
      setUserData(updatedUser);
      setFormData({
        username: updatedUser.username || "",
        email: updatedUser.email || "",
        propertyName: updatedUser.propertyName || "",
        cityName: updatedUser.cityName || "",
        stateName: updatedUser.stateName || "",
        phoneNumber: updatedUser.phoneNumber || "",
      });
      if (updatedUser.username) {
        setUserName(updatedUser.username);
        localStorage.setItem("username", updatedUser.username);
      }
      toast({
        title: "Perfil atualizado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Falha ao atualizar o perfil. Tente novamente."
      );
      toast({
        title: "Erro ao Atualizar",
        description:
          err.response?.data?.msg ||
          "Falha ao atualizar o perfil. Tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh" bg="gray.50">
        <Spinner size="xl" color="green.500" />
      </Flex>
    );
  }

  if (error && !userData) {
    return (
      <Center height="80vh" bg="gray.50">
        <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
          <Button
            mt={4}
            colorScheme="green"
            onClick={() => fetchUserData()}
            isLoading={isLoading}
          >
            Tentar Novamente
          </Button>
        </Box>
      </Center>
    );
  }

  if (!userData) {
    return (
      <Center height="80vh" bg="gray.50">
        <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
          <Text>Não foi possível carregar os dados do perfil.</Text>
          <Button
            mt={4}
            colorScheme="green"
            onClick={() => fetchUserData()}
            isLoading={isLoading}
          >
            Tentar Novamente
          </Button>
        </Box>
      </Center>
    );
  }

  return (
    <>
      <Flex
        as="section"
        role="region"
        aria-label="Seção de boas-vindas e avatar"
        backgroundImage={`url(${ImagemFeira})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        position="relative"
        alignItems="center"
        justifyContent="center"
        color="white"
        py={{ base: 10, md: 16 }}
        textAlign="center"
      >
        <Box
          position="absolute"
          inset="0"
          background="rgba(0, 0, 0, 0.6)"
          backdropFilter="blur(3px)"
          zIndex="1"
        />
        <VStack spacing={4} zIndex="2" px={4} mt={{ base: 0, md: 100 }}>
          <Avatar
            name={userData.username}
            src={
              userData.avatarUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                userData.username || "A"
              )}&background=2D8555&color=fff&size=128`
            }
            size="2xl"
            border="4px solid white"
            boxShadow="lg"
          />
          <Heading as="h1" size="xl" fontWeight="bold">
            <Typewriter
              words={[`Olá, ${userName || "Agricultor"}!`]}
              loop={1}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </Heading>
          <Text fontSize="lg" maxWidth="600px">
            Gerencie suas informações e mantenha seu perfil atualizado.
          </Text>
        </VStack>
      </Flex>

      <Box
        maxWidth="700px"
        margin="auto"
        mt={{ base: "-50px", md: "-3rem" }}
        mb={10}
        p={{ base: 4, md: 8 }}
        shadow="xl"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
        zIndex="3"
        position="relative"
      >
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading as="h2" size="lg" color="green.700">
            Perfil do Agricultor 🌱
          </Heading>
          <Tooltip
            label={isEditing ? "Cancelar Edição" : "Editar Perfil"}
            placement="top"
            hasArrow
          >
            <IconButton
              icon={isEditing ? <CloseIcon /> : <EditIcon />}
              onClick={handleEditToggle}
              aria-label={isEditing ? "Cancelar Edição" : "Editar Perfil"}
              variant="ghost"
              colorScheme="green"
              size="lg"
            />
          </Tooltip>
        </Flex>

        {error && (
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <ProfileDetailItem
              icon={AtSignIcon}
              label="Nome de Usuário"
              name="username"
              value={userData.username}
              isEditing={isEditing}
              formData={formData}
              handleInputChange={handleInputChange}
              placeholder="Seu nome de usuário"
            />
            <ProfileDetailItem
              icon={EmailIcon}
              label="Email"
              name="email"
              value={userData.email}
              isEditing={isEditing}
              formData={formData}
              handleInputChange={handleInputChange}
              inputType="email"
              placeholder="seuemail@exemplo.com"
            />
            <ProfileDetailItem
              icon={PhoneIcon}
              label="Telefone"
              name="phoneNumber"
              value={userData.phoneNumber}
              isEditing={isEditing}
              formData={formData}
              handleInputChange={handleInputChange}
              inputType="tel"
              placeholder="(00) 00000-0000"
            />
            <ProfileDetailItem
              icon={InfoOutlineIcon}
              label="Nome da Propriedade"
              name="propertyName"
              value={userData.propertyName}
              isEditing={isEditing}
              formData={formData}
              handleInputChange={handleInputChange}
              placeholder="Ex: Sítio Esperança"
            />
            <ProfileDetailItem
              label="Cidade"
              name="cityName"
              value={userData.cityName}
              isEditing={isEditing}
              formData={formData}
              handleInputChange={handleInputChange}
              placeholder="Sua cidade"
            />
            <ProfileDetailItem
              label="Estado"
              name="stateName"
              value={userData.stateName}
              isEditing={isEditing}
              formData={formData}
              handleInputChange={handleInputChange}
              placeholder="Seu estado"
            />
          </VStack>
          {isEditing && (
            <Button
              mt={8}
              leftIcon={<CheckIcon />}
              colorScheme="green"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Salvando..."
              width="full"
              size="lg"
            >
              Salvar Alterações
            </Button>
          )}
        </form>
      </Box>
    </>
  );
}

export default FarmerProfile;
