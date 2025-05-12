import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore("auth", () => {
  const signup = async (payload) => {
    try {
      const response = await axios.post(
        "http://0.0.0.0:8000/api/v1/users/register/",
        payload
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response?.data);
      throw err; // <-- выбрасывайте саму ошибку, а не err.response
    }
  };
  return { signup };
});
