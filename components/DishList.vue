<script setup>
import axios from "axios";
import { ref, inject, onMounted } from "vue"; // Добавьте ref в импорт
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

const { openDishInfoModal, selectedDish } = inject("dishInfoModal");
const openDishModal = (dish) => {
  selectedDish.value = dish;
  openDishInfoModal();
};
const dishList = ref([]);
const isLoading = ref(true);
const error = ref(null);

function getLocalized(item, field) {
  const lang = locale.value.toLowerCase();
  return item[`${field}_${lang}`] || item[`${field}_ru`]; // fallback to ru
}

const fetchDishes = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/products/menu-items/popular/"
    );

    dishList.value = data.results || data;

    console.log("Fetched popular dishes:", dishList.value);
  } catch (err) {
    console.error("Error fetching popular dishes:", err);
    error.value = "Не удалось загрузить популярные блюда";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchDishes();
});
</script>

<template>
  <div class="flex flex-col mt-12" data-aos="fade-up">
    <div class="flex w-full items-center justify-between">
      <div class="font-bold text-3xl">{{ $t("popularDishes") }}</div>
      <div class="flex items-center gap-4">
        <div
          class="rounded-full border-2 border-[#E6E8EC] cursor-pointer hover:bg-gray-100"
        >
          <img
            src="../assets/arrow_left.svg"
            class="w-[30px] h-[30px]"
            alt="Предыдущая страница"
          />
        </div>
        <div
          class="rounded-full border-2 border-[#E6E8EC] cursor-pointer hover:bg-gray-100"
        >
          <img
            src="../assets/arrow_right.svg"
            class="w-[30px] h-[30px]"
            alt="Следующая страница"
          />
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="mt-10 text-center py-8">
      <div
        class="inline-block w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"
      ></div>
      <p class="mt-2 text-gray-600">{{ $t("loading") || "Загрузка..." }}</p>
    </div>

    <div v-else-if="error" class="mt-10 text-center text-red-500 py-8">
      {{ error }}
    </div>

    <div
      v-else-if="dishList.length === 0"
      class="mt-10 text-center py-8 text-gray-500"
    >
      {{ $t("general.no_popular_dishes") || "Нет популярных блюд" }}
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10"
    >
      <DishCard
        v-for="dish in dishList"
        :key="dish.id"
        :img="dish.image_url || dish.image"
        :title="getLocalized(dish, 'name')"
        :restaurant="dish.restaurant_details?.name"
        :category="dish.menu_type_details?.name"
        :price="dish.price"
        @click="openDishModal(dish)"
      />
    </div>
  </div>
</template>
