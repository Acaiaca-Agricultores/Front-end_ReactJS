import { Box, Flex, Text, Center, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import ImagemFeira from "../../assets/feira.jpg";
import { Typewriter } from "react-simple-typewriter";
import { useState, useEffect } from 'react';


const AppProduto = () => {
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
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
    }, []);

    return (
        <>
            <Flex
                as="section"
                role="region"
                aria-label="Seção de boas-vindas e avatar"
                backgroundImage={`url(${ImagemFeira})`}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                position="relative"
                alignItems="center"
                justifyContent="center"
                color="white"
                py={{ base: 10, md: 16 }}
                textAlign="center"
            >
                <Box
                    position="absolute"
                    inset="0"
                    background="rgba(0, 0, 0, 0.6)"
                    backdropFilter="blur(3px)"
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
            <Center>
                <Text as="h1" fontSize="2xl" fontWeight="bold" >
                    Cadastrar Novo Produto
                </Text>
            </Center>
            <Center mt={8}>
                <form
                    as="form"
                    width={{ base: "90vw", md: "400px" }}
                    padding={6}
                    borderRadius="md"
                    boxShadow="md"
                    background="white"
                    border="1px solid #8A9B55"
                >
                    <FormControl mb={4}>
                        <FormLabel color="#8A9B55">Nome do produto</FormLabel>
                        <Input borderColor="#8A9B55" focusBorderColor="#8A9B55" placeholder="Digite o nome" />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel color="#8A9B55">Descrição</FormLabel>
                        <Input borderColor="#8A9B55" focusBorderColor="#8A9B55" placeholder="Digite a descrição" />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel color="#8A9B55">Quantidade</FormLabel>
                        <Input type="number" borderColor="#8A9B55" focusBorderColor="#8A9B55" placeholder="Digite a quantidade" />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel color="#8A9B55">Imagem do produto</FormLabel>
                        <Box
                            border="2px solid #8A9B55"
                            borderRadius="md"
                            padding={2}
                            margin-bottom={2}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height="150px"
                        >
                            <Input type="file" border="none" padding={0} />
                        </Box>

                    </FormControl>
                    <Button
                        margin-top={4}
                        width="100%"
                        background="#8A9B55"
                        color="white"
                        _hover={{ bg: "#6C7A3C" }}
                        type="submit"
                    >
                        Cadastrar Novo Produto
                    </Button>
                </form>
            </Center>
        </>
    );
}
export default AppProduto;