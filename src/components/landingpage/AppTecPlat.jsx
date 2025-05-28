import {
  Box,
  Image,
  SimpleGrid,
  Text,
  Heading,
  Card,
  CardHeader,
  CardBody,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import ImageAIcai from "../../assets/IAcai-frutas.png";
import ImageSec from "../../assets/icons/cyber-security.mp4";
import fundoIAcai from "../../assets/fundoIAcai.png";
import IconChat2 from "../../assets/icons/chat.png";
import IconFamily from "../../assets/icons/family.png";
import IconVoice from "../../assets/icons/voice-command.png";
import ImagePlataforma from "../../assets/plataforma.png";

const dataCardSec = [
  {
    title: "Segurança de Dados",
    description:
      "A segurança da plataforma é garantida por meio de um script de segurança que protege os dados dos usuários e das transações realizadas na plataforma. O script é atualizado regularmente para garantir a proteção contra novas ameaças.",
  },
  {
    title: "Criptografia de Dados",
    description:
      "A plataforma utiliza criptografia de dados para proteger as informações dos usuários e das transações realizadas. Isso garante que os dados sejam transmitidos de forma segura e que não possam ser acessados por terceiros.",
  },
];

const gridStyles = {
  columns: { base: 1, md: 2 },
  spacing: 10,
  background: "transparent",
};

const cardStyles = {
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  p: "2rem",
  textAlign: "center",
  borderRadius: "md",
  bg: "#fff",
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
    <Box>
      <Box
        id="apptecplat"
        as="section"
        role="region"
        aria-label="Tecnologia da Plataforma"
        textAlign="center"
        gap="2rem"
        padding={{ base: "2rem", md: "4.5rem" }}
        backgroundImage={`url(${fundoIAcai})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        display={{ base: "block", md: "flex" }}
        justifyContent="center"
      >
        <Box
          borderRadius="8px"
          p={6}
          background="rgba(0, 0, 0, 0.5)"
          backdropFilter="blur(8px)"
          color={"white"}
          width={{ base: "100%", md: "70%" }}
        >
          <Heading
            as="h1"
            fontSize={{ base: "1.5rem", md: "2.5rem" }}
            aria-label="Tecnologia"
            role="heading"
            textAlign={"center"}
            mb={10}
          >
            Simples e Intuitivo
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
            <Box
              display="flex"
              flexDirection="column"
              gap="2rem"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize={{ base: "1.2rem", md: "1.5rem" }} color="#83A11D">
                Olá sou a{" "}
                <span>
                  <strong>IAcai</strong>
                </span>
                , sejam todos bem vindos a nossa plataforma!
              </Text>
              <Text>
                Sou a inteligência artificial que vai te ajudar a encontrar os
                melhores produtos agrícolas e receitas. Vamos juntos explorar o
                mundo dos alimentos frescos e saudáveis?
              </Text>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Image
                src={ImageAIcai}
                alt="Imagem do assistente virtual IAcai"
                width="20rem"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              gap="2rem"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize={{ base: "1.2rem", md: "1.5rem" }} color="#83A11D">
                Vocês conhecem a nossa plataforma?
              </Text>
              <Text>
                Nossa plataforma é uma ferramenta inovadora que conecta
                agricultores e consumidores, promovendo a compra e venda de
                produtos agrícolas de forma direta e transparente.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      <SimpleGrid
        as="section"
        role="region"
        aria-label="Assistente virtual e chat inteligente"
        {...gridStyles}
        background={
          "linear-gradient(180deg,rgba(152, 57, 51, 1) 0%, rgba(73, 14, 13, 1) 100%);"
        }
        color={"white"}
      >
        <Box {...BoxStyles} boxSize={"100%"}>
          <Image
            src={ImagePlataforma}
            alt="Tela do chat inteligente da plataforma Acaiacá"
            boxSize={"100%"}
            objectFit="cover"
          />
        </Box>
        <Box
          {...BoxStyles}
          alignItems={{ base: "center", md: "flex-start" }}
          order={{ base: 2, md: 1 }}
          padding={{ base: "2rem", md: "4.5rem" }}
        >
          <UnorderedList
            spacing={3}
            styleType="none"
            sx={{
              "& > li": {
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
              },
            }}
          >
            <ListItem>
              <Image
                src={IconVoice}
                aria-label={`Ícone animado representando a plataforma`}
                style={{ width: "50px", height: "50px" }}
                muted
                loop
                autoPlay
                playsInline
              />
              <Box>
                <Heading color={"#FEE528"}>
                  Assistente por Comando de Voz
                </Heading>
                <Text textAlign={{ base: "center", md: "start" }}>
                  A IA funciona por meio de comandos de voz, permitindo a
                  criação de listas de compras de forma prática e rápida,
                  facilitando o dia a dia do usuário.
                </Text>
              </Box>
            </ListItem>
            <ListItem>
              <Image
                src={IconChat2}
                aria-label={`Ícone animado representando a plataforma`}
                style={{ width: "50px", height: "50px" }}
                muted
                loop
                autoPlay
                playsInline
              />
              <Box>
                <Heading color={"#FFD314"}>
                  Conversas sobre Sustentabilidade
                </Heading>
                <Text textAlign={{ base: "center", md: "start" }}>
                  Além de montar a lista, é possível conversar com a IA sobre
                  temas relacionados à sustentabilidade, como formas de cultivo,
                  origem dos produtos e impactos ambientais.
                </Text>
              </Box>
            </ListItem>
            <ListItem>
              <Image
                src={IconFamily}
                aria-label={`Ícone animado representando a plataforma`}
                style={{ width: "50px", height: "50px" }}
                muted
                loop
                autoPlay
                playsInline
              />
              <Box>
                <Heading color={"#EFB923"}>Acessível para Todos</Heading>
                <Text textAlign={{ base: "center", md: "start" }}>
                  A solução é pensada para ser acessível até mesmo para quem tem
                  pouca familiaridade com tecnologia, tornando o consumo
                  consciente mais fácil e democrático.
                </Text>
              </Box>
            </ListItem>
          </UnorderedList>
        </Box>
      </SimpleGrid>

      <Box
        padding={{ base: "2rem", md: "4.5rem 12.5rem" }}
        background={"#fcead0"}
      >
        <Heading
          as="h1"
          fontSize={{ base: "1.5rem", md: "2.5rem" }}
          aria-label="Tecnologia"
          role="heading"
          textAlign={"center"}
          mb={10}
        >
          Segurança e Confiabilidade
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
          {dataCardSec.map((item, index) => (
            <Card
              id="card"
              key={index}
              {...cardStyles}
              width="100%"
              alignItems={"center"}
            >
              <video
                src={ImageSec}
                aria-label={`Ícone animado representando a plataforma`}
                style={{ width: "80px", height: "80px" }}
                muted
                loop
                autoPlay
                playsInline
              />
              <CardHeader>
                <Heading size="md">{item.title}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{item.description}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  </>
);

export default AppTechPlat;
