<template>
  <div
    class="max-w-2xl h-screen mx-auto mt-12 p-6 bg-white shadow-md rounded-lg"
  >
    <h1 class="text-2xl font-bold mb-4">Профиль пользователя</h1>

    <div class="mb-4">
      <label class="block text-gray-700 font-semibold">Имя:</label>
      <p class="text-gray-900">{{ user.username }}</p>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 font-semibold">Email:</label>
      <p class="text-gray-900">{{ user.email }}</p>
    </div>

    <button
      class="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      @click="logout"
    >
      Выйти
    </button>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth-jwt"],
});
import axios from "axios";
const user = ref({});
const tokenJWTCookie = useCookie("token_jwt");
// console.log(tokenJWTCookie.value.access);

const fetchProfile = async () => {
  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${tokenJWTCookie.value.access}`,
      },
    };
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/users/me/",
      options
    );
    user.value = data;
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
body {
  background-color: #f9f9f9;
}
</style>
