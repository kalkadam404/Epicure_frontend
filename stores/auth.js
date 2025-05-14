import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref("");
  const refreshToken = ref("");
  const email = ref("");
  const username = ref("");
  const phone_number = ref("");
  const user = ref({});
  const loading = ref(true);

  const tokenJWTCookie = useCookie("token_jwt");

  const isLoggedIn = computed(() => !!accessToken.value);

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
      const { data } = await axios.post(
        "http://0.0.0.0:8000/api/v1/users/token/obtain/",
        payload
      );

      accessToken.value = data.access;
      refreshToken.value = data.refresh;

      // Сохраняем токены
      tokenJWTCookie.value = data;

      // Подгрузим профиль
      await fetchUserProfile();

      return data;
    } catch (err) {
      console.error(err.response?.data);
      throw err;
    }
  };

  const fetchUserProfile = async () => {
    if (!accessToken.value) return;
    try {
      const { data } = await axios.get("http://0.0.0.0:8000/api/v1/users/me/", {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });

      user.value = data;
      email.value = data.email;
      username.value = data.username;
      phone_number.value = data.phone_number;
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      loading.value = false;
    }
  };

  const restoreSession = () => {
    if (tokenJWTCookie.value) {
      accessToken.value = tokenJWTCookie.value.access;
      refreshToken.value = tokenJWTCookie.value.refresh;
      fetchUserProfile();
    }
  };

  const logout = () => {
    accessToken.value = "";
    refreshToken.value = "";
    email.value = "";
    username.value = "";
    phone_number.value = "";
    tokenJWTCookie.value = null;
  };

  restoreSession();
  return {
    // state
    accessToken,
    refreshToken,
    email,
    username,
    phone_number,
    isLoggedIn,
    loading,
    user,

    // methods
    signup,
    auth,
    logout,
    restoreSession,
  };
});
