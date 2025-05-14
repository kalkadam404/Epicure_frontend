<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <div class="mb-10 text-center" data-aos="fade-down">
      <h1 class="text-4xl md:text-5xl font-bold text-black">
        {{ $t("profile.title") }}
      </h1>
      <div class="w-20 h-1 bg-black mx-auto mt-4"></div>
    </div>

    <div v-if="loading" class="p-12 flex justify-center items-center">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"
      ></div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 text-red-700 p-4 rounded-lg text-center"
    >
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-1" data-aos="fade-right">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div class="p-8 flex flex-col items-center">
            <div class="relative mb-5">
              <div
                v-if="user.image_url"
                class="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md"
              >
                <img
                  :src="user.image_url || def_ava"
                  alt="Аватар пользователя"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                class="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-gray-100 shadow-md"
              >
                <span class="text-5xl text-gray-500">{{ userInitial }}</span>
              </div>

              <!-- Кнопка загрузки фото -->
              <label
                for="avatar-upload"
                class="absolute bottom-0 right-0 bg-black rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-800 transition-colors"
              >
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  class="hidden"
                  @change="uploadAvatar"
                />
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </label>
            </div>

            <h2 class="text-2xl font-bold text-gray-800 mb-1">
              {{ user.username }}
            </h2>
            <p class="text-gray-500 text-sm mb-4">{{ user.phone_number }}</p>

            <div class="flex items-center mb-4 text-sm">
              <svg
                class="w-4 h-4 text-gray-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>{{ formatDate(user.created_at) }}</span>
            </div>
          </div>

          <!-- Кнопки действий -->
          <div class="px-8 pb-8 space-y-3">
            <button
              class="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              @click="openEditProfile"
            >
              {{ $t("editProfile") }}
            </button>

            <button
              class="w-full py-3 bg-white border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              @click="openChangePassword"
            >
              {{ $t("changePassword") }}
            </button>

            <button
              class="w-full py-3 bg-white border border-gray-400 text-gray-700 font-medium rounded-lg hover:bg-gray-100 hover:text-red-500 hover:border-red-500 transition-colors"
              @click="logout"
            >
              {{ $t("logout") }}
            </button>
          </div>
        </div>
      </div>

      <!-- Правая колонка с вкладками информации -->
      <div class="md:col-span-2" data-aos="fade-up">
        <!-- Навигация по вкладкам -->
        <div class="flex border-b mb-6 overflow-x-auto">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-3 font-medium transition-colors whitespace-nowrap',
              activeTab === tab.id
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-black',
            ]"
          >
            {{ tab.name }}
          </button>
        </div>

        <!-- Личная информация -->
        <div
          v-if="activeTab === 'personal'"
          class="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-6">
            {{ $t("personalInfo") }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-2">{{
                $t("inputs.username")
              }}</label>
              <div class="text-lg text-gray-800">{{ user.username }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-2">{{
                $t("inputs.phone")
              }}</label>
              <div class="text-lg text-gray-800">{{ user.phone_number }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-2">{{
                $t("inputs.email")
              }}</label>
              <div class="text-lg text-gray-800">
                {{ user.email || "Не указан" }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-2">{{
                $t("language")
              }}</label>
              <div class="text-lg text-gray-800">
                {{
                  languageNames[user.language] || user.language || "Не указан"
                }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-2">{{
                $t("inputs.city")
              }}</label>
              <div class="text-lg text-gray-800">
                {{ user.city_details ? user.city_details.name : "Не указан" }}
              </div>
            </div>
          </div>
        </div>

        <!-- История заказов -->
        <div
          v-else-if="activeTab === 'orders'"
          class="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-6">
            {{ $t("orderHistory") }}
          </h3>

          <div class="text-center py-8 text-gray-500">
            <svg
              class="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              ></path>
            </svg>
            <p class="text-lg">{{ $t("noOrders") }}</p>
            <button
              class="mt-4 px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              {{ $t("goToMenu") }}
            </button>
          </div>
        </div>

        <!-- Избранное -->
        <div
          v-else-if="activeTab === 'favorites'"
          class="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-6">
            {{ $t("favoriteDishes") }}
          </h3>

          <div class="text-center py-8 text-gray-500">
            <svg
              class="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <p class="text-lg">{{ $t("noFavorites") }}</p>
            <button
              class="mt-4 px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              {{ $t("goToMenu") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showEditProfileModal"
      class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
    >
      <div
        class="bg-white rounded-lg max-w-md w-full shadow-xl p-6 relative overflow-y-auto max-h-[90vh] pointer-events-auto border border-gray-200"
      >
        <button
          @click="showEditProfileModal = false"
          class="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h2 class="text-xl font-bold text-gray-800 mb-6">
          {{ $t("editProfile") }}
        </h2>

        <form @submit.prevent="updateProfile">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("inputs.username")
              }}</label>
              <input
                v-model="editedUser.username"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("inputs.email")
              }}</label>
              <input
                v-model="editedUser.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("inputs.city")
              }}</label>
              <select
                v-model="editedUser.city"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">{{ $t("buttons.select_city") }}</option>
                <option v-for="city in cities" :key="city.id" :value="city.id">
                  {{ city.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("language")
              }}</label>
              <select
                v-model="editedUser.language"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option
                  v-for="(name, code) in languageNames"
                  :key="code"
                  :value="code"
                >
                  {{ name }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex mt-8 space-x-3 justify-end">
            <button
              type="button"
              @click="showEditProfileModal = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {{ $t("buttons.cancel") }}
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              :disabled="updateLoading"
            >
              <span v-if="updateLoading" class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{ $t("saving") }}
              </span>
              <span v-else>{{ $t("save") }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Модальное окно изменения пароля -->
    <div
      v-if="showChangePasswordModal"
      class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
    >
      <div
        class="bg-white rounded-lg max-w-md w-full shadow-xl p-6 relative pointer-events-auto border border-gray-200"
      >
        <button
          @click="showChangePasswordModal = false"
          class="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h2 class="text-xl font-bold text-gray-800 mb-6">
          {{ $t("changePassword") }}
        </h2>

        <form @submit.prevent="changePassword">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("currentPassword")
              }}</label>
              <input
                v-model="passwordData.current_password"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <p
                v-if="passwordErrors.current_password"
                class="mt-1 text-sm text-red-600"
              >
                {{
                  Array.isArray(passwordErrors.current_password)
                    ? passwordErrors.current_password[0]
                    : passwordErrors.current_password
                }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("newPassword")
              }}</label>
              <input
                v-model="passwordData.new_password"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <p
                v-if="passwordErrors.new_password"
                class="mt-1 text-sm text-red-600"
              >
                {{
                  Array.isArray(passwordErrors.new_password)
                    ? passwordErrors.new_password[0]
                    : passwordErrors.new_password
                }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("confirmNewPassword")
              }}</label>
              <input
                v-model="passwordData.confirm_password"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <p
                v-if="passwordErrors.confirm_password"
                class="mt-1 text-sm text-red-600"
              >
                {{
                  Array.isArray(passwordErrors.confirm_password)
                    ? passwordErrors.confirm_password[0]
                    : passwordErrors.confirm_password
                }}
              </p>
            </div>
          </div>

          <div class="flex mt-8 space-x-3 justify-end">
            <button
              type="button"
              @click="showChangePasswordModal = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {{ $t("buttons.cancel") }}
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              :disabled="passwordLoading"
            >
              <span v-if="passwordLoading" class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{ $t("saving") }}
              </span>
              <span v-else>{{ $t("save") }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Уведомление о результате операции -->
    <div
      v-if="notification.show"
      class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center space-x-3"
      :class="{
        'bg-green-500 text-white': notification.type === 'success',
        'bg-red-500 text-white': notification.type === 'error',
      }"
    >
      <svg
        v-if="notification.type === 'success'"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
      <svg
        v-else
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>{{ notification.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import def_ava from "../assets/ava_def.svg";

definePageMeta({
  middleware: ["auth-jwt"],
});

// Состояние пользователя
const userStore = useAuthStore();
const user = ref({});
const loading = ref(true);
const tokenJWTCookie = useCookie("token_jwt");
const error = ref(null);
const config = useRuntimeConfig();

// Вкладки для профиля
const tabs = [
  { id: "personal", name: t("personalInfo") },
  { id: "orders", name: t("orderHistory") },
  { id: "favorites", name: t("favorites") },
];
const activeTab = ref("personal");

// Словари и форматирование
const languageNames = {
  ru: "Русский",
  kz: "Қазақша",
};

const showEditProfileModal = ref(false);
const showChangePasswordModal = ref(false);
const editedUser = ref({});
const updateLoading = ref(false);
const cities = ref([]);

const passwordData = ref({
  current_password: "",
  new_password: "",
  confirm_password: "",
});
const passwordErrors = ref({});
const passwordLoading = ref(false);

const notification = ref({
  show: false,
  type: "success",
  message: "",
});

const showNotification = (type, message, duration = 3000) => {
  notification.value = {
    show: true,
    type,
    message,
  };

  setTimeout(() => {
    notification.value.show = false;
  }, duration);
};

const userInitial = computed(() => {
  return user.value.username
    ? user.value.username.charAt(0).toUpperCase()
    : "?";
});

const formatDate = (dateString) => {
  if (!dateString) return "Не указана";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("ru-RU", options);
};

const fetchProfile = async () => {
  loading.value = true;
  error.value = null;

  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${tokenJWTCookie.value.access}`,
      },
    };

    const { data } = await axios.get(
      `${config.public.apiBase}/api/v1/users/me/`,
      options
    );

    user.value = data;
  } catch (err) {
    console.error("Ошибка при получении профиля:", err);
    error.value = "Не удалось загрузить данные профиля";
  } finally {
    loading.value = false;
  }
};

const fetchCities = async () => {
  try {
    const { data } = await axios.get(`${config.public.apiBase}/api/v1/cities/`);
    cities.value = data.results || data;
  } catch (err) {
    console.error("Ошибка при получении списка городов:", err);
  }
};

const openEditProfile = () => {
  editedUser.value = {
    username: user.value.username,
    email: user.value.email || "",
    city: user.value.city || "",
    language: user.value.language || "ru",
  };
  showEditProfileModal.value = true;
};

const openChangePassword = () => {
  passwordData.value = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };
  passwordErrors.value = {};
  showChangePasswordModal.value = true;
};

const updateProfile = async () => {
  updateLoading.value = true;

  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${tokenJWTCookie.value.access}`,
      },
    };

    const { data } = await axios.patch(
      `${config.public.apiBase}/api/v1/users/profile/update_me/`,
      editedUser.value,
      options
    );

    user.value = data;
    showEditProfileModal.value = false;
    showNotification("success", "Профиль успешно обновлен");
  } catch (err) {
    console.error("Ошибка при обновлении профиля:", err);
    showNotification("error", "Не удалось обновить профиль");
  } finally {
    updateLoading.value = false;
  }
};

