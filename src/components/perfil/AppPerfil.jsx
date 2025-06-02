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

const getProfileImageUrl = (imgPath) => {
  if (!imgPath) return "";
  if (imgPath.startsWith("http")) return imgPath;
  return `http://localhost:3000${imgPath}`;
};

function FarmerProfile() {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    propertyName: "",
    cityName: "",
    stateName: "",
    phoneNumber: "",
    imageProfile: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
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
      setRole(farmerData.role || "");
      setFormData({
        username: farmerData.username || "",
        email: farmerData.email || "",
        propertyName: farmerData.propertyName || "",
        cityName: farmerData.cityName || "",
        stateName: farmerData.stateName || "",
        phoneNumber: farmerData.phoneNumber || "",
        imageProfile: farmerData.imageProfile || "",
      });
      if (farmerData.username) {
        setUserName(farmerData.username);
        localStorage.setItem("username", farmerData.username);
      }
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 401 ||
          err.response.data?.msg?.toLowerCase().includes("token") ||
          err.response.data?.message?.toLowerCase().includes("token"))
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        toast({
          title: "Sessão expirada",
          description: "Sua sessão expirou. Faça login novamente.",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        return;
      }
      console.error(
        "Erro ao buscar dados do usuário:",
        err.response?.data?.msg || err.message
      );
      setError(
        err.response?.data?.msg ||
          "Falha ao carregar dados do perfil. Tente novamente."
      );
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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setFormData((prev) => ({ ...prev, imageProfile: e.target.files[0] }));
    }
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
        imageProfile: userData.imageProfile || "",
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
        imageProfile: updatedUser.imageProfile || "",
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
      if (
        err.response &&
        (err.response.status === 401 ||
          err.response.data?.msg?.toLowerCase().includes("token") ||
          err.response.data?.message?.toLowerCase().includes("token"))
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        toast({
          title: "Sessão expirada",
          description: "Sua sessão expirou. Faça login novamente.",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        return;
      }
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

  const handleEdit = async (e) => {
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

    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("propertyName", formData.propertyName);
    form.append("cityName", formData.cityName);
    form.append("stateName", formData.stateName);
    form.append("phoneNumber", formData.phoneNumber);
    if (selectedImage) {
      form.append("profileImage", selectedImage);
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/user/${userId}/edit`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
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
        imageProfile: updatedUser.imageProfile || "",
      });
      setSelectedImage(null);
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
      if (
        err.response &&
        (err.response.status === 401 ||
          err.response.data?.msg?.toLowerCase().includes("token") ||
          err.response.data?.message?.toLowerCase().includes("token"))
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        toast({
          title: "Sessão expirada",
          description: "Sua sessão expirou. Faça login novamente.",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        return;
      }
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

  const fileInputRef = React.useRef();

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
  const profileTitle =
    role === "consumidor" ? "Perfil do Consumidor" : "Perfil do Agricultor";

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
        <VStack spacing={4} zIndex="2" px={4} mt={{ base: "5rem", md: 100 }}>
          <Avatar
            name={userData.username}
            src={getProfileImageUrl(userData.imageProfile)}
            boxSize={{ base: "200px", md: "300px" }}
            border="4px solid white"
            boxShadow="lg"
          />
          <Heading as="h1" size="xl" fontWeight="bold">
            <Typewriter
              words={[
                `Olá, ${
                  userName ||
                  (role === "consumidor" ? "Consumidor" : "Agricultor")
                }!`,
              ]}
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
        mt={{ base: "-2rem", md: "-3rem" }}
        mb={{ base: 0, md: 16 }}
        p={{ base: 4, md: 8 }}
        shadow="xl"
        borderWidth="1px"
        borderRadius={{ base: "none", md: "lg" }}
        bg="white"
        zIndex="3"
        position="relative"
      >
        <Flex justifyContent="center" alignItems="center" mb={6}>
          <Heading as="h2" size="lg" color="green.700">
            {profileTitle}
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

        <form onSubmit={isEditing ? handleEdit : handleSubmit}>
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
            {isEditing && (
              <FormControl mb={4}>
                <FormLabel>Foto de Perfil</FormLabel>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    size="xl"
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : getProfileImageUrl(userData.imageProfile)
                    }
                    cursor="pointer"
                    onClick={() =>
                      fileInputRef.current && fileInputRef.current.click()
                    }
                    _hover={{ opacity: 0.8, boxShadow: "0 0 0 2px #38A169" }}
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    display="none"
                  />
                  {selectedImage && (
                    <Button
                      mt={2}
                      colorScheme="red"
                      size="sm"
                      onClick={() => {
                        setSelectedImage(null);
                        setFormData((prev) => ({
                          ...prev,
                          imageProfile: userData.imageProfile || "",
                        }));
                      }}
                    >
                      Remover foto selecionada
                    </Button>
                  )}
                </Box>
              </FormControl>
            )}
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
