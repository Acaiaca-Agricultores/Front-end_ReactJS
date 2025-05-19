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
} from "@chakra-ui/react";

import FolhaCheck from "../../assets/icons/folhaDeLouro.png";
import IconSeed from "../../assets/icons/broto.png";
import IconRoots from "../../assets/icons/raízes.png";
import IconHarvest from "../../assets/icons/colheita.png";

const cardData = [
  {
    image: IconSeed,
    title: "Plano Semente",
    price: "R$89 / mês",
    benefits: [
      "Cesta com 5 a 7 produtos selecionados da estação.",
      "Frutas frescas, hortaliças e temperos.",
      "Sugestões de receitas acompanhando a cesta.",
    ],
  },
  {
    image: IconRoots,
    title: "Plano Raiz",
    price: "R$ 149 / mês",
    benefits: [
      " Tudo do Básico +",
      "3 a 4 produtos gourmet ou orgânicos (geleias, mel, castanhas, etc.)",
      "Prioridade na escolha de produtos mais raros ou limitados.",
      "Acesso a conteúdos exclusivos sobre origem e preparo.",
    ],
  },
  {
    image: IconHarvest,
    title: "Plano Colheita",
    price: "R$199 / mês",
    benefits: [
      "Tudo do Premium +",
      "2 a 3 produtos de pequenos produtores locais (ex.: queijos, pães, conservas)",
      "2 produtos surpresa a cada mês (ex.: superalimentos, fermentados, sucos artesanais)",
      "Desconto de 10% em compras avulsas no site",
      "Frete grátis para compras acima de R$ 100,00",
    ],
  },
];

const AppSubs = () => {
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
        "linear-gradient(0deg,rgba(0, 41, 0, 1) 0%, rgba(66, 156, 48, 1) 100%)"
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
      <Text as={"p"} textAlign={"center"}>
        Vantagens da sua assinatura após o limite gratuito
      </Text>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}>
        {cardData.map((card, index) => (
          <GridItem key={index} gap={5} padding={"2rem"}>
            <Card borderRadius={"1rem"} boxSize={"100%"}>
              <CardHeader>
                <Box textAlign={"center"} padding={"2rem 0"}>
                  <Image
                    src={card.image}
                    alt={`Ícone ilustrativo do ${card.title}`}
                    margin="0 auto"
                    boxSize="60px"
                  />
                  <Heading
                    as="h2"
                    fontSize={"2rem"}
                    color={
                      card.title === "Plano Semente"
                        ? "#72CC5D"
                        : card.title === "Plano Raiz"
                        ? "#46A637"
                        : card.title === "Plano Colheita"
                        ? "#197F10"
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
                        ? "#72CC5D"
                        : card.title === "Plano Raiz"
                        ? "#46A637"
                        : card.title === "Plano Colheita"
                        ? "#197F10"
                        : undefined
                    }
                  >
                    {card.price}
                  </Heading>
                </Box>
                <CardBody padding={0}>
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
                          src={FolhaCheck}
                          alt="Ícone de confirmação"
                          boxSize="1.2em"
                        />
                        <Text color={"#000000"}>{benefit}</Text>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </CardBody>
              </CardHeader>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default AppSubs;
