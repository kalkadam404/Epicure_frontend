<script setup>
import axios from "axios";
import { useI18n } from "vue-i18n";
import { ref, inject, onMounted, computed } from "vue";
const config = useRuntimeConfig();
const { locale } = useI18n();
const { openCityModal, cityModal } = inject("cityModal");

const restaurants = ref([]);
const selectedCity = ref(null);
const isLoading = ref(false);
const error = ref(null);

function getLocalized(item, field) {
  const lang = locale.value.toLowerCase();
  return item[`${field}_${lang}`] || item[`${field}_ru`];
}

const selectedCityText = computed(() => {
  return selectedCity.value
    ? selectedCity.value.name
    : $t("buttons.select_city");
});

const fetchRestaurants = async (cityId = null) => {
  isLoading.value = true;
  error.value = null;

  try {
    let url = `${config.public.apiBase}/api/v1/restaurants/`;
    if (cityId) {
      url += `?city=${cityId}`;
    }

    const { data } = await axios.get(url);
    restaurants.value = data.results || data;
    console.log("Fetched restaurants:", restaurants.value);
  } catch (err) {
    console.error("Error fetching restaurants:", err);
    error.value = "Не удалось загрузить рестораны";
  } finally {
    isLoading.value = false;
  }
};

const handleCitySelection = (city) => {
  selectedCity.value = city;
  fetchRestaurants(city.id);
};

const showCityModal = () => {
  const currentCityId = selectedCity.value?.id || null;
  openCityModal(currentCityId, handleCitySelection);
};

onMounted(() => {
  fetchRestaurants();
});
</script>

<template>
  <div class="flex flex-col mt-10" data-aos="fade-up">
    <div class="flex w-full items-center justify-between">
      <div class="font-bold text-3xl">
        {{
          selectedCity
            ? $t("restaurantInCity", {
                city: getLocalized(selectedCity, "name"),
              })
            : $t("allRestaurants")
        }}
      </div>
      <div
        class="flex items-center gap-1 bg-[#EDEDED] rounded-[20px] px-5 py-2 cursor-pointer"
        @click="showCityModal"
      >
        <img src="../assets/loc.svg" alt="" />
        <div class="font-medium text-lg">
          {{ selectedCity ? selectedCity.name : $t("buttons.select_city") }}
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="mt-10 text-center">
      {{ $t("loading") || "Загрузка..." }}
    </div>

    <div v-else-if="error" class="mt-10 text-center text-red-500">
      {{ error }}
    </div>

    <div v-else-if="restaurants.length === 0" class="mt-10 text-center">
      {{
        selectedCity
          ? $t("noRestaurantsInCity") ||
            `В городе ${selectedCity.name} пока нет ресторанов`
          : $t("noRestaurants") || "Нет доступных ресторанов"
      }}
    </div>

    <div v-else class="grid grid-cols-3 gap-8 mt-10">
      <RestaurantCard
        v-for="(res, index) in restaurants"
        :key="res.id"
        :img="res.photo"
        :ResName="res.name"
        :city="res.city.name"
        :menuType="getLocalized(res, 'description')"
        :opening_time="res.opening_time"
        :closing_time="res.closing_time"
        :rating="res.rating"
      />
    </div>
  </div>
</template>
