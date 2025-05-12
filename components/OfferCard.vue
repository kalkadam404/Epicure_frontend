<script setup>
defineProps({
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
  },
});
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const emit = defineEmits(["click"]);

const navigateToDetails = () => {
  emit("click");
};

function getLocalized(item, field) {
  const lang = locale.value.toLowerCase();
  return item[`${field}_${lang}`] || item[`${field}_ru`]; // fallback to ru
}

function pluralize(count) {
  if (count === 1) return "персону";
  if ([2, 3, 4].includes(count)) return "персоны";
  return "персон";
}
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    :data-aos="dataAos"
    @click="navigateToDetails"
  >
    <div class="relative">
      <img :src="image" :alt="title" class="w-full h-56 object-cover" />
      <div
        v-if="badge"
        class="absolute top-4 right-4 bg-black text-white text-sm font-medium px-3 py-1 rounded-full"
      >
        {{ badge }}
      </div>
    </div>

    <div class="p-6">
      <div v-if="restaurant" class="text-sm text-gray-500 mb-2">
        {{ restaurant }}
      </div>
      <h3 class="text-xl font-bold mb-4">{{ title }}</h3>

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
          class="flex items-start"
        >
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
          <span class="text-gray-700">{{
            getLocalized(item, "description")
          }}</span>
        </li>
      </ul>

      <button
        class="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        {{ $t("buttons.book_table") }}
      </button>
    </div>
  </div>
</template>
