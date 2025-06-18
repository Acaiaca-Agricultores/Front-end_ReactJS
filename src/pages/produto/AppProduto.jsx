import React, { useState, useEffect } from "react";
import axios from "axios";
import AppLoading from "../../components/loading/AppLoading";
import AppCarrossel from "../../components/carrossel/AppCarrossel";
import ProductCard from "../../components/carrossel/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import ImagemPerfil from "../../assets/plataforma-vovo.png";

import {
  Box,
  Flex,
  Heading,
  Container,
  Alert,
  AlertIcon,
  Button,
} from "@chakra-ui/react";
import ProductDetailCard from "./ProductDetailCard";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const getProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Você precisa estar logado para ver os detalhes do produto.");
      setIsLoading(false);
      navigate("/login");
      return;
    }
    if (!id) {
      setError("ID do produto não encontrado na URL.");
      setIsLoading(false);
      return;
    }

    try {
      const productResponse = await axios.get(`${API_URL}/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!productResponse.data) {
        setError("Produto não encontrado.");
        setIsLoading(false);
        return;
      }

      const product = productResponse.data;
      console.log("Dados do produto:", product);

      let agricultorData = product.User || product.agricultor;

      if (!agricultorData && product.userId) {
        try {
          const agricultorResponse = await axios.get(
            `${API_URL}/user/${product.userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          agricultorData = agricultorResponse.data;
          console.log("Dados do agricultor:", agricultorData);
        } catch (agricultorErr) {
          console.warn("Erro ao buscar dados do agricultor:", agricultorErr);
        }
      }

      const productWithAgricultor = {
        ...product,
        agricultor: agricultorData || {},
      };

      console.log("Dados combinados:", productWithAgricultor);

      setProductData(productWithAgricultor);

      if (product.userId) {
        try {
          const userProductsResponse = await axios.get(
            `${API_URL}/products/user/${product.userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const otherProducts = userProductsResponse.data.filter(
            (p) => p.id !== product.id
          );
          setUserProducts(otherProducts);
        } catch (productsErr) {
          console.warn("Erro ao buscar produtos relacionados:", productsErr);
          setUserProducts([]);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar produto:", err);
      if (err.response && err.response.status === 401) {
        setError(
          "Sessão expirada ou não autorizada. Por favor, faça login novamente."
        );
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(
          err.response?.data?.message ||
            "Erro ao carregar produto. Por favor, tente novamente."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id, navigate, API_URL]);

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
          <Box position="relative" top="-80px" zIndex={2}>
            <ProductDetailCard product={productData} API_URL={API_URL} />
          </Box>
          {userProducts.length > 0 && (
            <>
              <Flex justifyContent="center" alignItems="center" mt={10} mb={4}>
                <Heading as="h2" size="lg" color="#83a11d">
                  Produtos do mesmo agricultor
                </Heading>
              </Flex>
              <AppCarrossel
                data={userProducts}
                title=""
                renderItem={(item) => (
                  <ProductCard
                    item={item}
                    API_URL={API_URL}
                    isOwner={productData.userId === localStorage.getItem("userId")}
                    onDelete={(deletedId) => {
                      setUserProducts((prevProducts) =>
                        prevProducts.filter((product) => product.id !== deletedId)
                      );
                    }}
                  />
                )}
              />
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ProductDetailPage;
