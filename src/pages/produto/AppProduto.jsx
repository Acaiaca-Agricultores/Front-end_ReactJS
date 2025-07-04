import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Spinner,
  Text,
  Button,
  useToast,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import ProductDetailCard from "./ProductDetailCard";
import AppCarrossel from "../../components/carrossel/AppCarrossel";
import ProductCard from "../../components/carrossel/ProductCard";
import ImagemPerfil from "../../assets/plataforma-vovo.png";

const AppProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [product, setProduct] = useState(null);
  const [farmerProducts, setFarmerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFarmerProducts, setLoadingFarmerProducts] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchFarmerProducts = async (farmerId) => {
    if (!farmerId) return;

    try {
      setLoadingFarmerProducts(true);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token de autenticação não encontrado.");
      }

      const response = await fetch(`${API_URL}/products/user/${farmerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear();
          navigate("/login");
          return;
        }
        throw new Error("Erro ao buscar produtos do agricultor");
      }

      const data = await response.json();
      const productsData = data.products || data || [];

      const filteredProducts = productsData
        .map((product) => ({
          id: product.id || product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: product.quantity,
        }))
        .filter((product) => product.id !== id);

      setFarmerProducts(filteredProducts);
    } catch (err) {
      console.error("Erro ao buscar produtos do agricultor:", err);
      toast({
        title: "Erro ao carregar produtos do agricultor",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoadingFarmerProducts(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error(
            "Token de autenticação não encontrado. Faça login novamente."
          );
        }

        const response = await fetch(`${API_URL}/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.clear();
            navigate("/login");
            return;
          }
          throw new Error("Produto não encontrado");
        }

        const data = await response.json();

        const productData = data.product || data;
        setProduct(productData);

        const farmerId =
          productData.userId ||
          productData.User?.id ||
          productData.User?._id ||
          productData.agricultor?.id ||
          productData.agricultor?._id;

        if (farmerId) {
          fetchFarmerProducts(farmerId);
        }
      } catch (err) {
        setError(err.message);
        toast({
          title: "Erro ao carregar produto",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, API_URL, toast, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={4} justify="center" minH="50vh">
          <Spinner size="xl" color="green.500" />
          <Text>Carregando produto...</Text>
        </VStack>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} justify="center" minH="50vh">
          <Heading size="lg" color="red.500">
            Produto não encontrado
          </Heading>
          <Text>
            O produto que você está procurando não existe ou foi removido.
          </Text>
          <Button
            leftIcon={<MdArrowBack />}
            colorScheme="green"
            onClick={handleGoBack}
          >
            Voltar
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Box background={"#f7f7f7"}>
      <Box
        h={{ base: "180px", md: "60vh" }}
        bgImage={`url(${ImagemPerfil})`}
        bgSize="cover"
        bgPosition="center"
        position="relative"
        mb={8}
      >
        <Box position="absolute" inset="0" bg="rgba(0, 0, 0, 0.5)" />

        <Container maxW="container.xl" position="relative" zIndex={2} h="full">
          <Box
            position="absolute"
            top={"14rem"}
            left="50%"
            transform="translateX(-50%)"
            w="full"
            maxW="container.lg"
          >
            <ProductDetailCard product={product} API_URL={API_URL} />
          </Box>
        </Container>
      </Box>

      <Container maxW="container.xl" mt="24rem">
        {farmerProducts.length > 0 && (
          <Box mt={"31rem"}>
            <AppCarrossel
              data={farmerProducts}
              title="Produtos do mesmo agricultor"
              renderItem={(item) => (
                <ProductCard item={item} API_URL={API_URL} isOwner={false} />
              )}
              itemsDesktop={3}
              itemsTablet={2}
              itemsMobile={1}
            />
          </Box>
        )}
        {loadingFarmerProducts && (
          <Box mt={8} textAlign="center">
            <Spinner size="md" color="green.500" />
            <Text mt={2}>Carregando outros produtos...</Text>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AppProduto;
