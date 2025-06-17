import React, { useState, useEffect } from "react";
import axios from "axios";
import AppLoading from "../../components/loading/AppLoading";
import AppCarrossel from "../../components/carrossel/AppCarrossel";
import { useNavigate, useParams } from "react-router-dom";
import ImagemPerfil from "../../assets/plataforma-vovo.png";

import {
  Box,
  Flex,
  Text,
  Heading,
  Container,
  Alert,
  AlertIcon,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import ProductDetailCard from "./ProductDetailCard";
import { set } from "react-hook-form";
const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(true);

  const getProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Você precisa estar logado para ver os detalhes do produto.");
      setIsLoading(false);
      navigate("/login"); // Redirect to login if no token
      return;
    }
    if (!id) {
      setError("ID do produto não encontrado na URL.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseData = await axios.get(
        `${API_URL}/products/user/4a98f7e7-fd80-4dac-89df-8ee7497259b0`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const product = response.data;
      const userProducts = responseData.data;

      setProductData(product);
      setUserProducts(userProducts);
    } catch (err) {
      console.error("Erro ao carregar produto:", err);
      // More specific error handling based on status code if needed
      if (err.response && err.response.status === 401) {
        setError(
          "Sessão expirada ou não autorizada. Por favor, faça login novamente."
        );
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/login");
      } else {
        setError("Erro ao carregar produto. Por favor, tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id, navigate, API_URL]); // Add dependencies to useEffect

  if (isLoading) {
    return <AppLoading />;
  }

  if (error) {
    return (
      <Container maxW="container.md" py={8}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
        <Flex justifyContent="center" mt={4}>
          <Button onClick={() => navigate(-1)}>Voltar</Button>
        </Flex>
      </Container>
    );
  }

  if (!productData) {
    return (
      <Container maxW="container.md" py={8}>
        <Alert status="info">
          <AlertIcon />
          Nenhum produto encontrado.
        </Alert>
      </Container>
    );
  }

  return (
    <>
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
        <Container maxW="container.xl" py={8}>
          <ProductDetailCard product={productData} API_URL={API_URL} />
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mt={10}
            mb={4}
          >
            <Heading as="h2" size="lg" color="gray.700">
              Produtos do mesmo agricultor
            </Heading>
            <Button colorScheme="green" variant="outline" size="sm">
              Ver Mais
            </Button>
          </Flex>
          <AppCarrossel
            data={userProducts}
            title=""
            renderItem={(item) => (
              <Box
                key={item.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                bg="white"
                boxShadow="sm"
              >
                <img
                  src={
                    item.image
                      ? `${API_URL}${item.image}`
                      : `${API_URL}/uploads/products/default_placeholder.jpg`
                  }
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <Text mt={2} fontWeight="bold" noOfLines={1}>
                  {item.name}
                </Text>
                <Text color="green.700" fontWeight="semibold">
                  R$ {item.price}
                </Text>
              </Box>
            )}
          />
        </Container>
      </Box>
    </>
  );
};

export default ProductDetailPage;
