# Guia de Deploy - Circuito Terê Verde MVP

## 🚀 Opções de Deploy

### 1. Deploy Local (Desenvolvimento)

#### Pré-requisitos
- Node.js 18+
- npm ou pnpm
- Git

#### Passos
1. **Clone o repositório:**
   ```bash
   git clone <repository-url>
   cd circuito-tere-verde-mvp
   ```

2. **Instale todas as dependências:**
   ```bash
   npm run install-all
   ```

3. **Execute o projeto completo:**
   ```bash
   npm start
   ```
   
   Isso iniciará:
   - Backend em `http://localhost:3000`
   - Frontend em `http://localhost:5173`

### 2. Deploy em Produção

#### Backend (Node.js + Express)

**Opção A: Heroku**
1. Crie um app no Heroku
2. Configure as variáveis de ambiente:
   ```
   MONGO_URI=<sua-string-mongodb>
   JWT_SECRET=<seu-jwt-secret>
   PORT=<porta-heroku>
   ```
3. Deploy:
   ```bash
   cd backend
   git init
   heroku git:remote -a <seu-app-heroku>
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

**Opção B: Railway**
1. Conecte seu repositório no Railway
2. Configure as variáveis de ambiente
3. Deploy automático

**Opção C: DigitalOcean App Platform**
1. Conecte seu repositório
2. Configure o build command: `cd backend && npm install`
3. Configure o run command: `cd backend && npm start`

#### Frontend (React)

**Opção A: Vercel**
1. Conecte seu repositório no Vercel
2. Configure:
   - Build Command: `cd frontend && pnpm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `cd frontend && pnpm install`

**Opção B: Netlify**
1. Conecte seu repositório no Netlify
2. Configure:
   - Build command: `cd frontend && pnpm run build`
   - Publish directory: `frontend/dist`

**Opção C: GitHub Pages**
1. Build local:
   ```bash
   cd frontend
   pnpm run build
   ```
2. Deploy para gh-pages

### 3. Deploy com Docker

#### Dockerfile - Backend
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/ .

EXPOSE 3000

CMD ["npm", "start"]
```

#### Dockerfile - Frontend
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  backend:
    build: 
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=${MONGO_URI}
      - JWT_SECRET=${JWT_SECRET}
    
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

### 4. Configurações de Produção

#### Backend
1. **Variáveis de Ambiente:**
   ```
   NODE_ENV=production
   MONGO_URI=<mongodb-atlas-uri>
   JWT_SECRET=<strong-secret-key>
   PORT=3000
   ```

2. **Segurança:**
   - Configure CORS para domínios específicos
   - Use HTTPS
   - Configure rate limiting
   - Adicione helmet.js

#### Frontend
1. **Configuração da API:**
   ```javascript
   const API_BASE_URL = process.env.NODE_ENV === 'production' 
     ? 'https://seu-backend.herokuapp.com/api'
     : 'http://localhost:3000/api';
   ```

2. **Build de Produção:**
   ```bash
   cd frontend
   pnpm run build
   ```

### 5. Monitoramento

#### Logs
- Configure logging com Winston (backend)
- Use serviços como LogRocket (frontend)

#### Métricas
- Configure New Relic ou DataDog
- Monitor performance do MongoDB

#### Alertas
- Configure alertas para erros 5xx
- Monitor uptime com Pingdom

### 6. Backup e Recuperação

#### MongoDB Atlas
- Backups automáticos habilitados
- Point-in-time recovery disponível

#### Código
- Repositório Git como backup
- Tags para releases

### 7. CI/CD

#### GitHub Actions
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm run install-all
    
    - name: Build frontend
      run: cd frontend && pnpm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 8. Checklist de Deploy

#### Pré-Deploy
- [ ] Testes passando
- [ ] Build sem erros
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados acessível
- [ ] CORS configurado

#### Pós-Deploy
- [ ] Aplicação acessível
- [ ] Login funcionando
- [ ] Cadastro funcionando
- [ ] APIs respondendo
- [ ] Logs sem erros críticos

### 9. Troubleshooting

#### Problemas Comuns

**Backend não conecta ao MongoDB:**
- Verificar string de conexão
- Verificar whitelist de IPs no MongoDB Atlas
- Verificar credenciais

**Frontend não consegue acessar API:**
- Verificar CORS
- Verificar URL da API
- Verificar se backend está rodando

**Upload de imagens não funciona:**
- Verificar configuração do Multer
- Verificar permissões de pasta
- Verificar tamanho máximo de arquivo

### 10. Contatos e Suporte

Para suporte técnico:
- Documentação: README.md
- Issues: GitHub Issues
- Email: suporte@circuitotereverde.com

---

**Última atualização:** Dezembro 2024

