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
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import {
  MdCategory,
  MdDescription,
  MdAttachMoney,
  MdNumbers,
  MdDriveFileRenameOutline,
  MdArrowBack,
  MdScale,
} from "react-icons/md";
import ImagemFeira from "../../assets/feira.jpg";
import ImageDefault from "../../assets/default.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import IconVoice from "../../assets/icons/voice-command.png";

const CATEGORIES = [
  { value: "frutas", label: "Frutas" },
  { value: "verduras", label: "Verduras" },
  { value: "legumes", label: "Legumes" },
  { value: "tuberculos", label: "Tubérculos" },
  { value: "graos", label: "Grãos" },
  { value: "oleaginosas", label: "Oleaginosas" },
  { value: "temperos", label: "Temperos" },
  { value: "chas", label: "Chás" },
  { value: "mel", label: "Mel" },
  { value: "ovos", label: "Ovos" },
  { value: "laticinios", label: "Laticínios" },
];

const SALE_TYPES = [
  { value: "unidade", label: "Unidade" },
  { value: "quilo", label: "Quilo (kg)" },
  { value: "grama", label: "Grama (g)" },
  { value: "caixa", label: "Caixa" },
  { value: "bandeja", label: "Bandeja" },
  { value: "pacote", label: "Pacote" },
  { value: "duzia", label: "Dúzia" },
  { value: "litro", label: "Litro (L)" },
  { value: "mililitro", label: "Mililitro (ml)" },
  { value: "metro", label: "Metro (m)" },
  { value: "centimetro", label: "Centímetro (cm)" },
];

