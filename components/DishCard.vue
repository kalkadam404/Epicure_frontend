<script setup>
defineProps({
  img: String,
  title: String,
  restaurant: String,
  category: String,
  price: Number,
});
</script>

<template>
  <div
    class="bg-white rounded-[30px] shadow-md overflow-hidden max-w-sm cursor-pointer"
  >
    <img :src="img" alt="dish" class="w-full h-60 object-cover" />

    <div class="p-5 relative">
      <h2 class="text-2xl font-bold mb-1">{{ title }}</h2>
      <p class="text-lg font-mono">{{ restaurant }}</p>
      <p class="text-gray-400 text-sm mb-3">{{ category }}</p>
      <div class="flex justify-between items-center">
        <p class="text-2xl font-bold">{{ price.toFixed(2) }} ₸</p>
        <!-- <button
          class="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center text-xl"
        >
          +
        </button> -->
      </div>
    </div>
  </div>
</template>
