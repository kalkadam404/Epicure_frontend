<script setup>
defineProps({
  title: String,
  image: String,
  oldPrice: Number,
  newPrice: Number,
  description: Array,
  badge: {
    type: String,
    default: null,
  },
  perPerson: {
    type: Boolean,
    default: false,
  },
  peopleCount: {
    type: Number,
    default: 2,
  },
  dataAos: String,
});

function pluralize(count) {
  if (count === 1) return "персону";
  if ([2, 3, 4].includes(count)) return "персоны";
  return "персон";
}
</script>

<template>
  <div
    :data-aos="dataAos"
    class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-gray-100"
  >
    <!-- Бейдж -->
    <div
      v-if="badge"
      class="absolute top-4 right-4 bg-black text-white text-sm px-3 py-1 rounded-full font-semibold z-10"
    >
      {{ badge }}
    </div>

    <!-- Изображение -->
    <div class="h-64 overflow-hidden">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <!-- Контент -->
    <div class="p-6">
      <h3 class="text-2xl font-bold text-black mb-2">{{ title }}</h3>

      <div class="flex items-center space-x-2 mb-4">
        <span
          v-if="oldPrice && oldPrice > newPrice"
          class="text-gray-500 line-through"
        >
          {{ oldPrice }} ₸
        </span>
        <span class="text-black font-bold text-xl">{{ newPrice }} ₸</span>
        <span class="text-gray-700 text-sm">
          /
          {{
            perPerson
              ? "на персону"
              : `на ${peopleCount} ${pluralize(peopleCount)}`
          }}
        </span>
      </div>

      <ul class="space-y-2 mb-6">
        <li
          v-for="(item, index) in description"
          :key="index"
          class="flex items-center text-gray-700"
        >
          <img src="../assets/select_black.svg" class="w-5 h-5 mr-2" alt="" />
          {{ item }}
        </li>
      </ul>

      <button
        class="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Забронировать столик
      </button>
    </div>
  </div>
</template>
