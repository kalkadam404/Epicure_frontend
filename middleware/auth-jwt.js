export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("middleware auth_jwt.js");

  const tokenJWTCookie = useCookie("token_jwt");
  // console.log(tokenJWTCookie.value.access);

  if (!tokenJWTCookie.value) {
    return navigateTo("/", { redirectCode: 403 });
  }

  const tokenVerification = await useVerifyToken(tokenJWTCookie.value.access);
  console.log("tokenVerification", tokenVerification);

  if (
    tokenVerification &&
    "code" in tokenVerification &&
    tokenVerification.code === "token_not_valid"
  ) {
    const getAccessToken = await useRefreshToken(tokenJWTCookie.value.refresh);
    console.log("getAccessToken", getAccessToken);

    if (getAccessToken && "access" in getAccessToken) {
      tokenJWTCookie.value.access = getAccessToken.access;
      console.log("OK token is valid, success");
    } else {
      tokenJWTCookie.value = null;
      console.log(getAccessToken.data.detail, "error");
      return navigateTo("/", { redirectCode: 403 });
    }
  }
});
