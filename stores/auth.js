import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore("auth", () => {
  const userInfo = ref({
    accessToken: "",
    refreshToken: "",
    email: "",
    username: "",
  });

  const tokenJWTCookie = useCookie("token_jwt");

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

  const auth = async (payload) => {
    try {
      const response = await axios.post(
        "http://0.0.0.0:8000/api/v1/users/token/obtain/",
        payload
      );
      userInfo.value = {
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
        email: "",
        username: "",
      };
      console.log(response.data);
      tokenJWTCookie.value = response.data;
      localStorage.setItem(
        "userTokens",
        JSON.stringify({
          token: userInfo.value.accessToken,
          refToken: userInfo.value.refreshToken,
        })
      );
      return response.data;
    } catch (err) {
      console.log(err.response?.data);
      throw err; // <-- выбрасывайте саму ошибку, а не err.response
    }
  };

  const logout = () => {
    userInfo = {
      accessToken: "",
      refreshToken: "",
      email: "",
      username: "",
    };
  };

  return { signup, auth, logout, userInfo };
});
