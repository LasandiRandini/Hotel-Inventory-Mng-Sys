// services/itemsService.js
import api from './api';

const itemsService = {
  getItemsByCategory: async (category) => {
    const response = await api.get(`/items/category/${category}`);
    return response.data;
  },

  createItem: async (itemData) => {
    const response = await api.post('/items', itemData);
    return response.data;
  },

  updateItem: async (id, itemData) => {
    const response = await api.put(`/items/${id}`, itemData);
    return response.data;
  },

  getAllCategories: async () => {
    const response = await api.get('/items/categories');
    return response.data;
  }
};

export default itemsService;