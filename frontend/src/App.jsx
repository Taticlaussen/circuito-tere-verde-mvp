import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Trails from './components/Trails';
import AddTrail from './components/addTrail.jsx';
import TrailDetails from './components/TrailDetails.jsx'; // Nova importação
import './App.css';

// Componente para proteger rotas que precisam de autenticação
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Componente para rotas públicas (redireciona se já estiver logado)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return !token ? children : <Navigate to="/home" />;
};

// Componentes temporários para seções em desenvolvimento
const ComingSoon = ({ title }) => (
  <div className="coming-soon-page">
    <div className="coming-soon-content">
      <h1>{title}</h1>
      <p>Seção em desenvolvimento. Em breve!</p>
      <button onClick={() => window.history.back()}>Voltar</button>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rota raiz redireciona para login ou home */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Rotas públicas */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          
          {/* Rotas protegidas */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/trails" element={
            <ProtectedRoute>
              <Trails />
            </ProtectedRoute>
          } />
          <Route path="/waterfalls" element={
            <ProtectedRoute>
              <ComingSoon title="Cachoeiras" />
            </ProtectedRoute>
          } />
          <Route path="/events" element={
            <ProtectedRoute>
              <ComingSoon title="Eventos" />
            </ProtectedRoute>
          } />
          <Route path="/biodiversity" element={
            <ProtectedRoute>
              <ComingSoon title="Biodiversidade" />
            </ProtectedRoute>
          } />
          
          <Route path="/add-trail" element={
            <ProtectedRoute>
              <AddTrail />
            </ProtectedRoute>
          } />
          <Route path="/trail-details/:id" element={ // Nova rota para detalhes da trilha
            <ProtectedRoute>
              <TrailDetails />
            </ProtectedRoute>
          } />
          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
