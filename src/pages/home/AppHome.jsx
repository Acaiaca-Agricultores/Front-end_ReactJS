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
  useBreakpointValue,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  CardFooter,
  Divider,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FiMapPin, FiMail, FiPhone, FiTag } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AppCarrossel from "../../components/carrossel/AppCarrossel";
import ImagemFeira from "../../assets/feira.jpg";
import ImageDefault from "../../assets/default.png";
import AppLoading from "../../components/loading/AppLoading";

const API_URL = import.meta.env.VITE_API_URL

const useAgriData = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const [productsResponse, farmersResponse] = await Promise.all([
          fetch(`${API_URL}/products`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/user/agricultores`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (productsResponse.status === 401 || farmersResponse.status === 401) {
          localStorage.clear();
          navigate("/login");
          return;
        }

        // Check if responses are successful
        if (!productsResponse.ok) {
          console.error(
            "Products API error:",
            productsResponse.status,
            productsResponse.statusText
          );
          setProducts([]);
        } else {
          const productsData = await productsResponse.json();

          // Handle API response structure: {success: true, products: Array, count: number}
          const productsArray = productsData.products || productsData;

          // Validate that productsArray is an array
          if (!Array.isArray(productsArray)) {
            console.error(
              "API returned non-array products data:",
              productsData
            );
            setProducts([]);
          } else {
            const mapearProducts = productsArray.map((p) => ({
              ...p,
              id: p.id || p._id,
              title: p.name,
              image: p.image ? `${API_URL}${p.image}` : ImageDefault,
              agricultor: p.User ? { ...p.User } : {},
            }));
            setProducts(mapearProducts);
          }
        }

        if (!farmersResponse.ok) {
          console.error(
            "Farmers API error:",
            farmersResponse.status,
            farmersResponse.statusText
          );
          setFarmers([]);
        } else {
          const farmersData = await farmersResponse.json();

          // Handle API response structure: {success: true, farmers: Array, count: number} or similar
          const farmersArray =
            farmersData.farmers ||
            farmersData.users ||
            farmersData.agricultores ||
            farmersData;

          // Validate that farmersArray is an array
          if (!Array.isArray(farmersArray)) {
            console.error("API returned non-array farmers data:", farmersData);
            setFarmers([]);
          } else {
            const mapearFarmers = farmersArray.map((user) => ({
              ...user,
              id: user.id || user._id || user.userId,
              title: user.username,
              image: user.imageProfile?.startsWith("http")
                ? user.imageProfile
                : user.imageProfile
                ? `${API_URL}${user.imageProfile}`
                : ImageDefault,
            }));
            setFarmers(mapearFarmers);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return { loading, products, farmers };
};

const CategorySelector = ({ categories, selected, onSelect }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const menuItems = categories.map((cat) => (
    <MenuItem
      key={cat.value}
      onClick={() => onSelect(cat.value)}
      fontWeight={selected === cat.value ? "bold" : "normal"}
      bg={selected === cat.value ? "#EDD1AF" : "transparent"}
      color={selected === cat.value ? "#2C3609" : "inherit"}
      _hover={{ bg: "gray.300", color: "#83a11d" }}
    >
      {cat.label}
    </MenuItem>
  ));

  if (isMobile) {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Categorias"
          icon={<HamburgerIcon />}
          variant="outline"
          color="#83a11d"
          border="2px solid #83a11d"
          width="100%"
        />
        <MenuList zIndex={3}>
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
          {menuItems}
        </MenuList>
      </Menu>
    );
  }

  return (
    <UnorderedList
      w="100%"
      spacing="0.5rem"
      listStyleType="none"
      m={0}
      p="0 2rem"
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
          onClick={() => onSelect(cat.value)}
          cursor="pointer"
          p="0.5rem 0.75rem"
          borderRadius="md"
          _hover={{ bg: "gray.300", color: "#2C3609" }}
          bg={selected === cat.value ? "#EDD1AF" : "transparent"}
          color={selected === cat.value ? "#2C3609" : "inherit"}
          fontWeight={selected === cat.value ? "bold" : "normal"}
        >
          <Link _hover={{ textDecoration: "none" }}>{cat.label}</Link>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

const AppHome = () => {
  const { loading, products, farmers } = useAgriData();
  const [userName, setUserName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [priceOrder, setPriceOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName =
      localStorage.getItem("userName") || localStorage.getItem("username");
    if (storedName) setUserName(storedName);
  }, []);

  const categories = [
    { label: "Todas", value: "Todos" },
    { label: "Agricultores", value: "Agricultores" },
    { label: "Frutas", value: "Frutas" },
    { label: "Verduras", value: "Verduras" },
    { label: "Legumes", value: "Legumes" },
    { label: "Tubérculos", value: "Tubérculos" },
    { label: "Grãos", value: "Grãos" },
    { label: "Oleaginosas", value: "Oleaginosas" },
    { label: "Temperos", value: "Temperos" },
    { label: "Chás", value: "Chás" },
    { label: "Mel", value: "Mel" },
    { label: "Ovos", value: "Ovos" },
    { label: "Laticínios", value: "Laticínios" },
  ];

  const normalizeString = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredData = useMemo(() => {
    let data = selectedCategory === "Agricultores" ? farmers : products;

    if (selectedCategory !== "Todos" && selectedCategory !== "Agricultores") {
      data = products.filter((item) => {
        const itemCategory = item.category?.toLowerCase();
        const selectedCategoryLower = selectedCategory.toLowerCase();

        const categoryMapping = {
          frutas: ["fruta", "frutas"],
          verduras: ["verdura", "verduras", "hortaliça", "hortaliças"],
          legumes: ["legume", "legumes"],
          tubérculos: ["tuberculo", "tubérculo", "tuberculos", "tubérculos"],
          grãos: ["grao", "grão", "graos", "grãos"],
          oleaginosas: ["oleaginosa", "oleaginosas"],
          temperos: ["tempero", "temperos", "condimento", "condimentos"],
          chás: ["cha", "chá", "chas", "chás"],
          mel: ["mel"],
          ovos: ["ovo", "ovos"],
          laticínios: [
            "laticinio",
            "laticínio",
            "laticinios",
            "laticínios",
            "derivados do leite",
          ],
        };

        return (
          categoryMapping[selectedCategoryLower]?.includes(itemCategory) ||
          itemCategory === selectedCategoryLower
        );
      });
    }

    if (searchTerm.trim()) {
      const normalizedSearch = normalizeString(searchTerm);

      if (selectedCategory === "Todos") {
        const filteredProducts = products.filter((item) =>
          normalizeString(item.title).includes(normalizedSearch)
        );
        const filteredFarmers = farmers.filter((item) =>
          normalizeString(item.username).includes(normalizedSearch)
        );
        data = [...filteredProducts, ...filteredFarmers];
      } else {
        data = data.filter((item) =>
          normalizeString(item.title || item.username).includes(
            normalizedSearch
          )
        );
      }
    }

    if (selectedFarmer && selectedCategory !== "Agricultores") {
      data = data.filter(
        (item) =>
          item.agricultor?.id === selectedFarmer ||
          item.agricultor?._id === selectedFarmer ||
          item.agricultor?.userId === selectedFarmer
      );
    }

    if (priceOrder && selectedCategory !== "Agricultores") {
      data = [...data].sort((a, b) => {
        switch (priceOrder) {
          case "crescente":
            return (a.price || 0) - (b.price || 0);
          case "decrescente":
            return (b.price || 0) - (a.price || 0);
          case "nome":
            return (a.title || a.username).localeCompare(
              b.title || b.username,
              "pt-BR"
            );
          case "nome_desc":
            return (b.title || b.username).localeCompare(
              a.title || a.username,
              "pt-BR"
            );
          case "recentes":
            return (
              new Date(b.createdAt || b.updatedAt || 0) -
              new Date(a.createdAt || a.updatedAt || 0)
            );
          case "antigos":
            return (
              new Date(a.createdAt || a.updatedAt || 0) -
              new Date(b.createdAt || b.updatedAt || 0)
            );
          default:
            return 0;
        }
      });
    }

    return data;
  }, [
    selectedCategory,
    searchTerm,
    priceOrder,
    products,
    farmers,
    selectedFarmer,
  ]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPriceOrder("");
    setSelectedFarmer("");
  };

  const cardStyles = {
    width: {
      base: "calc(100% - 20px)",
      md: "calc(100% - 30px)",
      lg: "calc(100% - 40px)",
    },
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    borderRadius: "16px",
    overflow: "hidden",
    margin: "0 10px",
    boxShadow: "none",
  };

  const buttonStyles = {
    color: "white",
    background: "#83a11d",
    _hover: { background: "#c0ab8e", color: "#000000" },
  };

  const renderFarmerCard = (item, index) => (
    <Card key={index} {...cardStyles}>
      <CardBody
        flex="1 1 auto"
        display="flex"
        flexDirection="column"
        padding={{ base: 3, md: 4 }}
      >
        <Image
          width="100%"
          height={{ base: "150px", md: "200px" }}
          objectFit="cover"
          src={item.image || ImageDefault}
          alt={`Foto de ${item.username}`}
          borderRadius="md"
          mb={4}
        />
        <Stack gap={3}>
          <Heading size="md">{item.username}</Heading>
          <Text fontWeight="bold" color="gray.600">
            Propriedade: {item.propertyName}
          </Text>
          <VStack align="stretch" spacing={1}>
            <HStack>
              <Icon as={FiMapPin} color={"#5a8b0c"} />
              <Text fontSize="sm">{`${item.cityName}, ${item.stateName}`}</Text>
            </HStack>
            <HStack>
              <Icon as={FiMail} color={"#5a8b0c"} />
              <Text fontSize="sm">{item.email}</Text>
            </HStack>
            <HStack>
              <Icon as={FiPhone} color={"#5a8b0c"} />
              <Text fontSize="sm">{item.phoneNumber}</Text>
            </HStack>
          </VStack>
        </Stack>
      </CardBody>
      <Divider borderColor="gray.200" />
      <CardFooter padding={{ base: 3, md: 4 }}>
        <Button
          {...buttonStyles}
          width="100%"
          onClick={() => navigate(`/perfil/${item.id}`)}
        >
          Ver Perfil
        </Button>
      </CardFooter>
    </Card>
  );

  const renderProductCard = (product, index) => (
    <Card key={index} {...cardStyles}>
      <CardBody
        flex="1 1 auto"
        display="flex"
        flexDirection="column"
        padding={{ base: 3, md: 4 }}
      >
        <Image
          width="100%"
          height={{ base: "150px", md: "200px" }}
          objectFit="cover"
          src={product.image || ImageDefault}
          alt={`Imagem de ${product.name}`}
          borderRadius="md"
          mb={4}
        />
        <Stack gap={2}>
          <Heading size="md">{product.name}</Heading>
          <Text color="green.600" fontSize="lg" fontWeight="bold">
            R$ {Number(product.price).toFixed(2)}
          </Text>
          <Text fontSize="sm" color="gray.600" noOfLines={2}>
            {product.description}
          </Text>
          {product.agricultor?.username && (
            <Text fontSize="sm" color="gray.500" mt={2}>
              Vendido por: <strong>{product.agricultor.username}</strong>
            </Text>
          )}
        </Stack>
      </CardBody>
      <Divider borderColor="gray.200" />
      <CardFooter padding={{ base: 3, md: 4 }}>
        <Button
          {...buttonStyles}
          width="100%"
          onClick={() => {
            navigate(`/produto/${product.id}`);
          }}
        >
          Ver Produto
        </Button>
      </CardFooter>
    </Card>
  );

  const carousels = [
    {
      title: "Frutas",
      data: products.filter(
        (p) =>
          p.category && ["fruta", "frutas"].includes(p.category.toLowerCase())
      ),
      show: ["Todos", "Frutas"].includes(selectedCategory),
      renderItem: (item, index) => renderProductCard(item, index),
    },
    {
      title: "Verduras",
      data: products.filter(
        (p) =>
          p.category &&
          ["verdura", "verduras", "hortaliça", "hortaliças"].includes(
            p.category.toLowerCase()
          )
      ),
      show: ["Todos", "Verduras"].includes(selectedCategory),
      renderItem: (item, index) => renderProductCard(item, index),
    },
    {
      title: "Legumes",
      data: products.filter(
        (p) =>
          p.category && ["legume", "legumes"].includes(p.category.toLowerCase())
      ),
      show: ["Todos", "Legumes"].includes(selectedCategory),
      renderItem: (item, index) => renderProductCard(item, index),
    },
    {
      title: "Tubérculos",
      data: products.filter(
        (p) =>
          p.category &&
          ["tuberculo", "tubérculo", "tuberculos", "tubérculos"].includes(
            p.category.toLowerCase()
          )
      ),
      show: ["Todos", "Tubérculos"].includes(selectedCategory),
      renderItem: (item, index) => renderProductCard(item, index),
    },
    {
      title: "Grãos",
      data: products.filter(
        (p) =>
          p.category &&
          ["grao", "grão", "graos", "grãos"].includes(p.category.toLowerCase())
      ),
      show: ["Todos", "Grãos"].includes(selectedCategory),
      renderItem: (item, index) => renderProductCard(item, index),
    },
    {
      title: "Oleaginosas",
      data: products.filter(
        (p) =>
          p.category &&
          ["oleaginosa", "oleaginosas"].includes(p.category.toLowerCase())
      ),
      show: ["Todos", "Oleaginosas"].includes(selectedCategory),
      renderItem: (item, index) => renderProductCard(item, index),
    },
    {
      title: "Temperos",
      data: products.filter(
        (p) =>
          p.category &&
          ["tempero", "temperos", "condimento", "condimentos"].includes(
            p.category.toLowerCase()
          )
      ),
      show: ["Todos", "Temperos"].includes(selectedCategory),
      renderItem: (item, index) => renderProductCard(item, index),
    },
    {
      title: "Chás",
      data: products.filter(
        (p) =>
          p.category &&
          ["cha", "chá", "chas", "chás"].includes(p.category.toLowerCase())
      ),
      show: ["Todos", "Chás"].includes(selectedCategory),
      renderItem: (item, index) => renderProductCard(item, index),
    },
    {
      title: "Mel",
      data: products.filter(
        (p) => p.category && ["mel"].includes(p.category.toLowerCase())
      ),
      show: ["Todos", "Mel"].includes(selectedCategory),
      renderItem: (item, index) => renderProductCard(item, index),
    },
    {
      title: "Ovos",
      data: products.filter(
        (p) => p.category && ["ovo", "ovos"].includes(p.category.toLowerCase())
      ),
      show: ["Todos", "Ovos"].includes(selectedCategory),
      renderItem: (item, index) => renderProductCard(item, index),
    },
    {
      title: "Laticínios",
      data: products.filter(
        (p) =>
          p.category &&
          [
            "laticinio",
            "laticínio",
            "laticinios",
            "laticínios",
            "derivados do leite",
          ].includes(p.category.toLowerCase())
      ),
      show: ["Todos", "Laticínios"].includes(selectedCategory),
      renderItem: (item, index) => renderProductCard(item, index),
    },
    {
      title: "Nossos Agricultores",
      data: farmers,
      show: ["Todos", "Agricultores"].includes(selectedCategory),
      renderItem: (item, index) => renderFarmerCard(item, index),
    },
  ];

  if (loading) return <AppLoading />;

  return (
    <Box backgroundColor="#f7f7f7">
      <Flex
        as="section"
        h={{ base: "auto", md: "60vh" }}
        backgroundImage={`url(${ImagemFeira})`}
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
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
          p={{ base: "1.5rem", md: "4.5rem" }}
          color="white"
          w="100%"
          flexDirection="column"
        >
          <Text
            fontSize={{ base: "2rem", md: "2.5rem" }}
            fontWeight="bold"
            textAlign="center"
          >
            <Typewriter
              words={[
                `Bem-vindo a Acaiacá, ${userName}!`,
                "Conectando você ao campo.",
                "Produtos frescos, direto de quem produz.",
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
        templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }}
        gap={4}
        p={{ base: "2rem", md: "2rem 0" }}
      >
        <GridItem
          colSpan={{ base: 4, md: 1 }}
          p={{ base: "0 2rem", md: "0" }}
          mb={{ base: 4, md: 0 }}
        >
          <CategorySelector
            categories={categories}
            selected={selectedCategory}
            onSelect={handleCategorySelect}
          />
        </GridItem>
        <GridItem
          colSpan={{ base: 4, md: 4 }}
          display="flex"
          flexDirection="column"
          gap={4}
        >
          <Flex
            gap="1rem"
            alignItems="center"
            w="100%"
            p={{ base: "0 2rem", md: "0" }}
          >
            <Menu>
              <MenuButton
                as={Button}
                border="2px solid #83a11d"
                color="#83a11d"
                variant="outline"
                minW="120px"
                isDisabled={selectedCategory === "Agricultores"}
              >
                Ordenar
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setPriceOrder("crescente")}>
                  Preço Crescente
                </MenuItem>
                <MenuItem onClick={() => setPriceOrder("decrescente")}>
                  Preço Decrescente
                </MenuItem>
                <MenuItem onClick={() => setPriceOrder("nome")}>
                  Nome A-Z
                </MenuItem>
                <MenuItem onClick={() => setPriceOrder("nome_desc")}>
                  Nome Z-A
                </MenuItem>
                <MenuItem onClick={() => setPriceOrder("recentes")}>
                  Mais Recentes
                </MenuItem>
                <MenuItem onClick={() => setPriceOrder("antigos")}>
                  Mais Antigos
                </MenuItem>
              </MenuList>
            </Menu>
            <InputGroup flexGrow={1}>
              <Input
                type="search"
                placeholder="Pesquisar por nome..."
                variant="outline"
                border="2px solid #83a11d"
                _focus={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 0 1px #e5d1b0",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputRightAddon background="#83a11d" cursor="pointer">
                <SearchIcon color="white" />
              </InputRightAddon>
            </InputGroup>
          </Flex>

          <Box p={{ base: "0", md: "0 2rem" }}>
            {searchTerm.trim() && selectedCategory === "Todos" ? (
              <AppCarrossel
                data={filteredData}
                title="Resultados da Pesquisa"
                renderItem={(item) =>
                  item.propertyName
                    ? renderFarmerCard(item)
                    : renderProductCard(item)
                }
              />
            ) : (
              carousels.map(
                (carousel) =>
                  carousel.show && (
                    <AppCarrossel
                      key={carousel.title}
                      title={carousel.title}
                      data={carousel.data}
                      renderItem={carousel.renderItem}
                    />
                  )
              )
            )}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AppHome;
