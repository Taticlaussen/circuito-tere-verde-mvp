import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Mountain, Clock, MapPin, Info, CalendarDays, Link } from 'lucide-react';
import { trailService } from '../services/api';
import './TrailDetails.css';

const TrailDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trail, setTrail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailDetails = async () => {
      try {
        const data = await trailService.getById(id);
        setTrail(data);
      } catch (err) {
        setError("Erro ao carregar detalhes da trilha.");
        console.error("Erro ao buscar detalhes da trilha:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="trail-details-container">
        <div className="loading">Carregando detalhes da trilha...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="trail-details-container">
        <div className="error-message">{error}</div>
        <Button onClick={() => navigate("/trails")}>Voltar para Trilhas</Button>
      </div>
    );
  }

  if (!trail) {
    return (
      <div className="trail-details-container">
        <div className="empty-state">Trilha não encontrada.</div>
        <Button onClick={() => navigate("/trails")}>Voltar para Trilhas</Button>
      </div>
    );
  }

  const difficultyColors = {
    'Fácil': 'bg-green-500',
    'Moderado': 'bg-yellow-500',
    'Difícil': 'bg-orange-500',
    'Muito Difícil': 'bg-red-500'
  };

  return (
    <div className="trail-details-container">
      <div className="trail-details-content">
        <div className="header">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/trails")}
            className="back-button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="page-title">Detalhes da Trilha</h1>
        </div>

        <Card className="trail-details-card">
          <div className="trail-image-details">
            <img
              src={`http://localhost:3000/${trail.foto}`}
              alt={trail.nome}
              onError={(e ) => {
                e.target.src = 
                '/placeholder-trail.jpg';
              }}
            />
            <div className={`difficulty-badge-details ${difficultyColors[trail.nivelDificuldade]}`}>
              {trail.nivelDificuldade}
            </div>
          </div>
          
          <CardHeader className="trail-header-details">
            <CardTitle className="trail-title-details">{trail.nome}</CardTitle>
          </CardHeader>
          
          <CardContent className="trail-content-details">
            <div className="info-item-details">
              <MapPin className="w-5 h-5" />
              <span>{trail.endereco.enderecoCompleto}</span>
            </div>
            <div className="info-item-details">
              <Clock className="w-5 h-5" />
              <span>{trail.tempoEstimado} horas</span>
            </div>
            
            {trail.linkGoogleMaps && (
              <div className="info-item-details">
                <Link className="w-5 h-5" />
                <a href={trail.linkGoogleMaps} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Ver no Google Maps
                </a>
              </div>
            )}

            {trail.observacoes && (
              <div className="info-item-details">
                <Info className="w-5 h-5" />
                <p>{trail.observacoes}</p>
              </div>
            )}

            {trail.linkAgendamento && (
              <div className="info-item-details">
                <CalendarDays className="w-5 h-5" />
                <a href={trail.linkAgendamento} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Agendar Visita
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrailDetails;
