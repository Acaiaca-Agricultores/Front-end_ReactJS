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
    const numbers = phone.replace(/\D/g, "");
    
    const withCountryCode = numbers.startsWith("55") ? numbers : `55${numbers}`;
    
    let formattedNumber = withCountryCode;
    
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
      role="article"
      aria-labelledby="product-title"
      aria-describedby="product-description"
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
            alt={`Imagem do produto ${product.name}`}
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
            <Heading 
              as="h1" 
              size="xl" 
              color="green.700"
              id="product-title"
              tabIndex={0}
            >
              {product.name}
            </Heading>
            <Badge
              colorScheme={product.quantity > 0 ? "green" : "red"}
              fontSize="md"
              p={2}
              borderRadius="md"
              aria-label={`Status: ${product.quantity > 0 ? "Disponível" : "Indisponível"}`}
            >
              {product.quantity > 0 ? "Disponível" : "Indisponível"}
            </Badge>
          </Flex>

          <Box display="flex" flexDirection="column" gap={4}>
            <Text 
              fontSize="xl" 
              color="gray.700"
              id="product-description"
              tabIndex={0}
            >
              {product.description || "Nenhuma descrição disponível."}
            </Text>

            <Text 
              fontSize="3xl" 
              color="green.600" 
              fontWeight="bold"
              aria-label={`Preço: ${product.price ? formatPrice(product.price) : "Preço não disponível"}`}
              tabIndex={0}
            >
              {product.price
                ? formatPrice(product.price)
                : "Preço não disponível"}
            </Text>

            {product.quantity && (
              <Text fontSize="lg" color="gray.700" tabIndex={0}>
                Quantidade disponível:{" "}
                <Badge colorScheme="green" fontSize="md">
                  {product.quantity} unidades
                </Badge>
              </Text>
            )}

            {product.category && (
              <Text fontSize="lg" color="gray.700" tabIndex={0}>
                Categoria:{" "}
                <Badge colorScheme="purple">{product.category}</Badge>
              </Text>
            )}

            <Divider my={4} />

            <Box 
              bg="gray.50" 
              p={4} 
              borderRadius="md"
              role="region"
              aria-label="Informações do Vendedor"
            >
              <Text fontSize="lg" fontWeight="bold" mb={2} color="gray.700">
                Informações do Vendedor
              </Text>
              {agricultorInfo.username && (
                <Text fontSize="md" color="gray.700" tabIndex={0}>
                  Vendedor: <strong>{agricultorInfo.username}</strong>
                </Text>
              )}
              {agricultorInfo.propertyName && (
                <Text fontSize="md" color="gray.700" tabIndex={0}>
                  Propriedade: <strong>{agricultorInfo.propertyName}</strong>
                </Text>
              )}
              {(agricultorInfo.city || agricultorInfo.state) && (
                <Text fontSize="md" color="gray.700" tabIndex={0}>
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
                  aria-label={`Contatar vendedor ${agricultorInfo.username} via WhatsApp`}
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
                aria-label="Compartilhar produto"
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
