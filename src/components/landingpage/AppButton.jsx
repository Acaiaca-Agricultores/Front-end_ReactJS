import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <IconButton
      icon={<ChevronUpIcon boxSize={6} />}
      position="fixed"
      bottom="2rem"
      left="2rem"
      background={"#c0ab8e"}
      color={"#000000"}
      aria-label="Voltar ao topo"
      borderRadius="full"
      boxShadow="lg"
      onClick={scrollToTop}
      zIndex={1000}
    />
  ) : null;
};

export default ScrollToTopButton;
