<template>
  <div
    class="relative bg-white w-[600px] shadow-xl flex flex-col items-start rounded-lg gap-5 py-9 px-10 m-auto"
  >
    <img
      src="../assets/close.svg"
      class="absolute top-4 right-4 w-8 h-8 cursor-pointer"
      alt=""
      @click="$emit('closeLoginModal')"
    />
    <div>
      <div class="text-2xl font-bold">{{ $t("sign_in") }}</div>
      <p class="text-gray-500">
        {{ $t("sign_in_mini") }}
      </p>
    </div>
    <form @submit.prevent="signin" class="w-full flex flex-col gap-4">
      <div>
        <label for="username" class="block text-gray-700 font-medium">{{
          $t("inputs.phone_number")
        }}</label>
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
        <div class="flex justify-between items-center">
          <label for="password" class="block text-gray-700 font-medium">{{
            $t("inputs.password")
          }}</label>
          <div>{{ $t("forgot_pass") }}</div>
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
          <img
            src="../assets/eye.svg"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            alt=""
          />
        </div>
      </div>
      <div class="flex items-center mt-4">
        <input
          type="checkbox"
          id="rememberMe"
          class="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
        />
        <label for="rememberMe" class="ml-2 text-gray-700">{{
          $t("remember_me")
        }}</label>
      </div>
      <div class="flex flex-col gap-[22px]">
        <button
          type="submit"
          class="w-full py-3 mt-4 bg-black text-white font-semibold rounded-md hover:bg-gray-500 transition duration-200"
        >
          {{ $t("login") }}
        </button>
        <span class="text-[#ABABAB] text-center text-lg">{{ $t("or") }}</span>
        <div class="flex items-center mx-auto gap-3">
          <div
            class="flex gap-5 items-center bg-black rounded-[9px] py-3 px-10"
            @click="openGoogleAuth"
          >
            <img src="../assets/google_icon.svg" alt="" />
            <div class="text-white">{{ $t("login_google") }}</div>
          </div>
          <div class="bg-[#F6F6F6] rounded-[9px] py-3 px-3">
            <img src="../assets/face.svg" alt="" />
          </div>
          <div class="bg-[#F6F6F6] rounded-[9px] py-3 px-3">
            <img src="../assets/apple.svg" alt="" />
          </div>
        </div>
      </div>
    </form>
    <div class="flex items-center justify-center mt-4 mx-auto">
      <span class="text-gray-500">{{ $t("no_acc") }}</span>
      <span
        class="ml-2 text-black font-semibold cursor-pointer"
        @click="$emit('toggleToRegister')"
        >{{ $t("register2") }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const config = useRuntimeConfig();
const emit = defineEmits(["closeLoginModal", "toggleToRegister"]);
const phone_number = ref("");
const password = ref("");
const validationErrors = ref({});
const authStore = useAuthStore();
const error = ref(null);
const success = ref(false);
const router = useRouter();

const signin = async () => {
  error.value = null;
  success.value = false;
  validationErrors.value = {};

  try {
    await authStore.auth({
      phone_number: phone_number.value,
      password: password.value,
    });

    success.value = true;
    emit("closeLoginModal");
  } catch (err) {
    console.error("Login error:", err);

    if (err?.status === 400) {
      validationErrors.value = err.response.data; // Здесь уже лежат ошибки от Django
    } else {
      error.value = "Что-то пошло не так. Попробуйте позже.";
    }
  }
};
const GOOGLE_SCOPES = config.public.GOOGLE_SCOPES;
const GOOGLE_AUTH_URI = config.public.GOOGLE_AUTH_URI;
const GOOGLE_REDIRECT_URI = config.public.GOOGLE_REDIRECT_URI;
const GOOGLE_CLIENT_ID = config.public.GOOGLE_CLIENT_ID;

const uri = `${GOOGLE_AUTH_URI}?redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&client_id=${GOOGLE_CLIENT_ID}&scope=${GOOGLE_SCOPES}`;

const openGoogleAuth = async () => {
  await navigateTo(`${uri}`, {
    open: {
      target: "_blank",
      windowFeatures: {
        width: 700,
        height: 900,
      },
    },
  });
};

const handleMessage = async (event) => {
  if (event.data && event.data.type === "GOOGLE_AUTH_SUCCESS") {
    // Fetch user profile when we get successful auth message
    await authStore.fetchUserProfile();
    emit("closeLoginModal");
    router.go(0);
    console.log("handleMessage");
  } else if (event.data && event.data.type === "GOOGLE_AUTH_ERROR") {
    console.error("Google authentication failed");
  }
};

onMounted(() => {
  window.addEventListener("message", handleMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener("message", handleMessage);
});
</script>
