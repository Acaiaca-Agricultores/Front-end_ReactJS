import {
  SimpleGrid,
  Text,
  Heading,
  Box,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Link,
} from "@chakra-ui/react";

import GitImage from "../../assets/icons/github.png";
import LinkedinImage from "../../assets/icons/linkedin.png";

import AlissonImagem from "../../assets/fotosPerfis/alisson.png";
import IsaacImagem from "../../assets/fotosPerfis/isaac.png";
import JulliaImagem from "../../assets/fotosPerfis/jullia.png";
import ManuelImagem from "../../assets/fotosPerfis/manuel.png";
import MayanImagem from "../../assets/fotosPerfis/mayan.png";
import RamonImagem from "../../assets/fotosPerfis/ramon.png";
import YasminImagem from "../../assets/fotosPerfis/yasmin.png";
import BackgroundImage from "../../assets/background-perfil.jpg";

import dataCardRaw from "../services/dataCard.json";

const imageMap = {
  AlissonImagem,
  IsaacImagem,
  JulliaImagem,
  ManuelImagem,
  MayanImagem,
  RamonImagem,
  YasminImagem,
};

const dataCard = dataCardRaw.map((item) => ({
  ...item,
  image: imageMap[item.image],
}));

const AppPerfis = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      backgroundImage={`url(${BackgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      position="relative"
      width="100%"
    >
      <Heading
        color={"white"}
        tabIndex={0}
        padding="2rem"
        zIndex={2}
        fontSize={{ base: "1.5rem", md: "2.5rem" }}
        textAlign="center"
      >
        Pessoas que fazem a Acaiacá
      </Heading>
      <Box
        position="absolute"
        inset="0"
        background="rgba(0, 0, 0, 0.3)"
        backdropFilter="blur(2px)"
        zIndex="1"
      />

      <SimpleGrid
        zIndex={2}
        id="index"
        as="section"
        role="region"
        aria-labelledby="mvv-section-title"
        columns={{ base: 1, md: 2 }}
        spacing={6}
        padding={{ base: "1rem", md: "2rem 5rem" }}
        width="90%"
        maxWidth="1200px"
      >
        {dataCard.map((item, index) => (
          <Card
            zIndex={2}
            role="region"
            maxW="100%"
            key={index}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            minWidth="280px"
          >
            <SimpleGrid columns={{ base: 1, sm: 2 }} height="100%">
              <Box>
                <Image
                  src={item.image}
                  alt={item.title}
                  objectFit="cover"
                  borderRadius="10px"
                  width="100%"
                  height="auto"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                padding="1rem"
              >
                <CardBody padding="0">
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: "1rem", md: "1.2rem" }}
                    noOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <Text
                    color="gray.600"
                    fontSize={{ base: "0.9rem", md: "1rem" }}
                    noOfLines={2}
                  >
                    {item.description}
                  </Text>
                </CardBody>

                <CardFooter
                  padding="0"
                  marginTop="1rem"
                  display="flex"
                  justifyContent="space-around"
                >
                  <Link href={item.linkGithub} target="_blank">
                    <Image
                      src={GitImage}
                      alt="GitHub"
                      boxSize="2rem"
                      cursor="pointer"
                      _hover={{ transform: "scale(1.1)", transition: "0.2s" }}
                    />
                  </Link>
                  <Link href={item.linkLinkedin} target="_blank">
                    <Image
                      src={LinkedinImage}
                      alt="LinkedIn"
                      boxSize="2rem"
                      cursor="pointer"
                      _hover={{ transform: "scale(1.1)", transition: "0.2s" }}
                    />
                  </Link>
                </CardFooter>
              </Box>
            </SimpleGrid>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AppPerfis;
