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

import FolhaCheck from "../../assets/icons/folhaDeLouro.png";

const AppModal = ({ activeModal, isOpen, onClose, MVVData }) => {
  if (activeModal === null) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <ModalHeader
          fontFamily={"Onest"}
          fontSize={"2rem"}
          fontWeight={700}
          lineHeight={"150%"}
          color={"#52601A"}
        >
          {MVVData[activeModal].title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UnorderedList
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
            {MVVData[activeModal].modalItems.map((item, idx) => (
              <ListItem key={idx}>
                <Image src={FolhaCheck} alt="check" boxSize="1.2em" />
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
          >
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppModal;
