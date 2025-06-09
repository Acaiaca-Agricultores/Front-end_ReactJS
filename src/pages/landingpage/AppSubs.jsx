import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

import IconSeed from "../../assets/icons/growing-seed.mp4";
import IconRoots from "../../assets/icons/tree.mp4";
import IconHarvest from "../../assets/icons/vegetable.mp4";
import IconCheck from "../../assets/icons/check.png";
import IconCancel from "../../assets/icons/cancel.png";

const buttonStyles = {
  color: "white",
  background: "#83a11d",
  borderRadius: "10px",
  fontFamily: "Onest",
  fontSize: "1.2rem",
  fontWeight: 400,
  lineHeight: "150%",
  w: { base: "10rem", md: "13rem" },
  padding: "2rem",
  _hover: {
    background: "#c0ab8e",
    color: "#000000",
  },
};

const cardData = [
  {
    image: IconSeed,
    title: "Plano Semente",
    price: "R$ Gratuito / mês",
    benefits: [
      {
        text: "Compre produtos frescos.",
        icon: IconCheck,
      },
      {
        text: "Acesso por 4 meses.",
        icon: IconCheck,
      },
      {
        text: "Acesso à IAcai.",
        icon: IconCancel,
      },
      {
        text: "Acesso a receitas.",
        icon: IconCancel,
      },
    ],
  },
  {
    image: IconRoots,
    title: "Plano Raiz",
    price: "R$ 89,90 / mês",
    benefits: [
      {
        text: "Compre produtos frescos.",
        icon: IconCheck,
      },
      {
        text: "Acesso ilimitado.",
        icon: IconCheck,
      },
      {
        text: "Acesso à IAcai",
        icon: IconCheck,
      },
      {
        text: "Acesso a receitas",
        icon: IconCheck,
      },
    ],
  },
  {
    image: IconHarvest,
    title: "Plano Colheita",
    price: "R$149,90 / mês",
    benefits: [
      {
        text: "Compre produtos frescos.",
        icon: IconCheck,
      },
      {
        text: "Acesso total ao marketplace.",
        icon: IconCheck,
      },
      {
        text: "Acesso à IAcai",
        icon: IconCheck,
      },
      {
        text: "Recomendações da IAcai.",
        icon: IconCheck,
      },
    ],
  },
];

const AppSubs = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigation = useNavigate();

  return (
    <Box
      id="appsubs"
      as="section"
      role="region"
      aria-label="Planos de assinatura e benefícios"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      padding={{ base: "2rem", md: "5rem" }}
      background={
        "linear-gradient(180deg,rgba(124, 76, 70, 1) 0%, rgba(68, 38, 35, 1) 100%)"
      }
    >
      <Text
        as={"h1"}
        fontSize={{ base: "2rem", md: "3rem" }}
        tabIndex={0}
        aria-label="Assinatura"
        role="heading"
        color={"#ffffff"}
      >
        Assinatura
      </Text>
      <Text as={"p"} textAlign={"center"} color={"#ffffff"} fontSize={"1.2rem"}>
        Vantagens da sua assinatura após o limite gratuito
      </Text>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        alignItems={"center"}
      >
        {cardData.map((card, index) => (
          <GridItem key={index} gap={5} padding={"2rem"}>
            <Card
              paddingTop={
                card.title === "Plano Semente" ||
                card.title === "Plano Colheita"
                  ? "4rem"
                  : "0"
              }
              borderRadius={"1rem"}
              boxSize={card.title === "Plano Raiz" ? "100%" : "auto"}
              transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
              border={
                card.title === "Plano Raiz" ? "8px solid #83a11d" : "none"
              }
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader padding={"0px"}>
                {card.title === "Plano Raiz" && (
                  <Text
                    textAlign="center"
                    background="#83a11d"
                    color="#45261F"
                    padding="0.5rem 1rem"
                    fontSize="1.5rem"
                    fontWeight="bold"
                    marginBottom="1rem"
                  >
                    Recomendado
                  </Text>
                )}
                <Box textAlign={"center"} padding={"2rem 0"}>
                  <video
                    src={card.image}
                    alt={`Ícone ilustrativo do ${card.title}`}
                    style={{
                      margin: "0 auto",
                      width: "100px",
                      height: "100px",
                    }}
                    muted
                    loop
                    playsInline
                    ref={(video) => {
                      if (video) {
                        hoveredCard === index ? video.play() : video.pause();
                      }
                    }}
                  />
                  <Heading
                    as="h2"
                    fontSize={"2rem"}
                    color={
                      card.title === "Plano Semente"
                        ? "#b15c55"
                        : card.title === "Plano Raiz"
                        ? "#973a34"
                        : card.title === "Plano Colheita"
                        ? "#641c1a"
                        : undefined
                    }
                    tabIndex={0}
                    aria-label={card.title}
                    aria-level={2}
                    role="heading"
                  >
                    {card.title}
                  </Heading>
                  <Heading
                    fontSize={"1.3rem"}
                    color={
                      card.title === "Plano Semente"
                        ? "#b15c55"
                        : card.title === "Plano Raiz"
                        ? "#973a34"
                        : card.title === "Plano Colheita"
                        ? "#641c1a"
                        : undefined
                    }
                  >
                    {card.price}
                  </Heading>
                </Box>
                <CardBody
                  padding={card.title === "Plano Raiz" ? "2.8rem" : "2rem"}
                >
                  <UnorderedList
                    spacing={3}
                    aria-label={`Benefícios do ${card.title}`}
                    sx={{
                      "& > li": {
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      },
                    }}
                  >
                    {card.benefits.map((benefit, id) => (
                      <ListItem key={id}>
                        <Image
                          src={benefit.icon}
                          alt="Ícone do benefício"
                          boxSize="1.2em"
                        />
                        <Text color={"#000000"}>{benefit.text}</Text>{" "}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </CardBody>
              </CardHeader>
            </Card>
          </GridItem>
        ))}
      </Grid>
      <Box width={{ base: "100%", md: "50%" }}>
        <Button
          {...buttonStyles}
          w="100%"
          h={{ base: "3rem", md: "5rem" }}
          aria-label="Cadastre-se na plataforma"
          onClick={() => navigation("/cadastro")}
          marginTop={{ base: "2rem", md: "3rem" }}
        >
          <Typewriter
            words={["Cadastre-se já!"]}
            //bold no texto
            fontWeight={800}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default AppSubs;
