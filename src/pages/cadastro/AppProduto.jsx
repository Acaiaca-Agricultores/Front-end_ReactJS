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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ImagemFeira from "../../assets/feira.jpg";
import ImageDefault from "../../assets/default.png";
import { useLocation } from "react-router-dom";

const AppProduto = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const toast = useToast();
  const location = useLocation();
  const productToEdit = location.state?.product;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useState(null);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.title || "");
      setCategory(productToEdit.category || "");
      setDescription(productToEdit.description || "");
      setQuantity(productToEdit.quantity?.toString() || "");
      setPrice(productToEdit.price?.toString() || "");
      setImagePreview(productToEdit.image || "");
    }
  }, [productToEdit]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedCategory = category.trim().toLowerCase();

    const parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      toast({
        title: "Quantidade inválida",
        description:
          "Por favor, insira um número válido e não negativo para a quantidade.",
        status: "error",
        duration: 3000,
      });
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
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", normalizedCategory);
    formData.append("description", description);
    formData.append("quantity", parsedQuantity.toString());
    formData.append("price", parsedPrice.toString());
    const userId = localStorage.getItem("userId");
    if (userId) {
      formData.append("userId", userId);
    }
    if (imageFile) {
      formData.append("productImage", imageFile);
    } else if (
      productToEdit &&
      productToEdit.image &&
      !imagePreview.startsWith("blob:")
    ) {
      formData.append("productImage", productToEdit.image);
    } else if (image) {
      formData.append("productImage", image);
    }

    const token = localStorage.getItem("token");
    console.log("Dados enviados:", Object.fromEntries(formData));

    try {
      let res;
      let successMessage;

      if (productToEdit && productToEdit.id) {
        res = await fetch(`${API_URL}/product/edit/${productToEdit.id}`, {
          method: "PUT",
          body: formData,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        successMessage = "Produto atualizado com sucesso!";
      } else {
        res = await fetch(API_URL + "/product/register", {
          method: "PUT",
          body: formData,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
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
        let data;
        try {
          data = await res.json();
        } catch (e) {
          data = {
            msg: productToEdit
              ? "Erro ao atualizar produto"
              : "Erro ao cadastrar produto",
          };
        }
        toast({
          title:
            data.msg ||
            (productToEdit
              ? "Erro ao atualizar produto"
              : "Erro ao cadastrar produto"),
          status: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      toast({
        title: "Erro de rede ou na requisição",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Box
        aria-label="Formulário de contato"
        backgroundImage={`url(${ImagemFeira})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        objectFit={"cover"}
        backgroundPosition="center"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        width="100%"
        height={{ base: "120vh", md: "100%" }}
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
        >
          <Center
            p={{ base: 4, md: 8 }}
            border="2px solid #84a11F"
            borderRadius="md"
            margin="2rem"
            height={{ base: "100vh", md: "80vh" }}
          >
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                gap={10}
              >
                <VStack spacing={6} align="stretch" flex={1}>
                  <Heading as="h1" size="lg" color="white" mb={2}>
                    {productToEdit
                      ? "Editar Produto"
                      : "Cadastrar Novo Produto"}
                  </Heading>
                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                    <FormControl id="product-name">
                      <FormLabel color="gray.300">Nome do Produto:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Ex: Laranja"
                        _placeholder={{ color: "#b0b0b0" }}
                        border={"2px solid  #83a11d"}
                        aria-required="true"
                        required
                        width={"100%"}
                        height={"3rem"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        _focus={{
                          borderColor: "#c0ab8e",
                          boxShadow: "0 0 0 1px #e5d1b0",
                        }}
                      />
                    </FormControl>
                    <FormControl id="category">
                      <FormLabel color="gray.300">Categoria:</FormLabel>
                      <Select
                        placeholder="Selecione uma categoria"
                        color="#b0b0b0"
                        border={"2px solid  #83a11d"}
                        aria-required="true"
                        required
                        width={"100%"}
                        height={"3rem"}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        _focus={{
                          borderColor: "#c0ab8e",
                          boxShadow: "0 0 0 1px #e5d1b0",
                        }}
                      >
                        <option value="fruta" style={{ color: "#000" }}>
                          Fruta
                        </option>
                        <option value="verdura" style={{ color: "#000" }}>
                          Verdura
                        </option>
                        <option value="legume" style={{ color: "#000" }}>
                          Legume
                        </option>
                      </Select>
                    </FormControl>
                  </SimpleGrid>
                  <FormControl id="description">
                    <FormLabel color="gray.300">Descrição:</FormLabel>
                    <Input
                      type="text"
                      placeholder="Ex: Laranja doce e suculenta"
                      _placeholder={{ color: "#b0b0b0" }}
                      border={"2px solid  #83a11d"}
                      aria-required="true"
                      required
                      width={"100%"}
                      height={"3rem"}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      _focus={{
                        borderColor: "#c0ab8e",
                        boxShadow: "0 0 0 1px #e5d1b0",
                      }}
                    />
                  </FormControl>
                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                    <FormControl id="price">
                      <FormLabel color="gray.300">Preço:</FormLabel>
                      <Input
                        type="number"
                        placeholder="Ex: 2.50"
                        _placeholder={{ color: "#b0b0b0" }}
                        border={"2px solid  #83a11d"}
                        aria-required="true"
                        required
                        width={"100%"}
                        height={"3rem"}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        _focus={{
                          borderColor: "#c0ab8e",
                          boxShadow: "0 0 0 1px #e5d1b0",
                        }}
                      />
                    </FormControl>
                    <FormControl id="quantity">
                      <FormLabel color="gray.300">Quantidade:</FormLabel>
                      <Input
                        type="number"
                        placeholder="Ex: 100"
                        _placeholder={{ color: "#b0b0b0" }}
                        border={"2px solid  #83a11d"}
                        aria-required="true"
                        required
                        width={"100%"}
                        height={"3rem"}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        _focus={{
                          borderColor: "#c0ab8e",
                          boxShadow: "0 0 0 1px #e5d1b0",
                        }}
                      />
                    </FormControl>
                  </SimpleGrid>
                  <Button
                    type="submit"
                    w={"100%"}
                    color={"#ffffff"}
                    background={"#52601A"}
                    borderRadius={"10px"}
                    fontFamily={"Onest"}
                    padding={"1.5rem"}
                    _hover={{
                      background: "#c0ab8e",
                      color: "#ffffff",
                    }}
                    aria-label={
                      productToEdit ? "Salvar Alterações" : "Fazer cadastro"
                    }
                    LoadingText={
                      productToEdit ? "Salvando..." : "Fazendo cadastro..."
                    }
                    spinnerPlacement="end"
                  >
                    {productToEdit ? "Salvar Alterações" : "Cadastrar"}
                  </Button>
                </VStack>
                <Center flexDirection="column" gap={4}>
                  <Image
                    src={imagePreview || ImageDefault}
                    alt="Imagem de Feira ou do Produto"
                    boxSize={{ base: "200px", md: "300px" }}
                    objectFit="cover"
                    borderRadius="md"
                    boxShadow="lg"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={(el) => (fileInputRef.current = el)}
                    onChange={handleImageChange}
                  />
                  <Button
                    onClick={handleImageButtonClick}
                    cursor="pointer"
                    variant="outline"
                    color="#c0ab8e"
                    borderColor="#c0ab8e"
                    _hover={{ bg: "rgba(205, 220, 57, 0.1)" }}
                  >
                    Enviar Imagem
                  </Button>
                  {imageFile && (
                    <Text fontSize="sm" color="gray.200">
                      {imageFile.name}
                    </Text>
                  )}
                </Center>
              </Flex>
            </form>
          </Center>
        </Box>
      </Box>
    </>
  );
};
export default AppProduto;
