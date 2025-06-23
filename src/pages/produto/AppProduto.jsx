import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  VStack,
  Heading,
  SimpleGrid,
  Image,
  useToast,
  Icon,
  Spinner,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import {
  MdCategory,
  MdDescription,
  MdAttachMoney,
  MdNumbers,
  MdDriveFileRenameOutline,
  MdArrowBack,
  MdCloudUpload,
} from "react-icons/md";
import ImagemFeira from "../../assets/feira.jpg";
import ImageDefault from "../../assets/default.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import IconVoice from "../../assets/icons/voice-command.png";

const CATEGORIES = [
  { value: "Frutas", label: "Frutas" },
  { value: "Verduras", label: "Verduras" },
  { value: "Legumes", label: "Legumes" },
  { value: "Tubérculos", label: "Tubérculos" },
  { value: "Grãos", label: "Grãos" },
  { value: "Oleaginosas", label: "Oleaginosas" },
  { value: "Temperos", label: "Temperos" },
  { value: "Chás", label: "Chás" },
  { value: "Mel", label: "Mel" },
  { value: "Ovos", label: "Ovos" },
  { value: "Laticínios", label: "Laticínios" },
];

const AppProduto = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const productToEdit = location.state?.product;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  const { handleToggleRecording, recordingField, stopRecording } =
    useSpeechRecognition({});

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || productToEdit.title || "",
        description: productToEdit.description || "",
        category: productToEdit.category || "",
        quantity: productToEdit.quantity?.toString() || "",
        price: productToEdit.price?.toString() || "",
      });
      setImagePreview(
        productToEdit.image
          ? productToEdit.image.startsWith("http")
            ? productToEdit.image
            : `${API_URL}${productToEdit.image}`
          : ""
      );
    }
  }, [productToEdit, API_URL]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (dropRef.current) dropRef.current.style.borderColor = "#c0ab8e";
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (dropRef.current) dropRef.current.style.borderColor = "#83a11d";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (dropRef.current) dropRef.current.style.borderColor = "#83a11d";
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    } else {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione apenas arquivos de imagem",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    } else {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione apenas arquivos de imagem",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleImageButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome do produto é obrigatório";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Nome do produto deve ter pelo menos 3 caracteres";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Descrição deve ter pelo menos 10 caracteres";
    }

    if (!formData.category) {
      newErrors.category = "Categoria é obrigatória";
    }

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = "Quantidade deve ser maior que zero";
    } else if (isNaN(Number(formData.quantity))) {
      newErrors.quantity = "Quantidade deve ser um número válido";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Preço deve ser maior que zero";
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = "Preço deve ser um número válido";
    }

    if (!productToEdit && !imageFile) {
      newErrors.image = "Foto do produto é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (recordingField) {
      stopRecording();
    }

    if (!validateForm()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os erros no formulário",
        status: "error",
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("category", formData.category);
      formDataToSend.append("quantity", Number(formData.quantity));
      formDataToSend.append("price", Number(formData.price));

      if (imageFile) {
        formDataToSend.append("productImage", imageFile);
      }

      const response = await fetch(`http://localhost:3000/product/register`, {
        method: "POST",
        body: formDataToSend,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: responseData.msg || "Produto cadastrado com sucesso!",
          status: "success",
          duration: 3000,
        });

        setFormData({
          name: "",
          description: "",
          category: "",
          quantity: "",
          price: "",
        });
        setImageFile(null);
        setImagePreview("");
        setErrors({});

        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        let errorMessage = responseData.msg || "Erro ao cadastrar produto";

        if (responseData.validation) {
          const validationErrors = [];
          if (responseData.validation.name) {
            validationErrors.push(
              `Nome: ${responseData.validation.name.currentLength}/${responseData.validation.name.minLength} caracteres`
            );
          }
          if (responseData.validation.description) {
            validationErrors.push(
              `Descrição: ${responseData.validation.description.currentLength}/${responseData.validation.description.minLength} caracteres`
            );
          }
          if (validationErrors.length > 0) {
            errorMessage = validationErrors.join(", ");
          }
        }

        toast({
          title: "Erro",
          description: errorMessage,
          status: "error",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast({
        title: "Erro de conexão",
        description: "Verifique sua conexão e tente novamente",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cardWidth = useBreakpointValue({
    base: "95vw",
    sm: "90vw",
    md: "700px",
    lg: "800px",
  });

  return (
    <Box
      height="100vh"
      backgroundImage={ImagemFeira}
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={8}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        boxSize={"100%"}
        background="rgba(0, 0, 0, 0.6)"
        backdropFilter="blur(8px)"
        color={"white"}
        paddingTop="6rem !important"
        height="100vh"
      >
        <Box
          w={cardWidth}
          bg="white"
          borderRadius="2xl"
          boxShadow="2xl"
          p={{ base: 4, md: 10 }}
          position="relative"
          maxH="90vh"
          overflowY="auto"
        >
          <Button
            leftIcon={<MdArrowBack />}
            variant="ghost"
            colorScheme="green"
            position="absolute"
            top={4}
            left={4}
            onClick={handleCancel}
            aria-label="Voltar"
            zIndex={1}
          >
            Voltar
          </Button>

          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 6, md: 10 }}
            align="center"
            justify="center"
            mt={8}
          >
            <VStack
              flex="1"
              maxW={{ base: "100%", md: "250px" }}
              spacing={4}
              align="center"
              justify="center"
            >
              <Box
                ref={dropRef}
                border="2px dashed #83a11d"
                borderRadius="lg"
                p={4}
                w="250px"
                h="250px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="gray.50"
                position="relative"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                cursor="pointer"
                transition="border-color 0.2s"
                aria-label="Área para soltar ou clicar para enviar imagem"
                onClick={handleImageButtonClick}
              >
                <Image
                  src={imagePreview || ImageDefault}
                  alt="Imagem do Produto"
                  boxSize="220px"
                  objectFit="cover"
                  borderRadius="md"
                  boxShadow="md"
                  pointerEvents="none"
                />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <Text
                  position="absolute"
                  bottom={2}
                  left={0}
                  right={0}
                  textAlign="center"
                  fontSize="xs"
                  color="gray.500"
                >
                  Arraste ou clique para enviar imagem
                </Text>
              </Box>

              {imageFile && (
                <Text fontSize="sm" color="gray.600">
                  {imageFile.name}
                </Text>
              )}

              {errors.image && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  {errors.image}
                </Alert>
              )}
            </VStack>

            <VStack
              as="form"
              onSubmit={handleSubmit}
              flex="2"
              w="100%"
              spacing={4}
              align="stretch"
            >
              <Heading
                as="h1"
                size="lg"
                color="green.700"
                mb={4}
                textAlign={{ base: "center", md: "left" }}
              >
                Cadastrar Novo Produto
              </Heading>

              <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel htmlFor="product-name">Nome do Produto</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={MdDriveFileRenameOutline} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    id="product-name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ex: Maçã Gala"
                    color="black"
                    minLength={3}
                  />
                  <InputRightElement>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        handleToggleRecording("name", {
                          setter: (value) => handleInputChange("name", value),
                        })
                      }
                      isLoading={recordingField === "name"}
                      aria-label="Gravar nome do produto por voz"
                    >
                      <Image src={IconVoice} w="16px" alt="" />
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.name && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.name}
                  </Text>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.category}>
                <FormLabel htmlFor="product-category">Categoria</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={MdCategory} color="gray.400" />
                  </InputLeftElement>
                  <Select
                    id="product-category"
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    placeholder="Selecione uma categoria"
                    pl="2.5rem"
                    color="black"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
                {errors.category && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.category}
                  </Text>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.description}>
                <FormLabel htmlFor="product-description">Descrição</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={MdDescription} color="gray.400" />
                  </InputLeftElement>
                  <Textarea
                    id="product-description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Descreva o produto, origem, características, etc."
                    color="black"
                    minLength={10}
                    rows={3}
                    pl="2.5rem"
                  />
                  <InputRightElement top="0.5rem">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        handleToggleRecording("description", {
                          setter: (value) =>
                            handleInputChange("description", value),
                        })
                      }
                      isLoading={recordingField === "description"}
                      aria-label="Gravar descrição do produto por voz"
                    >
                      <Image src={IconVoice} w="16px" alt="" />
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.description && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.description}
                  </Text>
                )}
              </FormControl>

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                <FormControl isRequired isInvalid={!!errors.quantity}>
                  <FormLabel htmlFor="product-quantity">
                    Quantidade (unid.)
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={MdNumbers} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      id="product-quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) =>
                        handleInputChange("quantity", e.target.value)
                      }
                      placeholder="Ex: 50"
                      color="black"
                      min={1}
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          handleToggleRecording("quantity", {
                            setter: (value) =>
                              handleInputChange("quantity", value),
                          })
                        }
                        isLoading={recordingField === "quantity"}
                        aria-label="Gravar quantidade do produto por voz"
                      >
                        <Image src={IconVoice} w="16px" alt="" />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.quantity && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.quantity}
                    </Text>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.price}>
                  <FormLabel htmlFor="product-price">
                    Preço (por unid.)
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={MdAttachMoney} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      id="product-price"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      placeholder="Ex: 2.50"
                      color="black"
                      min={0.01}
                      step={0.01}
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          handleToggleRecording("price", {
                            setter: (value) =>
                              handleInputChange("price", value),
                          })
                        }
                        isLoading={recordingField === "price"}
                        aria-label="Gravar preço do produto por voz"
                      >
                        <Image src={IconVoice} w="16px" alt="" />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.price && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.price}
                    </Text>
                  )}
                </FormControl>
              </SimpleGrid>

              <Flex gap={4} mt={6}>
                <Button
                  type="submit"
                  w="100%"
                  colorScheme="green"
                  borderRadius="md"
                  fontWeight="bold"
                  size="lg"
                  isLoading={isLoading}
                  spinner={<Spinner size="md" color="white" />}
                  leftIcon={<MdCloudUpload />}
                  aria-label="Cadastrar produto"
                >
                  Cadastrar Produto
                </Button>
                <Button
                  onClick={handleCancel}
                  w="100%"
                  colorScheme="gray"
                  borderRadius="md"
                  fontWeight="bold"
                  size="lg"
                  variant="outline"
                  aria-label="Cancelar"
                >
                  Cancelar
                </Button>
              </Flex>
            </VStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default AppProduto;
