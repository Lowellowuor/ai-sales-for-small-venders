const axios = require('axios');
require('dotenv').config();

const callAIService = async (endpoint, data) => {
  try {
    const response = await axios.post(`${process.env.AI_SERVICE_URL}/${endpoint}`, data, {
      headers: {
        'API-Key': process.env.AI_SERVICE_KEY
      }
    });
    return response.data;
  } catch (err) {
    console.error(`AI Service Error (${endpoint}):`, err.message);
    throw new Error(`AI service request failed: ${err.message}`);
  }
};

const aiService = {
  generateTags: async (productData) => {
    const response = await callAIService('generate-tags', productData);
    return response.tags || [];
  },

  getSalesRecommendations: async (salesData) => {
    const response = await callAIService('sales-recommendations', salesData);
    return response.recommendations || [];
  },

  getCustomerProfile: async (customerData) => {
    const response = await callAIService('customer-profile', customerData);
    return response.profile || {};
  },

  predictNextPurchase: async (customerId) => {
    const response = await callAIService('predict-purchase', { customerId });
    return response.prediction || {};
  }
};

module.exports = aiService;