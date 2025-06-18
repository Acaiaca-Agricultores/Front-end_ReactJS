import { useState } from "react";
import {
  Box,
  useDisclosure,
  Button,
  Text,
  Flex,
  Center,
} from "@chakra-ui/react";
import AppMvv from "./AppMvv";
import AppOds from "./AppOds";
import AppPerfil from "./AppPerfis";
import ImagePlataforma from "../../assets/plataforma.png";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

const AppAbout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeModal, setActiveModal] = useState(null);
  const navigation = useNavigate();

  const handleOpenModal = (index) => {
    setActiveModal(index);
    onOpen();
  };

  return (
    <>
      <Box>
        <Flex
          as="section"
          role="region"
          aria-label="Seção principal para agricultores"
          gap={6}
          backgroundImage={`url(${ImagePlataforma})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          position="relative"
          overflow="hidden"
          objectFit="cover"
          h={{ base: "auto", md: "80vh" }}
        >
          <Box
            position="absolute"
            inset="0"
            background="rgba(0, 0, 0, 0.5)"
            backdropFilter="blur(8px)"
            zIndex="1"
          />
          <Center
            zIndex="2"
            gap="2rem"
            padding={{ base: "1.5rem", md: "4.5rem" }}
            color="white"
            width={"100vw"}
            height={"80vh"}
            position="relative"
            flexDirection={"column"}
          >
            <Box>
              <Text fontSize={{ base: "2rem", md: "3rem" }} fontWeight="bold">
                <Typewriter
                  words={[
                    "Sobre a Projeto Acaiacá",
                    "Não tenha medo de plantar!",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </Text>
            </Box>
            <Box
              display="flex"
              gap="1rem"
              flexDirection={{ base: "column", sm: "row" }}
              alignItems={"center"}
            >
              <Button
                onClick={() => navigation("/cadastro")}
                width={"20rem"}
                height={{ base: "3rem", md: "5rem" }}
                aria-label="Cadastre-se na plataforma"
                backgroundColor={"#83a11d"}
                border="none"
                color={"ffffff"}
                _hover={{ bg: "#c0ab8e", color: "black" }}
              >
                Cadastre-se agora!
              </Button>
            </Box>
          </Center>
        </Flex>

        <AppMvv
          activeModal={activeModal}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          handleOpenModal={handleOpenModal}
        />
        <AppOds />
        <AppPerfil />
      </Box>
    </>
  );
};

export default AppAbout;
