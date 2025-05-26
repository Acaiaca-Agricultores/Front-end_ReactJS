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
  Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import AppCarrossel from "../carrossel/AppCarrossel";
import ImagemFeira from "../../assets/feira.jpg";

const AppAgriHome = () => {
  return (
    <>
      <Image
        paddingBottom={"1rem"}
        src={ImagemFeira}
        alt="Imagem de fundo"
        width={"100%"}
        objectFit={"cover"}
        height={"15rem"}
      />
      <Grid
        h="100%"
        templateRows="auto auto repeat(3, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem
          rowSpan={5}
          colSpan={1}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <UnorderedList
            w={"100%"}
            spacing={"1rem"}
            textAlign={"center"}
            listStyleType={"none"}
            fontSize={"1.25rem"}
            fontFamily={"Onest"}
            margin={"0"}
          >
            <ListItem
              color={"#83a11d"}
              border={"3px solid #83a11d"}
              borderLeft={'none'}
              borderRadius={"0rem 0.3rem 0.3rem 0rem"}
            >
            Categorias
            </ListItem>
            <ListItem>Frutas</ListItem>
            <ListItem>Verduras</ListItem>
            <ListItem>Legumes</ListItem>
            <ListItem>Legumes</ListItem>
            <ListItem>Leite e Derivados</ListItem>
            <ListItem>Cereais</ListItem>
          </UnorderedList>
        </GridItem>
        <GridItem
          gap={"1rem"}
          display={"flex"}
          alignItems={"center"}
          width={"100%"}
          colSpan={4}
        >
          <Menu>
            <MenuButton border={"2px solid #83a11d"} color={"#83a11d"} variant={"outline"} as={Button} minW="120px">
              Ordenar
            </MenuButton>
            <MenuList>
              <MenuItem>Produtos Populares</MenuItem>
              <MenuItem>Produtos Favoritos</MenuItem>
              <MenuItem>Mais Procurados</MenuItem>
              <MenuItem>Mais Vendidos</MenuItem>
              <MenuItem>Mais Avaliados</MenuItem>
            </MenuList>
          </Menu>
          <InputGroup style={{ flexGrow: 1 }}>
            <Input
              type="search"
              placeholder="Pesquisar"
              variant={"outline"}
              _placeholder={{ color: "#b0b0b0" }}
              border={"2px solid  #83a11d"}
              aria-required="true"
              _focus={{
                borderColor: "#c0ab8e",
                boxShadow: "0 0 0 1px #e5d1b0",
              }}
            />
            <InputRightAddon background={"#83a11d"}>
              <SearchIcon cursor={"pointer"} />
            </InputRightAddon>
          </InputGroup>
        </GridItem>
        <GridItem colSpan={4} bg="#FFFFFF">
          <AppCarrossel />
        </GridItem>
        <GridItem colSpan={4} bg="#FFFFFF">
          <AppCarrossel />
        </GridItem>
        <GridItem colSpan={4} bg="#FFFFFF">
          <AppCarrossel />
        </GridItem>
        <GridItem colSpan={4} bg="#FFFFFF">
          <AppCarrossel />
        </GridItem>
      </Grid>
    </>
  );
};

export default AppAgriHome;
