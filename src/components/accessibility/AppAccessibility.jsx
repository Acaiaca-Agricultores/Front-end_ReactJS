import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Text,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Icon,
  Image,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  FaKeyboard,
  FaMicrophone,
  FaEye,
  FaCog,
  FaAccessibleIcon,
} from "react-icons/fa";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";

const AppAccessibility = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState("");

  const resetSettings = () => {
    setFontSize(16);
    setHighContrast(false);
    setKeyboardNavigation(false);
    setScreenReader(false);
    setVoiceCommand("");
    document.documentElement.style.fontSize = "16px";
    document.body.classList.remove("high-contrast");
  };

  const { isListening, startListening, stopListening, transcript } =
    useSpeechRecognition({
      setValue: setVoiceCommand,
      fieldSetter: (field, value) => {
        switch (field) {
          case "fontSize":
            setFontSize(value);
            break;
          case "highContrast":
            setHighContrast(value);
            break;
          case "keyboardNavigation":
            setKeyboardNavigation(value);
            break;
          default:
            break;
        }
      },
    });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [highContrast]);

  useEffect(() => {
    if (keyboardNavigation) {
      document.body.classList.add("keyboard-navigation");
    } else {
      document.body.classList.remove("keyboard-navigation");
    }
  }, [keyboardNavigation]);

  useEffect(() => {
    if (screenReader) {
      window.speechSynthesis?.speak(
        new SpeechSynthesisUtterance("Leitor de tela ativado")
      );
    }
  }, [screenReader]);

  useEffect(() => {
    const vLibrasWidget = document.querySelector("[vw]");
    if (vLibrasWidget) {
      if (isOpen) {
        vLibrasWidget.style.setProperty("display", "none", "important");
      } else {
        vLibrasWidget.style.removeProperty("display");
      }
    }
  }, [isOpen]);

  const accessibilityButton = (
    <Button
      position="fixed"
      right="10px"
      bottom="300px"
      zIndex="999"
      onClick={onOpen}
      colorScheme="blue"
      aria-label="Menu de Acessibilidade"
      w={"40px"}
      h={"40px"}
    >
      <Icon as={FaAccessibleIcon} boxSize={8} />
    </Button>
  );

  return (
    <>
      {accessibilityButton}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Ajustes de Acessibilidade</DrawerHeader>

          <DrawerBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontWeight="bold" mb={2}>
                  <HStack>
                    <Icon as={FaMicrophone} />
                    <Text>Áudio e Transcrição de Voz</Text>
                  </HStack>
                </Text>
                <Button
                  onClick={isListening ? stopListening : startListening}
                  colorScheme={isListening ? "red" : "blue"}
                >
                  {isListening
                    ? "Parar Reconhecimento"
                    : "Iniciar Reconhecimento de Voz"}
                </Button>
                {transcript && (
                  <Text mt={2} fontSize="sm">
                    Transcrição: {transcript}
                  </Text>
                )}
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2}>
                  <HStack>
                    <Icon as={FaEye} />
                    <Text>Ajustes Visuais</Text>
                  </HStack>
                </Text>
                <VStack align="stretch" spacing={4}>
                  <Box>
                    <Text mb={2}>Tamanho da Fonte</Text>
                    <Slider
                      value={fontSize}
                      min={12}
                      max={24}
                      step={1}
                      onChange={setFontSize}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </Box>
                  <FormControl
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <FormLabel htmlFor="high-contrast-switch" mb="0">
                      Alto Contraste
                    </FormLabel>
                    <Switch
                      id="high-contrast-switch"
                      isChecked={highContrast}
                      onChange={(e) => setHighContrast(e.target.checked)}
                    />
                  </FormControl>
                </VStack>
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2}>
                  <HStack>
                    <Icon as={FaKeyboard} />
                    <Text>Ajustes de Navegação</Text>
                  </HStack>
                </Text>
                <FormControl
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormLabel htmlFor="keyboard-navigation-switch" mb="0">
                    Navegação por Teclado
                  </FormLabel>
                  <Switch
                    id="keyboard-navigation-switch"
                    isChecked={keyboardNavigation}
                    onChange={(e) => setKeyboardNavigation(e.target.checked)}
                  />
                </FormControl>
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2}>
                  <HStack>
                    <Icon as={FaCog} />
                    <Text>Ajustes para Leitores de Tela</Text>
                  </HStack>
                </Text>
                <FormControl
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormLabel htmlFor="screen-reader-switch" mb="0">
                    Ativar Leitor de Tela
                  </FormLabel>
                  <Switch
                    id="screen-reader-switch"
                    isChecked={screenReader}
                    onChange={(e) => setScreenReader(e.target.checked)}
                  />
                </FormControl>
              </Box>
              <Box p={4} borderWidth={1} borderRadius="md">
                <Text fontWeight="bold" mb={2}>
                  Declaração de Acessibilidade
                </Text>
                <Text fontSize="sm">
                  Nossa plataforma está comprometida em fornecer uma experiência
                  acessível para todos os usuários. Trabalhamos continuamente
                  para melhorar a acessibilidade de acordo com os padrões WCAG
                  2.1.
                </Text>
              </Box>
              <Button
                colorScheme="red"
                onClick={resetSettings}
                leftIcon={<Icon as={FaCog} />}
                width="full"
              >
                Resetar Configurações
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AppAccessibility;
