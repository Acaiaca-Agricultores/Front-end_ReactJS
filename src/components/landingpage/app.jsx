import "./styles-app.css";
import { useState } from "react";
//Chakra Importações
import {
  Button,
  Image,
  Grid,
  GridItem,
  ListItem,
  UnorderedList,
  Box,
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";

import ImagemAgricultor from "../../assets/agricultor.jpg";
import IconMission from "../../assets/icons/mission.svg";
import IconVision from "../../assets/icons/vision.svg";
import IconValues from "../../assets/icons/values.svg";
import ImagemTecnologia from "../../assets/tecnologia-e-plataforma.png";
import FolhaCheck from "../../assets/icons/folhaDeLouro.png";
import ImagemODS2 from "../../assets/imagem-ods2.png";
import ImagemODS8 from "../../assets/imagem-ods8.jpg";

//Criando um array de objetos para os planos
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

// Array de dados para Missão, Visão e Valores
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

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (index) => {
    setActiveModal(index);
    onOpen();
  };

  return (
    <>
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
      {activeModal !== null && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <ModalHeader
              fontFamily={"Onest"}
              fontSize={"2rem"}
              fontWeight={700}
              lineHeight={"150%"}
              color={"#52601A"}
            >
              {MVVData[activeModal].title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UnorderedList
                display={"flex"}
                flexDirection={"column"}
                gap={"1.2rem"}
                fontSize={"1.2rem"}
                sx={{
                  "& > li": {
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  },
                }}
              >
                {MVVData[activeModal].modalItems.map((item, idx) => (
                  <ListItem key={idx}>
                    <Image src={FolhaCheck} alt="check" boxSize="1.2em" />
                    <Text color={"#52601A"}>{item}</Text>
                  </ListItem>
                ))}
              </UnorderedList>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={onClose}
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
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <SimpleGrid
        columns={2}
        spacing={10}
        padding={{ base: "2rem", md: "4.5rem 12.5rem" }}
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          gap={"24px"}
        >
          <Text fontSize={{ base: "2rem", md: "3rem" }}>
            <span>Tecnologia e Plataforma</span>
          </Text>
          <UnorderedList
            display={"flex"}
            flexDirection={"column"}
            gap={"1rem"}
            fontSize={{ base: "1rem", md: "1.5rem" }}
          >
            <ListItem>Layout simples e intuitivo</ListItem>
            <ListItem>
              Funções nativas para auxiliar pessoas com deficiência
            </ListItem>
            <ListItem>Chat em tempo real</ListItem>
            <ListItem>Listas de compras com recurso de voz</ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <Image
            src={ImagemTecnologia}
            alt="Imagem que une tecnologia com a agricultura"
            width={"100%"}
          />
        </Box>
      </SimpleGrid>

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
        <Text color={"#FFFF"}>
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

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, md: 2 }}
        backgroundColor={"#FFF0D7"}
        padding={{ base: "2rem", md: "4.5rem 12.5rem" }}
      >
        <Box>
          <Image src={ImagemODS2} boxSize={{ base: "100%", md: "18.75rem" }} />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={{ base: "center", md: "flex-end" }}
          gap={"2rem"}
        >
          <Heading as="h1" fontSize={{ base: "1.5rem", md: "2rem" }}>
            Impacto Social
          </Heading>
          <Text textAlign={{ base: "center", md: "end" }}>
            Atuamos diretamente para reduzir os índices da fome e fortalecer a
            economia rural, alinhando-se aos Objetivos de Desenvolvimento
            Sustentável da ONU:
          </Text>
          <UnorderedList
            display={"flex"}
            flexDirection={"column"}
            gap={"1rem"}
            sx={{
              "& > li": {
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
              },
            }}
          >
            <ListItem>
              <Image src={FolhaCheck} alt="check" boxSize="1.2em" />{" "}
              <Text>Valorização dos pequenos produtores</Text>
            </ListItem>
            <ListItem>
              <Image src={FolhaCheck} alt="check" boxSize="1.2em" />{" "}
              <Text>Educação e consciêntização</Text>
            </ListItem>
            <ListItem>
              <Image src={FolhaCheck} alt="check" boxSize="1.2em" />
              <Text>Valorização dos pequenos produtores</Text>
            </ListItem>
          </UnorderedList>
        </Box>
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, md: 2 }}
        backgroundColor="#FFF0D7"
        padding={{ base: "2rem", md: "4.5rem 12.5rem" }}
        justifyItems={"end"}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          order={{ base: 1, md: 2 }}
        >
          <Image
            src={ImagemODS8}
            alt="Imagem representando o impacto social"
            boxSize={{ base: "100%", md: "18.75rem" }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems={{ base: "center", md: "flex-start" }}
          gap="2rem"
          order={{ base: 2, md: 1 }} // Texto aparece depois no mobile
        >
          <Heading as="h1" fontSize={{ base: "1.5rem", md: "2rem" }}>
            Sustentabilidade
          </Heading>
          <Text textAlign={{ base: "center", md: "start" }}>
            Atuamos diretamente para reduzir os índices da fome e fortalecer a
            economia rural, alinhando-se aos Objetivos de Desenvolvimento
            Sustentável da ONU:
          </Text>
          <UnorderedList
            spacing="1rem"
            sx={{
              "& > li": {
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
              },
            }}
          >
            <ListItem>
              <Image src={FolhaCheck} alt="check" boxSize="1.2em" />
              <Text>Valorização dos pequenos produtores</Text>
            </ListItem>
            <ListItem>
              <Image src={FolhaCheck} alt="check" boxSize="1.2em" />
              <Text>Educação e conscientização</Text>
            </ListItem>
            <ListItem>
              <Image src={FolhaCheck} alt="check" boxSize="1.2em" />
              <Text>Fortalecimento da economia rural</Text>
            </ListItem>
          </UnorderedList>
        </Box>
      </SimpleGrid>

      <Flex
        gap={6}
        margin={{ base: "2rem", md: "4.5rem 7.5rem" }}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box id="texto" display={"flex"} justifyContent={"center"}>
          <Text fontSize={{ base: "2rem", md: "3rem" }}>
            Sobre <span>Acaiacá</span>
          </Text>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <iframe
            width="1014"
            height="570"
            src="https://www.youtube.com/embed/cYsm9WHt4yg"
            title="Comercial Acaiacá legendado"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </Box>
      </Flex>
    </>
  );
};

export default App;
