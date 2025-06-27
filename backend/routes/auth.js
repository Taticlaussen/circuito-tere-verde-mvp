const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');
const router = express.Router();

// Função para buscar endereço pelo CEP
const buscarEnderecoPorCEP = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }
    return {
      rua: response.data.logradouro,
      bairro: response.data.bairro,
      cidade: response.data.localidade,
      estado: response.data.uf
    };
  } catch (error) {
    throw new Error('Erro ao buscar CEP');
  }
};

// Rota para buscar endereço por CEP
router.get('/cep/:cep', async (req, res) => {
  try {
    const { cep } = req.params;
    const endereco = await buscarEnderecoPorCEP(cep);
    res.json(endereco);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Registro de usuário
router.post('/register', async (req, res) => {
  try {
    const { nomeCompleto, email, cpf, senha, cep, numero, complemento } = req.body;

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ 
      $or: [{ email }, { cpf }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Usuário já existe com este email ou CPF' 
      });
    }

    // Buscar endereço pelo CEP
    const enderecoInfo = await buscarEnderecoPorCEP(cep);

    // Criar novo usuário
    const user = new User({
      nomeCompleto,
      email,
      cpf,
      senha,
      endereco: {
        cep,
        rua: enderecoInfo.rua,
        numero,
        complemento: complemento || '',
        bairro: enderecoInfo.bairro,
        cidade: enderecoInfo.cidade,
        estado: enderecoInfo.estado
      }
    });

    await user.save();

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: user._id,
        nomeCompleto: user.nomeCompleto,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Buscar usuário
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar senha
    const isMatch = await user.comparePassword(senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user._id,
        nomeCompleto: user.nomeCompleto,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

