<script setup>
defineProps({
  img: String,
  title: String,
  category: String,
  price: String,
});
</script>

<template>
  <div
    class="bg-white rounded-[20px] shadow-md overflow-hidden max-w-sm cursor-pointer flex flex-col"
  >
    <img :src="img" alt="dish" class="w-full h-40 object-cover" />

    <div class="p-5 flex flex-col flex-1">
      <h2 class="text-xl font-bold mb-1">{{ title }}</h2>
      <p class="text-gray-400 text-sm mb-3">{{ category }}</p>

      <div class="mt-auto">
        <p class="text-lg font-medium">{{ price }} ₸</p>
      </div>
    </div>
  </div>
</template>
