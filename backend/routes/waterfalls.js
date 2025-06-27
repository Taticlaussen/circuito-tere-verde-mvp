const express = require('express');
const multer = require('multer');
const path = require('path');
const Waterfall = require('../models/Waterfall');
const auth = require('../middleware/auth');
const router = express.Router();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/waterfalls/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'waterfall-' + uniqueSuffix + path.extname(file.originalname));
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

// Criar nova cachoeira
router.post('/', auth, upload.single('foto'), async (req, res) => {
  try {
    const {
      nome,
      enderecoCompleto,
      linkGoogleMaps,
      observacoes,
      linkAgendamento
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Foto é obrigatória' });
    }

    const waterfall = new Waterfall({
      nome,
      foto: req.file.path,
      endereco: {
        enderecoCompleto
      },
      linkGoogleMaps,
      observacoes: observacoes || '',
      linkAgendamento: linkAgendamento || '',
      criadoPor: req.user._id
    });

    await waterfall.save();
    await waterfall.populate('criadoPor', 'nomeCompleto email');

    res.status(201).json({
      message: 'Cachoeira criada com sucesso',
      waterfall
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Listar todas as cachoeiras
router.get('/', async (req, res) => {
  try {
    const waterfalls = await Waterfall.find()
      .populate('criadoPor', 'nomeCompleto email')
      .sort({ createdAt: -1 });

    res.json(waterfalls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Buscar cachoeira por ID
router.get('/:id', async (req, res) => {
  try {
    const waterfall = await Waterfall.findById(req.params.id)
      .populate('criadoPor', 'nomeCompleto email');
    
    if (!waterfall) {
      return res.status(404).json({ message: 'Cachoeira não encontrada' });
    }

    res.json(waterfall);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Atualizar cachoeira
router.put('/:id', auth, upload.single('foto'), async (req, res) => {
  try {
    const waterfall = await Waterfall.findById(req.params.id);
    
    if (!waterfall) {
      return res.status(404).json({ message: 'Cachoeira não encontrada' });
    }

    // Verificar se o usuário é o criador da cachoeira
    if (waterfall.criadoPor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.foto = req.file.path;
    }

    const updatedWaterfall = await Waterfall.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('criadoPor', 'nomeCompleto email');

    res.json({
      message: 'Cachoeira atualizada com sucesso',
      waterfall: updatedWaterfall
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar cachoeira
router.delete('/:id', auth, async (req, res) => {
  try {
    const waterfall = await Waterfall.findById(req.params.id);
    
    if (!waterfall) {
      return res.status(404).json({ message: 'Cachoeira não encontrada' });
    }

    // Verificar se o usuário é o criador da cachoeira
    if (waterfall.criadoPor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    await Waterfall.findByIdAndDelete(req.params.id);

    res.json({ message: 'Cachoeira deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

