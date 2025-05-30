import axios from "axios";
const config = useRuntimeConfig();

export const useLogOutJWT = () => {
  const tokenJWTCookie = useCookie("token_jwt");
  tokenJWTCookie.value = null;
  navigateTo("/", { redirectCode: 301 });
};

export const useRefreshToken = async (refresh) => {
  console.log("useRefreshToken()");

  try {
    const response = await axios.post(
      `${config.public.apiBase}/api/v1/users/token/refresh/`,
      {
        refresh,
      }
    );
    return response.data;
  } catch (err) {
    console.error(
      "Ошибка при обновлении токена:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const useVerifyToken = async (access) => {
  console.log("useVerifyToken()");

  try {
    const options = {};
    const response = await axios.post(
      `${config.public.apiBase}/api/v1/users/token/verify/`,
      {
        token: access,
      }
    );
    return response.data;
  } catch (err) {
    console.error(
      "Ошибка при проверке токена:",
      err.response?.data || err.message
    );
    throw err;
  }
};
