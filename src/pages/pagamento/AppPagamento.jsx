import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  useToast,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  Select,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { FaCreditCard, FaLock, FaCalendarAlt, FaUser } from "react-icons/fa";

import ImagemConfig from "../../assets/configuração.jpg";
import IconVoice from "../../assets/icons/voice-command.png";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";

const CardVisual = ({
  cardNumber,
  cardHolder,
  expiryMonth,
  expiryYear,
  cvv,
  showBack,
}) => {
  const displayNumber = (cardNumber || "").padEnd(19, "•");
  const displayName = (cardHolder || "NOME DO TITULAR").slice(0, 22);
  const displayExpiry =
    expiryMonth && expiryYear
      ? `${expiryMonth}/${expiryYear.toString().slice(-2)}`
      : "MM/AA";
  const displayCvv = (cvv || "•••").padEnd(3, "•");

  return (
    <Box
      w={{ base: "100%", md: "340px" }}
      h={{ base: "200px", md: "220px" }}
      bgGradient="linear(to-br, #83a11d, #b7e283, #3a4d1a)"
      borderRadius="2xl"
      boxShadow="2xl"
      color="white"
      p={6}
      position="relative"
      transition="transform 0.4s"
      transform={showBack ? "rotateY(180deg)" : "none"}
      style={{ perspective: "1000px" }}
      overflow="hidden"
      mb={{ base: 8, md: 0 }}
    >
      {!showBack && (
        <Box
          h="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box fontWeight="bold" fontSize="lg" letterSpacing="wider">
              Acaiacá Card Premium
            </Box>
            <Box>
              <FaCreditCard size={32} />
            </Box>
          </Box>
          <Box
            fontSize="1.3rem"
            letterSpacing="0.15em"
            fontFamily="monospace"
            fontWeight="bold"
            mt={2}
          >
            {displayNumber}
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Box>
              <Box fontSize="xs" opacity={0.7} mb={1}>
                TITULAR
              </Box>
              <Box fontSize="md" fontWeight="bold" textTransform="uppercase">
                {displayName}
              </Box>
            </Box>
            <Box>
              <Box fontSize="xs" opacity={0.7} mb={1}>
                VALIDADE
              </Box>
              <Box fontSize="md" fontWeight="bold">
                {displayExpiry}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {showBack && (
        <Box
          h="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Box
            w="100%"
            h="32px"
            bg="blackAlpha.700"
            borderRadius="md"
            mb={6}
          ></Box>
          <Box
            w="80%"
            bg="whiteAlpha.800"
            color="black"
            borderRadius="md"
            p={2}
            textAlign="right"
            fontWeight="bold"
            fontSize="lg"
            style={{ direction: "ltr", unicodeBidi: "plaintext" }}
          >
            {displayCvv}
          </Box>
          <Box
            fontSize="xs"
            color="whiteAlpha.700"
            mt={4}
            textAlign="right"
            w="100%"
          >
            CVV
          </Box>
        </Box>
      )}
    </Box>
  );
};

const AppPagamento = () => {
  const navigation = useNavigate();
  const [userName, setUserName] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const toast = useToast();
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [showCvv, setShowCvv] = useState(false);
  const { handleToggleRecording, recordingField } = useSpeechRecognition({});
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.95)",
    "rgba(26,32,44,0.95)"
  );
  const cardShadow = useColorModeValue("lg", "dark-lg");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigation("/login");
      return;
    }
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }

    const subscription = localStorage.getItem("selectedSubscription");
    if (subscription) {
      setSelectedSubscription(subscription);
    } else {
      navigation("/assinatura");
    }
  }, [navigation]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\D/g, "").slice(0, 16);
    const parts = v.match(/.{1,4}/g) || [];
    return parts.join(" ");
  };

  const formatCvv = (value) => {
    return value.replace(/\D/g, "").slice(0, 4);
  };

  const formatCardHolder = (value) => {
    return value
      .replace(/[^a-zA-Z\s]/g, "")
      .toUpperCase()
      .slice(0, 22);
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleCvvChange = (e) => {
    const formatted = formatCvv(e.target.value);
    setCvv(formatted);
  };

  const handleCardHolderChange = (e) => {
    const formatted = formatCardHolder(e.target.value);
    setCardHolder(formatted);
  };

  const handleSubmit = async () => {
    if (!cardNumber || !cardHolder || !expiryMonth || !expiryYear || !cvv) {
      toast({
        title: "Preencha todos os campos.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (cardNumber.replace(/\s/g, "").length < 13) {
      toast({
        title: "Número do cartão inválido.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (cvv.length < 3) {
      toast({
        title: "CVV inválido.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Processando pagamento...",
      status: "info",
      duration: 2000,
      isClosable: true,
    });

    setTimeout(() => {
      toast({
        title: "Pagamento processado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setCardNumber("");
      setCardHolder("");
      setExpiryMonth("");
      setExpiryYear("");
      setCvv("");

      navigation("/home");
    }, 2000);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <Box
      w="100%"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: 4, md: 8 }}
      pt={{ base: 24, md: 32 }}
      position="relative"
      backgroundImage={`url(${ImagemConfig})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset="0"
        background="rgba(0, 0, 0, 0.5)"
        backdropFilter="blur(2px)"
        zIndex="1"
      />
      <Box
        zIndex="2"
        position="relative"
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontSize={{ base: "2.2rem", md: "2.8rem" }}
          fontWeight="extrabold"
          letterSpacing="wide"
          textShadow="0 2px 8px #0008"
          color="white"
          mb={8}
          textAlign="center"
        >
          <Typewriter
            words={[`Pagamento Seguro, ${userName}!`]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </Text>

        {selectedSubscription && (
          <Card
            bg="rgba(131, 161, 29, 0.9)"
            color="white"
            borderRadius="xl"
            p={4}
            mb={6}
            maxW="600px"
            w="100%"
            textAlign="center"
            boxShadow="lg"
          >
            <Heading size="md" mb={2} color="white">
              Assinatura Selecionada
            </Heading>
            <Text fontSize="lg" fontWeight="bold">
              {selectedSubscription}
            </Text>
            <Text fontSize="sm" opacity={0.9} mt={1}>
              Confirme os dados do cartão para finalizar sua assinatura
            </Text>
            <Button
              variant="outline"
              color="white"
              borderColor="white"
              size="sm"
              mt={3}
              _hover={{ bg: "white", color: "#83a11d" }}
              onClick={() => navigation("/assinatura")}
            >
              Alterar Assinatura
            </Button>
          </Card>
        )}

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={10}
          alignItems="center"
          justifyContent="center"
          w="100%"
          maxW="900px"
        >
          <CardVisual
            cardNumber={cardNumber}
            cardHolder={cardHolder}
            expiryMonth={expiryMonth}
            expiryYear={expiryYear}
            cvv={cvv}
            showBack={isCvvFocused}
          />
          <Card
            bg={cardBg}
            boxShadow={cardShadow}
            borderRadius="2xl"
            maxW="500px"
            w="100%"
            p={{ base: 4, md: 8 }}
            transition="box-shadow 0.2s"
            _hover={{ boxShadow: "2xl" }}
            position="relative"
            zIndex="2"
            mt={{ base: 12, md: 20 }}
          >
            <CardHeader textAlign="center" pb={2}>
              <Heading size="lg" color="#83a11d">
                <FaCreditCard
                  style={{ display: "inline", marginRight: "8px" }}
                />
                Dados do Cartão
              </Heading>
              <Text fontSize="md" color="gray.500" mt={2}>
                Informe os dados do seu cartão de crédito ou débito.
              </Text>
            </CardHeader>
            <CardBody>
              <Stack spacing={6}>
                <FormControl isRequired>
                  <FormLabel color="#83a11d" fontWeight="bold">
                    <FaCreditCard
                      style={{ display: "inline", marginRight: "8px" }}
                    />
                    Número do Cartão
                  </FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      fontSize="lg"
                      fontWeight="bold"
                      letterSpacing="wide"
                      onFocus={() => setIsCvvFocused(false)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        variant="ghost"
                        _hover={{ background: "transparent" }}
                        onClick={() =>
                          handleToggleRecording("cardNumber", {
                            setter: setCardNumber,
                            trim: true,
                          })
                        }
                        isLoading={recordingField === "cardNumber"}
                      >
                        <Image src={IconVoice} w="16px" />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="#83a11d" fontWeight="bold">
                    <FaUser style={{ display: "inline", marginRight: "8px" }} />
                    Nome do Titular
                  </FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="NOME COMO ESTÁ NO CARTÃO"
                      value={cardHolder}
                      onChange={handleCardHolderChange}
                      fontSize="md"
                      textTransform="uppercase"
                      onFocus={() => setIsCvvFocused(false)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        variant="ghost"
                        _hover={{ background: "transparent" }}
                        onClick={() =>
                          handleToggleRecording("cardHolder", {
                            setter: setCardHolder,
                            trim: true,
                          })
                        }
                        isLoading={recordingField === "cardHolder"}
                      >
                        <Image src={IconVoice} w="16px" />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Grid templateColumns="1fr 1fr" gap={4}>
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color="#83a11d" fontWeight="bold">
                        <FaCalendarAlt
                          style={{ display: "inline", marginRight: "8px" }}
                        />
                        Validade
                      </FormLabel>
                      <Grid templateColumns="1fr 1fr" gap={2}>
                        <Select
                          placeholder="Mês"
                          value={expiryMonth}
                          onChange={(e) => setExpiryMonth(e.target.value)}
                          onFocus={() => setIsCvvFocused(false)}
                        >
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (month) => (
                              <option
                                key={month}
                                value={month.toString().padStart(2, "0")}
                              >
                                {" "}
                                {month.toString().padStart(2, "0")}{" "}
                              </option>
                            )
                          )}
                        </Select>
                        <Select
                          placeholder="Ano"
                          value={expiryYear}
                          onChange={(e) => setExpiryYear(e.target.value)}
                          onFocus={() => setIsCvvFocused(false)}
                        >
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {" "}
                              {year}{" "}
                            </option>
                          ))}
                        </Select>
                      </Grid>
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color="#83a11d" fontWeight="bold">
                        <FaLock
                          style={{ display: "inline", marginRight: "8px" }}
                        />
                        CVV
                      </FormLabel>
                      <InputGroup>
                        <Input
                          placeholder="123"
                          type={showCvv ? "text" : "password"}
                          value={cvv}
                          onChange={handleCvvChange}
                          maxLength={4}
                          onFocus={() => setIsCvvFocused(true)}
                          onBlur={() => setIsCvvFocused(false)}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => setShowCvv(!showCvv)}
                          >
                            {showCvv ? <ViewOffIcon /> : <ViewIcon />}
                          </Button>
                          <Button
                            variant="ghost"
                            _hover={{ background: "transparent" }}
                            onClick={() =>
                              handleToggleRecording("cvv", {
                                setter: setCvv,
                                trim: true,
                              })
                            }
                            isLoading={recordingField === "cvv"}
                          >
                            <Image src={IconVoice} w="16px" />
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </GridItem>
                </Grid>

                <Stack spacing={4} mt={6}>
                  <Button
                    leftIcon={<FaCreditCard size={22} color="white" />}
                    background="#83a11d"
                    color="white"
                    size="lg"
                    fontWeight="bold"
                    borderRadius="xl"
                    _hover={{ bg: "#6b8a15" }}
                    onClick={handleSubmit}
                    transition="all 0.2s"
                  >
                    Processar Pagamento
                  </Button>
                  <Button
                    variant="outline"
                    colorScheme="gray"
                    size="lg"
                    fontWeight="bold"
                    borderRadius="xl"
                    borderWidth={2}
                    borderColor="gray.400"
                    _hover={{ bg: "#f7fafc", borderColor: "gray.500" }}
                    onClick={() => navigation("/home")}
                    transition="all 0.2s"
                  >
                    Cancelar
                  </Button>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
        <Card
          margin={{ base: "0px", md: "40px" }}
          background="transparent"
          color="gray.100"
          p={4}
          opacity={0.6}
          textAlign="center"
        >
          <Text fontSize="md">
            Esta tela é apenas para demonstração e fins educativos
          </Text>
          <Text fontSize="sm">
            Nenhum pagamento real será processado. Esta é uma simulação para
            mostrar a interface da plataforma.
          </Text>
        </Card>
      </Box>
    </Box>
  );
};

export default AppPagamento;
