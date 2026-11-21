import api from './api';

export const healthService = {
  /**
   * Check backend application health
   */
  async getHealth() {
    const startTime = performance.now();
    const response = await api.get('/health');
    const latency = Math.round(performance.now() - startTime);
    return {
      ...response.data,
      latencyMs: latency,
    };
  },

  /**
   * Check database connectivity via backend
   */
  async getDbHealth() {
    const response = await api.get('/health/db');
    return response.data;
  },

  /**
   * Check both backend and database statuses in parallel
   */
  async checkConnectionStatus() {
    const results = {
      backend: { connected: false, data: null, error: null },
      database: { connected: false, data: null, error: null },
    };

    try {
      const backendRes = await this.getHealth();
      results.backend.connected = true;
      results.backend.data = backendRes;
    } catch (err) {
      results.backend.connected = false;
      results.backend.error = err.message || 'Cannot connect to backend server';
    }

    try {
      const dbRes = await this.getDbHealth();
      results.database.connected = dbRes.database_connected || false;
      results.database.data = dbRes;
    } catch (err) {
      results.database.connected = false;
      results.database.error = err.response?.data?.message || err.message || 'Database unreachable';
    }

    return results;
  }
};

export default healthService;
