// services/stockInService.js
import api from './api';

const stockInService = {
  getStockInEntries: async (filters = {}) => {
    const response = await api.get('/stock-in', { params: filters });
    return response.data;
  },

  createStockInEntry: async (entryData) => {
    const response = await api.post('/stock-in', entryData);
    return response.data;
  },

  updateStockInEntry: async (id, entryData) => {
    const response = await api.put(`/stock-in/${id}`, entryData);
    return response.data;
  },

  deleteStockInEntry: async (id) => {
    const response = await api.delete(`/stock-in/${id}`);
    return response.data;
  },

  getStockInStats: async (dateRange) => {
    const response = await api.get('/stock-in/stats', { params: dateRange });
    return response.data;
  }
};

export default stockInService;