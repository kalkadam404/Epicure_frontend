<script setup>
import axios from "axios";
import { inject } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

const { openDishInfoModal, selectedDish } = inject("dishInfoModal");
const openDishModal = (dish) => {
  selectedDish.value = dish; // запоминаем блюдо
  openDishInfoModal(); // открываем модалку
};
const dishList = ref([]);

function getLocalized(item, field) {
  const lang = locale.value.toLowerCase();
  return item[`${field}_${lang}`] || item[`${field}_ru`]; // fallback to ru
}
const fetchDishes = async () => {
  try {
    const { data } = await axios.get(
      "http://0.0.0.0:8000/api/v1/products/menu-items/"
    );
    dishList.value = data.results.slice(0, 4);
    console.log("Fetched dishes:", dishList.value);
  } catch (error) {
    console.error("Error fetching dishes:", error);
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
        <div class="rounded-full border-2 border-[#E6E8EC]">
          <img
            src="../assets/arrow_left.svg"
            class="w-[30px] h-[30px]"
            alt=""
          />
        </div>
        <div class="rounded-full border-2 border-[#E6E8EC]">
          <img
            src="../assets/arrow_right.svg"
            class="w-[30px] h-[30px]"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-8 mt-10">
      <DishCard
        v-for="(dish, index) in dishList"
        :key="dish.id"
        :img="dish.image"
        :title="getLocalized(dish, 'name')"
        :restaurant="dish.restaurant_details.name"
        :category="dish.menu_type_details.name"
        :price="dish.price"
        @click="openDishModal(dish)"
      />
    </div>
  </div>
</template>
