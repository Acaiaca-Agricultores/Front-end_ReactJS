# Tela de Cadastro de Produtos

## Descrição
Esta tela permite aos usuários cadastrar novos produtos no sistema, seguindo as especificações do endpoint `registerProduct`.

## Funcionalidades

### Campos do Formulário
- **Nome do Produto**: Campo obrigatório com mínimo de 3 caracteres
- **Categoria**: Seleção obrigatória entre as categorias disponíveis
- **Descrição**: Campo obrigatório com mínimo de 10 caracteres
- **Quantidade**: Número obrigatório maior que zero
- **Preço**: Número obrigatório maior que zero
- **Imagem**: Upload obrigatório de imagem do produto

### Categorias Disponíveis
- Frutas
- Verduras
- Legumes
- Tubérculos
- Grãos
- Oleaginosas
- Temperos
- Chás
- Mel
- Ovos
- Laticínios

### Validações
- Todos os campos são obrigatórios
- Nome: mínimo 3 caracteres
- Descrição: mínimo 10 caracteres
- Quantidade e preço: números positivos
- Imagem: arquivo de imagem obrigatório
- Validação em tempo real com feedback visual

### Recursos Especiais
- **Upload de Imagem**: Drag & drop ou clique para selecionar
- **Reconhecimento de Voz**: Botão de gravação em cada campo
- **Responsivo**: Interface adaptável para mobile e desktop
- **Feedback Visual**: Mensagens de erro e sucesso
- **Loading States**: Indicadores de carregamento

## Como Acessar
1. Faça login no sistema
2. No menu principal, clique em "Cadastrar Produto"
3. Ou navegue diretamente para `/produto/cadastrar`

## Endpoint Utilizado
```
POST /product
```

### Parâmetros Enviados
- `name`: Nome do produto
- `description`: Descrição do produto
- `category`: Categoria selecionada
- `quantity`: Quantidade (número)
- `price`: Preço (número)
- `productImage`: Arquivo de imagem (FormData)

### Headers
- `Authorization`: Bearer token (se autenticado)

## Estrutura de Arquivos
```
src/pages/produto/
├── AppProduto.jsx          # Componente principal
└── ProductDetailCard.jsx   # Card de detalhes do produto

src/utils/
└── routers.jsx            # Configuração de rotas

src/components/header/
└── AppMenu.jsx            # Menu com link para cadastro
```

## Dependências
- React Router DOM
- Chakra UI
- React Icons
- Hook de reconhecimento de voz personalizado

## Variáveis de Ambiente
Certifique-se de que a variável `VITE_API_URL` está configurada no arquivo `.env`:
```
VITE_API_URL=http://localhost:3000/api
```

## Tratamento de Erros
A tela trata os seguintes tipos de erro do endpoint:
- Validação de campos obrigatórios
- Validação de comprimento mínimo
- Validação de tipos numéricos
- Erros de upload de imagem
- Erros de autenticação
- Erros de conexão

## Responsividade
- **Mobile**: Layout em coluna única
- **Tablet**: Layout híbrido
- **Desktop**: Layout em duas colunas (imagem + formulário)

## Acessibilidade
- Labels semânticos para todos os campos
- Mensagens de erro claras
- Navegação por teclado
- Suporte a leitores de tela
- Contraste adequado 