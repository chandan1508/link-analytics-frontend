import axios from 'axios';
import { API_BASE_URL } from './url';

const getAuthHeader = () => {
  const authData = JSON.parse(localStorage.getItem('authData'));
  return authData?.token ? { Authorization: `Bearer ${authData.token}` } : {};
};

export const createShortUrl = async (urlData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shorten`, urlData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getUserUrls = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/my-urls`, {
      headers: getAuthHeader(),
      params: { id }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteUrl = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};