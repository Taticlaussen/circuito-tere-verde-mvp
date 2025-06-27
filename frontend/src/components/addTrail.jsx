import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Upload, MapPin, Clock, Info } from 'lucide-react';
import { trailService } from '../services/api';
import './addTrail.css';

const AddTrail = () => {
  const [formData, setFormData] = useState({
    nome: '',
    foto: null,
    enderecoCompleto: '',
    linkGoogleMaps: '',
    nivelDificuldade: '',
    tempoEstimado: '',
    observacoes: '',
    linkAgendamento: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      foto: e.target.files[0]
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      nivelDificuldade: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      await trailService.create(data);
      navigate('/trails');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao adicionar trilha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-trail-container">
      <div className="add-trail-content">
        <div className="header">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/trails')}
            className="back-button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="page-title">Nova Trilha</h1>
        </div>

        <Card className="add-trail-card">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-primary">
              Adicionar Nova Trilha
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="nome"
                  placeholder="Nome da Trilha"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="foto" className="file-input-label">
                  <Upload className="w-5 h-5 mr-2" />
                  {formData.foto ? formData.foto.name : 'Upload de uma Foto'}
                </label>
                <input
                  id="foto"
                  type="file"
                  name="foto"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="enderecoCompleto"
                  placeholder="Endereço Completo"
                  value={formData.enderecoCompleto}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Input
                  type="url"
                  name="linkGoogleMaps"
                  placeholder="Link do Google Maps (URL)"
                  value={formData.linkGoogleMaps}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Select value={formData.nivelDificuldade} onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Nível de Dificuldade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fácil">Fácil</SelectItem>
                    <SelectItem value="Moderado">Moderado</SelectItem>
                    <SelectItem value="Difícil">Difícil</SelectItem>
                    <SelectItem value="Muito Difícil">Muito Difícil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input
                  type="number"
                  name="tempoEstimado"
                  placeholder="Tempo Estimado (horas)"
                  value={formData.tempoEstimado}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.5"
                />
              </div>

              <div>
                <Textarea
                  name="observacoes"
                  placeholder="Observações (opcional)"
                  value={formData.observacoes}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <div>
                <Input
                  type="url"
                  name="linkAgendamento"
                  placeholder="Link para Agendamento (opcional)"
                  value={formData.linkAgendamento}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? 'Adicionando...' : 'Adicionar Trilha'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddTrail;
