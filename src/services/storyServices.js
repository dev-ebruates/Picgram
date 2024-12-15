import apiClient from "./apiClient";

export const getAllStories = async () => {
  try {
    const response = await apiClient.get("/latest-stories");
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