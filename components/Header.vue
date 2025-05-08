<template>
  <header class="fixed top-0 z-50 w-full backdrop-blur bg-white/80 px-20">
    <div
      class="container mx-auto flex items-center justify-between px-4 md:px-6 py-4"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3">
        <img src="../assets/logo_w.svg" class="w-[70px] h-[70px]" alt="logo" />
        <span class="text-2xl font-bold text-gray-800">Epicure</span>
      </NuxtLink>

      <!-- Nav (Desktop) -->
      <nav class="hidden md:flex items-center gap-8 text-gray-700">
        <NuxtLink
          to="/Menu"
          class="hover:text-black transition-all duration-200 text-lg font-medium"
        >
          Меню
        </NuxtLink>
        <div
          @click="$emit('openBookModal')"
          class="hover:text-black transition-all duration-200 text-lg font-medium cursor-pointer"
        >
          Бронирование
        </div>
        <NuxtLink
          href="#"
          class="hover:text-black transition-all duration-200 text-lg font-medium"
        >
          Пакет
        </NuxtLink>
        <NuxtLink
          to="/About"
          class="hover:text-black transition-all duration-200 text-lg font-medium coursor-pointer"
        >
          О нас
        </NuxtLink>
      </nav>

      <!-- Auth Buttons -->
      <div class="flex items-center gap-4" v-if="!userStore.isLoggedIn">
        <button
          @click="emit('openLoginModal')"
          class="text-gray-700 hover:text-black text-base font-medium transition duration-200"
        >
          Войти
        </button>
        <button
          @click="emit('toggleToRegister')"
          class="bg-black text-white font-medium rounded-lg px-5 py-2 transition hover:opacity-90 hover:scale-105"
        >
          Регистрация
        </button>
      </div>

      <div class="flex items-center gap-4" v-else>
        <img src="../assets/user.png" alt="" class="w-12 h-12 rounded-full" />
        <NuxtLink to="/Profile" class="font-medium text-lg">{{
          userStore.phone_number
        }}</NuxtLink>
        <button
          @click="userStore.logout"
          class="bg-black text-white font-medium rounded-lg px-5 py-2 transition hover:opacity-90 hover:scale-105"
        >
          Выйти
        </button>
      </div>

      <!-- Burger (Mobile) -->
      <div class="md:hidden">
        <button class="text-gray-800 hover:text-black focus:outline-none">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
button,
a {
  transition: all 0.3s ease;
}
</style>

<script setup>
import { NuxtLink } from "#components";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const isLoggedIn = ref(false);
const username = ref("");
const userStore = useUserStore();

const emit = defineEmits([
  "openLoginModal",
  "toggleToRegister",
  "openBookModal",
]);

onMounted(() => {
  userStore.initialize();
  // const token = localStorage.getItem("access_token");
  // const storedUsername = localStorage.getItem("username");
  // if (token && storedUsername) {
  //   isLoggedIn.value = true;
  //   username.value = storedUsername;
  // }
});

// const logout = () => {
//   localStorage.removeItem("access_token");
//   localStorage.removeItem("username");
//   isLoggedIn.value = false;
// };
</script>

<style scoped>
button,
a {
  transition: all 0.3s ease;
}
</style>
