import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Textarea,
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
import { FiMapPin, FiCamera } from "react-icons/fi";
import axios from "axios";
import ImagemPerfil from "../../assets/plataforma-vovo.png";
import AppLoading from "../../components/loading/AppLoading";
import AppSelect from "../configuração/AppSelect";
import AppProducts from "./AppProducts";

const API_URL = import.meta.env.VITE_API_URL;

const getProfileImageUrl = (imgPath) => {
  if (!imgPath) return "";
  if (imgPath.startsWith("http") || imgPath.startsWith("blob:")) return imgPath;
  return `${API_URL.replace(/\/$/, "")}/${imgPath.replace(/^\/+/, "")}`;
};

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
      <FormControl id={name}>
        <FormLabel
          display="flex"
          alignItems="center"
          color="gray.300"
          fontSize="sm"
        >
          {icon && <Icon as={icon} mr={2} />} {label}
        </FormLabel>
        <Input
          name={name}
          type={inputType}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder || `Seu ${label.toLowerCase()}`}
          color="black"
          bg="transparent"
          border={"2px solid  #83a11d"}
          _hover={{ border: "2px solid  #83a11d" }}
          _focus={{
            borderColor: "#c0ab8e",
            boxShadow: "0 0 0 1px #e5d1b0",
          }}
        />
      </FormControl>
    );
  }
  return (
    <Box>
      <Text fontSize="sm" color="gray.400" display="flex" alignItems="center">
        {icon && <Icon as={icon} mr={2} />} {label}
      </Text>
      <Text
        fontSize="md"
        p={2}
        borderWidth="1px"
        borderRadius="md"
        minHeight="40px"
        border={"2px solid  #83a11d"}
      >
        {value || "Não informado"}
      </Text>
    </Box>
  );
};

