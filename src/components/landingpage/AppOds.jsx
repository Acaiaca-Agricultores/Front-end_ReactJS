import {
  Box,
  Image,
  SimpleGrid,
  Text,
  UnorderedList,
  ListItem,
  Heading,
} from "@chakra-ui/react";

import FolhaCheck from "../../assets/icons/folhaDeLouro.png";
import ImagemODS2 from "../../assets/imagem-ods2.png";
import ImagemODS8 from "../../assets/imagem-ods8.jpg";

const AppOds = () => {
  return (
    <>
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
    </>
  );
};

export default AppOds;
