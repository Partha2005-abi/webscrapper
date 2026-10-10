import axios from 'axios';

// API base URL configuration with auto-normalization
let rawBase = import.meta.env.VITE_API_URL || '/api';
if (rawBase !== '/api') {
  rawBase = rawBase.trim().replace(/\/+$/, '');
  if (!rawBase.endsWith('/api')) {
    rawBase += '/api';
  }
}
const API_BASE_URL = rawBase;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Check backend health & database connection
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    return {
      status: 'error',
      message: 'Backend server offline or unreachable',
      database: { connected: false }
    };
  }
};

/**
 * Submit URL to scrape (Sample Data Mode)
 */
export const scrapeWebsite = async (url) => {
  try {
    const response = await api.post('/scrape', { url });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: 'Network error occurred while connecting to backend server.'
    };
  }
};

/**
 * Fetch all scraped history records
 */
export const getHistory = async () => {
  try {
    const response = await api.get('/history');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: 'Failed to load scraping history.'
    };
  }
};

/**
 * Fetch single record by ID
 */
export const getHistoryById = async (id) => {
  try {
    const response = await api.get(`/history/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: 'Failed to fetch details for the requested record.'
    };
  }
};

/**
 * Delete single record by ID
 */
export const deleteHistory = async (id) => {
  try {
    const response = await api.delete(`/history/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: 'Failed to delete record.'
    };
  }
};

export default api;