function AppPerfil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    propertyName: "",
    cityName: "",
    stateName: "",
    phoneNumber: "",
    imageProfile: "",
    historia: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loggedInUserId = localStorage.getItem("userId");
  const canEditCurrentProfile = !id || id === loggedInUserId;
  const userIdToFetch = id || loggedInUserId;

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    const userIdToFetch = id || localStorage.getItem("userId");
    if (!token || !userIdToFetch) {
      setError("Token ou ID do usuário não encontrado. Faça login novamente.");
      setIsLoading(false);
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/user/${userIdToFetch}`, {
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
        imageProfile: farmerData.imageProfile || "",
        historia: farmerData.historia || "",
      });
      if (farmerData.username) {
        localStorage.setItem("username", farmerData.username);
      }
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 401 ||
          err.response.data?.msg?.toLowerCase().includes("token"))
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
          "Falha ao carregar dados do perfil. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate, toast]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUserData();
  }, [fetchUserData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
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
        historia: userData.historia || "",
      });
      setSelectedImage(null);
    }
    setIsEditing(!isEditing);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const form = new FormData();
    let hasChanges = false;
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== userData[key] && key !== "imageProfile") {
        if (key === "historia") {
          form.append("historia", formData["historia"]);
        } else {
          form.append(key, formData[key]);
        }
        hasChanges = true;
      }
    });
    if (selectedImage) {
      form.append("profileImage", selectedImage);
      hasChanges = true;
    }
    if (newPassword) {
      form.append("password", newPassword);
      hasChanges = true;
    }
    if (!hasChanges) {
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
      await axios.put(`${API_URL}/user/${userId}/edit`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Perfil atualizado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
      fetchUserData();
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Falha ao atualizar o perfil. Tente novamente."
      );
      toast({
        title: "Erro ao Atualizar",
        description: err.response?.data?.msg || "Tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <AppLoading />;
  }

  if (error && !userData) {
    return (
      <Center height="80vh" bg="white" color="black">
        <Box p={8} borderWidth={1} borderRadius="lg" bg="#EDD1AF" color="white">
          <Alert status="error" borderRadius="md" bg="red.500">
            <AlertIcon color="white" />
            {error}
          </Alert>
          <Button
            mt={4}
            color="#52601A"
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
      <Center height="80vh" bg="#1F1F2B">
        <Text color="white">Não foi possível carregar os dados do perfil.</Text>
      </Center>
    );
  }

  const profileImageUrl = selectedImage
    ? URL.createObjectURL(selectedImage)
    : getProfileImageUrl(userData.imageProfile);

  return (
    <Box bg="##f0f0f0" minH="100vh" color="black">
      <Box
        h={{ base: "200px", md: "250px" }}
        bgImage={`url(${ImagemPerfil})`}
        bgSize="cover"
        bgPosition="center"
        position="relative"
      >
        <Box position="absolute" inset="0" bg="rgba(0, 0, 0, 0.6)" />
      </Box>
      <Flex
        direction={{ base: "column", lg: "row" }}
        maxW="1400px"
        mx="auto"
        p={{ base: 4, lg: 8 }}
        gap={8}
      >
        <VStack
          as="aside"
          w={{ base: "100%", lg: "300px" }}
          align="flex-start"
          spacing={5}
          flexShrink={0}
          mt={{ base: "-100px", md: "-120px" }}
          zIndex="2"
        >
          <Box position="relative">
            <Avatar
              boxSize={{ base: "200px", md: "300px" }}
              name={userData.username}
              src={profileImageUrl}
              border="4px solid #52601A"
            />
            {isEditing && (
              <IconButton
                icon={<FiCamera />}
                aria-label="Trocar foto"
                size="sm"
                isRound
                color="#52601A"
                position="absolute"
                bottom="5px"
                right="5px"
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              />
            )}
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              display="none"
            />
          </Box>
          <VStack align="flex-start" spacing={1} w="full">
            <Flex w="full" justify="space-between" align="center">
              <Heading as="h1" size="lg">
                {formData.username || "Usuário"}
              </Heading>
              {canEditCurrentProfile && !isEditing && userData && (
                <Tooltip label="Editar Perfil" placement="top">
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Editar Perfil"
                    onClick={handleEditToggle}
                    variant="ghost"
                    color="#52601A"
                  />
                </Tooltip>
              )}
            </Flex>
            <Tag
              colorScheme={userData.role === "consumidor" ? "blue" : "green"}
              size="md"
              variant="solid"
              borderRadius="full"
            >
              {userData.role === "consumidor" ? "Consumidor" : "Agricultor"}
            </Tag>
          </VStack>
          {isEditing ? (
            <Textarea
              name="historia"
              value={formData.historia}
              onChange={handleInputChange}
              placeholder="Conte um pouco da sua história..."
              color="black"
              bg="transparent"
              border={"2px solid  #83a11d"}
              _hover={{ border: "2px solid  #83a11d" }}
              _focus={{
                borderColor: "#c0ab8e",
                boxShadow: "0 0 0 1px #e5d1b0",
              }}
              display="flex"
              fontSize="sm"
              minH="60px"
            />
          ) : (
            <Text color="gray.400" fontSize="sm" display="block">
              {userData.historia}
            </Text>
          )}
        </VStack>
        <Box as="main" flex={1} w="100%" mt={{ base: 4, lg: 0 }}>
          <Tabs variant="unstyled">
            <TabList>
              <Tab
                _selected={{
                  color: "white",
                  bg: "#52601A",
                  borderRadius: "lg",
                }}
                color="gray.400"
              >
                Meu Perfil
              </Tab>
              {userData.role !== "consumidor" && (
                <Tab
                  _selected={{
                    color: "white",
                    bg: "#52601A",
                    borderRadius: "lg",
                  }}
                  color="gray.400"
                >
                  Meus Produtos
                </Tab>
              )}
            </TabList>
            <TabPanels mt={6}>
              <TabPanel p={0}>
                <Box boxShadow="xl" p={{ base: 4, md: 6 }} borderRadius="lg">
                  <form onSubmit={handleEditSubmit}>
                    <VStack spacing={6} align="stretch">
                      {error && (
                        <Alert status="error" borderRadius="md">
                          <AlertIcon />
                          {error}
                        </Alert>
                      )}
                      <ProfileDetailItem
                        icon={AtSignIcon}
                        label="Nome de Usuário"
                        name="username"
                        value={userData.username}
                        isEditing={isEditing}
                        formData={formData}
                        handleInputChange={handleInputChange}
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
                      />
                      <ProfileDetailItem
                        icon={InfoOutlineIcon}
                        label="Nome da Propriedade"
                        name="propertyName"
                        value={userData.propertyName}
                        isEditing={isEditing}
                        formData={formData}
                        handleInputChange={handleInputChange}
                      />
                      {isEditing ? (
                        <AppSelect
                          selectedEstado={formData.stateName}
                          setSelectedEstado={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              stateName: value,
                              cityName: "",
                            }))
                          }
                          selectedCidade={formData.cityName}
                          setSelectedCidade={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              cityName: value,
                            }))
                          }
                          toast={toast}
                          labelEstado="Estado"
                          labelCidade="Cidade"
                        />
                      ) : (
                        <ProfileDetailItem
                          icon={FiMapPin}
                          label="Localização"
                          name="location"
                          value={`${
                            userData.cityName || "Cidade não informada"
                          }, ${userData.stateName || "Estado não informado"}`}
                          isEditing={false}
                        />
                      )}
                      {isEditing && (
                        <Button
                          mt={4}
                          leftIcon={<CheckIcon />}
                          color="white"
                          bg="#52601A"
                          type="submit"
                          isLoading={isSubmitting}
                          loadingText="Salvando..."
                          width="full"
                          size="lg"
                          _hover={{ bg: "#EDD1AF" }}
                        >
                          Salvar Alterações
                        </Button>
                      )}
                    </VStack>
                  </form>
                </Box>
              </TabPanel>
              {userData.role !== "consumidor" && (
                <TabPanel>
                  <Center
                    boxShadow="xl"
                    borderRadius="lg"
                    background={"#EDD1AF"}
                    p={6}
                  >
                    <AppProducts
                      isOwner={canEditCurrentProfile}
                      viewedUserId={userIdToFetch}
                    />
                  </Center>
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Box>
  );
}

export default AppPerfil;
