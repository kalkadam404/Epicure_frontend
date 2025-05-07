// stores/user.js
import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const phone_number = ref("");
  const token = ref("");

  const login = (name, accessToken) => {
    isLoggedIn.value = true;
    phone_number.value = name;
    token.value = accessToken;

    localStorage.setItem("phone_number", name);
    localStorage.setItem("access_token", accessToken);
  };

  const logout = () => {
    isLoggedIn.value = false;
    phone_number.value = "";
    token.value = "";
    localStorage.removeItem("phone_number");
    localStorage.removeItem("access_token");
  };

  const register = async (
    phone_number,
    name,
    email,
    password,
    password_confirm
  ) => {
    try {
      const response = await axios.post(
        "http://0.0.0.0:8000/api/v1/users/register/",
        {
          phone_number,
          name,
          email,
          password,
          password_confirm,
        }
      );
      // console.log("Registration successful:", response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Registration failed:", error.response.data);
        throw error.response.data; // пробросить данные ошибки дальше
      } else {
        console.error("Unknown error:", error);
        throw new Error("Unknown registration error");
      }
    }
  };

  const initialize = () => {
    const savedToken = localStorage.getItem("access_token");
    const savedUsername = localStorage.getItem("phone_number");

    if (savedToken && savedUsername) {
      isLoggedIn.value = true;
      phone_number.value = savedUsername;
      token.value = savedToken;
    }
  };

  return {
    isLoggedIn,
    phone_number,
    token,
    login,
    register,
    logout,
    initialize,
  };
});
