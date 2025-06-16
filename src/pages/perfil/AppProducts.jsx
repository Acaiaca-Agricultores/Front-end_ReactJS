import { useEffect, useState } from "react";
import AppCarrossel from "../../components/carrossel/AppCarrossel";
import axios from "axios";
import ImageDefault from "../../assets/default.png";
import AppLoading from "../../components/loading/AppLoading";
import {
  Box,
  Center,
  Heading,
  Button,
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  CardFooter,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function AppProducts({ isOwner, viewedUserId }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function handleGetProducts() {
      const token = localStorage.getItem("token");
      const loggedInUserId = localStorage.getItem("userId");

      const targetUserId = isOwner ? loggedInUserId : viewedUserId;

      if (!token || !targetUserId) {
        setError(
          isOwner
            ? "Token de autenticação ou userId ausente."
            : "ID do usuário do perfil ausente."
        );
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${API_URL}/products/user/${targetUserId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = Array.isArray(res.data) ? res.data : res.data.products;
        setProducts(
          (data || []).map((product) => ({
            id: product.id || product._id,
            title: product.name,
            description: product.description,
            price: product.price,
            image: product.image
              ? product.image.startsWith("http")
                ? product.image
                : new URL(product.image, API_URL).href
              : ImageDefault,
            category: product.category,
            quantity: product.quantity,
          }))
        );
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError(
          err.response?.data?.message ||
            "Erro ao buscar produtos. Verifique sua conexão ou tente novamente."
        );
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    handleGetProducts();
  }, [isOwner, viewedUserId]);

  const renderUserProductCard = (item, index) => {
    const cardStyles = {
      width: {
        base: "calc(100% - 20px)",
        md: "calc(100% - 30px)",
        lg: "calc(100% - 40px)",
      },
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      borderRadius: "16px",
      overflow: "hidden",
      margin: "0 10px",
      boxShadow: "none",
    };

    const handleManageProduct = () => {
      navigate(`/cadastro/produto`, { state: { product: item } });
    };

    const handleDelteteProduct = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token de autenticação ausente.");
        return;
      }
      try {
        await axios.delete(`${API_URL}/product/delete/${item.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== item.id)
        );
      } catch (err) {
        console.error("Erro ao deletar produto:", err);
        setError(
          err.response?.data?.message ||
            "Erro ao deletar produto. Verifique sua conexão ou tente novamente."
        );
      }
    };

    return (
      <Card key={index} sx={cardStyles}>
        <CardBody>
          <Image
            width="100%"
            height={{ base: "150px", md: "200px" }}
            objectFit="cover"
            src={item.image}
            alt={`Imagem de ${item.title}`}
            borderRadius="md"
            mb={4}
          />
          <Stack gap={2}>
            <Heading size="md">{item.title}</Heading>
            <Text color="green.600" fontSize="lg" fontWeight="bold">
              R$ {Number(item.price).toFixed(2)}
            </Text>
            <Text fontSize="sm" color="gray.600" noOfLines={3}>
              {item.description}
            </Text>
          </Stack>
        </CardBody>
        <Divider borderColor="gray.200" />
        {isOwner && (
          <CardFooter padding={{ base: 3, md: 4 }} gap={2} flexDirection="column">
            <Button
              onClick={handleManageProduct}
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
              aria-label="Gerenciar produto"
            >
              Editar
            </Button>
            <Button
              onClick={handleDelteteProduct}
              w={"100%"}
              color="#ffffff"
              background="red.500"
              borderRadius="10px"
              fontFamily="Onest"
              padding="1.5rem"
              _hover={{
                background: "#c0ab8e",
                color: "#ffffff",
              }}
              aria-label="Deletar produto"
              isLoading={isLoading}
              loadingText="Deletando..."
              spinnerPlacement="end"
            >
              Deletar
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  };

  if (isLoading) return <AppLoading />;

  return (
    <Center w="100%" h="100%" flexDirection="column" gap={4}>
      {error && (
        <Text color="red.500" fontWeight="bold" mt={4}>
          {error}
        </Text>
      )}
      {isOwner && (
        <>
          <Heading size="lg">Meus Produtos</Heading>
          <Button
            onClick={() => navigate("/cadastro/produto")}
            color="white"
            bg="#52601A"
            width="80%"
            maxW="400px"
            _hover={{ bg: "#EDD1AF" }}
          >
            Cadastrar Novo Produto
          </Button>
        </>
      )}

      <Box w="100%" h="100%">
        <AppCarrossel
          data={products}
          title={
            !isOwner
              ? `Produtos de ${
                  localStorage.getItem("currentProfileUsername") ||
                  "este usuário"
                }`
              : ""
          }
          renderItem={renderUserProductCard}
        />
      </Box>
    </Center>
  );
}
