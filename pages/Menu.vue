<template>
  <div class="pt-20">
    <div class="flex gap-8 px-20">
      <div class="w-1/4 h-fit sticky top-30">
        <ul class="space-y-4">
          <li
            v-for="(cat, idx) in categories"
            :key="cat"
            @click="scrollToSection(idx)"
            :class="[
              'cursor-pointer text-lg font-medium',
              activeIndex === idx
                ? 'text-black font-semibold '
                : 'text-gray-500',
            ]"
          >
            {{ cat.name }}
          </li>
        </ul>
      </div>

      <div class="w-3/4 space-y-16">
        <div
          v-for="(cat, idx) in categories"
          :key="cat"
          :ref="(el) => (sectionRefs[idx] = el)"
          class="space-y-4 scroll-mt-[110px]"
        >
          <h2 class="text-xl font-bold text-gray-800 mb-5">{{ cat.name }}</h2>
          <div class="grid grid-cols-3 gap-3">
            <MenuItem
              v-for="(dish, index) in groupedDishes[cat.id]"
              :key="dish.id"
              :img="dish.image"
              :title="getLocalized(dish, 'name')"
              :category="dish.menu_type_details.name"
              :price="dish.price"
              @click="openDishModal(dish)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="px-20 mb-10">
      <BonusAppPromo />
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const config = useRuntimeConfig();

const { openDishInfoModal, selectedDish } = inject("dishInfoModal");
const openDishModal = (dish) => {
  selectedDish.value = dish;
  openDishInfoModal();
};
const dishList = ref([]);
const categories = ref([]);
const activeIndex = ref(0);
const sectionRefs = ref([]);

const fetchCategories = async () => {
  try {
    const { data } = await axios.get(
      `${config.public.apiBase}/api/v1/products/menu-types/`
    );
    categories.value = data.results;
    console.log("categories", data);
  } catch (err) {
    console.log("err", err);
  }
};

const fetchDishes = async () => {
  try {
    const { data } = await axios.get(
      `${config.public.apiBase}/api/v1/products/menu-items/`
    );
    console.log("dishes", data);
    dishList.value = data.results;
    // console.log(dishList.value);
  } catch (err) {
    console.log("err", err);
  }
};

const groupedDishes = computed(() => {
  const grouped = {};
  for (const dish of dishList.value) {
    const typeId = dish.menu_type_details.id;
    if (!grouped[typeId]) {
      grouped[typeId] = [];
    }
    grouped[typeId].push(dish);
  }
  return grouped;
});

const scrollToSection = (index) => {
  sectionRefs.value[index]?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const handleScroll = () => {
  const scrollY = window.scrollY;

  for (let i = 0; i < sectionRefs.value.length; i++) {
    const section = sectionRefs.value[i];
    if (section.offsetTop - 200 <= scrollY) {
      activeIndex.value = i;
    }
  }
};

function getLocalized(item, field) {
  const lang = locale.value.toLowerCase();
  return item[`${field}_${lang}`] || item[`${field}_ru`]; // fallback to ru
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
  fetchCategories();
  fetchDishes();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
