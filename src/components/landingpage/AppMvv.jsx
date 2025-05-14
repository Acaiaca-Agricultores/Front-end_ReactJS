import { Button, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import AppModal from "./AppModal";

import IconMission from "../../assets/icons/mission.svg";
import IconVision from "../../assets/icons/vision.svg";
import IconValues from "../../assets/icons/values.svg";

const MVVData = [
  {
    title: "Missão",
    icon: IconMission,
    description:
      "Nossa missão é focada no Agricultor Familiar e na Comunidade Local que o cerca.",
    modalItems: [
      "Protagonismo do agricultor familiar",
      "Valorizamos quem planta com dedicação, dando visibilidade, voz e renda justa.",
      "Comércio justo e transparente",
      "Cultivar o futuro com cuidado e esperança",
      "Alimentação saudável e acessível",
      "Levamos comida de verdade a quem valoriza saúde, sabor e origem.",
      "Educação e transformação social",
      "Espalhamos conhecimento que fortalece o campo e inspira escolhas conscientes.",
    ],
  },
  {
    title: "Visão",
    icon: IconVision,
    description:
      "Nossa visão é de um futuro onde a agricultura familiar é valorizada e respeitada.",
    modalItems: [
      "Sustentabilidade no cultivo",
      "Promovemos práticas agrícolas que respeitam a natureza e cuidam do futuro.",
      "Protagonismo do agricultor familiar",
      "Valorizamos quem planta com dedicação, dando visibilidade, voz e renda justa.",
      "Comércio justo e transparente",
      "Cultivar o futuro com cuidado e esperança",
      "Alimentação saudável e acessível",
      "Levamos comida de verdade a quem valoriza saúde, sabor e origem.",
      "Educação e transformação social",
      "Espalhamos conhecimento que fortalece o campo e inspira escolhas conscientes.",
    ],
  },
  {
    title: "Valores",
    icon: IconValues,
    description:
      "Nossos valores são fundamentais para a construção de um futuro mais justo e sustentável.",
    modalItems: [
      "Construir a principal plataforma de conexão direta entre agricultores familiares e consumidores no Brasil.",
      "Promover uma nova economia do alimento — mais justa, transparente e afetiva.",
      "Cada colheita gera renda digna, fortalece comunidades e inspira escolhas conscientes.",
    ],
  },
];

const MvvApp = ({ activeModal, isOpen, onClose, handleOpenModal }) => {
  return (
    <>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(6, 1fr)" }}
        gap={6}
        background={"#FFF0D7"}
        padding={{ base: "2rem", md: "10rem;" }}
      >
        {MVVData.map((item, index) => (
          <GridItem
            key={index}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={"1.5rem"}
            colSpan={{ base: 1, md: 2 }}
            rowSpan={1}
          >
            <Image src={item.icon} alt={`${item.title} Icon`} boxSize="80px" />
            <h2>{item.title}</h2>
            <Text>{item.description}</Text>
            <Button
              onClick={() => handleOpenModal(index)}
              color={"white"}
              background={"#52601A"}
              borderRadius={"10px"}
              fontFamily={"Onest"}
              fontSize={"1.2rem"}
              fontWeight={400}
              lineHeight={"150%"}
              w={{ base: "10rem", md: "13rem" }}
              padding={"1.5rem"}
              _hover={{
                background: "#c0ab8e",
              }}
            >
              Conheça Mais
            </Button>
          </GridItem>
        ))}
      </Grid>
      <AppModal
        activeModal={activeModal}
        isOpen={isOpen}
        onClose={onClose}
        MVVData={MVVData}
      />
    </>
  );
};

export default MvvApp;
