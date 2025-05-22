import {
  SimpleGrid,
  Text,
  Heading,
  Box,
  Card,
  CardBody,
  CardFooter,
  Button,
  ButtonGroup,
  Image,
  Stack,
} from "@chakra-ui/react";

const dataCard = [
  {
    title: "Nome do Desenvolvedor",
    description: "Descrição do desenvolvedor",
  },
  {
    title: "Nome do Desenvolvedor",
    description: "Descrição do desenvolvedor",
  },
  {
    title: "Nome do Desenvolvedor",
    description: "Descrição do desenvolvedor",
  },
  {
    title: "Nome do Desenvolvedor",
    description: "Descrição do desenvolvedor",
  },
  {
    title: "Nome do Desenvolvedor",
    description: "Descrição do desenvolvedor",
  },
  {
    title: "Nome do Desenvolvedor",
    description: "Descrição do desenvolvedor",
  },
  {
    title: "Nome do Desenvolvedor",
    description: "Descrição do desenvolvedor",
  },
];

const AppPerfis = () => {
  return (
    <Box display={"flex"} flexDirection="column" alignItems="center">
      <Heading as="h1" tabIndex={0} padding={"3rem"}>
        Pessoas que fazem a Acaiacá
      </Heading>

      <SimpleGrid
        id="index"
        as="section"
        role="region"
        aria-labelledby="mvv-section-title"
        columns={{ base: 1, md: 2 }}
        spacing={10}
        padding={{ base: "2rem", md: "0 10rem 10rem 10rem;" }}
      >
        {dataCard.map((item, index) => (
          <Card role="region">
            <SimpleGrid id="index" key={index} columns={2} spacing={10}>
              <Image
                objectFit="cover"
                boxSize="100%"
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />
              <Stack>
                <CardBody>
                  <Text>{item.title}</Text>
                  <Text>{item.description}</Text>
                </CardBody>
                <CardFooter>
                  <ButtonGroup>
                    <Button>Github</Button>
                    <Button>Linkedin</Button>
                  </ButtonGroup>
                </CardFooter>
              </Stack>
            </SimpleGrid>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AppPerfis;
