<script setup>
defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: [String, Object],
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  badge: {
    type: String,
    default: "",
  },
  peopleCount: {
    type: Number,
    default: 1,
  },
  perPerson: {
    type: Boolean,
    default: false,
  },
  dataAos: {
    type: String,
    default: "fade-up",
  },
  restaurant: {
    type: String,
    default: "",
  }
});

const emit = defineEmits(['click']);

const navigateToDetails = () => {
  emit('click');
};

// Форматирование цены
const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price);
};
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    :data-aos="dataAos"
    @click="navigateToDetails"
  >
    <div class="relative">
      <img
        :src="image"
        :alt="title"
        class="w-full h-56 object-cover"
      />
      <div
        v-if="badge"
        class="absolute top-4 right-4 bg-black text-white text-sm font-medium px-3 py-1 rounded-full"
      >
        {{ badge }}
      </div>
    </div>

    <div class="p-6">
      <div v-if="restaurant" class="text-sm text-gray-500 mb-2">{{ restaurant }}</div>
      <h3 class="text-xl font-bold mb-4">{{ title }}</h3>

      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <span class="text-gray-500 line-through mr-2">{{ formatPrice(oldPrice) }} ₸</span>
          <span class="text-lg font-bold">{{ formatPrice(newPrice) }} ₸</span>
        </div>
        <div class="flex items-center">
          <span class="text-sm text-gray-500">
            {{ peopleCount }} {{ $t("general.person", peopleCount) }}
            <span v-if="perPerson">{{ $t("general.per_person") }}</span>
          </span>
        </div>
      </div>

      <ul class="space-y-2 mb-6">
        <li v-for="(item, index) in description" :key="index" class="flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span class="text-gray-700">{{ item }}</span>
        </li>
      </ul>

      <button
        class="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        {{ $t("buttons.more_details") }}
      </button>
    </div>
  </div>
</template>