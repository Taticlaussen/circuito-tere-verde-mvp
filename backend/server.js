const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const trailRoutes = require('./routes/trails');
const waterfallRoutes = require('./routes/waterfalls');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Criar diretórios de upload se não existirem
const uploadDirs = ['uploads/trails', 'uploads/waterfalls'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado ao MongoDB Atlas');
})
.catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/trails', trailRoutes);
app.use('/api/waterfalls', waterfallRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Circuito Terê Verde funcionando!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      trails: '/api/trails',
      waterfalls: '/api/waterfalls'
    }
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Arquivo muito grande. Máximo 5MB.' });
    }
  }
  
  console.error(error);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});

