import {
  GridItem,
  Grid,
  UnorderedList,
  ListItem,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  Input,
  InputRightAddon,
  Box,
  Center,
  Flex,
  Text,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useState } from "react";
import AppCarrossel from "../../components/carrossel/AppCarrossel";
import dataFruits from "../../services/dataCardFruits.json";
import dataLegumes from "../../services/dataCardLegu.json";
import dataVerduras from "../../services/dataCardVerd.json";
import dataAgricultores from "../../services/dataCardAgri.json";
import ImagemFeira from "../../assets/feira.jpg";
import AppLoading from "../../components/loading/AppLoading";
import { useNavigate } from "react-router-dom";

const AppAgriHome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [ordemPreco, setOrdemPreco] = useState("");
  const [termoDePesquisa, setTermoDePesquisa] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = [
    { label: "Todas", value: "Todos" },
    { label: "Agricultores", value: "Agricultores" },
    { label: "Frutas", value: "Frutas" },
    { label: "Verduras", value: "Verduras" },
    { label: "Legumes", value: "Legumes" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const storedName =
      localStorage.getItem("userName") || localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    if (storedName) {
      setUserName(storedName);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [navigate]);

  const normalizeString = (str) => {
    if (typeof str !== "string") return "";
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\\u0300-\\u036f]/g, "");
  };

  const getCategoriaData = () => {
    let data;
    switch (categoriaSelecionada) {
      case "Todos":
        data = [
          ...dataFruits,
          ...dataLegumes,
          ...dataVerduras,
          ...dataAgricultores.agricultores.map((item) => ({
            title: item.nome,
            description: item.localizacao,
            price: item.produtos ? item.produtos.join(", ") : "",
            image: item.imagem,
            _isAgricultor: true,
          })),
        ];
        break;
      case "Frutas":
        data = dataFruits;
        break;
      case "Legumes":
        data = dataLegumes;
        break;
      case "Verduras":
        data = dataVerduras;
        break;
      case "Agricultores":
        data = dataAgricultores.agricultores.map((item) => ({
          title: item.nome,
          description: item.localizacao,
          price: item.produtos ? item.produtos.join(", ") : "",
          image: item.imagem,
          _isAgricultor: true,
        }));
        break;
      default:
        data = [];
    }

    if (termoDePesquisa.trim() !== "") {
      const termoNormalizado = normalizeString(termoDePesquisa);
      data = data.filter((item) => {
        const title = typeof item.title === "string" ? item.title : "";
        const tituloNormalizado = normalizeString(title);
        return tituloNormalizado.includes(termoNormalizado);
      });
    }

    if (ordemPreco && categoriaSelecionada !== "Agricultores") {
      data = [...data].sort((a, b) => {
        const precoA = parseFloat(
          (a.price || "").replace(/[^0-9,.-]+/g, "").replace(",", ".")
        );
        const precoB = parseFloat(
          (b.price || "").replace(/[^0-9,.-]+/g, "").replace(",", ".")
        );
        if (isNaN(precoA) || isNaN(precoB)) return 0;
        if (ordemPreco === "crescente") return precoA - precoB;
        if (ordemPreco === "decrescente") return precoB - precoA;
        return 0;
      });
    }
    return data;
  };

  const handleChangePesquisa = (event) => {
    setTermoDePesquisa(event.target.value);
  };

  if (loading) {
    return <AppLoading />;
  }

  return (
    <>
      <Box backgroundColor={"#f0f0f0"}>
        <Flex
          as="section"
          role="region"
          aria-label="Seção principal para agricultores"
          gap={6}
          backgroundImage={`url(${ImagemFeira})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          position="relative"
          overflow="hidden"
          objectFit="cover"
          h={{ base: "auto", md: "60vh" }}
        >
          <Box
            position="absolute"
            inset="0"
            background="rgba(0, 0, 0, 0.5)"
            backdropFilter="blur(2px)"
            zIndex="1"
          />
          <Center
            zIndex="2"
            gap="2rem"
            padding={{ base: "1.5rem", md: "4.5rem" }}
            color="white"
            width={"100vw"}
            height={"60vh"}
            position="relative"
            flexDirection={"column"}
          >
            <Text fontSize={{ base: "2rem", md: "2.5rem" }} fontWeight="bold">
              <Typewriter
                words={[
                  `Bem-vindo a Acaiacá, ${userName}!`,
                  "Sua plataforma de conexão entre agricultores e consumidores.",
                  "Cultivando o futuro juntos!",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </Text>
          </Center>
        </Flex>
        <Grid
          zIndex={2}
          h="100%"
          templateRows="auto auto repeat(3, 1fr)"
          templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }}
          gap={4}
          padding={{ base: "2rem", md: "2rem 0" }}
        >
          <GridItem
            colSpan={4}
            display={{ base: "block", md: "none" }}
            mb={4}
            paddingLeft={{ base: "0", md: "2rem" }}
            paddingRight={{ base: "0", md: "2rem" }}
          >
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Categorias"
                icon={<HamburgerIcon />}
                variant="outline"
                color="#83a11d"
                border={"2px solid #83a11d"}
                width="100%"
              />
              <MenuList zIndex={3} width={"348px;"}>
                <MenuItem
                  isDisabled
                  color="#83a11d"
                  fontWeight="bold"
                  fontSize="1.1rem"
                  borderBottom="2px solid #83a11d"
                  mb={1}
                >
                  Categorias
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem
                    key={cat.value}
                    onClick={() => {
                      setCategoriaSelecionada(cat.value);
                      setOrdemPreco("");
                    }}
                    bg={
                      categoriaSelecionada === cat.value
                        ? "#c0ab8e"
                        : "transparent"
                    }
                    color={
                      categoriaSelecionada === cat.value ? "#83a11d" : "inherit"
                    }
                    fontWeight={
                      categoriaSelecionada === cat.value ? "bold" : "normal"
                    }
                    _hover={{ bg: "gray.300", color: "#83a11d" }}
                  >
                    {cat.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </GridItem>

          <GridItem
            colSpan={1}
            rowSpan={{ base: 1, md: 5 }}
            display={{ base: "none", md: "flex" }}
            flexDirection="column"
            alignItems="flex-start"
          >
            <UnorderedList
              w="100%"
              spacing="0.5rem"
              textAlign="left"
              listStyleType="none"
              fontSize="1.1rem"
              fontFamily="Onest"
              margin="0"
              padding={"0 2rem"}
            >
              <ListItem
                color="#83a11d"
                borderBottom="2px solid #83a11d"
                pb={2}
                mb={2}
                fontWeight="bold"
                fontSize="1.25rem"
              >
                Categorias
              </ListItem>
              {categories.map((cat) => (
                <ListItem
                  key={cat.value}
                  onClick={() => {
                    setCategoriaSelecionada(cat.value);
                    setOrdemPreco("");
                  }}
                  cursor="pointer"
                  p="0.5rem 0.75rem"
                  borderRadius="md"
                  _hover={{ bg: "gray.300", color: "#2C3609" }}
                  bg={
                    categoriaSelecionada === cat.value
                      ? "#EDD1AF"
                      : "transparent"
                  }
                  color={
                    categoriaSelecionada === cat.value ? "#2C3609" : "inherit"
                  }
                  fontWeight={
                    categoriaSelecionada === cat.value ? "bold" : "normal"
                  }
                >
                  <Link _hover={{ textDecoration: "none" }}>{cat.label}</Link>
                </ListItem>
              ))}
            </UnorderedList>
          </GridItem>

          <GridItem
            gap={"1rem"}
            display={"flex"}
            alignItems={"center"}
            width={"100%"}
            colStart={{ base: 1, md: 2 }}
            colSpan={{ base: 4, md: 4 }}
            mt={{ base: 4, md: 0 }}
          >
            <Menu>
              <MenuButton
                border={"2px solid #83a11d"}
                color={"#83a11d"}
                variant={"outline"}
                as={Button}
                minW="120px"
                isDisabled={categoriaSelecionada === "Agricultores"}
              >
                Ordenar
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setOrdemPreco("crescente")}>
                  Preço Crescente
                </MenuItem>
                <MenuItem onClick={() => setOrdemPreco("decrescente")}>
                  Preço Decrescente
                </MenuItem>
              </MenuList>
            </Menu>
            <InputGroup style={{ flexGrow: 1 }}>
              <Input
                type="search"
                placeholder="Pesquisar"
                variant={"outline"}
                _placeholder={{ color: "#b0b0b0" }}
                border={"2px solid #83a11d"}
                aria-required="true"
                _focus={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 0 1px #e5d1b0",
                }}
                value={termoDePesquisa}
                onChange={handleChangePesquisa}
              />
              <InputRightAddon background={"#83a11d"} cursor="pointer">
                <SearchIcon color="white" />
              </InputRightAddon>
            </InputGroup>
          </GridItem>
          {categoriaSelecionada === "Todos" ||
          categoriaSelecionada === "Frutas" ? (
            <GridItem colSpan={4}>
              <AppCarrossel
                data={
                  categoriaSelecionada === "Frutas"
                    ? getCategoriaData()
                    : getCategoriaData().filter((item) =>
                        dataFruits.includes(item)
                      )
                }
                title="Frutas"
              />
            </GridItem>
          ) : null}
          {categoriaSelecionada === "Todos" ||
          categoriaSelecionada === "Legumes" ? (
            <GridItem colSpan={4}>
              <AppCarrossel
                data={
                  categoriaSelecionada === "Legumes"
                    ? getCategoriaData()
                    : getCategoriaData().filter((item) =>
                        dataLegumes.includes(item)
                      )
                }
                title="Legumes"
              />
            </GridItem>
          ) : null}
          {categoriaSelecionada === "Todos" ||
          categoriaSelecionada === "Verduras" ? (
            <GridItem colSpan={4}>
              <AppCarrossel
                data={
                  categoriaSelecionada === "Verduras"
                    ? getCategoriaData()
                    : getCategoriaData().filter((item) =>
                        dataVerduras.includes(item)
                      )
                }
                title="Verduras"
              />
            </GridItem>
          ) : null}
          {categoriaSelecionada === "Todos" ||
          categoriaSelecionada === "Agricultores" ? (
            <GridItem colSpan={4}>
              <AppCarrossel
                data={
                  categoriaSelecionada === "Agricultores"
                    ? getCategoriaData()
                    : getCategoriaData().filter(
                        (item) => item._isAgricultor === true
                      )
                }
                title="Agricultores"
              />
            </GridItem>
          ) : null}
        </Grid>
      </Box>
    </>
  );
};

export default AppAgriHome;
