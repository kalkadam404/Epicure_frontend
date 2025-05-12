<template>
  <div
    class="relative bg-white w-[600px] shadow-xl flex flex-col items-start rounded-lg gap-5 py-9 px-10 m-auto"
  >
    <img
      src="../assets/close.svg"
      class="absolute top-4 right-4 w-8 h-8 cursor-pointer"
      alt=""
      @click="$emit('closeRegisterModal')"
    />
    <div>
      <div class="text-2xl font-bold">{{ $t("sign_up") }}</div>
      <p class="text-gray-500">{{ $t("sign_up_text") }}</p>
    </div>
    <form @submit.prevent="signup" class="w-full flex flex-col gap-4">
      <div>
        <label for="username" class="block text-gray-700 font-medium"
          >{{ $t("inputs.phone_number") }} *</label
        >
        <input
          v-model="phone_number"
          type="text"
          id="username"
          required
          placeholder="+7 (___) ___-__-__"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <p
          v-if="validationErrors.phone_number"
          class="text-red-500 text-sm mt-1"
        >
          {{ validationErrors.phone_number[0] }}
        </p>
      </div>
      <div>
        <label for="email" class="block text-gray-700 font-medium">{{
          $t("inputs.email")
        }}</label>
        <input
          v-model="email"
          type="text"
          required
          :placeholder="$t('inputs.enter_your_email')"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <p v-if="validationErrors.email" class="text-red-500 text-sm mt-1">
          {{ validationErrors.email[0] }}
        </p>
      </div>
      <div>
        <label class="block text-gray-700 font-medium">{{
          $t("inputs.username")
        }}</label>
        <input
          v-model="username"
          type="text"
          id="name"
          required
          :placeholder="$t('inputs.enter_your_username')"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <p v-if="validationErrors.username" class="text-red-500 text-sm mt-1">
          {{ validationErrors.username[0] }}
        </p>
      </div>

      <div>
        <div class="flex justify-between items-center">
          <label for="password" class="block text-gray-700 font-medium"
            >{{ $t("inputs.password") }} *</label
          >
        </div>
        <div class="relative mt-2">
          <input
            v-model="password"
            type="password"
            id="password"
            required
            :placeholder="$t('inputs.your_password')"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <p v-if="validationErrors.password" class="text-red-500 text-sm mt-1">
            {{ validationErrors.password[0] }}
          </p>
        </div>
      </div>

      <div>
        <div class="flex justify-between items-center">
          <label for="password" class="block text-gray-700 font-medium"
            >{{ $t("inputs.confirm") }} *</label
          >
        </div>
        <div class="relative mt-2">
          <input
            v-model="password_confirm"
            type="password"
            id="password_confirm"
            required
            :placeholder="$t('inputs.confirm_your')"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <p
            v-if="validationErrors.password_confirm"
            class="text-red-500 text-sm mt-1"
          >
            {{ validationErrors.password_confirm[0] }}
          </p>
        </div>
      </div>

      <div class="flex items-center mt-1">
        <input
          type="checkbox"
          id="rememberMe"
          class="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
        />
        <label for="rememberMe" class="ml-2 text-gray-700">{{
          $t("confirm_policy")
        }}</label>
      </div>
      <button
        type="submit"
        class="w-full py-3 mt-1 bg-black text-white font-semibold rounded-md hover:bg-gray-500 transition duration-200"
      >
        {{ $t("register") }}
      </button>
    </form>
    <div class="flex items-center justify-center mt-1 mx-auto">
      <span class="text-gray-500">{{ $t("have_acc") }}</span>
      <span
        @click="$emit('openLoginModal')"
        class="ml-2 text-black font-semibold cursor-pointer"
        >{{ $t("login") }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
const validationErrors = ref({});
const userStore = useUserStore();
const authStore = useAuthStore();
const emit = defineEmits([
  "closeRegisterModal",
  "toggleToRegister",
  "openLoginModal",
]);

const phone_number = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const password_confirm = ref("");
const error = ref(null);
const success = ref(false);

const signup = async () => {
  error.value = null;
  success.value = false;
  validationErrors.value = {};

  try {
    await authStore.signup({
      phone_number: phone_number.value,
      username: username.value,
      email: email.value,
      password: password.value,
      password_confirm: password_confirm.value,
    });

    success.value = true;
    emit("closeRegisterModal");
    emit("openLoginModal");
  } catch (err) {
    console.error("Registration error:", err);

    if (err?.status === 400) {
      validationErrors.value = err.response.data; // Здесь уже лежат ошибки от Django
    } else {
      error.value = "Что-то пошло не так. Попробуйте позже.";
    }
  }
};
</script>
