import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import ImagemAgricultor from "../../assets/agricultor.jpg";

const AppAgricultor = () => {
  return (
    <Grid gap={6}>
      <GridItem
        id="texto"
        colSpan={{ base: 1, md: 3 }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={{ base: "center", md: "flex-start" }}
        gap={"2rem"}
        backgroundImage={`url(${ImagemAgricultor})`}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        height={{
          base: "400px",
          md: "600px",
        }}
        position="relative"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          boxSize={"100%"}
          background="rgba(0, 0, 0, 0.5)"
          backdropFilter="blur(8px)"
          zIndex="1"
        ></Box>
        <Box
          zIndex="2"
          textAlign="left"
          color="white"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          gap={"1rem"}
          padding={{ base: "2rem", md: "4.5rem 12.5rem" }}
        >
          <Box>
            <Text fontSize={{ base: "2rem", md: "3rem" }}>
              O <span>Amor</span> é algo que se <span>planta</span>
            </Text>
            <Text fontSize={{ base: "2rem", md: "3rem" }}>
              e se <span>rega</span> todos os dias
            </Text>
          </Box>
          <Box>
            <Text fontSize={{ base: "1rem" }}>
              Cada colheita é um gesto de cuidado.
            </Text>
            <Text fontSize={{ base: "1rem" }}>
              Cada compra, um apoio ao pequeno agricultor.
            </Text>
          </Box>
          <Button
            color={"white"}
            background={"#52601A"}
            borderRadius={"10px"}
            fontFamily={"Onest"}
            fontSize={"1.2rem"}
            fontWeight={400}
            lineHeight={"150%"}
            w={{ base: "10rem", md: "13rem" }}
            padding={"2rem"}
            _hover={{
              background: "#c0ab8e",
            }}
          >
            Saiba Mais!
          </Button>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default AppAgricultor;
