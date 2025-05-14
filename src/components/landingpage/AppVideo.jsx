import { Box, Flex, Text } from "@chakra-ui/react";

const AppVideo = () => {
  return (
    <Flex
      gap={6}
      margin={{ base: "2rem", md: "4.5rem 7.5rem" }}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box id="texto" display={"flex"} justifyContent={"center"}>
        <Text fontSize={{ base: "2rem", md: "3rem" }}>
          Sobre <span>Acaiacá</span>
        </Text>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <iframe
          width="1014"
          height="570"
          src="https://www.youtube.com/embed/cYsm9WHt4yg"
          title="Comercial Acaiacá legendado"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </Box>
    </Flex>
  );
};

export default AppVideo;