const AppProduto = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const productToEdit = location.state?.product;
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [saleType, setSaleType] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const dropRef = useRef(null);
  const { handleToggleRecording, recordingField, stopRecording } =
    useSpeechRecognition({});

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || productToEdit.title || "");

      const categoryMapping = {
        Frutas: "frutas",
        Verduras: "verduras",
        Legumes: "legumes",
        Tubérculos: "tuberculos",
        Grãos: "graos",
        Oleaginosas: "oleaginosas",
        Temperos: "temperos",
        Chás: "chas",
        Mel: "mel",
        Ovos: "ovos",
        Laticínios: "laticinios",
      };

      const mappedCategory =
        categoryMapping[productToEdit.category] || productToEdit.category || "";
      setCategory(mappedCategory);

      setDescription(productToEdit.description || "");
      setQuantity(productToEdit.quantity?.toString() || "");
      setPrice(productToEdit.price?.toString() || "");
      setSaleType(productToEdit.saleType || "");
      setImagePreview(
        productToEdit.image
          ? productToEdit.image.startsWith("http")
            ? productToEdit.image
            : `${API_URL}${productToEdit.image}`
          : ""
      );
    }
  }, [productToEdit, API_URL]);

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
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const validateForm = () => {
    const errors = [];

    if (!name.trim()) {
      errors.push("Nome do produto é obrigatório");
    } else if (name.trim().length < 3) {
      errors.push("Nome do produto deve ter pelo menos 3 caracteres");
    }

    if (!description.trim()) {
      errors.push("Descrição é obrigatória");
    } else if (description.trim().length < 10) {
      errors.push("Descrição deve ter pelo menos 10 caracteres");
    }

    if (!category) {
      errors.push("Categoria é obrigatória");
    }

    if (!saleType) {
      errors.push("Tipo de venda é obrigatório");
    }

    if (!quantity || quantity <= 0) {
      errors.push("Quantidade deve ser maior que zero");
    }

    if (!price || price <= 0) {
      errors.push("Preço deve ser maior que zero");
    }

    if (!productToEdit && !imageFile) {
      errors.push("Foto do produto é obrigatória");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recordingField) {
      stopRecording();
    }

    setIsLoading(true);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast({
        title: "Erro de validação",
        description: validationErrors.join(". "),
        status: "error",
        duration: 5000,
      });
      setIsLoading(false);
      return;
    }

    try {
      let res;
      let successMessage;

      if (productToEdit && productToEdit.id) {
        try {
          if (imageFile) {
            const formData = new FormData();
            formData.append("name", name.trim());
            formData.append("category", category);
            formData.append("description", description.trim());
            formData.append("quantity", Number(quantity));
            formData.append("price", Number(price));
            formData.append("saleType", saleType);
            formData.append("userId", localStorage.getItem("userId"));
            formData.append("productImage", imageFile);
            res = await fetch(`${API_URL}/product/edit/${productToEdit.id}`, {
              method: "PUT",
              body: formData,
              headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
            });
          } else {
            const productData = {
              name: name.trim(),
              category: category,
              description: description.trim(),
              quantity: Number(quantity),
              price: Number(price),
              saleType: saleType,
              userId: localStorage.getItem("userId"),
            };
            if (productToEdit.image && !imagePreview.startsWith("blob:")) {
              productData.image = productToEdit.image;
            }
            res = await fetch(`${API_URL}/product/edit/${productToEdit.id}`, {
              method: "PUT",
              body: JSON.stringify(productData),
              headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                "Content-Type": "application/json",
              },
            });
          }
          successMessage = "Produto atualizado com sucesso!";
        } catch (error) {
          setIsLoading(false);
          toast({
            title: "Erro ao atualizar produto",
            description: error.message,
            status: "error",
            duration: 3000,
          });
          return;
        }
      } else {
        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("category", category);
        formData.append("description", description.trim());
        formData.append("quantity", Number(quantity));
        formData.append("price", Number(price));
        formData.append("saleType", saleType);
        formData.append("productImage", imageFile);

        res = await fetch(`${API_URL}/product/register`, {
          method: "PUT",
          body: formData,
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        successMessage = "Produto cadastrado com sucesso!";
      }

      let responseData;
      let isJson = false;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await res.json();
        isJson = true;
      } else {
        responseData = await res.text();
      }

      if (res.ok) {
        toast({
          title: successMessage,
          status: "success",
          duration: 3000,
        });

        if (!productToEdit) {
          setName("");
          setCategory("");
          setDescription("");
          setQuantity("");
          setPrice("");
          setSaleType("");
          setImageFile(null);
          setImagePreview("");
        }

        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        let errorMessage;
        if (isJson) {
          errorMessage =
            responseData.msg ||
            (productToEdit
              ? "Erro ao atualizar produto"
              : "Erro ao cadastrar produto");
        } else {
          errorMessage =
            "Erro inesperado do servidor. Tente novamente mais tarde.";
        }

        toast({
          title: "Erro",
          description: errorMessage,
          status: "error",
          duration: 5000,
        });
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
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
    md: "48rem",
    lg: "68rem",
  });

  return (
    <Box
      backgroundImage={ImagemFeira}
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
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
        padding={{ base: "80px", md: "150px" }}
      >
        <Box
          w={cardWidth}
          bg="white"
          borderRadius="2xl"
          boxShadow="2xl"
          p={{ base: 4, md: 10 }}
          position="relative"
        >
          <VStack
            display="flex"
            justifyContent="space-around"
            flexDirection="row"
            alignItems="stretch"
          >
            <Button
              leftIcon={<MdArrowBack />}
              variant="ghost"
              colorScheme="green"
              onClick={handleCancel}
              aria-label="Voltar"
            >
              Voltar
            </Button>
            <Heading
              as="h1"
              size="lg"
              color="green.700"
              mb={4}
              textAlign={{ base: "center", md: "left" }}
            >
              {productToEdit ? "Editar Produto" : "Cadastrar Novo Produto"}
            </Heading>
          </VStack>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 6, md: 10 }}
            align="center"
            justify="center"
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
            </VStack>

            <SimpleGrid
              columns={{ base: 1, sm: 2 }}
              spacing={4}
              as="form"
              onSubmit={handleSubmit}
              flex="2"
              w="100%"
              align="stretch"
            >
              <FormControl isRequired>
                <FormLabel htmlFor="product-name" color="black">
                  Nome do Produto
                </FormLabel>
                <Input
                  id="product-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite o nome do produto"
                  bg="gray.100"
                  borderRadius="3xl"
                  height="50px"
                  color="black"
                  _placeholder={{ color: "gray.500" }}
                  _hover={{ bg: "gray.200" }}
                  _focus={{
                    bg: "white",
                    borderColor: "green.500",
                    boxShadow: "0 0 0 1px #38A169",
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="product-category" color="black">
                  Categoria
                </FormLabel>
                <Select
                  id="product-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Selecione uma categoria"
                  bg="gray.100"
                  borderRadius="3xl"
                  height="50px"
                  color="black"
                  _hover={{ bg: "gray.200" }}
                  _focus={{
                    bg: "white",
                    borderColor: "green.500",
                    boxShadow: "0 0 0 1px #38A169",
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="product-description" color="black">
                  Descrição
                </FormLabel>
                <Input
                  id="product-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o produto, origem, etc."
                  bg="gray.100"
                  borderRadius="3xl"
                  height="50px"
                  color="black"
                  _placeholder={{ color: "gray.500" }}
                  _hover={{ bg: "gray.200" }}
                  _focus={{
                    bg: "white",
                    borderColor: "green.500",
                    boxShadow: "0 0 0 1px #38A169",
                  }}
                  minLength={10}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="product-sale-type" color="black">
                  Tipo de Venda
                </FormLabel>
                <Select
                  id="product-sale-type"
                  value={saleType}
                  onChange={(e) => setSaleType(e.target.value)}
                  placeholder="Selecione o tipo de venda"
                  bg="gray.100"
                  borderRadius="3xl"
                  height="50px"
                  color="black"
                  _hover={{ bg: "gray.200" }}
                  _focus={{
                    bg: "white",
                    borderColor: "green.500",
                    boxShadow: "0 0 0 1px #38A169",
                  }}
                >
                  {SALE_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="product-quantity" color="black">
                    Quantidade
                  </FormLabel>
                  <Input
                    id="product-quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Ex: 50"
                    bg="gray.100"
                    borderRadius="3xl"
                    height="50px"
                    color="black"
                    _placeholder={{ color: "gray.500" }}
                    _hover={{ bg: "gray.200" }}
                    _focus={{
                      bg: "white",
                      borderColor: "green.500",
                      boxShadow: "0 0 0 1px #38A169",
                    }}
                    min={1}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="product-price" color="black">
                    Preço (por {saleType || "unidade"})
                  </FormLabel>
                  <Input
                    id="product-price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ex: 2.50"
                    bg="gray.100"
                    borderRadius="3xl"
                    height="50px"
                    color="black"
                    _placeholder={{ color: "gray.500" }}
                    _hover={{ bg: "gray.200" }}
                    _focus={{
                      bg: "white",
                      borderColor: "green.500",
                      boxShadow: "0 0 0 1px #38A169",
                    }}
                    min={0.01}
                    step={0.01}
                  />
                </FormControl>
              </SimpleGrid>
            </SimpleGrid>
          </Flex>
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
              aria-label={
                productToEdit ? "Salvar Alterações" : "Cadastrar produto"
              }
            >
              {productToEdit ? "Salvar" : "Cadastrar"}
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
        </Box>
      </Box>
    </Box>
  );
};

export default AppProduto;
