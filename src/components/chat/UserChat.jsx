import React from "react";
import {
  Box,
  Button,
  IconButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import chatIcon from "../../assets/icons/chat.png";

const UserChat = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={isOpen ? onClose : onOpen}
        position="fixed"
        bottom="26px"
        right="100px"
        w="56px"
        h="56px"
        borderRadius="full"
        bg="#4CAF50"
        color="#fff"
        boxShadow="0 2px 16px rgba(0,0,0,0.3)"
        zIndex={9999}
        display="flex"
        alignItems="center"
        justifyContent="center"
        aria-label="Abrir chat"
        p={0}
        minW={0}
      >
        <img src={chatIcon} alt="Chat" style={{ width: 28, height: 28 }} />
      </Button>
      {isOpen && (
        <Box
          position="fixed"
          bottom="0px"
          right="100px"
          w="26rem"
          h="37rem"
          bg="#fff"
          boxShadow="0 4px 24px rgba(0,0,0,0.3)"
          zIndex={10000}
          display="flex"
          flexDirection="column"
          overflow="hidden"
          borderRadius="1rem 1rem 0 0"
        >
          <IconButton
            icon={<CloseIcon />}
            onClick={onClose}
            aria-label="Fechar chat"
            position="absolute"
            top={2}
            right={2}
            size="sm"
            bg="transparent"
            color="#888"
            _hover={{ bg: "gray.100" }}
          />
          <Box p="16px" borderBottom="1px solid #eee" fontWeight="bold">
            Chat
          </Box>
          <Box
            flex={1}
            p="16px"
            color="#888"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            (Área do chat)
          </Box>
          <Box
            as="form"
            display="flex"
            borderTop="1px solid #eee"
            p="12px 8px"
            bg="#fafafa"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="text"
              placeholder="Digite sua mensagem..."
              flex={1}
              borderRadius="8px"
              mr="8px"
              bg="#fff"
            />
            <Button
              type="submit"
              bg="#4CAF50"
              color="#fff"
              borderRadius="8px"
              fontWeight="bold"
              _hover={{ bg: "#388e3c" }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default UserChat;
