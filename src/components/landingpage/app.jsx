import "./styles-app.css";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

import AppAgricultor from "./AppAgricultor";
import MvvApp from "./AppMvv";
import AppTechPlat from "./AppTecPlat";
import AppSubs from "./AppSubs";
import AppOds from "./AppOds";
import AppVideo from "./AppVideo";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (index) => {
    setActiveModal(index);
    onOpen();
  };
  return (
    <>
      <AppAgricultor />
      <MvvApp
        activeModal={activeModal}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleOpenModal={handleOpenModal}
      />
      <AppTechPlat />
      <AppSubs />
      <AppOds />
      <AppVideo />
    </>
  );
};

export default App;
