import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  UnorderedList,
  ListItem,
  Image,
  Text,
} from "@chakra-ui/react";

import ImageFolha from "../../assets/leaf.png";

const AppModal = ({ activeModal, isOpen, onClose, MVVData }) => {
  if (!MVVData || activeModal === null || !MVVData[activeModal]) return null;

  const headerId = "modal-title";
  const descId = "modal-desc";

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headerId}
        aria-describedby={descId}
      >
        <ModalHeader
          id={headerId}
          fontFamily={"Onest"}
          fontSize={"2rem"}
          fontWeight={700}
          lineHeight={"150%"}
          color={"#52601A"}
          tabIndex={0}
        >
          {MVVData[activeModal].title}
        </ModalHeader>
        <ModalCloseButton aria-label="Fechar modal" />
        <ModalBody>
          <UnorderedList
            id={descId}
            display={"flex"}
            flexDirection={"column"}
            gap={"1.2rem"}
            fontSize={"1.2rem"}
            sx={{
              "& > li": {
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
              },
            }}
          >
            {MVVData[activeModal].modalItems &&
              MVVData[activeModal].modalItems.map((item, idx) => (
                <ListItem key={idx}>
                  <Image
                    src={ImageFolha}
                    alt="Ícone de confirmação"
                    boxSize="1.2em"
                  />
                  <Text color={"#52601A"}>{item}</Text>
                </ListItem>
              ))}
          </UnorderedList>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
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
            aria-label="Fechar modal"
          >
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppModal;