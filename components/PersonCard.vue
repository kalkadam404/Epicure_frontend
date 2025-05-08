<script setup>
defineProps({
  img: String,
  name: String,
  job: String,
  about: String,
});
</script>

<template>
  <div class="bg-white rounded-[30px] shadow-md overflow-hidden max-w-sm">
    <img :src="img" alt="dish" class="w-full h-60 object-cover" />

    <div class="p-5 relative">
      <h2 class="text-2xl font-bold mb-1">{{ name }}</h2>
      <p class="text-lg font-mono">{{ job }}</p>
      <p class="text-gray-400 text-sm mb-3">{{ about }}</p>
    </div>
  </div>
</template>
