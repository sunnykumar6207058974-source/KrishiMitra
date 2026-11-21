import api from './api';

export const assistantService = {
  /**
   * Send a query to the Krishi AI Farming Assistant.
   */
  async sendMessage({ message, conversationId, language = 'en', location, crop }) {
    const payload = {
      message,
      conversation_id: conversationId || undefined,
      language,
      location: location || undefined,
      crop: crop || undefined
    };
    const response = await api.post('/assistant/chat', payload);
    return response.data;
  },

  /**
   * Fetch chat history for an existing session.
   */
  async getHistory(conversationId) {
    if (!conversationId) return null;
    const response = await api.get(`/assistant/history/${conversationId}`);
    return response.data;
  },

  /**
   * Check AI Assistant and RAG pipeline health.
   */
  async getHealth() {
    const response = await api.get('/assistant/health');
    return response.data;
  }
};

export default assistantService;
