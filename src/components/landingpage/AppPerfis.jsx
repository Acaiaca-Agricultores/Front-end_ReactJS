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
  Link,
} from "@chakra-ui/react";

import GitImage from '../../assets/icons/github.png'
import LinkedinImage from '../../assets/icons/linkedin.png'
import AlissonImagem from '../../assets/alisson.png'
import IsaacImagem from '../../assets/isaac.png'
import JulliaImagem from '../../assets/jullia.png'
import ManuelImagem from '../../assets/manuel.png'
import MayanImagem from '../../assets/mayan.png'
import RamonImagem from '../../assets/ramon.png'
import YasminImagem from '../../assets/yasmin.png'

const dataCard = [
  {
    image: AlissonImagem,
    title: "Alisson Sebastian Vieira Sartori ",
    description: "Desenvolvedor Full-Stack",
    linkGithub: "https://github.com/alissonsartori",
    linkLinkedin: "https://www.linkedin.com/in/alisson-sebastian-sartori/",
  },
  {
    image: IsaacImagem,
    title: "Isaac Rodrigues Pereira",
    description: "Desenvolvedor Front-end",
    linkGithub: "https://github.com/IsaacPow",
    linkLinkedin: "https://www.linkedin.com/in/isaac-rodrigues25/",
  },
  {
    image: JulliaImagem,
    title: "Jullia Kathelyn dos Santos Correia",
    description: "SCRUM Master e Desenvolvedora Full Stack  ",
    linkGithub: "https://github.com/julliakathelyn",
    linkLinkedin: "https://www.linkedin.com/in/jullia-kathelyn/",
  },
  {
    image: ManuelImagem,
    title: "Manoel Pires Cobra",
    description: "UI/UX Designer",
    linkGithub: "linkGithub",
    linkLinkedin: "https://www.linkedin.com/in/manoel-cobra-a190b4253/",
  },
  {
    image: MayanImagem,
    title: "Mayan Santos do Nascimento",
    description: "Producter Owner",
    linkGithub: "https://github.com/MayanGit",
    linkLinkedin: "https://www.linkedin.com/in/mayan-santos27/",
  },
  {
    image: RamonImagem,
    title: "Victor Ramon Dias e Silva",
    description: "Desenvolvedor Front-end",
    linkGithub: "https://github.com/vctramon",
    linkLinkedin: "https://www.linkedin.com/in/victor-ramon-vr/",
  },
  {
    image: YasminImagem,
    title: "Yasmin Araujo Santos",
    description: "Desenvolvedora Back-end",
    linkGithub: "https://github.com/yaslopesyweb",
    linkLinkedin: "https://www.linkedin.com/in/yasmin-lopes-devsecops/",
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
            <SimpleGrid 
            id="index" 
            key={index} 
            columns={2} 
            spacing={10}
            >
              <Image
                borderRadius={'10px'}
                objectFit="cover"
                boxSize="100%"
                src={item.image}
                alt="Caffe Latte"
              />
              <Stack>
                <CardBody>
                  <Text>{item.title}</Text>
                  <Text>{item.description}</Text>
                </CardBody>
                <CardFooter>
                  <Box                
                    display='flex'
                    justifyContent='space-around'
                    // backgroundColor='red'
                    width='200px'
                    alignItems='center'
                  >
                    <Link href={item.linkGithub} target="blank">
                      <Image
                      src={GitImage}
                      alt="GitHub"
                      boxSize='64px'
                      cursor='pointer'
                      _hover={{transform: 'scale(1.1)', transition: '0.2'}}
                    />
                    </Link>
                     <Link href={item.linkLinkedin} target="blank">
                      <Image
                      src={LinkedinImage}
                      alt="GitHub"
                      boxSize='64px'
                      cursor='pointer'
                      _hover={{transform: 'scale(1.1)', transition: '0.2'}}
                    />
                    </Link>
                  </Box>
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
