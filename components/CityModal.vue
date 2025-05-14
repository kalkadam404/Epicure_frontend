<template>
  <div
    class="relative bg-white w-[550px] shadow-xl flex flex-col items-start rounded-lg py-9 px-10 m-auto"
  >
    <img
      src="../assets/close.svg"
      class="absolute top-4 right-4 w-8 h-8 cursor-pointer hover:opacity-70 transition-opacity"
      alt="Close"
      @click="$emit('closeCityModal')"
    />
    <div class="mb-6">
      <div class="text-2xl font-bold text-gray-800">
        {{ $t("buttons.select_city") }}
      </div>
    </div>

    <div class="flex flex-col gap-4 w-full border-t border-gray-200 pt-6">
      <!-- Cities list with location pin icons - black & white theme -->
      <div
        v-for="city in cities"
        :key="city.id"
        @click="selectCity(city)"
        class="flex items-center gap-4 rounded-lg border py-4 px-5 cursor-pointer transition-all duration-200 hover:bg-gray-50"
        :class="{
          'border-black border-2 bg-gray-100': selectedCityId === city.id,
          'border-gray-300': selectedCityId !== city.id,
        }"
      >
        <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center">
          <svg
            v-if="selectedCityId === city.id"
            class="w-5 h-5 text-black"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            class="w-5 h-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div
          class="font-medium"
          :class="{
            'text-black': selectedCityId === city.id,
            'text-gray-700': selectedCityId !== city.id,
          }"
        >
          {{ city.name }}
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="py-4 px-5 text-center text-gray-500 italic">
        {{ $t("loading") || "Загрузка..." }}
      </div>

      <!-- Error state -->
      <div
        v-if="error"
        class="py-3 px-4 text-red-500 bg-red-50 rounded-lg border border-red-200"
      >
        {{ error }}
      </div>
    </div>

    <div class="mt-8 w-full">
      <button
        @click="confirmSelection"
        class="flex items-center justify-center gap-2 bg-black text-white rounded-lg py-3.5 px-6 w-full font-medium transition-colors hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
        :disabled="!selectedCityId"
      >
        <svg
          class="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        {{ $t("buttons.select") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const emit = defineEmits(["closeCityModal", "citySelected"]);

const cities = ref([]);
const selectedCityId = ref(null);
const isLoading = ref(false);
const error = ref(null);
const config = useRuntimeConfig();

const props = defineProps({
  currentCityId: {
    type: Number,
    default: null,
  },
});

onMounted(async () => {
  await fetchCities();
  selectedCityId.value = props.currentCityId;
});

const fetchCities = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const { data } = await axios.get(`${config.public.apiBase}/api/v1/cities/`);
    cities.value = data.results || data;
  } catch (err) {
    console.error("Ошибка загрузки городов:", err);
    error.value = "Не удалось загрузить список городов";
  } finally {
    isLoading.value = false;
  }
};

const selectCity = (city) => {
  selectedCityId.value = city.id;
};

const confirmSelection = () => {
  if (selectedCityId.value) {
    const selectedCity = cities.value.find(
      (city) => city.id === selectedCityId.value
    );
    emit("citySelected", selectedCity);
    emit("closeCityModal");
  }
};
</script>
