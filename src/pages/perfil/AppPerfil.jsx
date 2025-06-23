import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Textarea,
  Skeleton,
  useColorModeValue,
  HStack,
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
import {
  FiMapPin,
  FiCamera,
  FiUser,
  FiBox,
  FiBookOpen,
  FiMic,
  FiMicOff,
} from "react-icons/fi";
import axios from "axios";
import ImagemPerfil from "../../assets/plataforma-vovo.png";
import AppLoading from "../../components/loading/AppLoading";
import AppSelect from "../configuração/AppSelect";
import AppProducts from "./AppProducts";
import ProfileDetailItem from "./ProfileDetailItem";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";

const API_URL = import.meta.env.VITE_API_URL;

const getProfileImageUrl = (imgPath) => {
  if (!imgPath) return "";
  if (imgPath.startsWith("http") || imgPath.startsWith("blob:")) return imgPath;
  return `${API_URL.replace(/\/$/, "")}/${imgPath.replace(/^\/+/, "")}`;
};

function AppPerfil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef();
  const toastIdRef = useRef(null);

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loggedInUserId = localStorage.getItem("userId");
  const canEditCurrentProfile = !id || id === loggedInUserId;
  const userId = id || loggedInUserId;

  const { handleToggleRecording, recordingField } = useSpeechRecognition({
    fieldSetter: (value) => {
      if (activeVoiceField) {
        setFormData((prev) => ({
          ...prev,
          [activeVoiceField]: value,
        }));
        setActiveVoiceField(null);
      }
    },
  });

  const [activeVoiceField, setActiveVoiceField] = useState(null);

  const bgColor = useColorModeValue("#f7fafc", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("#83a11d", "#a4cc24");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const accentColor = "#52601A";
  const accentBg = useColorModeValue("#f5fbe7", "#232d13");

  const handleSessionExpired = useCallback(() => {
    localStorage.clear();
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
  }, [toast]);

  const handleApiError = useCallback(
    (err) => {
      if (
        err.response &&
        (err.response.status === 401 ||
          err.response.data?.msg?.toLowerCase().includes("token"))
      ) {
        handleSessionExpired();
        return;
      }
      setError(
        err.response?.data?.msg ||
          "Falha ao carregar dados do perfil. Tente novamente."
      );
      setIsLoading(false);
    },
    [handleSessionExpired]
  );

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    if (!token || !userId) {
      setError("Token ou ID do usuário não encontrado. Faça login novamente.");
      setIsLoading(false);
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/user/${userId}`, {
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
      handleApiError(err);
      return;
    }
    setIsLoading(false);
  }, [id, handleApiError, userId, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    fetchUserData();
  }, [id, userId, fetchUserData, navigate]);

  useEffect(() => {
    window.scrollTo({
      top: 120,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "A imagem deve ter menos de 5MB.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      setSelectedImage(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleVoiceRecording = (fieldName) => {
    setActiveVoiceField(fieldName);
    handleToggleRecording(fieldName, {
      setter: (value) => {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: value,
        }));
      },
    });
  };

  const handleEditToggle = () => {
    if (isEditing) {
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
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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

    // Debug logs
    console.log("FormData atual:", formData);
    console.log("UserData original:", userData);

    // Verificar mudanças em todos os campos exceto imageProfile
    Object.keys(formData).forEach((key) => {
      if (key !== "imageProfile" && key !== "historia") {
        const currentValue = formData[key] || "";
        const originalValue = userData[key] || "";
        if (currentValue !== originalValue) {
          form.append(key, currentValue);
          hasChanges = true;
          console.log(`Campo ${key} mudou:`, {
            original: originalValue,
            current: currentValue,
          });
        }
      }
    });

    // Verificar especificamente se a história mudou
    const currentHistoria = formData.historia || "";
    const originalHistoria = userData.historia || "";
    if (currentHistoria !== originalHistoria) {
      form.append("historia", currentHistoria);
      hasChanges = true;
      console.log("História mudou:", {
        original: originalHistoria,
        current: currentHistoria,
      });
    }

    if (selectedImage) {
      form.append("profileImage", selectedImage);
      hasChanges = true;
      console.log("Imagem selecionada");
    }

    console.log("HasChanges:", hasChanges);

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
      console.log("Enviando dados para API...");
      const response = await axios.put(`${API_URL}/user/${userId}/edit`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Resposta da API:", response.data);
      toast({
        title: "Perfil atualizado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
      fetchUserData();
    } catch (err) {
      console.error("Erro na API:", err.response?.data || err.message);
      handleApiError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <AppLoading />;
  }

  if (error && !userData) {
    return (
      <Center height="80vh" bg={bgColor}>
        <Box p={8} borderWidth={1} borderRadius="lg">
          <Alert status="error" borderRadius="md" bg="red.500">
            <AlertIcon color="white" />
            {error}
          </Alert>
          <Button
            mt={4}
            color={accentColor}
            onClick={() => {
              setError(null);
              fetchUserData();
            }}
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
      <Center height="80vh" bg={bgColor}>
        <Text color={textColor}>
          Não foi possível carregar os dados do perfil.
        </Text>
      </Center>
    );
  }

  const profileImageUrl = selectedImage
    ? URL.createObjectURL(selectedImage)
    : getProfileImageUrl(userData.imageProfile);

  return (
    <Box color={textColor}>
      <Box
        h={{ base: "180px", md: "60vh" }}
        bgImage={`url(${ImagemPerfil})`}
        bgSize="cover"
        bgPosition="center"
        position="relative"
      >
        <Box position="absolute" inset="0" bg="rgba(0, 0, 0, 0.5)" />
      </Box>

      <Flex
        direction={{ base: "column", lg: "row" }}
        p={{ base: 2, md: 6 }}
        gap={8}
        mt={{ base: -20, md: -28 }}
        zIndex={2}
        minH="100vh"
      >
        <Box
          as="aside"
          w={{ base: "100%", lg: "500px" }}
          bg={cardBg}
          boxShadow="2xl"
          borderRadius="2xl"
          p={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={{ base: 8, lg: 0 }}
          minH="600px"
        >
          <Box position="relative" mb={4}>
            <Skeleton isLoaded={!isLoading}>
              <Avatar
                boxSize={{ base: "120px", md: "300px" }}
                name={userData.username}
                src={profileImageUrl}
                border={`4px solid ${borderColor}`}
                shadow="lg"
              />
            </Skeleton>
            {isEditing && (
              <Tooltip label="Trocar foto" placement="top">
                <IconButton
                  icon={<FiCamera />}
                  aria-label="Trocar foto"
                  size="sm"
                  isRound
                  color={accentColor}
                  position="absolute"
                  bottom="5px"
                  right="5px"
                  onClick={() => fileInputRef.current?.click()}
                  bg={accentBg}
                  _hover={{ bg: accentColor, color: "white" }}
                />
              </Tooltip>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            {selectedImage && isEditing && (
              <Button
                size="xs"
                mt={2}
                colorScheme="red"
                variant="ghost"
                onClick={handleRemoveImage}
              >
                Remover Imagem
              </Button>
            )}
          </Box>

          <VStack align="center" spacing={1} w="full">
            <Flex w="full" justify="center" align="center" gap={2}>
              <Heading as="h1" size="lg" textAlign="center">
                {formData.username || "Usuário"}
              </Heading>
              {canEditCurrentProfile && !isEditing && (
                <Tooltip label="Editar perfil">
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Editar perfil"
                    size="sm"
                    onClick={handleEditToggle}
                  />
                </Tooltip>
              )}
              {isEditing && (
                <HStack>
                  <Tooltip label="Salvar">
                    <IconButton
                      icon={<CheckIcon />}
                      aria-label="Salvar"
                      size="sm"
                      colorScheme="green"
                      type="submit"
                      form="profile-edit-form"
                      isLoading={isSubmitting}
                    />
                  </Tooltip>
                  <Tooltip label="Cancelar">
                    <IconButton
                      icon={<CloseIcon />}
                      aria-label="Cancelar"
                      size="sm"
                      colorScheme="red"
                      onClick={handleEditToggle}
                    />
                  </Tooltip>
                </HStack>
              )}
            </Flex>
            {isEditing && (
              <Flex align="center" gap={2} mt={2}>
                <FiMic color={accentColor} size={16} />
                <Text fontSize="sm" color={accentColor} fontWeight="medium">
                  Use os botões de microfone para preencher os campos com voz
                </Text>
              </Flex>
            )}
            <Tag
              colorScheme={userData.role === "consumidor" ? "blue" : "green"}
              size="md"
              variant="solid"
              borderRadius="full"
              margin={"10px"}
            >
              {userData.role === "consumidor" ? "Consumidor" : "Agricultor"}
            </Tag>
          </VStack>
          {userData.role !== "consumidor" && (
            <Box
              w="full"
              bg={accentBg}
              borderRadius="lg"
              p={4}
              mb={2}
              boxShadow="md"
              minH="80px"
            >
              <Flex align="center" gap={2} mb={1}>
                <FiBookOpen color={accentColor} size={18} />
                <Text fontWeight="bold">História</Text>
              </Flex>
              {isEditing ? (
                <Box>
                  <HStack spacing={2} mb={2}>
                    <Text fontWeight="bold" fontSize="sm">
                      História
                    </Text>
                    <Tooltip
                      label={
                        recordingField === "historia"
                          ? "Parar gravação"
                          : "Gravar história com voz"
                      }
                      placement="top"
                    >
                      <IconButton
                        icon={
                          recordingField === "historia" ? (
                            <FiMicOff />
                          ) : (
                            <FiMic />
                          )
                        }
                        aria-label={
                          recordingField === "historia"
                            ? "Parar gravação"
                            : "Gravar história com voz"
                        }
                        size="xs"
                        colorScheme={
                          recordingField === "historia" ? "red" : "green"
                        }
                        onClick={() => handleVoiceRecording("historia")}
                        variant={
                          recordingField === "historia" ? "solid" : "outline"
                        }
                      />
                    </Tooltip>
                  </HStack>
                  <Textarea
                    name="historia"
                    value={formData.historia}
                    onChange={handleInputChange}
                    placeholder="Conte um pouco da sua história..."
                    color={textColor}
                    bg="transparent"
                    border={`2px solid ${borderColor}`}
                    _hover={{ border: `2px solid ${borderColor}` }}
                    _focus={{
                      borderColor: accentColor,
                      boxShadow: `0 0 0 1px ${accentColor}`,
                    }}
                    minH="80px"
                  />
                </Box>
              ) : (
                <Text color={textColor} fontSize="sm" mt={1}>
                  {userData.historia || "Nenhuma história compartilhada ainda."}
                </Text>
              )}
            </Box>
          )}
        </Box>

        <Box
          as="main"
          flex={1}
          w="100%"
          mt={{ base: "40px", lg: "32px" }}
          minH="600px"
        >
          <Tabs variant="soft-rounded" colorScheme="green" isFitted>
            <TabList mb={4}>
              <Tab style={{ color: "white" }} _selected={{ bg: accentColor }}>
                <FiUser style={{ marginRight: 8 }} /> Perfil
              </Tab>
              {userData.role !== "consumidor" && (
                <Tab style={{ color: "white" }} _selected={{ bg: accentColor }}>
                  <FiBox style={{ marginRight: 8 }} /> Produtos
                </Tab>
              )}
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                <Box
                  boxShadow="xl"
                  p={{ base: 4, md: 6 }}
                  borderRadius="0px 0px 20px 20px"
                  bg={cardBg}
                  minH="500px"
                >
                  <form id="profile-edit-form" onSubmit={handleEditSubmit}>
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
                        onVoiceRecording={
                          isEditing ? handleVoiceRecording : null
                        }
                        isRecording={recordingField === "username"}
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
                        onVoiceRecording={
                          isEditing ? handleVoiceRecording : null
                        }
                        isRecording={recordingField === "email"}
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
                        onVoiceRecording={
                          isEditing ? handleVoiceRecording : null
                        }
                        isRecording={recordingField === "phoneNumber"}
                      />

                      <ProfileDetailItem
                        icon={InfoOutlineIcon}
                        label="Nome da Propriedade"
                        name="propertyName"
                        value={userData.propertyName}
                        isEditing={isEditing}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        onVoiceRecording={
                          isEditing ? handleVoiceRecording : null
                        }
                        isRecording={recordingField === "propertyName"}
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
                    </VStack>
                  </form>
                </Box>
              </TabPanel>

              {userData.role !== "consumidor" && (
                <TabPanel padding={0}>
                  <Box
                    boxShadow="xl"
                    borderRadius="0px 0px 20px 20px"
                    p={6}
                    minH="500px"
                    bg={cardBg}
                  >
                    <AppProducts
                      isOwner={canEditCurrentProfile}
                      viewedUserId={userId}
                    />
                  </Box>
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
