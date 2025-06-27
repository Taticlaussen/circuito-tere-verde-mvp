# Circuito Terê Verde - MVP Mobile

Um MVP mobile moderno para o projeto Circuito Terê Verde, desenvolvido com backend Node.js + Express + MongoDB e frontend React responsivo em tons de verde.

## 🌟 Funcionalidades

### ✅ Implementadas
- **Autenticação**: Login e cadastro de usuários com JWT
- **Auto preenchimento de endereço**: Integração com API ViaCEP
- **Tela Principal**: Menu com 4 seções (Trilhas, Cachoeiras, Eventos, Biodiversidade)
- **Seção Trilhas**: Listagem, filtros por dificuldade, e estrutura para CRUD
- **Design Responsivo**: Interface mobile-first com paleta verde
- **Logo Integrado**: Logo do Circuito Terê Verde em todas as telas

### 🚧 Em Desenvolvimento
- **Seção Cachoeiras**: Estrutura criada, aguardando implementação completa
- **Upload de Imagens**: Backend preparado, frontend em desenvolvimento
- **Seções Eventos e Biodiversidade**: Marcadas como "Em desenvolvimento"

## 🛠️ Tecnologias

### Backend
- **Node.js** + **Express.js**
- **MongoDB Atlas** (banco de dados na nuvem)
- **JWT** (autenticação)
- **Bcrypt** (hash de senhas)
- **Multer** (upload de arquivos)
- **Axios** (integração com APIs externas)

### Frontend
- **React** + **Vite**
- **Tailwind CSS** + **shadcn/ui**
- **React Router** (navegação)
- **Axios** (comunicação com API)
- **Lucide Icons** (ícones)

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou pnpm
- Conexão com internet (para MongoDB Atlas)

### Backend

1. **Navegue para a pasta do backend:**
   ```bash
   cd backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   O arquivo `.env` já está configurado com:
   ```
   MONGO_URI=mongodb+srv://taticcorreab:GU58gov0JBWH4RxQ@cluster0.gzkbj1g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=circuito_tere_verde_jwt_secret_key_2024
   PORT=3000
   ```

4. **Execute o servidor:**
   ```bash
   npm start
   # ou para desenvolvimento:
   npm run dev
   ```

   O backend estará disponível em: `http://localhost:3000`

### Frontend

1. **Navegue para a pasta do frontend:**
   ```bash
   cd frontend
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   # ou: npm install
   ```

3. **Execute o servidor de desenvolvimento:**
   ```bash
   pnpm run dev --host
   # ou: npm run dev -- --host
   ```

   O frontend estará disponível em: `http://localhost:5173`

## 📱 Como Usar

### 1. Cadastro de Usuário
- Acesse a aplicação
- Clique em "Criar nova conta"
- Preencha todos os campos obrigatórios
- O endereço será preenchido automaticamente ao inserir o CEP
- Clique em "Cadastrar"

### 2. Login
- Na tela inicial, insira email e senha
- Clique em "Entrar"

### 3. Navegação
- **Trilhas**: Visualize e filtre trilhas por dificuldade
- **Cachoeiras**: Em desenvolvimento
- **Eventos**: Em desenvolvimento  
- **Biodiversidade**: Em desenvolvimento

## 🎨 Design

- **Paleta de Cores**: Tons de verde (#4CAF50, #66BB6A, #81C784)
- **Logo**: Integrado em todas as telas
- **Responsivo**: Otimizado para dispositivos móveis
- **Moderno**: Interface limpa com glassmorphism e gradientes

## 📊 Estrutura do Banco de Dados

### Coleção: users
```javascript
{
  nomeCompleto: String,
  email: String (único),
  cpf: String (único),
  senha: String (hash),
  endereco: {
    cep: String,
    rua: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String
  },
  timestamps: true
}
```

### Coleção: trails
```javascript
{
  nome: String,
  foto: String,
  endereco: {
    enderecoCompleto: String
  },
  linkGoogleMaps: String,
  nivelDificuldade: String, // Fácil, Moderado, Difícil, Muito Difícil
  tempoEstimado: Number, // em horas
  observacoes: String,
  linkAgendamento: String,
  criadoPor: ObjectId (ref: User),
  timestamps: true
}
```

### Coleção: waterfalls
```javascript
{
  nome: String,
  foto: String,
  endereco: {
    enderecoCompleto: String
  },
  linkGoogleMaps: String,
  observacoes: String,
  linkAgendamento: String,
  criadoPor: ObjectId (ref: User),
  timestamps: true
}
```

## 🔗 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/cep/:cep` - Consulta CEP

### Trilhas
- `GET /api/trails` - Listar trilhas (com filtro opcional)
- `GET /api/trails/:id` - Buscar trilha por ID
- `POST /api/trails` - Criar trilha (requer autenticação)
- `PUT /api/trails/:id` - Atualizar trilha (requer autenticação)
- `DELETE /api/trails/:id` - Deletar trilha (requer autenticação)

### Cachoeiras
- `GET /api/waterfalls` - Listar cachoeiras
- `GET /api/waterfalls/:id` - Buscar cachoeira por ID
- `POST /api/waterfalls` - Criar cachoeira (requer autenticação)
- `PUT /api/waterfalls/:id` - Atualizar cachoeira (requer autenticação)
- `DELETE /api/waterfalls/:id` - Deletar cachoeira (requer autenticação)

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- Autenticação via JWT
- Validação de dados no backend
- CORS configurado para desenvolvimento

## 📝 Próximos Passos

1. **Implementar seção completa de Cachoeiras**
2. **Adicionar upload de imagens no frontend**
3. **Criar telas de detalhes para trilhas e cachoeiras**
4. **Implementar seções de Eventos e Biodiversidade**
5. **Adicionar testes automatizados**
6. **Deploy em produção**

## 🤝 Contribuição

Este é um MVP desenvolvido para demonstração. Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido como MVP para o Circuito Terê Verde.

---

**Desenvolvido com 💚 para o Circuito Terê Verde**

