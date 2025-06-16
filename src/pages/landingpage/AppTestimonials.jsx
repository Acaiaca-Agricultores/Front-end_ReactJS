import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Box,
} from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import dataAgricultores from "../../services/dataCardAgri.json";

const testimonials = dataAgricultores.agricultores.map((item) => ({
  image: item.imagem,
  name: item.nome,
  location: item.localizacao,
  testimonial: item.depoimento,
}));

const AppTestimonials = ({ title = "Depoimentos de Agricultores" }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Box bg="#fcead0" padding={"4rem"} borderRadius="md">
      <Heading as="h2" size="xl" textAlign="center" my={10}>
        {title}
      </Heading>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay={true}
        keyBoardControl
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {testimonials.map((item, idx) => (
          <Card
            key={idx}
            mx={2}
            boxShadow="none"
            borderRadius="lg"
            overflow="hidden"
            h={["auto", "auto", "300px"]}
            border={"1px solid #83a11d"}
            display="flex"
            flexDirection="column"
            alignItems={"center"}
          >
            <CardBody>
              <Image
                src={item.image}
                alt={item.name}
                boxSize="100px"
                borderRadius="full"
                mr={4}
                objectFit="cover"
                border={"3px solid #83a11d"}
              />
            </CardBody>
            <CardFooter
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Text mb={4} fontStyle="italic" noOfLines={4}>
                “{item.testimonial}”
              </Text>
              <Heading size="sm">{item.name}</Heading>
              <Text fontSize="xs" color="gray.600">
                {item.location}
              </Text>
            </CardFooter>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
};

export default AppTestimonials;
