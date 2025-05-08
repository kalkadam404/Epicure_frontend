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
            {{ cat }}
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
          <h2 class="text-xl font-bold text-gray-800 mb-5">{{ cat }}</h2>
          <div class="grid grid-cols-3 gap-3">
            <MenuItem
              @click="openDishInfoModal"
              v-for="(dish, index) in dishList"
              :key="index"
              :img="dish.img"
              :title="dish.title"
              :category="dish.category"
              :price="dish.price"
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import dish1 from "../assets/dish1.png";
import dish2 from "../assets/dish2.png";
import dish3 from "../assets/dish3.png";
import dish4 from "../assets/dish4.png";

import { inject } from "vue";

const { openDishInfoModal } = inject("dishInfoModal");
const dishList = ref([
  {
    img: dish1,
    title: "Куриные крылышки во фритюре",
    category: "Куриные крылышки обжареные во фритюре.",
    price: 2000,
  },
  {
    img: dish2,
    title: "Бараньи ребрышки под соусом",
    category:
      "Бараньи ребрышки обжареная с перцем,репчатым луком и чесноком, в томатном соусе.",
    price: 3000,
  },
  {
    img: dish3,
    title: "Говяжьи палочки хрустящие",
    category: "Говяжьи палочки хрустящие с соусом.",
    price: 2200,
  },
  {
    img: dish4,
    title: "Фунчеза 'Гостеприимство'",
    category:
      "Серая фунчеза обжаривается с добавлениемяйца, джусая, китайского перца ,бобовых ростков",
    price: 2500,
  },
]);
const categories = ["Супы", "Салаты", "Фирменные блюда", "Десерты", "Напитки"];
const activeIndex = ref(0);
const sectionRefs = ref([]);
const menuContainer = ref(null);

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

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
