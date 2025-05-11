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
    <form @submit.prevent="register" class="w-full flex flex-col gap-4">
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
      </div>
      <div>
        <label class="block text-gray-700 font-medium">{{
          $t("inputs.name")
        }}</label>
        <input
          v-model="name"
          type="text"
          id="name"
          required
          :placeholder="$t('inputs.enter_your_name')"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
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

const userStore = useUserStore();
const emit = defineEmits([
  "closeRegisterModal",
  "toggleToRegister",
  "openLoginModal",
]);

const phone_number = ref("");
const name = ref("");
const email = ref("");
const password = ref("");
const password_confirm = ref("");
const error = ref(null);
const success = ref(false);

const register = async () => {
  error.value = null;
  success.value = false;

  try {
    await userStore.register(
      phone_number.value,
      name.value,
      email.value,
      password.value,
      password_confirm.value
    );
    success.value = true;
  } catch (err) {
    console.error("Registration error:", err);
    error.value =
      err?.phone_number?.[0] ||
      err?.email?.[0] ||
      err?.password?.[0] ||
      err?.name?.[0] ||
      "Ошибка регистрации";
  }
  emit("closeRegisterModal");
  emit("openLoginModal"); // открываем модалку входа
};
</script>
