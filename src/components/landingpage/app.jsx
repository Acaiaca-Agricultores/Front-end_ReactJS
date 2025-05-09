import "./styles-app.css";
import {
  Button,
  Image,
  Grid,
  GridItem,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

import ImagemAgricultor from "../../assets/agricultor.jpg";
import IconMission from "../../assets/icons/mission.svg";
import IconVision from "../../assets/icons/vision.svg";
import IconValues from "../../assets/icons/values.svg";

const App = () => {
  return (
    <>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }}
        gap={6}
        margin={{ base: "2rem", md: "4.5rem 7.5rem" }}
      >
        <GridItem
          id="texto"
          colSpan={{ base: 1, md: 3 }}
          rowSpan={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={{ base: "center", md: "flex-start" }}
          gap={"2rem"}
        >
          <h1 style={{ textAlign: "center" }}>
            O <span>Amor</span> é algo que se <span>planta</span> e se <span>rega</span> todos os dias
          </h1>
          <Button
            color={"white"}
            background={"#52601A"}
            borderRadius={"none"}
            textAlign={"center"}
            fontFamily={"Onest"}
            fontSize={"1.2rem"}
            fontStyle={"normal"}
            fontWeight={400}
            lineHeight={"150%"}
            w={{ base: "10rem", md: "13rem" }}
            padding={"1.5rem"}
            _hover={{
              background: "#c0ab8e",
            }}
          >
            Saiba Mais!
          </Button>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }} rowSpan={1}>
          <Image
            src={ImagemAgricultor}
            alt="Description"
            display={"flex"}
            w={{ base: "100%", md: "640px" }}
            h={{ base: "auto", md: "560px" }}
            objectFit={"cover"}
          />
        </GridItem>
      </Grid>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(6, 1fr)" }}
        gap={6}
        background={"#FFF0D7"}
        padding={{ base: "2rem", md: "4.5rem 12.5rem" }}
      >
        <GridItem
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"1.5rem"}
          colSpan={{ base: 1, md: 2 }}
          rowSpan={1}
        >
          <Image src={IconMission} alt="Mission Icon" boxSize="80px" />
          <h2>Missão</h2>
          <UnorderedList
            display={"flex"}
            flexDirection={"column"}
            gap={"1rem"}
            textAlign={"center"}
          >
            <ListItem>Fortalecer pequenos agricultores</ListItem>
            <ListItem>Promover a sustentabilidade</ListItem>
            <ListItem>Conectar colheitas a pessoas conscientes</ListItem>
            <ListItem>Valorizar alimentos cultivados</ListItem>
            <ListItem>Construir uma rede justa e humana</ListItem>
            <ListItem>Cultivar o futuro com cuidado e esperança</ListItem>
          </UnorderedList>
        </GridItem>
        <GridItem
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"1.5rem"}
          colSpan={{ base: 1, md: 2 }}
          rowSpan={1}
        >
          <Image src={IconVision} alt="Vision Icon" boxSize="80px" />
          <h2>Visão</h2>
          <UnorderedList
            display={"flex"}
            flexDirection={"column"}
            gap={"1rem"}
            textAlign={"center"}
          >
            <ListItem>Sustentabilidade no cultivo</ListItem>
            <ListItem>
              Promovemos práticas agrícolas que respeitam a natureza e cuidam
              do futuro.
            </ListItem>
            <ListItem>Protagonismo do agricultor familiar</ListItem>
            <ListItem>
              Valorizamos quem planta com dedicação, dando visibilidade, voz e
              renda justa.
            </ListItem>
            <ListItem>Comércio justo e transparente</ListItem>
            <ListItem>Cultivar o futuro com cuidado e esperança</ListItem>
            <ListItem>Alimentação saudável e acessível</ListItem>
            <ListItem>
              Levamos comida de verdade a quem valoriza saúde, sabor e origem.
            </ListItem>
            <ListItem>Educação e transformação social</ListItem>
            <ListItem>
              Espalhamos conhecimento que fortalece o campo e inspira escolhas
              conscientes.
            </ListItem>
          </UnorderedList>
        </GridItem>
        <GridItem
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"1.5rem"}
          colSpan={{ base: 1, md: 2 }}
          rowSpan={1}
        >
          <Image src={IconValues} alt="Values Icon" boxSize="80px" />
          <h2>Valores</h2>
          <UnorderedList
            display={"flex"}
            flexDirection={"column"}
            gap={"1rem"}
            textAlign={"center"}
          >
            <ListItem>
              Construir a principal plataforma de conexão direta entre
              agricultores familiares e consumidores no Brasil, promovendo uma
              nova economia do alimento — mais justa, transparente e afetiva —
              onde cada colheita gera renda digna, fortalece comunidades e
              inspira escolhas conscientes.
            </ListItem>
          </UnorderedList>
        </GridItem>
      </Grid>
    </>
  );
};

export default App;