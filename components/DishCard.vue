<script setup>
defineProps({
  img: String,
  title: String,
  restaurant: String,
  category: String,
  price: String,
});
</script>

<template>
  <div
    class="bg-white rounded-[30px] shadow-md overflow-hidden max-w-sm cursor-pointer flex flex-col h-full"
  >
    <img :src="img" alt="dish" class="w-full h-60 object-cover" />

    <div class="p-5 flex flex-col flex-1 justify-between">
      <div>
        <h2 class="text-2xl font-bold mb-1">{{ title }}</h2>
        <p class="text-lg font-mono">{{ restaurant }}</p>
        <p class="text-gray-400 text-sm">{{ category }}</p>
      </div>

      <div class="pt-4">
        <p class="text-2xl font-bold">{{ price }} ₸</p>
      </div>
    </div>
  </div>
</template>
