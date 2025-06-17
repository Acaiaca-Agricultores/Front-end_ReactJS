import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";

function ProductDetailCard({ product, API_URL }) {
  // Prefer product.image if available, otherwise fallback to product.imageUrl
  const imageUrl = `${API_URL}${product.image}`;

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
    >
      <Flex direction={{ base: "column", md: "row" }}>
        <Box flexShrink={0} mr={{ base: 0, md: 6 }} mb={{ base: 6, md: 0 }}>
          <Image
            borderRadius="lg"
            src={imageUrl}
            alt={product.name}
            objectFit="cover"
            maxW={{ base: "100%", md: "300px" }}
            maxH="300px"
            // You might want to add a fallback image for when `imageUrl` is broken
            onError={(e) => {
              e.target.onerror = null; // prevents looping
              e.target.src = `${API_URL}/uploads/products/default_placeholder.jpg`; // A more generic placeholder
            }}
          />
        </Box>
        <Box>
          <Heading as="h1" size="xl" mb={2} color="green.700">
            {product.name}
          </Heading>

          <Box mt={4} p={4} bg="green.50" borderRadius="md">
            <Text fontSize="md" color="gray.700" mb={2}>
              <Text as="span" fontWeight="bold">
                Descrição:
              </Text>{" "}
              {product.description || "Nenhuma descrição disponível."}
            </Text>
            <Text fontSize="md" color="gray.700" mb={2}>
              <Text as="span" fontWeight="bold">
                Preço:
              </Text>{" "}
              <Badge colorScheme="green" fontSize="lg" px={2} py={1}>
                R$ {product.price}
              </Badge>
            </Text>
            {product.quantity && (
              <Text fontSize="md" color="gray.700" mb={2}>
                <Text as="span" fontWeight="bold">
                  Quantidade:
                </Text>{" "}
                {product.quantity}
              </Text>
            )}
            {product.category && (
              <Text fontSize="md" color="gray.700">
                <Text as="span" fontWeight="bold">
                  Categoria:
                </Text>{" "}
                {product.category}
              </Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default ProductDetailCard;
