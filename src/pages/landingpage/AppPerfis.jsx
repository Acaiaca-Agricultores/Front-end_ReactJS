import {
  SimpleGrid,
  Text,
  Heading,
  Box,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
} from "@chakra-ui/react";

import GitImage from "../../assets/icons/github.png";
import LinkedinImage from "../../assets/icons/linkedin.png";

import AlissonImagem from "../../assets/fotosPerfis/alisson.png";
import IsaacImagem from "../../assets/fotosPerfis/isaac.png";
import JulliaImagem from "../../assets/fotosPerfis/jullia.png";
import ManuelImagem from "../../assets/fotosPerfis/manoel.png";
import MayanImagem from "../../assets/fotosPerfis/mayan.png";
import RamonImagem from "../../assets/fotosPerfis/ramon.png";
import YasminImagem from "../../assets/fotosPerfis/yasmin.png";
import BackgroundImage from "../../assets/background-perfil.jpg";

import dataCardRaw from "../../services/dataCard.json";

const imageMap = {
  AlissonImagem,
  IsaacImagem,
  JulliaImagem,
  ManuelImagem,
  MayanImagem,
  RamonImagem,
  YasminImagem,
};

const dataCard = Array.isArray(dataCardRaw)
  ? dataCardRaw.map((item) => ({
      ...item,
      image: imageMap[item.image] || BackgroundImage,
      id: item.id || item.title.replace(/\s+/g, "-").toLowerCase(),
    }))
  : [];

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
      minHeight="100vh"
      py={{ base: "2rem", md: "4rem" }}
    >
      <Heading
        id="perfis-section-title"
        color={"white"}
        tabIndex={0}
        pb={{ base: "1rem", md: "2rem" }}
        pt={{ base: "1rem", md: "0" }}
        zIndex={2}
        fontSize={{ base: "2xl", md: "4xl" }}
        textAlign="center"
      >
        Pessoas que fazem a Acaiacá
      </Heading>
      <Box
        position="absolute"
        inset="0"
        background="rgba(0, 0, 0, 0.4)"
        backdropFilter="blur(3px)"
        zIndex="1"
      />

      <SimpleGrid
        zIndex={2}
        as="section"
        role="region"
        aria-labelledby="perfis-section-title"
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 4, md: 6 }}
        paddingX={{ base: "1rem", md: "2rem" }}
        width="100%"
        maxWidth="1200px"
      >
        {dataCard.map((item, idx) => {
          const isLastSingle =
            dataCard.length % 2 === 1 && idx === dataCard.length - 1;
          return (
            <Card
              key={item.id}
              direction={{ base: "column", md: "row" }}
              overflow="hidden"
              variant="outline"
              bg="whiteAlpha.800"
              borderColor="whiteAlpha.300"
              borderRadius="xl"
              boxShadow="lg"
              width="100%"
              transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "xl",
              }}
              sx={
                isLastSingle
                  ? {
                      gridColumn: { lg: "1 / span 2" },
                      mx: "auto",
                      maxWidth: { lg: "50%" },
                    }
                  : {}
              }
            >
              <Image
                src={item.image}
                alt={`Foto de ${item.title}`}
                objectFit="cover"
                width={{ base: "100%", md: "180px", lg: "300px" }}
                height={{ base: "100%", md: "auto" }}
                alignSelf={{ base: "center", md: "stretch" }}
                borderTopLeftRadius={{ base: "xl", md: "xl" }}
                borderBottomLeftRadius={{ base: "0", md: "xl" }}
                borderTopRightRadius={{ base: "xl", md: "0" }}
                borderBottomRightRadius={{ base: "0", md: "0" }}
              />

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p={{ base: 4, md: 5 }}
                flex="1"
              >
                <CardBody p={0}>
                  <Heading
                    as="h3"
                    size="md"
                    fontWeight="semibold"
                    mb={1}
                    noOfLines={2}
                  >
                    {item.title}
                  </Heading>
                  <Text
                    color="gray.700"
                    fontSize={{ base: "sm", md: "md" }}
                    noOfLines={3}
                    minHeight={{ base: "3.2em", md: "3.6em" }}
                    mb={4}
                  >
                    {item.description}
                  </Text>
                </CardBody>

                <CardFooter
                  p={0}
                  display="flex"
                  justifyContent="flex-start"
                  gap={5}
                >
                  <Link
                    href={item.linkGithub}
                    isExternal
                    aria-label={`${item.title}'s Github`}
                  >
                    <Image
                      src={GitImage}
                      alt="GitHub"
                      boxSize="28px"
                      opacity={0.7}
                      _hover={{
                        opacity: 1,
                        transform: "scale(1.15)",
                        transition: "all 0.2s",
                      }}
                    />
                  </Link>
                  <Link
                    href={item.linkLinkedin}
                    isExternal
                    aria-label={`${item.title}'s LinkedIn`}
                  >
                    <Image
                      src={LinkedinImage}
                      alt="LinkedIn"
                      boxSize="28px"
                      opacity={0.7}
                      _hover={{
                        opacity: 1,
                        transform: "scale(1.15)",
                        transition: "all 0.2s",
                      }}
                    />
                  </Link>
                </CardFooter>
              </Box>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default AppPerfis;
