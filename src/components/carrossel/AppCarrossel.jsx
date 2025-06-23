import React, { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Heading, IconButton, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

/**
 * @param {object}
 * @param {Array<object>}
 * @param {string}
 * @param {Function}
 */
const AppCarrossel = ({ data, title, renderItem, itemsDesktop = 3 }) => {
  const carouselRef = useRef();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: itemsDesktop,
      slidesToSlide: itemsDesktop,
    },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  if (!data || data.length === 0) {
    return null;
  }

  const arrowStyle = {
    background: "#52601A",
    color: "white",
    borderRadius: "50%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    width: "40px",
    height: "40px",
    minWidth: "40px",
    minHeight: "40px",
    fontSize: "24px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <>
      <Heading padding={"2rem 0 1rem 0"}>{title}</Heading>
      <Flex align="center" justify="center" gap={4}>
        <IconButton
          aria-label="Anterior"
          icon={<ChevronLeftIcon boxSize={8} />}
          onClick={() => carouselRef.current?.previous()}
          style={{ ...arrowStyle, marginLeft: "24px" }}
          _hover={{ background: "#83a11d" }}
        />
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            overflowX: "hidden",
            position: "relative",
          }}
        >
          <Carousel
            ref={carouselRef}
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
            removeArrowOnDeviceType={[]}
            dotListClass="custom-dot-list-style"
            arrows={false}
          >
            {data.map((item, index) => (
              <React.Fragment key={item.id || index}>
                {renderItem(item, index)}
              </React.Fragment>
            ))}
          </Carousel>
        </div>
        <IconButton
          aria-label="Próximo"
          icon={<ChevronRightIcon boxSize={8} />}
          onClick={() => carouselRef.current?.next()}
          style={{ ...arrowStyle, marginRight: "24px" }}
          _hover={{ background: "#83a11d" }}
        />
      </Flex>
    </>
  );
};

export default AppCarrossel;
