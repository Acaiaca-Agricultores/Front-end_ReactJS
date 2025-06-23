import caraway from "../../assets/loading/caraway.mp4";
import fruit from "../../assets/loading/fruit.mp4";
import harvest from "../../assets/loading/harvest.mp4";
import plantSeeds from "../../assets/loading/plant-seeds.mp4";
import sack from "../../assets/loading/sack.mp4";
import sesame from "../../assets/loading/sesame.mp4";
import sowingSeeds from "../../assets/loading/sowing-seeds.mp4";
import vegetables from "../../assets/loading/vegetables.mp4";
import wheat from "../../assets/loading/wheat.mp4";

import { Center, Text } from "@chakra-ui/react";

function getRandomLoadingVideo() {
  const videos = [
    caraway,
    fruit,
    harvest,
    plantSeeds,
    sack,
    sesame,
    sowingSeeds,
    vegetables,
    wheat,
  ];
  const index = Math.floor(Math.random() * videos.length);
  return videos[index];
}

const AppLoading = () => {
  const videoSrc = getRandomLoadingVideo();
  return (
    <Center 
      display={"flex"} 
      flexDirection="column" 
      gap={4} 
      height="100vh"
      role="status"
      aria-live="polite"
      aria-label="Carregando conteúdo"
    >
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        style={{ width: 120, height: 120 }}
        aria-label="Animação de carregamento"
        aria-hidden="true"
      />
      <Text 
        fontSize="lg" 
        color="gray.600"
        aria-label="Carregando, aguarde um momento"
      >
        Carregando...
      </Text>
    </Center>
  );
};
export default AppLoading;
