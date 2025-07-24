const axios = require('axios');
require('dotenv').config();

const aiService = {
  generateTags: async (productData) => {
    try {
      const response = await axios.post(`${process.env.AI_SERVICE_URL}/generate-tags`, productData);
      return response.data.tags;
    } catch (err) {
      console.error('AI Service Error:', err);
      return [];
    }
  },

  getSalesRecommendations: async (salesData) => {
    try {
      const response = await axios.post(`${process.env.AI_SERVICE_URL}/sales-recommendations`, salesData);
      return response.data.recommendations;
    } catch (err) {
      console.error('AI Service Error:', err);
      return [];
    }
  },

  getCustomerProfile: async (customerData) => {
    try {
      const response = await axios.post(`${process.env.AI_SERVICE_URL}/customer-profile`, customerData);
      return response.data.profile;
    } catch (err) {
      console.error('AI Service Error:', err);
      return null;
    }
  }
};

module.exports = aiService;