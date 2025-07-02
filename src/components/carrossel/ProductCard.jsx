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
  useToast,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import axios from "axios";

const ProductCard = ({ item, API_URL, isOwner, onDelete }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();

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
      toast({
        title: "Erro ao deletar",
        description: "Não foi possível deletar o produto. Tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
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
      borderRadius="xl"
      bg="white"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.05)"
      height="auto"
      minH={isOwner ? "520px" : "480px"}
      display="flex"
      flexDirection="column"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: "#83a11d",
      }}
      position="relative"
      width="100%"
      maxW="350px"
      minW="280px"
      role="article"
      aria-labelledby={`product-title-${item.id}`}
      aria-describedby={`product-description-${item.id}`}
      tabIndex={0}
      overflow="hidden"
    >
      {item.quantity <= 0 && (
        <Box
          position="absolute"
          top={3}
          right={3}
          bg="red.500"
          color="white"
          px={3}
          py={1}
          borderRadius="full"
          fontSize="xs"
          fontWeight="bold"
          zIndex={2}
          boxShadow="0 2px 4px rgba(0,0,0,0.1)"
        >
          Indisponível
        </Box>
      )}

      <Box
        position="relative"
        height="200px"
        overflow="hidden"
        borderRadius="lg"
        mb={4}
        bg="gray.100"
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
          transition="transform 0.4s ease"
          _hover={{ transform: "scale(1.08)" }}
          fallbackSrc="https://via.placeholder.com/300x200?text=Produto"
        />
      </Box>

      <Flex direction="column" flex={1} gap={3}>
        <Heading
          size="md"
          color="gray.800"
          noOfLines={2}
          id={`product-title-${item.id}`}
          tabIndex={0}
          fontWeight="bold"
          lineHeight="1.3"
        >
          {item.name || "Sem nome"}
        </Heading>

        <Text
          fontSize="2xl"
          color="green.600"
          fontWeight="bold"
          aria-label={`Preço: ${
            item.price ? formatPrice(item.price) : "Preço não disponível"
          }`}
          tabIndex={0}
        >
          {item.price ? formatPrice(item.price) : "Preço não disponível"}
        </Text>

        <Text
          color="gray.600"
          noOfLines={2}
          fontSize="sm"
          id={`product-description-${item.id}`}
          tabIndex={0}
          lineHeight="1.4"
        >
          {item.description || "Sem descrição"}
        </Text>

        <Flex gap={2} mt={2} flexWrap="wrap">
          {item.category && (
            <Badge
              colorScheme="purple"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="full"
              aria-label={`Categoria: ${item.category}`}
            >
              {item.category}
            </Badge>
          )}
          {item.quantity > 0 && (
            <Badge
              colorScheme="green"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="full"
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
          leftIcon={<Icon as={ViewIcon} />}
          onClick={() => navigate(`/produto/${item.id}`)}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
          transition="all 0.2s"
          aria-label={`Ver detalhes do produto ${item.name}`}
          borderRadius="lg"
          fontWeight="semibold"
        >
          Ver Detalhes
        </Button>

        {isOwner && (
          <>
            <Divider borderColor="gray.200" my={3} />
            <Flex gap={2}>
              <Button
                onClick={handleManageProduct}
                flex={1}
                color="white"
                background="#52601A"
                leftIcon={<Icon as={EditIcon} />}
                _hover={{
                  background: "#83a11d",
                  transform: "translateY(-1px)",
                }}
                _active={{ transform: "scale(0.98)" }}
                aria-label={`Editar produto ${item.name}`}
                size="sm"
                borderRadius="lg"
                transition="all 0.2s"
              >
                Editar
              </Button>
              <Button
                onClick={() => setIsConfirmOpen(true)}
                flex={1}
                color="white"
                background="red.500"
                leftIcon={<Icon as={DeleteIcon} />}
                _hover={{
                  background: "red.600",
                  transform: "translateY(-1px)",
                }}
                _active={{ transform: "scale(0.98)" }}
                isLoading={isDeleting}
                loadingText="Deletando..."
                aria-label={`Deletar produto ${item.name}`}
                size="sm"
                borderRadius="lg"
                transition="all 0.2s"
              >
                Deletar
              </Button>
            </Flex>
            <AlertDialog
              isOpen={isConfirmOpen}
              leastDestructiveRef={cancelRef}
              onClose={() => setIsConfirmOpen(false)}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Confirmar Deleção
                  </AlertDialogHeader>
                  <AlertDialogBody>
                    Tem certeza que deseja deletar este produto? Esta ação não pode ser desfeita.
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={() => setIsConfirmOpen(false)}>
                      Cancelar
                    </Button>
                    <Button colorScheme="red" onClick={handleDeleteProduct} ml={3} isLoading={isDeleting}>
                      Deletar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default ProductCard;
