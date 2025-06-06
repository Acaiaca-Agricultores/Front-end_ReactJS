import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  AspectRatio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
} from "@chakra-ui/react";
import { Typewriter } from "react-simple-typewriter";
import BannerGif from "../../assets/banner.gif";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/logo_semfundo.png";
import IconPlay from "../../assets/icons/play-button.png";

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

const textSmallStyles = {
  fontSize: { base: "1.2rem" },
};

const textBigStyles = {
  fontSize: { base: "2rem", md: "3rem" },
  fontWeight: "bold",
  color: "white",
};

const AppAgricultor = () => {
  const navigation = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  return (
    <Grid
      as="section"
      role="region"
      aria-label="Seção principal para agricultores"
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      gap={6}
      backgroundImage={`url(${BannerGif})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      position="relative"
      overflow="hidden"
      objectFit="cover"
      height={"100vh"}
    >
      <Box
        position="absolute"
        inset="0"
        background="rgba(0, 0, 0, 0.5)"
        backdropFilter="blur(8px)"
        zIndex="1"
        justifyContent={"flex-end"}
      />
      <GridItem
        zIndex="2"
        display="flex"
        flexDirection="column"
        justifyContent={{ base: "flex-end", md: "center" }}
        gap="2rem"
        padding={{ base: "1.5rem", md: "4.5rem" }}
        color="white"
        width={{ base: "100%", md: "110%" }}
        position="relative"
      >
        <Box>
          <Image
            src={Logo}
            alt="Logo da Plataforma Açaíaca"
            width={{ base: "10rem", md: "80%" }}
            role="img"
            aria-label="Logo da Plataforma Açaíaca"
            display={{ base: "none", md: "block" }}
          />
        </Box>
        <Box>
          <Text {...textBigStyles}>
            <Typewriter
              words={["Amor é algo que se planta", "E se rega todos os dias."]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </Text>
        </Box>
        <Box>
          <Text {...textSmallStyles}>Cada colheita é um gesto de cuidado.</Text>
          <Text {...textSmallStyles}>
            Cada compra, um apoio ao pequeno agricultor.
          </Text>
        </Box>
        <Box
          display="flex"
          gap="1rem"
          flexDirection={{ base: "column", sm: "row" }}
          alignItems={"center"}
        >
          <Button
            {...buttonStyles}
            w="100%"
            h={{ base: "3rem", md: "5rem" }}
            aria-label="Cadastre-se na plataforma"
            onClick={() => navigation("/cadastro")}
            backgroundColor={"#83a11d"}
            border="none"
            color={"ffffff"}
          >
            <Typewriter
              words={["Cadastre-se agora!"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </Button>
          <Button
            {...buttonStyles}
            w="100%"
            aria-label="Saiba mais sobre a plataforma"
            onClick={() => navigation("/sobre")}
          >
            Saiba Mais!
          </Button>
        </Box>
      </GridItem>

      <GridItem
        zIndex="2"
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={{ base: "1.5rem", md: "0 4.5rem 0 0" }}
        position="relative"
      >
        {!showVideo ? (
          <Button
            onClick={() => setShowVideo(true)}
            borderRadius="50%"
            width="80px"
            height="80px"
            bg="#c0ab8e"
            color="#fff"
            fontSize="2.5rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="lg"
            _hover={{ bg: "#a98d6c" }}
            aria-label="Assistir vídeo"
          >
            <Image src={IconPlay} alt="Ícone de Play" role="img" w={"2.5rem"} />
          </Button>
        ) : (
          <Modal
            isOpen={showVideo}
            onClose={() => setShowVideo(false)}
            isCentered
            size={"2xl"}
          >
            <ModalOverlay />
            <ModalContent
              role="dialog"
              aria-modal="true"
              aria-label="Vídeo de Apresentação"
            >
              <ModalHeader textAlign={"center"}>
                Vídeo de Apresentação
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    title="Vídeo de Apresentação"
                    src="https://www.youtube.com/embed/cYsm9WHt4yg"
                    allowFullScreen
                  />
                </AspectRatio>
              </ModalBody>
              <ModalFooter justifyContent="center">
                <Button
                  onClick={() => setShowVideo(false)}
                  color={"white"}
                  background={"#52601A"}
                  borderRadius={"10px"}
                  fontFamily={"Onest"}
                  fontSize={"1.2rem"}
                  fontWeight={400}
                  lineHeight={"150%"}
                  w={{ base: "10rem", md: "13rem" }}
                  padding={"1.5rem"}
                  _hover={{
                    background: "#c0ab8e",
                  }}
                  aria-label="Fechar vídeo de apresentação"
                >
                  Fechar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </GridItem>
    </Grid>
  );
};

export default AppAgricultor;
