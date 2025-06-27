const express = require('express');
const multer = require('multer');
const path = require('path');
const Trail = require('../models/Trail');
const auth = require('../middleware/auth');
const router = express.Router();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/trails/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'trail-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'), false);
    }
  }
});

// Criar nova trilha
router.post('/', auth, upload.single('foto'), async (req, res) => {
  try {
    const {
      nome,
      enderecoCompleto,
      linkGoogleMaps,
      nivelDificuldade,
      tempoEstimado,
      observacoes,
      linkAgendamento
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Foto é obrigatória' });
    }

    const trail = new Trail({
      nome,
      foto: req.file.path,
      endereco: {
        enderecoCompleto
      },
      linkGoogleMaps,
      nivelDificuldade,
      tempoEstimado: parseFloat(tempoEstimado),
      observacoes: observacoes || '',
      linkAgendamento: linkAgendamento || '',
      criadoPor: req.user._id
    });

    await trail.save();
    await trail.populate('criadoPor', 'nomeCompleto email');

    res.status(201).json({
      message: 'Trilha criada com sucesso',
      trail
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Listar todas as trilhas
router.get('/', async (req, res) => {
  try {
    const { nivelDificuldade } = req.query;
    
    let filter = {};
    if (nivelDificuldade) {
      filter.nivelDificuldade = nivelDificuldade;
    }

    const trails = await Trail.find(filter)
      .populate('criadoPor', 'nomeCompleto email')
      .sort({ createdAt: -1 });

    res.json(trails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Buscar trilha por ID
router.get('/:id', async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id)
      .populate('criadoPor', 'nomeCompleto email');
    
    if (!trail) {
      return res.status(404).json({ message: 'Trilha não encontrada' });
    }

    res.json(trail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Atualizar trilha
router.put('/:id', auth, upload.single('foto'), async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id);
    
    if (!trail) {
      return res.status(404).json({ message: 'Trilha não encontrada' });
    }

    // Verificar se o usuário é o criador da trilha
    if (trail.criadoPor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.foto = req.file.path;
    }

    const updatedTrail = await Trail.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('criadoPor', 'nomeCompleto email');

    res.json({
      message: 'Trilha atualizada com sucesso',
      trail: updatedTrail
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar trilha
router.delete('/:id', auth, async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id);
    
    if (!trail) {
      return res.status(404).json({ message: 'Trilha não encontrada' });
    }

    // Verificar se o usuário é o criador da trilha
    if (trail.criadoPor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    await Trail.findByIdAndDelete(req.params.id);

    res.json({ message: 'Trilha deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

