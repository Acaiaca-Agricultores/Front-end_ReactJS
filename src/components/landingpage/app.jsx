import "./styles-app.css";
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
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
} from "@chakra-ui/react";

import ImagemAgricultor from "../../assets/agricultor.jpg";
import IconMission from "../../assets/icons/mission.svg";
import IconVision from "../../assets/icons/vision.svg";
import IconValues from "../../assets/icons/values.svg";
import ImagemTecnologia from "../../assets/tecnologia-e-plataforma.png";
import FolhaCheck from "../../assets/icons/folhaDeLouro.png";
const App = () => {
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
            fontSize={{ base: "1rem", md: "1.5rem" }}
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
            fontSize={{ base: "1rem", md: "1.5rem" }}
          >
            <ListItem>Sustentabilidade no cultivo</ListItem>
            <ListItem>
              Promovemos práticas agrícolas que respeitam a natureza e cuidam do
              futuro.
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
            fontSize={{ base: "1rem", md: "1.5rem" }}
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
        padding={"7rem"}
      >
        <Text fontSize={{ base: "2rem", md: "3rem" }} color={"#FFFF"}>
          Assinatura
        </Text>
        <Text color={"#FFFF"}>
          Vantagens da sua assinatura após o limite gratuito
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}>
          <GridItem width={"304px"} padding={"24px"}>
            <Card border={"3px solid #52601A"}>
              <CardHeader textAlign={"center"}>
                <Heading fontSize={"1.5rem"}>Plano Semente</Heading>
                <Heading fontSize={"1.3rem"}>R$89 / mês</Heading>
                <CardBody>
                  <UnorderedList spacing={3}>
                    <ListItem display="flex" alignItems="flex-start">
                      <Image src={FolhaCheck} alt="check" boxSize="1.2em" />
                      <Text color={"#52601A"}>
                        Cesta com 5 a 7 produtos selecionados da estação.
                      </Text>
                    </ListItem>
                    <ListItem display="flex" alignItems="flex-start">
                      <Image src={FolhaCheck} boxSize="1.2em" />
                      <Text color={"#52601A"}>
                        Frutas frescas, hortaliças e temperos.
                      </Text>
                    </ListItem>
                    <ListItem display="flex" alignItems="flex-start">
                      <Image src={FolhaCheck} boxSize="1.2em" />
                      <Text color={"#52601A"}>
                        Sugestões de receitas acompanhando a cesta.
                      </Text>
                    </ListItem>
                  </UnorderedList>
                </CardBody>
              </CardHeader>
            </Card>
          </GridItem>
          
          <GridItem width={"304px"} padding={"24px"}>
            <Card border={"3px solid #52601A"}>
              <CardHeader textAlign={"center"}>
                <Heading fontSize={"1.5rem"}>Plano Semente</Heading>
                <Heading fontSize={"1.3rem"}>R$89 / mês</Heading>
                <CardBody>
                  <UnorderedList spacing={3}>
                    <ListItem display="flex" alignItems="flex-start">
                      <Image src={FolhaCheck} alt="check" boxSize="1.2em" />
                      <Text color={"#52601A"}>
                        Cesta com 5 a 7 produtos selecionados da estação.
                      </Text>
                    </ListItem>
                    <ListItem display="flex" alignItems="flex-start">
                      <Image src={FolhaCheck} boxSize="1.2em" />
                      <Text color={"#52601A"}>
                        Frutas frescas, hortaliças e temperos.
                      </Text>
                    </ListItem>
                    <ListItem display="flex" alignItems="flex-start">
                      <Image src={FolhaCheck} boxSize="1.2em" />
                      <Text color={"#52601A"}>
                        Sugestões de receitas acompanhando a cesta.
                      </Text>
                    </ListItem>
                  </UnorderedList>
                </CardBody>
              </CardHeader>
            </Card>
          </GridItem>

          <GridItem width={"304px"} padding={"24px"}>
            <Card border={"3px solid #52601A"}>
              <CardHeader textAlign={"center"}>
                <Heading fontSize={"1.5rem"}>Plano Semente</Heading>
                <Heading fontSize={"1.3rem"}>R$89 / mês</Heading>
                <CardBody>
                  <UnorderedList spacing={3}>
                    <ListItem display="flex" alignItems="flex-start">
                      <Image src={FolhaCheck} alt="check" boxSize="1.2em" />
                      <Text color={"#52601A"}>
                        Cesta com 5 a 7 produtos selecionados da estação.
                      </Text>
                    </ListItem>
                    <ListItem display="flex" alignItems="flex-start">
                      <Image src={FolhaCheck} boxSize="1.2em" />
                      <Text color={"#52601A"}>
                        Frutas frescas, hortaliças e temperos.
                      </Text>
                    </ListItem>
                    <ListItem display="flex" alignItems="flex-start">
                      <Image src={FolhaCheck} boxSize="1.2em" />
                      <Text color={"#52601A"}>
                        Sugestões de receitas acompanhando a cesta.
                      </Text>
                    </ListItem>
                  </UnorderedList>
                </CardBody>
              </CardHeader>
            </Card>
          </GridItem>
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
