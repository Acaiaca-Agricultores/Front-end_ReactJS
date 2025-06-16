import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Heading } from "@chakra-ui/react";

/**
 * @param {object} 
 * @param {Array<object>} 
 * @param {string} 
 * @param {Function} 
 */
const AppCarrossel = ({ data, title, renderItem }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  if (!data || data.length === 0) {
    return null;
  }

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
        {data.map((item, index) => renderItem(item, index))}
      </Carousel>
    </>
  );
};

export default AppCarrossel;
