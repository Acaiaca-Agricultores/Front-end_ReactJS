import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  CardFooter,
  ButtonGroup,
  Button,
  Divider,
} from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const AppCarrossel = ({ data, title }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  const buttonStyles = {
    color: "white",
    background: "trasparent",
    border: "2px solid #c0ab8e",
    borderRadius: "10px",
    fontFamily: "Onest",
    fontSize: "1.2rem",
    fontWeight: 400,
    lineHeight: "150%",
    w: { base: "10rem", md: "13rem" },
    padding: "2rem",
    _hover: {
      background: "#c0ab8e",
      color: "#000000",
    },
  };

  return (
    <>
      <Heading padding={"2rem 0"}>{title}</Heading>
      <Carousel responsive={responsive} margin="2rem">
        {data.map((item, index) => (
          <Card
            key={index}
            width={{ base: "100%", md: "35rem", lg: "25rem" }}
            height={"100%"}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="stretch"
            borderRadius="12px"
            border="3px solid #52601A"
            boxShadow="md"
            padding={[2, 3, 4]}
          >
            <CardBody
              flex="1 1 auto"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
            >
              <Image
                border="3px solid #E5D1B0"
                width="100%"
                height={["10rem", "14rem", "18rem"]}
                objectFit="cover"
                src={item.image}
                alt={item.title}
                borderRadius="lg"
                mb={3}
              />
              <Stack mt="2" spacing="2" flex="1 1 auto">
                <Heading size="lg">{item.title}</Heading>
                <Text color="black" noOfLines={2}>
                  {item.description}
                </Text>
                <Text color="#52601A" fontSize="2xl">
                  {item.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2" width="100%">
                <Button
                  {...buttonStyles}
                  width="100%"
                  height={{ base: "3rem", md: "4rem" }}
                  aria-label="Cadastre-se na plataforma"
                  backgroundColor={"#83a11d"}
                  border="none"
                  color={"ffffff"}
                >
                  Saiba Mais
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </Carousel>
    </>
  );
};

export default AppCarrossel;
