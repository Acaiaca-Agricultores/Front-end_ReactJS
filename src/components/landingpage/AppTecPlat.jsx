import {
  Box,
  Image,
  SimpleGrid,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import ImagemTecnologia from "../../assets/tecnologia-e-plataforma.png";

const AppTechPlat = () => {
  return (
    <SimpleGrid
      columns={2}
      spacing={10}
      padding={{ base: "2rem", md: "4.5rem 12.5rem" }}
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        gap={"24px"}
      >
        <Text fontSize={{ base: "2rem", md: "3rem" }} textAlign={{ base: "center", md: "left" }}>
          <span>Tecnologia e Plataforma</span>
        </Text>
        <UnorderedList
          display={"flex"}
          flexDirection={"column"}
          gap={"1rem"}
          fontSize={{ base: "1rem", md: "1.5rem" }}
        >
          <ListItem>Layout simples e intuitivo</ListItem>
          <ListItem>
            Funções nativas para auxiliar pessoas com deficiência
          </ListItem>
          <ListItem>Chat em tempo real</ListItem>
          <ListItem>Listas de compras com recurso de voz</ListItem>
        </UnorderedList>
      </Box>
      <Box>
        <Image
          src={ImagemTecnologia}
          alt="Imagem que une tecnologia com a agricultura"
          width={"100%"}
        />
      </Box>
    </SimpleGrid>
  );
};

export default AppTechPlat;