const uploadAvatar = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${tokenJWTCookie.value.access}`,
      },
    };

    const { data } = await axios.post(
      `${config.public.apiBase}/api/v1/users/profile/upload_photo/`,
      formData,
      options
    );

    user.value.image_url = data.image_url;
    showNotification("success", "Фото профиля обновлено");
  } catch (err) {
    console.error("Ошибка при загрузке аватара:", err);
    showNotification("error", "Не удалось загрузить фото");
  }
};

const changePassword = async () => {
  passwordLoading.value = true;
  passwordErrors.value = {};

  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${tokenJWTCookie.value.access}`,
      },
    };

    await axios.post(
      `${config.public.apiBase}/api/v1/users/profile/change_password/`,

      passwordData.value,
      options
    );

    showChangePasswordModal.value = false;
    showNotification("success", "Пароль успешно изменен");
    passwordData.value = {
      current_password: "",
      new_password: "",
      confirm_password: "",
    };
  } catch (err) {
    console.error("Ошибка при изменении пароля:", err);

    if (err.response && err.response.data) {
      passwordErrors.value = err.response.data;
    } else {
      showNotification("error", "Не удалось изменить пароль");
    }
  } finally {
    passwordLoading.value = false;
  }
};

const logout = () => {
  userStore.logout();
  navigateTo("/");
};

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  fetchProfile();
  fetchCities();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
