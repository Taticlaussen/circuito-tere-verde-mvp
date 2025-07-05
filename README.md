🌳 Circuito Terê Verde - MVP Mobile

Um MVP de uma aplicação mobile moderna, desenvolvida para o projeto Circuito Terê Verde. Este MVP visa ser o ponto de partida para conectar entusiastas da natureza às belezas de Teresópolis, oferecendo funcionalidades essenciais para explorar trilhas e cachoeiras, com um design intuitivo e uma base tecnológica robusta.

Visão Geral

O Circuito Terê Verde é uma iniciativa para promover o ecoturismo e a exploração consciente das áreas naturais de Teresópolis. Este MVP mobile é a primeira etapa para digitalizar essa experiência, proporcionando aos usuários acesso fácil a informações sobre trilhas, cachoeiras e, futuramente, eventos e biodiversidade local.

Funcionalidades Implementadas (MVP)

Este MVP inclui as seguintes funcionalidades essenciais:

- Autenticação de Usuários:
    -   Telas de **Login** e **Cadastro** completas.
    -   Autenticação segura via **JWT (JSON Web Tokens)**.
    -   Criptografia de senhas com **Bcrypt**.
-   Cadastro Inteligente:
    -   Auto preenchimento de endereço via **API ViaCEP** no cadastro de usuário.
-  Navegação Principal:
    -   **Tela Principal** intuitiva com menu de acesso rápido às seções: Trilhas, Cachoeiras, Eventos e Biodiversidade.
-   Gestão de Trilhas:
    -   **Listagem de Trilhas:** Visualização de trilhas existentes com fotos e nomes.
    -   **Filtro por Dificuldade:** Opção para filtrar trilhas por nível de dificuldade (Fácil, Moderado, Difícil, Muito Difícil).
    -   **Cadastro de Nova Trilha:** Formulário completo para inclusão de novas trilhas (Nome, Foto, Endereço, Link Google Maps, Nível de Dificuldade, Tempo Estimado, Observações, Link para Agendamento).
    -   **Visualização de Detalhes da Trilha:** Tela dedicada com todas as informações de uma trilha específica.
-   Design e Experiência do Usuário:
    -   Interface **moderna e responsiva**, otimizada para dispositivos móveis (mobile-first).
    -   Paleta de cores em tons de verde, remetendo à natureza e alinhada à identidade visual do projeto.
    -   Integração do **logo do Circuito Terê Verde** em todas as telas.

Funcionalidades Futuras (Em Desenvolvimento)

As seguintes seções e funcionalidades estão planejadas para futuras iterações:

-   **Seção Cachoeiras:** Estrutura base criada, aguardando implementação completa de listagem, detalhes e cadastro.
-   **Upload de Imagens:** Backend preparado para upload, mas a funcionalidade no frontend ainda está em desenvolvimento.
-   **Seções Eventos e Biodiversidade:** Marcadas como "Em desenvolvimento", com telas placeholder.
-   **Gerenciamento (CRUD) Completo:** Implementação das operações de Edição (Update) e Exclusão (Delete) para Trilhas e Cachoeiras no frontend.

Tecnologias Utilizadas

### Backend

-   **Node.js** com **Express.js**: Framework para construção da API RESTful.
-   **MongoDB Atlas**: Banco de dados NoSQL baseado em documentos, hospedado na nuvem.
-   **JWT (JSON Web Tokens)**: Para autenticação e autorização de usuários.
-   **Bcrypt.js**: Para hashing seguro de senhas.
-   **Multer**: Middleware para tratamento de upload de arquivos (fotos).
-   **Axios**: Cliente HTTP para integração com APIs externas (ViaCEP).

### Frontend

-   **React**: Biblioteca JavaScript para construção da interface de usuário.
-   **Vite**: Ferramenta de build rápida para desenvolvimento frontend.
-   **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
-   **shadcn/ui**: Componentes de UI acessíveis e personalizáveis construídos com Radix UI e Tailwind CSS.
-   **React Router DOM**: Para gerenciamento de rotas na aplicação single-page.
-   **Axios**: Cliente HTTP para comunicação com a API do backend.
-   **Lucide React**: Biblioteca de ícones.

Instalação e Execução Local

Para configurar e executar o projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

-   [Node.js](https://nodejs.org/en/ ) (versão 18 ou superior)
-   [npm](https://www.npmjs.com/ ) (gerenciador de pacotes do Node.js, geralmente vem com o Node.js)
-   [pnpm](https://pnpm.io/installation ) (gerenciador de pacotes alternativo, recomendado para o frontend)
-   Conexão com a internet (necessária para o MongoDB Atlas e ViaCEP)

Passos para Configuração

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/TatiClaussen/circuito-tere-verde-mvp.git
    cd circuito-tere-verde-mvp
    ```
  2.  **Instale as Dependências:**
    Na pasta raiz do projeto, execute o script que instalará as dependências tanto do backend quanto do frontend:
    ```bash
    npm run install-all
    ```

3.  **Configuração do Backend (`.env`):**
    O arquivo `.env` para o backend já está configurado com as variáveis de ambiente necessárias. Você pode encontrá-lo em `backend/.env`:
    ```
    MONGO_URI=mongodb+srv://taticcorreab:GU58gov0JBWH4RxQ@cluster0.gzkbj1g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET=circuito_tere_verde_jwt_secret_key_2024
    PORT=3000
    ```

4.  **Execute a Aplicação:**
    Na pasta raiz do projeto, execute o comando para iniciar ambos os servidores (backend e frontend) simultaneamente:
    ```bash
    npm start
    ```
    -   O **Backend** estará disponível em: `http://localhost:3000`
    -   O **Frontend** estará disponível em: `http://localhost:5173`

Como Usar o MVP

Após iniciar a aplicação, acesse `http://localhost:5173` no seu navegador:

1.  **Cadastro de Usuário:**
    -   Na tela inicial, clique em "Criar nova conta".
    -   Preencha os campos. Ao inserir o CEP, o endereço será preenchido automaticamente.
    -   Clique em "Cadastrar".
2.  **Login:**
    -   Na tela inicial, insira seu e-mail e senha cadastrados.
    -   Clique em "Entrar".
3.  **Navegação:**
    -   Explore a seção **Trilhas** para visualizar a lista, filtrar por dificuldade e adicionar novas trilhas.
    -   As seções **Cachoeiras**, **Eventos** e **Biodiversidade** estão em desenvolvimento.

Design e Estilo

O design do MVP segue uma abordagem moderna e limpa, com foco na usabilidade mobile. A paleta de cores é dominada por tons de verde complementada por elementos de glassmorphism e gradientes suaves para uma experiência visual agradável e que remete à natureza.

Estrutura do Banco de Dados (MongoDB)

O banco de dados MongoDB Atlas utiliza as seguintes coleções:

### `users`
Representa os usuários da aplicação.
```javascript
{
  _id: ObjectId,           // ID único gerado pelo MongoDB
  nomeCompleto: String,    // Nome completo do usuário
  email: String (único),   // E-mail do usuário (único para login)
  cpf: String (único),     // CPF do usuário (único)
  senha: String (hash),    // Senha do usuário (hash com bcrypt)
  endereco: {
    cep: String,
    rua: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String
  },
  createdAt: Date,         // Data de criação do registro
  updatedAt: Date          // Data da última atualização do registro
}
