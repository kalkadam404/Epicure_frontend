<template>
  <header
    class="fixed top-0 z-50 w-full shadow-sm bg-white/95 backdrop-blur-md"
  >
    <div class="container mx-auto px-6 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink
          :to="$localePath('index')"
          class="flex items-center gap-3 group"
        >
          <img
            src="../assets/logo_w.svg"
            class="w-14 h-14 group-hover:scale-105 transition-transform"
            alt="logo"
          />
          <span
            class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black"
            >Epicure</span
          >
        </NuxtLink>

        <!-- Nav (Desktop) -->
        <nav class="hidden md:flex items-center gap-10 text-gray-700">
          <NuxtLink
            :to="$localePath('Menu')"
            class="nav-link relative font-medium text-lg hover:text-black transition-all"
          >
            {{ $t("menu") }}
          </NuxtLink>
          <div
            @click="$emit('openBookModal')"
            class="nav-link relative font-medium text-lg hover:text-black transition-all cursor-pointer"
          >
            {{ $t("booking") }}
          </div>
          <NuxtLink
            :to="$localePath('Offers')"
            class="nav-link relative font-medium text-lg hover:text-black transition-all"
          >
            {{ $t("packages") }}
          </NuxtLink>
          <NuxtLink
            :to="$localePath('About')"
            class="nav-link relative font-medium text-lg hover:text-black transition-all"
          >
            {{ $t("about") }}
          </NuxtLink>
        </nav>

        <!-- Guest Buttons -->
        <div class="flex items-center gap-5" v-if="!userStore.isLoggedIn">
          <!-- Language Selector -->
          <div class="relative mr-2">
            <button
              @click="toggleLanguageMenu"
              class="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 hover:bg-gray-100 transition-all text-gray-700"
            >
              <span class="font-medium">{{
                currentLanguage.toUpperCase()
              }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-500 transition-transform"
                :class="{ 'rotate-180': isLanguageMenuOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Language Dropdown -->
            <div
              v-show="isLanguageMenuOpen"
              class="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-lg py-1 z-50 transform transition-all origin-top-right"
              :class="{
                'scale-100 opacity-100': isLanguageMenuOpen,
                'scale-95 opacity-0': !isLanguageMenuOpen,
              }"
              @click.outside="closeLanguageMenu"
            >
              <button
                v-for="item in locales"
                :key="item.code"
                @click="changeLanguage(item.code)"
                class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-50 transition-colors"
                :class="{ 'font-bold': currentLanguage === item.code }"
              >
                {{ item.code }}
              </button>
            </div>
          </div>

          <button
            @click="emit('openLoginModal')"
            class="text-gray-800 hover:text-black text-base font-medium hover:underline underline-offset-4 decoration-2 transition-all"
          >
            {{ $t("login") }}
          </button>
          <button
            @click="emit('toggleToRegister')"
            class="bg-black text-white font-medium rounded-full px-6 py-2 transition-all hover:shadow-lg hover:scale-105"
          >
            {{ $t("register") }}
          </button>
        </div>

        <!-- Authorized User Section -->
        <div class="flex items-center gap-6 relative" v-else>
          <!-- Language Selector -->
          <div class="relative mr-2">
            <button
              @click="toggleLanguageMenu"
              class="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 hover:bg-gray-100 transition-all text-gray-700"
            >
              <span class="font-medium">{{
                currentLanguage.toUpperCase()
              }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-500 transition-transform"
                :class="{ 'rotate-180': isLanguageMenuOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Language Dropdown -->
            <div
              v-show="isLanguageMenuOpen"
              class="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-lg py-1 z-50 transform transition-all origin-top-right"
              :class="{
                'scale-100 opacity-100': isLanguageMenuOpen,
                'scale-95 opacity-0': !isLanguageMenuOpen,
              }"
              @click.outside="closeLanguageMenu"
            >
              <button
                v-for="item in locales"
                :key="item"
                @click="changeLanguage(item.code)"
                class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-50 transition-colors"
                :class="{ 'font-bold': currentLanguage === item.code }"
              >
                {{ item.code }}
              </button>
            </div>
          </div>

          <!-- Notifications Button -->
          <Notifications />

          <!-- User Profile with Dropdown -->
          <div class="relative user-menu-container">
            <div
              @click="toggleUserMenu"
              class="flex items-center gap-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full p-1 pl-3 pr-3 shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span class="font-medium text-gray-700">{{
                userStore.username
              }}</span>
              <div
                class="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md transition-transform"
              >
                <img
                  :src="userStore.user.image_url || def_ava"
                  alt="Профиль"
                  class="w-full h-full object-cover"
                />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500 transition-transform"
                :class="{ 'rotate-180': isUserMenuOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <!-- User Dropdown Menu -->
            <div
              v-show="isUserMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 transform transition-all origin-top-right user-menu-dropdown"
              :class="{
                'scale-100 opacity-100': isUserMenuOpen,
                'scale-95 opacity-0': !isUserMenuOpen,
              }"
              @click.outside="closeUserMenu"
            >
              <div class="py-2 px-4 border-b border-gray-100">
                <p class="text-sm text-gray-500">{{ $t("greeting") }},</p>
                <p class="font-medium text-black">
                  {{ userStore.username }}
                </p>
              </div>
              <NuxtLink
                to="/Profile"
                class="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{{ $t("myProfile") }}</span>
                </div>
              </NuxtLink>
              <NuxtLink
                to="/orders"
                class="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span>{{ $t("myOrders") }}</span>
                </div>
              </NuxtLink>
              <div class="border-t border-gray-100 mt-1">
                <button
                  @click="userStore.logout"
                  class="block w-full text-left px-4 py-3 text-red-600 hover:bg-gray-50 transition-colors"
                >
                  <div class="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span @click="userStore.logout">{{ $t("logout") }}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const userStore = useAuthStore();
const isUserMenuOpen = ref(false);
const isLanguageMenuOpen = ref(false);
const { locale, locales, setLocale } = useI18n();
import Notifications from "~/components/Notifications.vue";
import def_ava from "../assets/ava_def.svg";

const currentLanguage = computed({
  get: () => locale.value,
  set: (newLocale) => {
    setLocale(newLocale);
  },
});

const changeLanguage = (locale) => {
  setLocale(locale);
  closeLanguageMenu();
};

const emit = defineEmits([
  "openLoginModal",
  "toggleToRegister",
  "openBookModal",
]);

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
  if (isUserMenuOpen.value) {
    isLanguageMenuOpen.value = false; // Close language menu if user menu is opened
  }
};

const closeUserMenu = () => {
  isUserMenuOpen.value = false;
};

const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value;
  if (isLanguageMenuOpen.value) {
    isUserMenuOpen.value = false; // Close user menu if language menu is opened
  }
};

const closeLanguageMenu = () => {
  isLanguageMenuOpen.value = false;
};

// Close menus on ESC key
const handleEscKey = (event) => {
  if (event.key === "Escape") {
    closeUserMenu();
    closeLanguageMenu();
  }
};

onMounted(async () => {
  document.addEventListener("keydown", handleEscKey);
  await userStore.fetchUserProfile();
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleEscKey);
});
</script>

<style scoped>
.nav-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #000;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.router-link-active::after {
  width: 100%;
}

.router-link-active {
  color: black;
  font-weight: 600;
}

button,
a {
  transition: all 0.3s ease;
}

/* Dropdown Animation */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-menu-dropdown {
  animation: slideDown 0.2s ease-out forwards;
}
</style>
