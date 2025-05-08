import React from "react";
import "./styles.css";
import { Button, Image, Grid, GridItem } from "@chakra-ui/react";
import ImagemAgricultor from "../../assets/agricultor.jpg";

const App = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6} margin={"4.5rem 7.5rem"}>
      <GridItem
        colSpan={3}
        rowSpan={1}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        gap={"5rem"}
      >
        <h1>
          O <span>Amor</span> é algo que se <span>planta</span> e se{" "}
          <span>rega</span> todos os dias
        </h1>
        <Button
          color={"white"}
          background={"#52601A"}
          borderRadius={"none"}
          textAlign={"center"}
          fontFamily={"Onest"}
          fontSize={"1.5rem"}
          fontStyle={"normal"}
          fontWeight={400}
          lineHeight={"150%"}
          w={"13rem"}
          padding={"1.5rem"}
          _hover={{
            background: "#c0ab8e",
          }}
        >
          Saiba Mais!
        </Button>
      </GridItem>
      <GridItem colSpan={2} rowSpan={1}>
        <Image
          src={ImagemAgricultor}
          alt="Description"
          display={"flex"}
          w={"640px"}
          h={"560px"}
          flex={100}
          objectFit={"cover"}
        />
      </GridItem>
    </Grid>
  );
};
export default App;
