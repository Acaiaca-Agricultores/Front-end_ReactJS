import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Badge,
  Button,
  Icon,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { FaWhatsapp, FaShare } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

function ProductDetailCard({ product, API_URL }) {
  const imageUrl = `${API_URL}${product.image}`;
  const toast = useToast();

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch (error) {
      toast({
        title: "Não foi possível compartilhar",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const formatPhoneNumber = (phone) => {
    // Remove todos os caracteres não numéricos
    const numbers = phone.replace(/\D/g, "");
    
    // Se o número não começar com 55 (código do Brasil), adiciona
    const withCountryCode = numbers.startsWith("55") ? numbers : `55${numbers}`;
    
    // Se o número tiver 12 dígitos (com DDD) ou mais, usa como está
    // Se tiver 11 dígitos (número local com 9), adiciona o DDD padrão
    // Se tiver 10 dígitos (número local sem 9), adiciona 9 e o DDD padrão
    let formattedNumber = withCountryCode;
    
    // Garante que o número tenha pelo menos 12 dígitos (código do país + DDD + número)
    if (formattedNumber.length < 12) {
      toast({
        title: "Número de telefone incompleto",
        description: "O número de telefone do vendedor parece estar incompleto.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    
    return formattedNumber;
  };

  const handleContact = () => {
    const agricultorInfo = getAgricultorInfo();
    const phone = agricultorInfo.phone;

    if (!phone) {
      toast({
        title: "Número indisponível",
        description: "O número de telefone do vendedor não está disponível.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formattedPhone = formatPhoneNumber(phone);
    const message = encodeURIComponent(`Olá, tenho interesse no produto ${product.name}`);
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  // Função para extrair as informações do agricultor considerando diferentes estruturas possíveis
  const getAgricultorInfo = () => {
    const agricultor = product.agricultor || product.User || {};
    return {
      username: agricultor.username || agricultor.name,
      city: agricultor.cityName || agricultor.city,
      state: agricultor.stateName || agricultor.state,
      phone: agricultor.phoneNumber || agricultor.phone,
      propertyName: agricultor.propertyName,
    };
  };

  const agricultorInfo = getAgricultorInfo();

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="lg"
      border="2px solid #83a11d"
      _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
      style={{ transition: "all 0.3s ease" }}
    >
      <Flex direction={{ base: "column", md: "row" }} gap={6}>
        <Box
          flexShrink={0}
          width={{ base: "100%", md: "400px" }}
          height={{ base: "300px", md: "400px" }}
        >
          <Image
            borderRadius="lg"
            src={imageUrl}
            alt={product.name}
            objectFit="cover"
            width="100%"
            height="100%"
            style={{ transition: "transform 0.3s ease" }}
            _hover={{ transform: "scale(1.05)" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${API_URL}/uploads/products/default_placeholder.jpg`;
            }}
          />
        </Box>

        <Box flex="1">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading as="h1" size="xl" color="green.700">
              {product.name}
            </Heading>
            <Badge
              colorScheme={product.quantity > 0 ? "green" : "red"}
              fontSize="md"
              p={2}
              borderRadius="md"
            >
              {product.quantity > 0 ? "Disponível" : "Indisponível"}
            </Badge>
          </Flex>

          <Box display="flex" flexDirection="column" gap={4}>
            <Text fontSize="xl" color="gray.700">
              {product.description || "Nenhuma descrição disponível."}
            </Text>

            <Text fontSize="3xl" color="green.600" fontWeight="bold">
              {product.price
                ? formatPrice(product.price)
                : "Preço não disponível"}
            </Text>

            {product.quantity && (
              <Text fontSize="lg" color="gray.700">
                Quantidade disponível:{" "}
                <Badge colorScheme="green" fontSize="md">
                  {product.quantity} unidades
                </Badge>
              </Text>
            )}

            {product.category && (
              <Text fontSize="lg" color="gray.700">
                Categoria:{" "}
                <Badge colorScheme="purple">{product.category}</Badge>
              </Text>
            )}

            <Divider my={4} />

            <Box bg="gray.50" p={4} borderRadius="md">
              <Text fontSize="lg" fontWeight="bold" mb={2} color="gray.700">
                Informações do Vendedor
              </Text>
              {agricultorInfo.username && (
                <Text fontSize="md" color="gray.700">
                  Vendedor: <strong>{agricultorInfo.username}</strong>
                </Text>
              )}
              {agricultorInfo.propertyName && (
                <Text fontSize="md" color="gray.700">
                  Propriedade: <strong>{agricultorInfo.propertyName}</strong>
                </Text>
              )}
              {(agricultorInfo.city || agricultorInfo.state) && (
                <Text fontSize="md" color="gray.700">
                  Localização:{" "}
                  <strong>
                    {[agricultorInfo.city, agricultorInfo.state]
                      .filter(Boolean)
                      .join(" - ")}
                  </strong>
                </Text>
              )}
            </Box>

            <Flex gap={4} mt={4}>
              {agricultorInfo.phone && (
                <Button
                  leftIcon={<Icon as={FaWhatsapp} />}
                  colorScheme="green"
                  size="lg"
                  flex="1"
                  onClick={handleContact}
                >
                  Contatar Vendedor
                </Button>
              )}
              <Button
                leftIcon={<Icon as={FaShare} />}
                colorScheme="blue"
                size="lg"
                flex="1"
                onClick={handleShare}
              >
                Compartilhar
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </MotionBox>
  );
}

export default ProductDetailCard;
