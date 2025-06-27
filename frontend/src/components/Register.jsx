import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { authService } from '../services/api';
import { ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    cpf: '',
    senha: '',
    cep: '',
    numero: '',
    complemento: ''
  });
  const [enderecoInfo, setEnderecoInfo] = useState({
    rua: '',
    bairro: '',
    cidade: '',
    estado: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCEPChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, cep });

    if (cep.length === 8) {
      setLoadingCEP(true);
      try {
        const endereco = await authService.getCEP(cep);
        setEnderecoInfo(endereco);
      } catch (error) {
        setError('CEP não encontrado');
        setEnderecoInfo({ rua: '', bairro: '', cidade: '', estado: '' });
      } finally {
        setLoadingCEP(false);
      }
    }
  };

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatCEP = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, ''),
        cep: formData.cep.replace(/\D/g, '')
      };

      const response = await authService.register(userData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="header-container">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/login')}
            className="back-button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <div className="logo-container">
            <img src={logo} alt="Circuito Terê Verde" className="logo" />
          </div>
        </div>
        
        <Card className="register-card">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-primary">
              Criar Conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="nomeCompleto"
                  placeholder="Nome Completo"
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  type="text"
                  name="cpf"
                  placeholder="CPF"
                  value={formatCPF(formData.cpf)}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  required
                  className="w-full"
                  maxLength={14}
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  className="w-full"
                  minLength={6}
                />
              </div>
              
              <div>
                <Input
                  type="text"
                  name="cep"
                  placeholder="CEP"
                  value={formatCEP(formData.cep)}
                  onChange={handleCEPChange}
                  required
                  className="w-full"
                  maxLength={9}
                />
                {loadingCEP && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Buscando endereço...
                  </div>
                )}
              </div>
              
              {enderecoInfo.rua && (
                <div className="endereco-info">
                  <div className="text-sm text-muted-foreground">
                    {enderecoInfo.rua}, {enderecoInfo.bairro} - {enderecoInfo.cidade}/{enderecoInfo.estado}
                  </div>
                </div>
              )}
              
              <div>
                <Input
                  type="text"
                  name="numero"
                  placeholder="Número"
                  value={formData.numero}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  type="text"
                  name="complemento"
                  placeholder="Complemento (opcional)"
                  value={formData.complemento}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}
              
              <Button
                type="submit"
                disabled={loading || !enderecoInfo.rua}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? 'Criando conta...' : 'Cadastrar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;

