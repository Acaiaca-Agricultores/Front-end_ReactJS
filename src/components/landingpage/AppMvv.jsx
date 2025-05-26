import { Button, Box, SimpleGrid, Text, Card } from "@chakra-ui/react";
import AppModal from "./AppModal";

import IconMission from "../../assets/icons/flag.mp4";
import IconVision from "../../assets/icons/eye.mp4";
import IconValues from "../../assets/icons/value.mp4";

const MVVData = [
  {
    title: "Missão",
    image: IconMission,
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
    image: IconVision,
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
    image: IconValues,
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
      <SimpleGrid
        as="section"
        role="region"
        aria-labelledby="mvv-section-title"
        columns={3}
        spacing={10}
        padding={{ base: "2rem", md: "5rem 10rem;" }}
        background={"#FCEAD0"}
        display={"flex"}
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row" }}
      >
        {MVVData.map((item, index) => (
          <Card
            padding={"2rem"}
            key={index}
            role="article"
            aria-labelledby={`mvv-title-${index}`}
            aria-describedby={`mvv-description-${index}`}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={"1.5rem"}
              role="group"
              aria-label={item.title}
            >
              <video
                src={item.image}
                aria-label={`Ícone animado representando ${item.title}`}
                style={{ width: "80px", height: "80px" }}
                muted
                loop
                autoPlay
                playsInline
              />
              <h2
                id={`mvv-title-${index}`}
                style={{ color: item.color }}
                tabIndex={0}
                role="heading"
                aria-level={2}
              >
                {item.title}
              </h2>
              <Text id={`mvv-description-${index}`} tabIndex={0}>
                {item.description}
              </Text>
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
                aria-label={`Abrir mais informações sobre ${item.title}`}
              >
                Conheça Mais
              </Button>
            </Box>
          </Card>
        ))}
      </SimpleGrid>
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
