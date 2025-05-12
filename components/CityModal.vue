<template>
  <div
    class="relative bg-white w-[550px] shadow-xl flex flex-col items-start rounded-lg gap-3 py-9 px-10 m-auto"
  >
    <img
      src="../assets/close.svg"
      class="absolute top-4 right-4 w-8 h-8 cursor-pointer"
      alt=""
      @click="$emit('closeCityModal')"
    />
    <div>
      <div class="text-2xl font-bold">{{ $t("buttons.select_city") }}</div>
    </div>
    <div class="flex flex-col gap-4 w-full border-t border-[#afafaf] pt-5">
      <div 
        v-for="city in cities" 
        :key="city.id"
        @click="selectCity(city)"
        class="flex gap-4 rounded-[10px] border border-[#9D9D9D] py-3 px-4 cursor-pointer"
        :class="{'border-black border-2': selectedCityId === city.id}"
      >
        <img :src="selectedCityId === city.id ? '../assets/ellipse-selected.svg' : '../assets/ellipse.svg'" alt="" />
        <div>{{ city.name }}</div>
      </div>
      <div v-if="isLoading" class="py-3 px-4">
        {{ $t('loading') || 'Загрузка...' }}
      </div>
      <div v-if="error" class="py-3 px-4 text-red-500">
        {{ error }}
      </div>
    </div>
    <div class="mt-6">
      <button
        @click="confirmSelection"
        class="flex items-center gap-2 bg-black text-white rounded-[10px] py-3 px-5"
        :disabled="!selectedCityId"
      >
        <img src="../assets/select.svg" alt="" />
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

const props = defineProps({
  currentCityId: {
    type: Number,
    default: null
  }
});

onMounted(async () => {
  await fetchCities();
  selectedCityId.value = props.currentCityId;
});

const fetchCities = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const { data } = await axios.get("http://localhost:8000/api/v1/cities/");
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
    const selectedCity = cities.value.find(city => city.id === selectedCityId.value);
    emit('citySelected', selectedCity);
    emit('closeCityModal');
  }
};
</script>