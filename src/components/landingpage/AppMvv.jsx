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
      "A nossa missão é dar visibilidade aos pequenos agricultores, valorizando o alimento feito com dedicação e carinho.",
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
      "Queremos expandir nossa atuação e nos consolidar como a principal plataforma nacional de conexão entre pequenos agricultores e consumidores.",
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
      "Sustentabilidade",
      "Protagonismo do agricultor",
      "Transparência no comércio",
      "Empatia",
      "Respeito",
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
        background={"#FCEAD0"}
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
              color="white"
              bg={item.buttonColor}
              borderRadius="10px"
              fontFamily="Onest"
              fontSize="1.2rem"
              fontWeight={400}
              lineHeight="150%"
              w={{ base: "10rem", md: "13rem" }}
              p="1.5rem"
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
