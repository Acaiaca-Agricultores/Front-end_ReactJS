import "./styles-app.css";
import { useState } from "react";
import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import AppMvv from "./AppMvv";
import AppOds from "./AppOds";
import ImageNos from "../../assets/sobrenós.jpg";

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
          <Image
            src={ImageNos}
            alt="Imagem representando as pessoas que fazem parte do projeto Acaiacá"
            boxSize={"100%"}
            padding={"2rem"}
            objectFit={"cover"}
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
      <AppOds />
    </main>
  );
};
export default AppAbout;
