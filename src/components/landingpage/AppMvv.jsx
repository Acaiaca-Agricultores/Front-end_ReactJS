import { Button, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import AppModal from "./AppModal";

import IconMission from "../../assets/icons/mission.svg";
import IconVision from "../../assets/icons/vision.svg";
import IconValues from "../../assets/icons/values.svg";
import { color } from "framer-motion";

const MVVData = [
  {
    title: "Missão",
    icon: IconMission,
    color: "#199635",
    buttonColor: "#199635",
    buttonColorHover: "#c0ab8e",
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
    color: "#008324",
    buttonColor: "#008324",
    buttonColorHover: "#c0ab8e",
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
    color: "#1F5519",
    buttonColor: "#1F5519",
    buttonColorHover: "#c0ab8e",
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
        as="section"
        role="region"
        aria-label="Missão, Visão e Valores da Plataforma Acaiacá"
        templateColumns={{ base: "1fr", md: "repeat(6, 1fr)" }}
        gap={6}
        padding={{ base: "2rem", md: "5rem 10rem;" }}
        background={"#fad4a1"}
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
            role="group"
            aria-label={item.title}
          >
            <Image
              src={item.icon}
              alt={`Ícone de ${item.title}`}
              boxSize="80px"
            />
            <h2
              style={{ color: item.color }}
              tabIndex={0}
              role="heading"
              aria-level={2}
              aria-label={item.title}
            >
              {item.title}
            </h2>
            <Text>{item.description}</Text>
            <Button
              onClick={() => handleOpenModal(index)}
              color={"white"}
              style={{ background: item.buttonColor }}
              borderRadius={"10px"}
              fontFamily={"Onest"}
              fontSize={"1.2rem"}
              fontWeight={400}
              lineHeight={"150%"}
              w={{ base: "10rem", md: "13rem" }}
              padding={"1.5rem"}
              _hover={{
                bg: item.buttonColorHover,
                color: "#000000",
              }}
              aria-label={`Abrir detalhes sobre ${item.title}`}
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
