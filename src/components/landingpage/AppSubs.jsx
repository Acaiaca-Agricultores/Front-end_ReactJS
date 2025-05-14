import {
  Box,
  Button,
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

const cardData = [
  {
    title: "Plano Semente",
    price: "R$89 / mês",
    benefits: [
      "Cesta com 5 a 7 produtos selecionados da estação.",
      "Frutas frescas, hortaliças e temperos.",
      "Sugestões de receitas acompanhando a cesta.",
    ],
  },
  {
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
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      backgroundColor={"#839e5b"}
      padding={"5rem"}
    >
      <Text fontSize={{ base: "2rem", md: "3rem" }} color={"#FFFF"}>
        Assinatura
      </Text>
      <Text color={"#FFFF"} textAlign={"center"}>
        Vantagens da sua assinatura após o limite gratuito
      </Text>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}>
        {cardData.map((card, index) => (
          <GridItem key={index} width={"304px"} padding={"24px"}>
            <Card border={"3px solid #52601A"} boxSize={"100%"}>
              <CardHeader>
                <Box textAlign={"center"} padding={"2rem 0"}>
                  <Heading fontSize={"1.5rem"}>{card.title}</Heading>
                  <Heading fontSize={"1.3rem"}>{card.price}</Heading>
                </Box>
                <CardBody padding={0}>
                  <UnorderedList
                    spacing={3}
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
                        <Image src={FolhaCheck} alt="check" boxSize="1.2em" />
                        <Text color={"#52601A"}>{benefit}</Text>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </CardBody>
              </CardHeader>
            </Card>
          </GridItem>
        ))}
      </Grid>
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
  );
};

export default AppSubs;
