import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Mountain, Waves, Calendar, Leaf, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    {
      title: 'Trilhas',
      icon: Mountain,
      description: 'Explore trilhas incríveis',
      path: '/trails',
      available: true
    },
    {
      title: 'Cachoeiras',
      icon: Waves,
      description: 'Descubra cachoeiras deslumbrantes',
      path: '/waterfalls',
      available: true
    },
    {
      title: 'Eventos',
      icon: Calendar,
      description: 'Seção em desenvolvimento',
      path: '/events',
      available: false
    },
    {
      title: 'Biodiversidade',
      icon: Leaf,
      description: 'Seção em desenvolvimento',
      path: '/biodiversity',
      available: false
    }
  ];

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="header">
          <div className="header-left">
            <img src={logo} alt="Circuito Terê Verde" className="header-logo" />
            <div>
              <h1 className="app-title">Circuito Terê Verde</h1>
              <p className="welcome-text">Bem-vindo, {user.nomeCompleto}!</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="logout-button"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className={`menu-card ${!item.available ? 'disabled' : ''}`}
              onClick={() => item.available && navigate(item.path)}
            >
              <CardContent className="menu-card-content">
                <div className="menu-icon">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="menu-title">{item.title}</h3>
                <p className="menu-description">{item.description}</p>
                {!item.available && (
                  <div className="coming-soon">Em breve!</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

