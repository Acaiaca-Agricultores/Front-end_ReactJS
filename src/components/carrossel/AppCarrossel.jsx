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
    background: "#83a11d",
    borderRadius: "8px",
    fontFamily: "Onest",
    fontSize: "1.1rem",
    fontWeight: 500,
    lineHeight: "150%",
    w: { base: "100%" },
    padding: { base: "0.75rem 1.5rem", md: "1rem 2rem" },
    _hover: {
      background: "#c0ab8e",
      color: "#000000",
      transform: "translateY(-2px)",
      boxShadow: "lg",
    },
    transition:
      "background 0.3s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  };

  return (
    <>
      <Heading padding={"2rem 0 1rem 0"}>{title}</Heading>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
      >
        {data.map((item, index) => (
          <Card
            key={index}
            width={{
              base: "calc(100% - 20px)",
              md: "calc(100% - 30px)",
              lg: "calc(100% - 40px)",
            }}
            height={"100%"}
            display="flex"
            flexDirection="column"
            alignItems="stretch"
            borderRadius="16px"
            overflow="hidden"
            margin="0 10px"
            boxShadow="none"
          >
            <CardBody
              flex="1 1 auto"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              padding={{ base: 3, md: 4 }}
            >
              <Image
                width="100%"
                height={{ base: "150px", md: "180px", lg: "200px" }}
                objectFit="cover"
                src={item.image}
                alt={item.title}
                borderRadius="md"
                mb={4}
              />
              <Stack spacing="3" flex="1 1 auto">
                <Heading size="2rem" noOfLines={2}>
                  {item.title}
                </Heading>
                <Text color="gray.600" fontSize="sm" noOfLines={3}>
                  {item.description}
                </Text>
                <Text
                  color="#52601A"
                  fontSize="md"
                  fontWeight="medium"
                  mt="auto"
                  pt="2"
                >
                  {item._isAgricultor
                    ? `Propriedade: ${item.propertyName}`
                    : typeof item.price === "number"
                    ? new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.price)
                    : item.price}
                </Text>
                {item._isAgricultor && (
                  <Text color="gray.600" fontSize="sm" noOfLines={2} mt="1">
                    Categorias:{" "}
                    {item.products?.length > 0
                      ? Array.from(
                          new Set(item.products.map((p) => p.category))
                        ).join(", ")
                      : "—"}
                  </Text>
                )}
              </Stack>
            </CardBody>
            <Divider borderColor="gray.200" />
            <CardFooter padding={{ base: 3, md: 4 }}>
              <ButtonGroup spacing="2" width="100%">
                <Button
                  {...buttonStyles}
                  aria-label={`Saiba mais sobre ${item.title}`}
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
