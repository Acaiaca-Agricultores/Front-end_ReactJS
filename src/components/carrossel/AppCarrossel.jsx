import React, { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Heading, IconButton, Flex, Box, Text, VStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

/**
 * @param {object}
 * @param {Array<object>}
 * @param {string}
 * @param {Function}
 */
const AppCarrossel = ({
  data,
  title,
  renderItem,
  itemsDesktop = 3,
  itemsTablet = 2,
  itemsMobile = 1,
}) => {
  const carouselRef = useRef();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: itemsDesktop,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: itemsTablet,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: itemsMobile,
      slidesToSlide: 1,
    },
  };

  if (!data || data.length === 0) {
    return null;
  }

  // Setas absolutas para fora do carrossel
  const CustomButtonGroup = ({ next, previous, goToSlide, carouselState }) => {
    return (
      <>
        <IconButton
          aria-label="Anterior"
          icon={<ChevronLeftIcon boxSize={5} />}
          onClick={previous}
          bg="#52601A"
          color="white"
          borderRadius="full"
          size="lg"
          _hover={{
            bg: "#83a11d",
            boxShadow: "lg",
          }}
          _active={{ bg: "#83a11d" }}
          boxShadow="0 4px 12px rgba(0,0,0,0.15)"
          position="absolute"
          left={{ base: "-16px", md: "-24px" }}
          top="50%"
          zIndex={2}
          opacity={1}
          cursor="pointer"
          transition="all 0.2s ease"
          display={{ base: "none", md: "flex" }}
        />
        <IconButton
          aria-label="Próximo"
          icon={<ChevronRightIcon boxSize={5} />}
          onClick={next}
          bg="#52601A"
          color="white"
          borderRadius="full"
          size="lg"
          _hover={{
            bg: "#83a11d",
            boxShadow: "lg",
          }}
          _active={{ bg: "#83a11d" }}
          boxShadow="0 4px 12px rgba(0,0,0,0.15)"
          position="absolute"
          right={{ base: "-16px", md: "-24px" }}
          top="50%"
          zIndex={2}
          opacity={1}
          cursor="pointer"
          transition="all 0.2s ease"
          display={{ base: "none", md: "flex" }}
        />
      </>
    );
  };

  return (
    <Box position="relative" width="100%">
      {title && (
        <VStack spacing={2} mb={6} textAlign="center">
          <Heading size="lg" color="gray.700" fontWeight="bold">
            {title}
          </Heading>
          <Text color="gray.500" fontSize="sm">
            {data.length} produto{data.length !== 1 ? "s" : ""}{" "}
            {data.length !== 1 ? "disponíveis" : "disponível"}
          </Text>
        </VStack>
      )}

      <Box
        position="relative"
        width="100%"
        px={{ base: 4, md: 8, lg: 12 }}
        py={4}
      >
        <Carousel
          ref={carouselRef}
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customButtonGroup={<CustomButtonGroup />}
          arrows={false}
          renderButtonGroupOutside={true}
          showDots={false}
          swipeable={true}
          draggable={true}
          partialVisible={false}
          centerMode={false}
          focusOnSelect={false}
          minimumTouchDrag={80}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay={true}
          sliderClass=""
          containerClass=""
          dotListClass=""
          ssr={true}
          deviceType="desktop"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="carousel-item-padding-40-px"
        >
          {data.map((item, index) => (
            <Box key={item.id || index} px={{ base: 2, md: 3 }} py={2}>
              {renderItem(item, index)}
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default AppCarrossel;
