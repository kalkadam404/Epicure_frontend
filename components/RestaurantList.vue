<script setup>
import axios from "axios";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
import { inject } from "vue";

const { openCityModal } = inject("cityModal");
const restaurants = ref([]);

function getLocalized(item, field) {
  const lang = locale.value.toLowerCase();
  return item[`${field}_${lang}`] || item[`${field}_ru`]; // fallback to ru
}

const fetchRestaurants = async () => {
  try {
    const { data } = await axios.get("http://0.0.0.0:8000/api/v1/restaurants/");
    restaurants.value = data.results;
    console.log("Fetched restaurants:", restaurants.value);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};

onMounted(() => {
  fetchRestaurants();
});
</script>

<template>
  <div class="flex flex-col mt-10" data-aos="fade-up">
    <div class="flex w-full items-center justify-between">
      <div class="font-bold text-3xl">{{ $t("restaurantIn") }}</div>
      <div
        class="flex items-center gap-1 bg-[#EDEDED] rounded-[20px] px-5 py-2 cursor-pointer"
        @click="openCityModal"
      >
        <img src="../assets/loc.svg" alt="" />
        <div class="font-medium text-lg">{{ $t("buttons.select_city") }}</div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-8 mt-10">
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
