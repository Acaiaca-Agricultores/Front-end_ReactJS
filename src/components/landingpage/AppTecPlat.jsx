import {
  Box,
  Image,
  SimpleGrid,
  Text,
  Heading,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";

import ImagemTecnologia from "../../assets/plataforma_acaica-front.png";
import ChatTela from "../../assets/chat-tela.png";
import IconDevice from "../../assets/icons/device.png";
import IconChat from "../../assets/icons/chat.png";
import ImageAIcai from "../../assets/AIcai.png";

const gridStyles = {
  columns: { base: 1, md: 2 },
  spacing: 10,
  p: { base: "2rem", md: "4.5rem 12.5rem" },
  bg: "#fad4a1",
};

const cardStyles = {
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  p: "2rem",
  textAlign: "center",
  borderRadius: "md",
  bg: "#fff",
};

const cardHeaderStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "2rem",
};

const BoxStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "2rem",
};

const AppTechPlat = () => (
  <>
    <Box
      id="apptecplat"
      as="section"
      role="region"
      aria-label="Tecnologia da Plataforma"
      textAlign="center"
      gap="2rem"
      p={{ base: "2rem", md: "4.5rem 12.5rem" }}
      background="#f5f5f5"
    >
      <Card {...cardStyles}>
        <CardHeader>
          <Heading
            as="h1"
            fontSize={{ base: "1.5rem", md: "2rem" }}
            tabIndex={0}
            aria-label="Tecnologia"
            aria-level={1}
            role="heading"
          >
            Tecnologia
          </Heading>
        </CardHeader>
        <CardBody
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          gap="2rem"
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <Image
            src={ImageAIcai}
            alt="Imagem do assistente virtual IAcai"
            width={{ base: "20rem", md: "25rem" }}
          />
          <Box display={"flex"} flexDirection={"column"} gap="2rem">
            <Text fontSize={{ base: "1.2rem", md: "1.5rem" }} color="#83A11D">
              Olá sou a{" "}
              <span>
                <strong>IAcai</strong>
              </span>
              , sejam todos bem vindos a nossa plataforma!
            </Text>
            <Text>
              Nossa plataforma é uma ferramenta inovadora que conecta
              agricultores e consumidores, promovendo a compra e venda de
              produtos agrícolas de forma direta e transparente.
            </Text>
          </Box>
        </CardBody>
      </Card>
    </Box>

    <SimpleGrid
      as="section"
      role="region"
      aria-label="Plataforma digital para agricultores e consumidores"
      {...gridStyles}
    >
      <Box>
        <Image
          src={ImagemTecnologia}
          alt="Tela da plataforma digital Acaiacá mostrando funcionalidades para agricultores e consumidores"
          boxSize="100%"
        />
      </Box>
      <Box {...BoxStyles} alignItems={{ base: "center", md: "flex-end" }}>
        <Card {...cardStyles}>
          <CardHeader {...cardHeaderStyles}>
            <Image
              src={IconDevice}
              alt="Ícone representando tecnologia de dispositivos"
              boxSize="50px"
            />
            <Heading
              as="h2"
              fontSize={{ base: "1.5rem", md: "2rem" }}
              tabIndex={0}
              aria-label="Plataforma"
              aria-level={2}
              role="heading"
            >
              Plataforma
            </Heading>
          </CardHeader>
          <CardBody>
            <Text textAlign={{ base: "center", md: "end" }}>
              Nossa plataforma é uma ferramenta inovadora que conecta
              agricultores e consumidores, promovendo a compra e venda de
              produtos agrícolas de forma direta e transparente.
            </Text>
          </CardBody>
        </Card>
      </Box>
    </SimpleGrid>

    <SimpleGrid
      as="section"
      role="region"
      aria-label="Assistente virtual e chat inteligente"
      {...gridStyles}
    >
      <Box {...BoxStyles} order={{ base: 1, md: 2 }}>
        <Image
          src={ChatTela}
          alt="Tela do chat inteligente da plataforma Acaiacá"
          boxSize="100%"
        />
      </Box>
      <Box
        {...BoxStyles}
        alignItems={{ base: "center", md: "flex-start" }}
        order={{ base: 2, md: 1 }}
      >
        <Card {...cardStyles}>
          <CardHeader {...cardHeaderStyles}>
            <Image
              src={IconChat}
              alt="Ícone de chat representando assistente virtual"
              boxSize="50px"
            />
            <Heading
              as="h2"
              fontSize={{ base: "1.5rem", md: "2rem" }}
              tabIndex={0}
              aria-label="Chat Bot - IAcai"
              aria-level={2}
              role="heading"
            >
              Chat Bot - IAcai
            </Heading>
          </CardHeader>
          <CardBody>
            <Text textAlign={{ base: "center", md: "start" }}>
              Temos uma IA que auxilia na criação de listas de compras por
              comando de voz, onde será possível conversar sobre tudo o que
              permeia a sustentabilidade, como formas de cultivo do que se
              compra, deixando tudo mais prático, rápido e acessível, mesmo para
              quem tem pouca familiaridade com tecnologia.
            </Text>
          </CardBody>
        </Card>
      </Box>
    </SimpleGrid>
  </>
);

export default AppTechPlat;
