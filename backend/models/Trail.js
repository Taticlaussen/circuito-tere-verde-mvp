const mongoose = require('mongoose');

const trailSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  foto: {
    type: String,
    required: true
  },
  endereco: {
    cep: String,
    rua: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    enderecoCompleto: {
      type: String,
      required: true
    }
  },
  linkGoogleMaps: {
    type: String,
    required: true
  },
  nivelDificuldade: {
    type: String,
    required: true,
    enum: ['Fácil', 'Moderado', 'Difícil', 'Muito Difícil']
  },
  tempoEstimado: {
    type: Number,
    required: true,
    min: 0
  },
  observacoes: {
    type: String,
    default: ''
  },
  linkAgendamento: {
    type: String,
    default: ''
  },
  criadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Trail', trailSchema);

