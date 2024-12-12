import apiClient from "./apiClient";

export const createUser = async(user) => {
  try {
    const response = await apiClient.post("/users", user);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
export const updateUserBio = async(bio) => {
  try {
    const response = await apiClient.post("/user-bio", bio);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}