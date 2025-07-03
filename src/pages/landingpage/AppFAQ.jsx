import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import ScrollAnimated from "../../components/ScrollAnimated";

const AppFAQ = () => {
  const faqData = [
    {
      question: "O que é a IAcai?",
      answer: "A IAcai é uma plataforma inovadora que conecta agricultores diretamente aos consumidores, eliminando intermediários e promovendo a agricultura sustentável. Nossa missão é fortalecer a agricultura familiar e promover o consumo de produtos frescos e de qualidade."
    },
    {
      question: "Como posso me cadastrar como agricultor?",
      answer: "Para se cadastrar como agricultor, clique no botão 'Cadastre-se' no menu principal e preencha o formulário com seus dados pessoais, informações da propriedade e sua história como agricultor. O processo é simples e gratuito."
    },
    {
      question: "Quais são os benefícios para os agricultores?",
      answer: "Os agricultores têm acesso a um mercado direto, recebem preços mais justos pelos seus produtos, podem contar suas histórias e conectar-se com consumidores que valorizam produtos frescos e sustentáveis."
    },
    {
      question: "Como funciona o sistema de pagamento?",
      answer: "Oferecemos diferentes planos de assinatura para agricultores, desde um plano gratuito básico até planos premium com recursos avançados. Os pagamentos são processados de forma segura através de nossa plataforma."
    },
    {
      question: "A plataforma é segura?",
      answer: "Sim, a IAcai prioriza a segurança dos dados dos usuários. Utilizamos tecnologias de criptografia avançadas e seguimos as melhores práticas de segurança para proteger suas informações pessoais e transações."
    },
    {
      question: "Posso usar a plataforma em dispositivos móveis?",
      answer: "Sim! A IAcai é totalmente responsiva e funciona perfeitamente em smartphones, tablets e computadores. Você pode acessar a plataforma de qualquer lugar, a qualquer momento."
    },
    {
      question: "Como posso entrar em contato com o suporte?",
      answer: "Você pode entrar em contato conosco através do formulário de contato disponível na plataforma, ou enviar um e-mail diretamente para nossa equipe de suporte. Estamos sempre prontos para ajudar!"
    },
    {
      question: "A plataforma oferece recursos de acessibilidade?",
      answer: "Sim! A IAcai é comprometida com a inclusão digital. Oferecemos recursos de acessibilidade como reconhecimento de voz, navegação por teclado e compatibilidade com leitores de tela para garantir que todos possam usar nossa plataforma."
    }
  ];

  return (
    <Box
      id="faq"
      as="section"
      role="region"
      aria-label="Perguntas Frequentes"
      backgroundImage={`url(${"https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})`}
      backgroundSize="cover"
      backgroundPosition="center"
      padding={"4rem 2rem"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      minHeight="100vh"
    >
      <Box
        border={"2px solid #83a11d"}
        borderRadius="8px"
        p={6}
        margin={"2rem"}
        background="rgba(0, 0, 0, 0.7)"
        backdropFilter="blur(8px)"
        width={{ base: "100%", md: "80vw", lg: "70vw" }}
        color={"white"}
        maxWidth="1200px"
      >
        <ScrollAnimated animationType="fade-in" delay={1}>
          <Text
            as={"h2"}
            color={"#ffffff"}
            textAlign={"center"}
            fontSize={{ base: "xl", md: "3xl" }}
            fontWeight="bold"
            mb={8}
          >
            Perguntas Frequentes
          </Text>
        </ScrollAnimated>

        <ScrollAnimated animationType="fade-in" delay={2}>
          <Accordion allowToggle>
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                border="1px solid #83a11d"
                borderRadius="8px"
                mb={4}
                _hover={{
                  borderColor: "#c0ab8e",
                  boxShadow: "0 0 10px rgba(192, 171, 142, 0.3)",
                }}
              >
                <AccordionButton
                  py={4}
                  px={6}
                  _hover={{
                    backgroundColor: "rgba(131, 161, 29, 0.1)",
                  }}
                  _expanded={{
                    backgroundColor: "rgba(131, 161, 29, 0.2)",
                    borderBottomRadius: "0",
                  }}
                >
                  <Text
                    flex="1"
                    textAlign="left"
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="medium"
                    color="#ffffff"
                  >
                    {item.question}
                  </Text>
                  <AccordionIcon color="#83a11d" />
                </AccordionButton>
                <AccordionPanel
                  pb={4}
                  px={6}
                  backgroundColor="rgba(0, 0, 0, 0.3)"
                  borderBottomRadius="8px"
                >
                  <Text
                    color="#e0e0e0"
                    fontSize={{ base: "sm", md: "md" }}
                    lineHeight="1.6"
                  >
                    {item.answer}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollAnimated>

        <ScrollAnimated animationType="fade-in" delay={3}>
          <Text
            textAlign="center"
            mt={8}
            color="#c0ab8e"
            fontSize={{ base: "sm", md: "md" }}
            fontStyle="italic"
          >
            Não encontrou o que procurava? Entre em contato conosco!
          </Text>
        </ScrollAnimated>
      </Box>
    </Box>
  );
};

export default AppFAQ; 