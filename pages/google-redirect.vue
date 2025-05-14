<script setup>
import axios from "axios";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const tokenJWTCookie = useCookie("token_jwt");
const authenticateUserGoogle = async (code) => {
  console.log("authenticateUserGoogle()");
  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/users/google/",
      {
        code: code,
      }
    );
    console.log("google data", data);
    tokenJWTCookie.value = data;
    // Pass a message to the parent window before closing
    if (window.opener) {
      window.opener.postMessage({ type: "GOOGLE_AUTH_SUCCESS" }, "*");
    }

    // Close the popup after a short delay to ensure the message is sent
    setTimeout(() => {
      window.close();
    }, 300);
  } catch (err) {
    console.log("err", err);
    // Optionally notify the parent window about the error
    if (window.opener) {
      window.opener.postMessage({ type: "GOOGLE_AUTH_ERROR" }, "*");
    }
    setTimeout(() => {
      window.close();
    }, 300);
  }
};

onMounted(async () => {
  const code = route.query.code;
  if (code) await authenticateUserGoogle(code);
});
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <div class="mb-4">
        <div
          class="w-16 h-16 mx-auto border-4 border-t-black border-gray-200 rounded-full animate-spin"
        ></div>
      </div>
      <div class="text-xl font-medium">
        {{ "Processing Google Login..." }}
      </div>
    </div>
  </div>
</template>
