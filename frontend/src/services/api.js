import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  login: async (email, senha) => {
    const response = await api.post('/auth/login', { email, senha });
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  getCEP: async (cep) => {
    const response = await api.get(`/auth/cep/${cep}`);
    return response.data;
  }
};

// Serviços de trilhas
export const trailService = {
  getAll: async (nivelDificuldade = '') => {
    const params = nivelDificuldade ? { nivelDificuldade } : {};
    const response = await api.get('/trails', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/trails/${id}`);
    return response.data;
  },
  
  create: async (formData) => {
    const response = await api.post('/trails', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  update: async (id, formData) => {
    const response = await api.put(`/trails/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/trails/${id}`);
    return response.data;
  }
};

// Serviços de cachoeiras
export const waterfallService = {
  getAll: async () => {
    const response = await api.get('/waterfalls');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/waterfalls/${id}`);
    return response.data;
  },
  
  create: async (formData) => {
    const response = await api.post('/waterfalls', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  update: async (id, formData) => {
    const response = await api.put(`/waterfalls/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/waterfalls/${id}`);
    return response.data;
  }
};

export default api;

