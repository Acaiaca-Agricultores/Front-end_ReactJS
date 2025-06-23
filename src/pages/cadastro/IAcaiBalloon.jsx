import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const IAcaiBalloon = ({ imageSrc, balloonText }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="100%"
      justifyContent="center"
      gap="1.5rem"
    >
      <Image
        src={imageSrc}
        alt="IAcai"
        boxSize={{ base: "220px", md: "400px" }}
        objectFit="contain"
        style={{ zIndex: 2 }}
      />
      <Box
        position="relative"
        bg="rgba(255, 255, 255, 0.38)"
        color="#ffffff"
        borderRadius="24px"
        p={{ base: 4, md: 6 }}
        minW={{ base: "180px", md: "260px" }}
        maxW={{ base: "320px", md: "420px" }}
        fontSize={{ base: "1.05rem", md: "1.25rem" }}
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.15)"
        backdropFilter="blur(8px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text textAlign="center">{balloonText}</Text>
      </Box>
    </Box>
  );
};

export default IAcaiBalloon;
