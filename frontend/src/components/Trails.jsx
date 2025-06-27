import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Plus, Mountain, Clock, MapPin } from 'lucide-react';
import { trailService } from '../services/api';
import './Trails.css';

const Trails = () => {
  const [trails, setTrails] = useState([]);
  const [filteredTrails, setFilteredTrails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // Valor inicial para o filtro
  const navigate = useNavigate();

  const difficultyColors = {
    'Fácil': 'bg-green-500',
    'Moderado': 'bg-yellow-500',
    'Difícil': 'bg-orange-500',
    'Muito Difícil': 'bg-red-500'
  };

  useEffect(() => {
    loadTrails();
  }, []);

  useEffect(() => {
    if (filter && filter !== 'all') {
      setFilteredTrails(trails.filter(trail => trail.nivelDificuldade === filter));
    } else {
      setFilteredTrails(trails);
    }
  }, [trails, filter]);

  const loadTrails = async () => {
    try {
      const data = await trailService.getAll();
      setTrails(data);
    } catch (error) {
      console.error('Erro ao carregar trilhas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTrailClick = (trail) => {
    navigate(`/trail-details/${trail._id}`);
  };

  if (loading) {
    return (
      <div className="trails-container">
        <div className="loading">Carregando trilhas...</div>
      </div>
    );
  }

  return (
    <div className="trails-container">
      <div className="trails-content">
        <div className="header">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className="back-button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <h1 className="page-title">
            <Mountain className="w-6 h-6 mr-2" />
            Trilhas
          </h1>
          
          <Button
            onClick={() => navigate('/add-trail')}
            className="add-button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Trilha
          </Button>
        </div>

        <div className="filter-section">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="filter-select">
              <SelectValue placeholder="Filtrar por dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as dificuldades</SelectItem>
              <SelectItem value="Fácil">Fácil</SelectItem>
              <SelectItem value="Moderado">Moderado</SelectItem>
              <SelectItem value="Difícil">Difícil</SelectItem>
              <SelectItem value="Muito Difícil">Muito Difícil</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="trails-grid">
          {filteredTrails.length === 0 ? (
            <div className="empty-state">
              <Mountain className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                Nenhuma trilha encontrada
              </h3>
              <p className="text-muted-foreground mb-4">
                {filter ? 'Tente alterar o filtro ou' : ''} Seja o primeiro a adicionar uma trilha!
              </p>
              <Button onClick={() => navigate('/add-trail')}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Trilha
              </Button>
            </div>
          ) : (
            filteredTrails.map((trail) => (
              <Card
                key={trail._id}
                className="trail-card"
                onClick={() => handleTrailClick(trail)}
              >
                <div className="trail-image">
                  <img
                    src={`http://localhost:3000/${trail.foto}`}
                    alt={trail.nome}
                    onError={(e ) => {
                      e.target.src = '/placeholder-trail.jpg';
                    }}
                  />
                  <div className={`difficulty-badge ${difficultyColors[trail.nivelDificuldade]}`}>
                    {trail.nivelDificuldade}
                  </div>
                </div>
                
                <CardHeader className="trail-header">
                  <CardTitle className="trail-title">{trail.nome}</CardTitle>
                </CardHeader>
                
                <CardContent className="trail-content">
                  <div className="trail-info">
                    <div className="info-item">
                      <Clock className="w-4 h-4" />
                      <span>{trail.tempoEstimado}h</span>
                    </div>
                    <div className="info-item">
                      <MapPin className="w-4 h-4" />
                      <span className="location">{trail.endereco.enderecoCompleto}</span>
                    </div>
                  </div>
                  
                  {trail.observacoes && (
                    <p className="trail-description">
                      {trail.observacoes.length > 100
                        ? `${trail.observacoes.substring(0, 100)}...`
                        : trail.observacoes
                      }
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Trails;

