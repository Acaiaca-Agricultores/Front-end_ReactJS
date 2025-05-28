import {
  Box,
  Image,
  SimpleGrid,
  Text,
  UnorderedList,
  ListItem,
  Heading,
  Center,
} from "@chakra-ui/react";

import FolhaCheck from "../../assets/leaf.png";
import ImagemODS2 from "../../assets/imagem-ods2.png";
import ImagemODS8 from "../../assets/imagem-ods8.jpg";

const AppOds = () => {
  return (
    <>
      <Box
        background={
          "linear-gradient(0deg,rgba(244, 169, 66, 1) 0%, rgba(252, 234, 208, 1) 100%)"
        }
      >
        <Center padding={{ base: "2rem", md: "4.5rem" }} display={"flex"} flexDirection={"column"} gap={"2rem"}>
          <Heading
            as="h1"
            fontSize={{ base: "1.5rem", md: "2rem" }}
            tabIndex={0}
            aria-label="Impacto Social"
          >
            Impacto Social e Sustentabilidade
          </Heading>
          <Text textAlign={{ base: "center", md: "end" }}>
            Atuamos diretamente para reduzir os índices da fome e fortalecer a
            economia rural, alinhando-se aos Objetivos de Desenvolvimento
            Sustentável da ONU
          </Text>
        </Center>
        <SimpleGrid
          as="section"
          role="region"
          aria-label="Impacto Social relacionado aos ODS"
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, md: 2 }}
          padding={{ base: "2rem", md: "4.5rem 12.5rem" }}
          backgroundColor={"transparent"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            flexDirection={{ base: "column", md: "row" }}
            gap={"2rem"}
            alignItems={"center"}
          >
            <Image
              src={ImagemODS2}
              alt="Imagem ilustrativa do Objetivo de Desenvolvimento Sustentável 2: Fome Zero e Agricultura Sustentável"
              boxSize={{ base: "100%", md: "18.75rem" }}
            />
            <Image
              src={ImagemODS8}
              alt="Imagem ilustrativa do Objetivo de Desenvolvimento Sustentável 8: Trabalho Decente e Crescimento Econômico"
              boxSize={{ base: "100%", md: "18.75rem" }}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={{ base: "center", md: "flex-end" }}
            gap={"2rem"}
          >
            <UnorderedList
              display={"flex"}
              flexDirection={"column"}
              gap={"1rem"}
              aria-label="Ações de impacto social"
              sx={{
                "& > li": {
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                },
              }}
            >
              <ListItem>
                <Image
                  src={FolhaCheck}
                  alt="Ícone de confirmação"
                  boxSize="1.2em"
                />
                <Text>Valorização dos pequenos produtores</Text>
              </ListItem>
              <ListItem>
                <Image
                  src={FolhaCheck}
                  alt="Ícone de confirmação"
                  boxSize="1.2em"
                />
                <Text>Fortalecimento da economia rural</Text>
              </ListItem>
            </UnorderedList>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default AppOds;
