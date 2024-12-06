import apiClient from "./apiClient";

export const authenticate = async (credentials) => {
  try {
    const response = await apiClient.post("/auth", credentials);
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message; 
  }
};