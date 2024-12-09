import apiClient from "./apiClient";

export const getAllPosts = async () => {
  try {
    const response = await apiClient.get("/posts");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}