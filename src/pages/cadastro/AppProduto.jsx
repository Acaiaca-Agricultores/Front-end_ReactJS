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
import { useState } from "react";
import ImagemFeira from "../../assets/feira.jpg";
import ImageDefault from "../../assets/default.png";


const AppProduto = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const toast = useToast();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useState(null);

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
    const numericQuantity = Number(quantity);
    const numericPrice = Number(price);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", normalizedCategory);
    formData.append("description", description);
    formData.append("quantity", numericQuantity.toString());
    formData.append("price", numericPrice.toString());
    const userId = localStorage.getItem("userId");
    if (userId) {
      formData.append("userId", userId);
    }
    if (imageFile) {
      formData.append("productImage", imageFile);
    } else if (image) {
      formData.append("productImage", image);
    }
    const token = localStorage.getItem("token");
    console.log("Dados enviados:", {
      name,
      category: normalizedCategory,
      description,
      quantity: numericQuantity,
      price: numericPrice,
      userId,
      imageFile,
    });
    try {
      const res = await fetch(API_URL + "/product/register", {
        method: "PUT",
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        toast({
          title: "Produto cadastrado com sucesso!",
          status: "success",
          duration: 3000,
        });
        setName("");
        setCategory("");
        setDescription("");
        setQuantity("");
        setPrice("");
        setImageFile(null);
        setImagePreview("");
      } else {
        let data;
        try {
          data = await res.json();
        } catch (e) {
          data = { msg: "Erro ao cadastrar produto" };
        }
        toast({
          title: data.msg || "Erro ao cadastrar produto",
          status: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      toast({ title: "Erro de rede", status: "error", duration: 3000 });
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
        height={{ base: "100vh", md: "100%" }}
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
          >
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                gap={10}
              >
                <VStack spacing={6} align="stretch" flex={1}>
                  <Heading as="h1" size="lg" color="white" mb={2}>
                    Cadastrar Novo Produto
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
                    color="#ffffff"
                    background="#52601A"
                    borderRadius="10px"
                    fontFamily="Onest"
                    padding="1.5rem"
                    _hover={{
                      background: "#c0ab8e",
                      color: "#ffffff",
                    }}
                    aria-label="Fazer cadastro"
                    LoadingText="Fazendo cadastro..."
                    spinnerPlacement="end"
                  >
                    Cadastrar
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
