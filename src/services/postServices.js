import apiClient from "./apiClient";

export const getAllPosts = async () => {
  try {
    const response = await apiClient.get("/posts");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export const createPost = async (post) => {
  try {
    const response = await apiClient.post("/posts", post);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}