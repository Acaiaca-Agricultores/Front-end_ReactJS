import {
  Box,
  Flex,
  Text,
  Center,
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
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import {
  MdCategory,
  MdDescription,
  MdAttachMoney,
  MdNumbers,
  MdDriveFileRenameOutline,
  MdArrowBack,
} from "react-icons/md";
import ImagemFeira from "../../assets/feira.jpg";
import ImageDefault from "../../assets/default.png";
import { useLocation, useNavigate } from "react-router-dom";

const CATEGORIES = [
  { value: "fruta", label: "Fruta" },
  { value: "verdura", label: "Verdura" },
  { value: "legume", label: "Legume" },
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
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || productToEdit.title || "");
      setCategory(productToEdit.category || "");
      setDescription(productToEdit.description || "");
      setQuantity(productToEdit.quantity?.toString() || "");
      setPrice(productToEdit.price?.toString() || "");
      setImagePreview(
        productToEdit.image
          ? productToEdit.image.startsWith("http")
            ? productToEdit.image
            : `${API_URL}${productToEdit.image}`
          : ""
      );
    }
  }, [productToEdit, API_URL]);

  // Drag and drop handlers
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
      setImage("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImage("");
    }
  };

  const handleImageButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const normalizedCategory = category.trim().toLowerCase();
    const parsedQuantity = Math.floor(Number(quantity));
    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      toast({
        title: "Quantidade inválida",
        description:
          "Por favor, insira um número inteiro positivo para a quantidade.",
        status: "error",
        duration: 3000,
      });
      setIsLoading(false);
      return;
    }
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      toast({
        title: "Preço inválido",
        description:
          "Por favor, insira um número válido e não negativo para o preço.",
        status: "error",
        duration: 3000,
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
            formData.append("name", name);
            formData.append("category", normalizedCategory);
            formData.append("description", description);
            formData.append("quantity", parsedQuantity);
            formData.append("price", parsedPrice);
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
              name,
              category: normalizedCategory,
              description,
              quantity: parsedQuantity,
              price: parsedPrice,
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
          const responseData = await res.json();
          if (!res.ok) {
            throw new Error(responseData.msg || "Erro ao atualizar produto");
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
        formData.append("name", name);
        formData.append("category", normalizedCategory);
        formData.append("description", description);
        formData.append("quantity", Number(parsedQuantity));
        formData.append("price", Number(parsedPrice));
        const userId = localStorage.getItem("userId");
        if (userId) {
          formData.append("userId", userId);
        }
        if (imageFile) {
          formData.append("productImage", imageFile);
        }
        res = await fetch(API_URL + "/product/register", {
          method: "PUT",
          body: formData,
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        successMessage = "Produto cadastrado com sucesso!";
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
          setImageFile(null);
          setImagePreview("");
          setImage("");
        }
      } else {
        const data = await res.json();
        toast({
          title:
            data.msg ||
            (productToEdit
              ? "Erro ao atualizar produto"
              : "Erro ao cadastrar produto"),
          description: data.error || "Verifique os dados e tente novamente",
          status: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      toast({
        title: "Erro de rede ou na requisição",
        description: err.message || "Tente novamente mais tarde",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Responsividade para tamanho do card
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
          >
            Voltar
          </Button>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={10}
            align="center"
          >
            {/* Imagem e upload */}
            <VStack flex={1} spacing={6} align="center" justify="center">
              <Heading
                as="h1"
                size="lg"
                color="green.700"
                mb={2}
                textAlign="center"
              >
                {productToEdit ? "Editar Produto" : "Cadastrar Novo Produto"}
              </Heading>
              <Box
                ref={dropRef}
                border="2px dashed #83a11d"
                borderRadius="lg"
                p={4}
                w={{ base: "200px", md: "250px" }}
                h={{ base: "200px", md: "250px" }}
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
                mb={2}
                aria-label="Área para soltar ou clicar para enviar imagem"
                onClick={handleImageButtonClick}
              >
                <Image
                  src={imagePreview || ImageDefault}
                  alt="Imagem do Produto"
                  boxSize={{ base: "180px", md: "220px" }}
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
            {/* Formulário */}
            <Box flex={2} as="form" onSubmit={handleSubmit} w="100%">
              <VStack spacing={5} align="stretch">
                <FormControl id="product-name" isRequired>
                  <FormLabel color="green.700">Nome do Produto</FormLabel>
                  <Input
                    type="text"
                    placeholder="Ex: Laranja"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    leftElement={
                      <Icon
                        as={MdDriveFileRenameOutline}
                        color="green.400"
                        boxSize={5}
                        ml={2}
                      />
                    }
                    size="lg"
                    borderColor="green.200"
                    _focus={{
                      borderColor: "green.400",
                      boxShadow: "0 0 0 1px #b7d08b",
                    }}
                  />
                </FormControl>
                <FormControl id="category" isRequired>
                  <FormLabel color="green.700">Categoria</FormLabel>
                  <Select
                    placeholder="Selecione uma categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    size="lg"
                    borderColor="green.200"
                    _focus={{
                      borderColor: "green.400",
                      boxShadow: "0 0 0 1px #b7d08b",
                    }}
                    icon={<Icon as={MdCategory} color="green.400" />}
                  >
                    {CATEGORIES.map((cat) => (
                      <option
                        key={cat.value}
                        value={cat.value}
                        style={{ color: "#000" }}
                      >
                        {cat.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="description" isRequired>
                  <FormLabel color="green.700">Descrição</FormLabel>
                  <Input
                    type="text"
                    placeholder="Ex: Laranja doce e suculenta"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    leftElement={
                      <Icon
                        as={MdDescription}
                        color="green.400"
                        boxSize={5}
                        ml={2}
                      />
                    }
                    size="lg"
                    borderColor="green.200"
                    _focus={{
                      borderColor: "green.400",
                      boxShadow: "0 0 0 1px #b7d08b",
                    }}
                  />
                </FormControl>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                  <FormControl id="price" isRequired>
                    <FormLabel color="green.700">Preço</FormLabel>
                    <Input
                      type="number"
                      placeholder="Ex: 2.50"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      leftElement={
                        <Icon
                          as={MdAttachMoney}
                          color="green.400"
                          boxSize={5}
                          ml={2}
                        />
                      }
                      size="lg"
                      borderColor="green.200"
                      _focus={{
                        borderColor: "green.400",
                        boxShadow: "0 0 0 1px #b7d08b",
                      }}
                    />
                  </FormControl>
                  <FormControl id="quantity" isRequired>
                    <FormLabel color="green.700">Quantidade</FormLabel>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      pattern="\d*"
                      placeholder="Ex: 100"
                      value={quantity}
                      onChange={(e) => {
                        const value = e.target.value;
                        const sanitizedValue = Math.max(
                          0,
                          Math.floor(Number(value)) || 0
                        );
                        setQuantity(sanitizedValue.toString());
                      }}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      leftElement={
                        <Icon
                          as={MdNumbers}
                          color="green.400"
                          boxSize={5}
                          ml={2}
                        />
                      }
                      size="lg"
                      borderColor="green.200"
                      _focus={{
                        borderColor: "green.400",
                        boxShadow: "0 0 0 1px #b7d08b",
                      }}
                    />
                  </FormControl>
                </SimpleGrid>
                <Flex gap={4} mt={2}>
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
                      productToEdit ? "Salvar Alterações" : "Fazer cadastro"
                    }
                  >
                    {productToEdit ? "Salvar Alterações" : "Cadastrar"}
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
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
export default AppProduto;
