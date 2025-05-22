import "./styles-app.css";
import { useState } from "react";
import { Heading, Image, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import AppMvv from "./AppMvv";
import AppOds from "./AppOds";
import AppPerfil from "./AppPerfis";
import video from "../../assets/video.mp4";

const AppAbout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (index) => {
    setActiveModal(index);
    onOpen();
  };
  return (
    <main
      aria-label="Seção Sobre Nós"
      style={{ paddingTop: "0", paddingTop: "100px" }}
    >
      <section aria-label="Apresentação da equipe Acaiacá">
        <SimpleGrid
          as="div"
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, md: 2 }}
          padding={"2rem"}
          justifyItems={"center"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Heading as="h1" tabIndex={0}>
            Sobre Nós - Acaiacá
          </Heading>
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              objectFit: "cover",
              display: "block",
            }}
            aria-label="Vídeo institucional da Acaiacá"
          />
        </SimpleGrid>
      </section>
      <AppMvv
        activeModal={activeModal}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleOpenModal={handleOpenModal}
      />
      <AppPerfil/>
      <AppOds />
    </main>
  );
};
export default AppAbout;
