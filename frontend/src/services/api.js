import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Add CSRF token to requests
const getCsrfToken = () => {
  const csrfToken = document.cookie
    .split(';')
    .find(cookie => cookie.trim().startsWith('csrftoken='))
    ?.split('=')[1];
  return csrfToken;
};

axios.interceptors.request.use(
  (config) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API service classes
export const parkingService = {
  async getAllSpots() {
    const response = await axios.get(`${API_BASE_URL}/parking-spots/`);
    return response.data;
  },

  async getSpotById(id) {
    const response = await axios.get(`${API_BASE_URL}/parking-spots/${id}/`);
    return response.data;
  }
};

export const reservationService = {
  async getUserReservations() {
    const response = await axios.get(`${API_BASE_URL}/reservations/`);
    return response.data;
  },

  async createReservation(reservationData) {
    const response = await axios.post(`${API_BASE_URL}/reservations/`, reservationData);
    return response.data;
  },

  async calculatePrice(priceData) {
    const response = await axios.post(`${API_BASE_URL}/calculate-price/`, priceData);
    return response.data;
  }
};

export const authService = {
  async login(credentials) {
    const response = await axios.post(`${API_BASE_URL}/auth/login/`, credentials);
    return response.data;
  },

  async logout() {
    const response = await axios.post(`${API_BASE_URL}/auth/logout/`);
    return response.data;
  },

  async getCurrentUser() {
    const response = await axios.get(`${API_BASE_URL}/auth/user/`);
    return response.data;
  }
};

export default axios;