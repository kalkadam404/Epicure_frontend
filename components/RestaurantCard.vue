<script setup>
import { ref } from "vue";
defineProps({
  img: String,
  ResName: String,
  city: String,
  menuType: String,
  time: String,
  rating: String,
});
</script>

<template>
  <div class="w-full max-w-md bg-white rounded-3xl shadow-lg p-5 space-y-4">
    <!-- Изображение -->
    <img
      :src="img"
      alt="Restaurant"
      class="rounded-2xl w-full h-60 object-cover"
    />

    <!-- Название и город -->
    <div class="flex flex-col gap-3">
      <h2 class="text-xl font-bold">{{ ResName }}</h2>
      <div class="flex items-center gap-2 mt-1 text-gray-700">
        <img src="../assets/res.svg" alt="" />
        <span>{{ city }}</span>
      </div>
    </div>

    <!-- Кухня -->
    <div class="flex items-center gap-2 text-gray-700">
      <img src="../assets/fork.svg" alt="" />
      <span>{{ menuType }}</span>
    </div>

    <!-- Время работы -->
    <div class="flex items-center gap-2 text-gray-700">
      <img src="../assets/time.svg" alt="" />
      <span>{{ time }}</span>
    </div>

    <!-- Теги -->
    <div class="flex gap-2 flex-wrap">
      <span class="bg-gray-200 rounded-full px-3 py-1 text-sm">Wi-Fi</span>
      <span class="bg-gray-200 rounded-full px-3 py-1 text-sm">Парковка</span>
      <span class="bg-gray-200 rounded-full px-3 py-1 text-sm">Доставка</span>
    </div>

    <!-- Рейтинг и кнопка -->
    <div class="flex justify-between items-center pt-4 border-t">
      <div class="flex items-center gap-1 text-lg font-medium">
        <svg class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455 1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.011l-3.377 2.455c-.785.57-1.84-.197-1.54-1.118l1.287-3.966-3.38-2.455c-.783-.57-.38-1.81.588-1.81h4.175l1.286-3.966z"
          />
        </svg>
        <span>{{ rating }}</span>
      </div>
      <button
        class="border px-4 py-2 rounded-xl hover:bg-gray-100 transition font-medium"
      >
        Забронировать
      </button>
    </div>
  </div>
</template>
