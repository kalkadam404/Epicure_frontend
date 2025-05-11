<template>
  <div
    class="relative bg-white w-[550px] shadow-xl flex flex-col items-start rounded-lg gap-5 py-9 px-10 m-auto"
  >
    <img
      src="../assets/close.svg"
      class="absolute top-4 right-4 w-8 h-8 cursor-pointer"
      alt=""
      @click="$emit('closeDishInfoModal')"
    />
    <div>
      <div class="text-2xl font-bold">{{ $t("DishInfo.info") }}</div>
    </div>

    <div
      class="flex flex-col gap-4 w-full border-t border-b border-[#afafaf] pt-5 pb-5"
    >
      <div class="font-bold text-xl">
        {{ getLocalized(selectedDish, "name") }}
      </div>
      <div class="text-base">
        {{ getLocalized(selectedDish, "description") }}
      </div>
      <div class="font-bold text-lg">{{ selectedDish.price }} ₸</div>
    </div>
    <div class="flex flex-col gap-4 w-full border-b border-[#afafaf] pb-5">
      <div class="font-bold text-xl">{{ $t("DishInfo.dish_value") }}</div>
      <div class="flex gap-4 items-center justify-center">
        <div class="flex flex-col items-center gap-2">
          <div class="font-bold">
            {{ selectedDish.calories }} {{ $t("DishInfo.kcal") }}
          </div>
          <span>{{ $t("DishInfo.calories") }}</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="font-bold">
            {{ selectedDish.proteins }} {{ $t("DishInfo.grams") }}
          </div>
          <span>{{ $t("DishInfo.protein") }}</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="font-bold">
            {{ selectedDish.fats }} {{ $t("DishInfo.grams") }}
          </div>
          <span>{{ $t("DishInfo.fat") }}</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="font-bold">
            {{ selectedDish.carbohydrates }} {{ $t("DishInfo.grams") }}
          </div>
          <span>{{ $t("DishInfo.carbohydrates") }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4 w-full border-b border-[#afafaf] pb-5">
      <div class="font-bold text-xl">{{ $t("restaurant") }}</div>
      <span class="text-[#9D9D9D]">{{
        selectedDish.restaurant_details.name
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

function getLocalized(item, field) {
  const lang = locale.value.toLowerCase();
  return item[`${field}_${lang}`] || item[`${field}_ru`]; // fallback to ru
}
const emit = defineEmits(["closeDishInfoModal"]);
const { selectedDish } = inject("dishInfoModal");
</script>
