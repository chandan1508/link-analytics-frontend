import axios from "axios";
import { API_BASE_URL } from "./url";

const getAuthHeader = () => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  return authData?.token ? { Authorization: `Bearer ${authData.token}` } : {};
};

export const getUrlAnalytics = async (id, days = 30) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/analytics/${id}`, {
      query: days,
      headers: getAuthHeader(),
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
