import React, { useState } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Button,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ item, API_URL, isOwner, onDelete }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleManageProduct = () => {
    const productData = {
      id: item.id,
      name: item.name,
      category: item.category,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    };
    navigate(`/cadastro/produto`, { state: { product: productData } });
  };

  const handleDeleteProduct = async () => {
    setIsDeleting(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token de autenticação ausente.");
      setIsDeleting(false);
      return;
    }
    try {
      await axios.delete(`${API_URL}/product/delete/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (onDelete) {
        onDelete(item.id);
      }
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      boxShadow="md"
      margin="1rem"
      height={isOwner ? "500px" : "450px"}
      display="flex"
      flexDirection="column"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "lg",
        borderColor: "#83a11d",
      }}
      position="relative"
      maxW="350px"
      minW="250px"
      w="100%"
      role="article"
      aria-labelledby={`product-title-${item.id}`}
      aria-describedby={`product-description-${item.id}`}
      tabIndex={0}
    >
      <Box
        position="relative"
        height="200px"
        overflow="hidden"
        borderRadius="md"
        mb={4}
      >
        <Image
          src={
            item.image
              ? item.image.startsWith("http")
                ? item.image
                : `${API_URL}${item.image}`
              : `${API_URL}/uploads/products/default_placeholder.jpg`
          }
          alt={`Imagem do produto ${item.name}`}
          width="100%"
          height="100%"
          objectFit="cover"
          transition="transform 0.3s ease"
          _hover={{ transform: "scale(1.05)" }}
        />
        {item.quantity <= 0 && (
          <Box
            position="absolute"
            top={2}
            right={2}
            bg="red.500"
            color="white"
            px={2}
            py={1}
            borderRadius="md"
            fontSize="sm"
            aria-label="Produto indisponível"
          >
            Indisponível
          </Box>
        )}
      </Box>

      <Flex direction="column" flex={1} gap={2}>
        <Heading 
          size="md" 
          color="gray.700" 
          noOfLines={2}
          id={`product-title-${item.id}`}
          tabIndex={0}
        >
          {item.name || "Sem nome"}
        </Heading>

        <Text 
          fontSize="2xl" 
          color="green.600" 
          fontWeight="bold"
          aria-label={`Preço: ${item.price ? formatPrice(item.price) : "Preço não disponível"}`}
          tabIndex={0}
        >
          {item.price
            ? formatPrice(item.price)
            : "Preço não disponível"}
        </Text>

        <Text 
          color="gray.600" 
          noOfLines={2} 
          fontSize="sm"
          id={`product-description-${item.id}`}
          tabIndex={0}
        >
          {item.description || "Sem descrição"}
        </Text>

        <Flex gap={2} mt={2} flexWrap="wrap">
          {item.category && (
            <Badge 
              colorScheme="purple" 
              fontSize="sm"
              aria-label={`Categoria: ${item.category}`}
            >
              {item.category}
            </Badge>
          )}
          {item.quantity > 0 && (
            <Badge 
              colorScheme="green" 
              fontSize="sm"
              aria-label={`Quantidade disponível: ${item.quantity} unidades`}
            >
              {item.quantity} unidades
            </Badge>
          )}
        </Flex>

        <Button
          mt="auto"
          colorScheme="green"
          size="md"
          onClick={() => navigate(`/produto/${item.id}`)}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "md",
          }}
          transition="all 0.2s"
          aria-label={`Ver detalhes do produto ${item.name}`}
        >
          Ver Detalhes
        </Button>

        {isOwner && (
          <>
            <Divider borderColor="gray.200" mt={2} />
            <Flex gap={2} mt={2}>
              <Button
                onClick={handleManageProduct}
                flex={1}
                color="#ffffff"
                background="#52601A"
                _hover={{
                  background: "#c0ab8e",
                  color: "#ffffff",
                }}
                aria-label={`Editar produto ${item.name}`}
              >
                Editar
              </Button>
              <Button
                onClick={handleDeleteProduct}
                flex={1}
                color="#ffffff"
                background="red.500"
                _hover={{
                  background: "#c0ab8e",
                  color: "#ffffff",
                }}
                isLoading={isDeleting}
                loadingText="Deletando..."
                aria-label={`Deletar produto ${item.name}`}
              >
                Deletar
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default ProductCard;
