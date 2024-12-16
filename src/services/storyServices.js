import apiClient from "./apiClient";

export const getAllStories = async () => {
  try {
    const response = await apiClient.get("/stories/latest");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export const createStory = async (story) => {
  try {
    const response = await apiClient.post("/stories", story);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
export const getAllStoriesByUsername = async (username) =>{
  try {
    const response = await apiClient.get(`/stories/${username}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}