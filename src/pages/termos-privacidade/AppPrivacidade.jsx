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
  Badge,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const AppPrivacidade = () => {
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
              Política de Privacidade
            </Heading>
            <Text color="gray.600" textAlign="center" fontSize="sm">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </Text>
          </VStack>

          <VStack spacing={6} align="stretch">
            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                1. Introdução
              </Heading>
              <Text>
                A IAcai está comprometida em proteger sua privacidade e garantir
                a segurança de seus dados pessoais. Esta Política de Privacidade
                explica como coletamos, usamos, armazenamos e protegemos suas
                informações quando você usa nossa plataforma.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                2. Informações que Coletamos
              </Heading>
              <Text mb={4}>Coletamos os seguintes tipos de informações:</Text>

              <VStack spacing={4} align="stretch">
                <Box>
                  <Heading as="h3" size="md" color="#83A11D" mb={2}>
                    2.1 Informações Pessoais
                  </Heading>
                  <List spacing={2}>
                    <ListItem>• Nome completo</ListItem>
                    <ListItem>• Endereço de e-mail</ListItem>
                    <ListItem>• Número de telefone</ListItem>
                    <ListItem>• Endereço residencial</ListItem>
                    <ListItem>• CPF ou CNPJ</ListItem>
                    <ListItem>• Data de nascimento</ListItem>
                  </List>
                </Box>

                <Box>
                  <Heading as="h3" size="md" color="#83A11D" mb={2}>
                    2.2 Informações de Perfil
                  </Heading>
                  <List spacing={2}>
                    <ListItem>• Foto de perfil</ListItem>
                    <ListItem>• Biografia e descrição</ListItem>
                    <ListItem>• Localização geográfica</ListItem>
                    <ListItem>• Preferências de produtos</ListItem>
                  </List>
                </Box>

                <Box>
                  <Heading as="h3" size="md" color="#83A11D" mb={2}>
                    2.3 Informações de Transação
                  </Heading>
                  <List spacing={2}>
                    <ListItem>• Histórico de compras e vendas</ListItem>
                    <ListItem>
                      • Dados de pagamento (processados por terceiros seguros)
                    </ListItem>
                    <ListItem>• Endereços de entrega</ListItem>
                    <ListItem>• Comunicações entre usuários</ListItem>
                  </List>
                </Box>

                <Box>
                  <Heading as="h3" size="md" color="#83A11D" mb={2}>
                    2.4 Informações Técnicas
                  </Heading>
                  <List spacing={2}>
                    <ListItem>• Endereço IP</ListItem>
                    <ListItem>• Tipo de dispositivo e navegador</ListItem>
                    <ListItem>• Sistema operacional</ListItem>
                    <ListItem>• Dados de uso da plataforma</ListItem>
                    <ListItem>• Cookies e tecnologias similares</ListItem>
                  </List>
                </Box>
              </VStack>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                3. Como Usamos Suas Informações
              </Heading>
              <Text mb={3}>Utilizamos suas informações para:</Text>
              <List spacing={2}>
                <ListItem>• Fornecer e melhorar nossos serviços</ListItem>
                <ListItem>• Processar transações e pagamentos</ListItem>
                <ListItem>
                  • Facilitar a comunicação entre agricultores e consumidores
                </ListItem>
                <ListItem>
                  • Enviar notificações importantes sobre sua conta
                </ListItem>
                <ListItem>
                  • Personalizar sua experiência na plataforma
                </ListItem>
                <ListItem>• Prevenir fraudes e garantir a segurança</ListItem>
                <ListItem>• Cumprir obrigações legais</ListItem>
                <ListItem>
                  • Enviar comunicações de marketing (com seu consentimento)
                </ListItem>
              </List>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                4. Compartilhamento de Informações
              </Heading>
              <Text mb={3}>
                Não vendemos, alugamos ou comercializamos suas informações
                pessoais. Podemos compartilhar suas informações apenas nas
                seguintes situações:
              </Text>
              <List spacing={2}>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Com outros usuários:
                  </Text>{" "}
                  Informações básicas do perfil são visíveis para facilitar
                  transações
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Com prestadores de serviços:
                  </Text>{" "}
                  Parceiros de pagamento, hospedagem e análise de dados
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Por obrigação legal:
                  </Text>{" "}
                  Quando exigido por lei ou processo legal
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Para proteção:
                  </Text>{" "}
                  Para proteger nossos direitos, propriedade ou segurança
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Com seu consentimento:
                  </Text>{" "}
                  Em outras situações, apenas com sua autorização explícita
                </ListItem>
              </List>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                5. Segurança dos Dados
              </Heading>
              <Text mb={3}>
                Implementamos medidas de segurança técnicas e organizacionais
                para proteger suas informações:
              </Text>
              <List spacing={2}>
                <ListItem>
                  • Criptografia de dados em trânsito e em repouso
                </ListItem>
                <ListItem>• Controles de acesso rigorosos</ListItem>
                <ListItem>• Monitoramento contínuo de segurança</ListItem>
                <ListItem>• Backups regulares e seguros</ListItem>
                <ListItem>
                  • Treinamento da equipe em práticas de segurança
                </ListItem>
              </List>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                6. Retenção de Dados
              </Heading>
              <Text>
                Mantemos suas informações pessoais apenas pelo tempo necessário
                para cumprir os propósitos descritos nesta política ou conforme
                exigido por lei. Quando não precisarmos mais de suas
                informações, as excluiremos de forma segura.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                7. Seus Direitos
              </Heading>
              <Text mb={3}>
                Você tem os seguintes direitos relacionados aos seus dados
                pessoais:
              </Text>
              <List spacing={2}>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Acesso:
                  </Text>{" "}
                  Solicitar cópia de suas informações pessoais
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Correção:
                  </Text>{" "}
                  Solicitar correção de dados imprecisos
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Exclusão:
                  </Text>{" "}
                  Solicitar exclusão de seus dados pessoais
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Portabilidade:
                  </Text>{" "}
                  Receber seus dados em formato estruturado
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Oposição:
                  </Text>{" "}
                  Opor-se ao processamento de seus dados
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Restrição:
                  </Text>{" "}
                  Solicitar limitação do processamento
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Revogação:
                  </Text>{" "}
                  Revogar consentimento a qualquer momento
                </ListItem>
              </List>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                8. Cookies e Tecnologias Similares
              </Heading>
              <Text>
                Utilizamos cookies e tecnologias similares para melhorar sua
                experiência, analisar o uso da plataforma e personalizar
                conteúdo. Você pode controlar o uso de cookies através das
                configurações do seu navegador.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                9. Menores de Idade
              </Heading>
              <Text>
                Nossa plataforma não é destinada a menores de 18 anos. Não
                coletamos intencionalmente informações pessoais de menores. Se
                você é pai ou responsável e acredita que seu filho nos forneceu
                informações pessoais, entre em contato conosco.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                10. Transferências Internacionais
              </Heading>
              <Text>
                Suas informações podem ser transferidas e processadas em países
                diferentes do seu país de residência. Garantimos que essas
                transferências sejam feitas de acordo com as leis de proteção de
                dados aplicáveis.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                11. Alterações na Política
              </Heading>
              <Text>
                Podemos atualizar esta Política de Privacidade periodicamente.
                Notificaremos você sobre mudanças significativas através de
                e-mail ou notificação na plataforma. O uso continuado da
                plataforma após as alterações constitui aceitação da nova
                política.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                12. Contato
              </Heading>
              <Text mb={3}>
                Se você tiver dúvidas sobre esta Política de Privacidade ou
                sobre como tratamos seus dados, entre em contato conosco:
              </Text>
              <List spacing={2}>
                <ListItem>• E-mail: privacidade@iacai.com.br</ListItem>
                <ListItem>• Telefone: (XX) XXXX-XXXX</ListItem>
                <ListItem>• Endereço: [Endereço da empresa]</ListItem>
              </List>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" color="#83A11D" mb={3}>
                13. Autoridade de Proteção de Dados
              </Heading>
              <Text>
                Se você não estiver satisfeito com nossa resposta, pode entrar
                em contato com a Autoridade Nacional de Proteção de Dados (ANPD)
                ou outras autoridades competentes.
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

export default AppPrivacidade;
