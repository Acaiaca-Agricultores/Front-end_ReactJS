import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  List,
  ListItem,
  ListIcon,
  Divider,
  Button,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const AppTermos = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="4xl">
        <Box
          bg={cardBg}
          borderRadius="lg"
          boxShadow="lg"
          p={8}
          border="1px"
          borderColor={borderColor}
        >
          <VStack spacing={4} align="stretch" mb={8}>
            <Heading as="h1" size="2xl" color="#83A11D" textAlign="center">
              Termos de Uso
            </Heading>
            <Text color="gray.600" textAlign="center" fontSize="sm">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </Text>
          </VStack>

          <VStack spacing={6} align="stretch">
            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                1. Aceitação dos Termos
              </Heading>
              <Text>
                Ao acessar e usar a plataforma IAcai, você concorda em cumprir e
                estar vinculado a estes Termos de Uso. Se você não concordar com
                qualquer parte destes termos, não deve usar nossos serviços.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                2. Descrição do Serviço
              </Heading>
              <Text mb={3}>
                A IAcai é uma plataforma que conecta agricultores e
                consumidores, facilitando a comercialização de produtos
                agrícolas de forma direta e sustentável. Nossos serviços
                incluem:
              </Text>
              <List spacing={2}>
                <ListItem>
                  • Cadastro e gerenciamento de perfis de agricultores
                </ListItem>
                <ListItem>• Catálogo de produtos agrícolas</ListItem>
                <ListItem>• Sistema de pagamento e transações</ListItem>
                <ListItem>
                  • Comunicação entre agricultores e consumidores
                </ListItem>
                <ListItem>• Suporte e assistência técnica</ListItem>
              </List>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                3. Cadastro e Conta do Usuário
              </Heading>
              <Text mb={3}>
                Para usar nossos serviços, você deve criar uma conta fornecendo
                informações precisas e atualizadas. Você é responsável por:
              </Text>
              <List spacing={2}>
                <ListItem>• Manter a confidencialidade de sua senha</ListItem>
                <ListItem>
                  • Todas as atividades que ocorrem em sua conta
                </ListItem>
                <ListItem>
                  • Notificar-nos imediatamente sobre qualquer uso não
                  autorizado
                </ListItem>
                <ListItem>
                  • Fornecer informações verdadeiras e precisas
                </ListItem>
              </List>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                4. Uso Aceitável
              </Heading>
              <Text mb={3}>
                Você concorda em usar a plataforma apenas para propósitos legais
                e de acordo com estes termos. É proibido:
              </Text>
              <List spacing={2}>
                <ListItem>• Usar a plataforma para atividades ilegais</ListItem>
                <ListItem>
                  • Publicar conteúdo ofensivo, difamatório ou inadequado
                </ListItem>
                <ListItem>• Tentar acessar contas de outros usuários</ListItem>
                <ListItem>• Interferir no funcionamento da plataforma</ListItem>
                <ListItem>
                  • Vender produtos falsificados ou de qualidade inferior
                </ListItem>
              </List>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                5. Responsabilidades dos Agricultores
              </Heading>
              <Text mb={3}>Agricultores cadastrados são responsáveis por:</Text>
              <List spacing={2}>
                <ListItem>
                  • Fornecer produtos de qualidade e conforme descrição
                </ListItem>
                <ListItem>• Cumprir prazos de entrega acordados</ListItem>
                <ListItem>
                  • Manter informações de produtos atualizadas
                </ListItem>
                <ListItem>
                  • Respeitar normas sanitárias e de segurança alimentar
                </ListItem>
                <ListItem>
                  • Responder adequadamente às solicitações dos consumidores
                </ListItem>
              </List>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                6. Responsabilidades dos Consumidores
              </Heading>
              <Text mb={3}>Consumidores são responsáveis por:</Text>
              <List spacing={2}>
                <ListItem>
                  • Fornecer informações precisas para entrega
                </ListItem>
                <ListItem>• Pagar pelos produtos adquiridos</ListItem>
                <ListItem>
                  • Receber os produtos no local e horário acordados
                </ListItem>
                <ListItem>
                  • Comunicar problemas ou reclamações de forma respeitosa
                </ListItem>
                <ListItem>• Respeitar os prazos de pagamento</ListItem>
              </List>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                7. Pagamentos e Transações
              </Heading>
              <Text>
                Todas as transações são processadas de forma segura através de
                nossos parceiros de pagamento. A IAcai pode cobrar taxas de
                serviço conforme estabelecido em nossos planos de assinatura.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                8. Propriedade Intelectual
              </Heading>
              <Text>
                Todo o conteúdo da plataforma, incluindo textos, imagens, logos
                e software, é propriedade da IAcai ou de nossos licenciadores e
                está protegido por leis de propriedade intelectual.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                9. Limitação de Responsabilidade
              </Heading>
              <Text>
                A IAcai não se responsabiliza por danos indiretos, incidentais
                ou consequenciais decorrentes do uso da plataforma. Nossa
                responsabilidade é limitada ao valor pago pelos serviços.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                10. Modificações dos Termos
              </Heading>
              <Text>
                Reservamo-nos o direito de modificar estes termos a qualquer
                momento. As alterações entrarão em vigor imediatamente após a
                publicação. O uso continuado da plataforma constitui aceitação
                dos novos termos.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                11. Rescisão
              </Heading>
              <Text>
                Podemos suspender ou encerrar sua conta a qualquer momento por
                violação destes termos ou por qualquer outro motivo a nosso
                critério. Você também pode encerrar sua conta a qualquer
                momento.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                12. Lei Aplicável
              </Heading>
              <Text>
                Estes termos são regidos pelas leis brasileiras. Qualquer
                disputa será resolvida nos tribunais competentes do Brasil.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                13. Contato
              </Heading>
              <Text>
                Para dúvidas sobre estes termos, entre em contato conosco
                através dos canais disponíveis em nossa plataforma.
              </Text>
            </Box>
          </VStack>

          <Box mt={8} pt={6} borderTop="1px" borderColor={borderColor}>
            <Link to="/">
              <Button
                leftIcon={<ChevronLeftIcon />}
                colorScheme="green"
                variant="outline"
                size="lg"
                w="full"
              >
                Voltar para a página inicial
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AppTermos;
