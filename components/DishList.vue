<script setup>
import dish1 from "../assets/dish1.png";
import dish2 from "../assets/dish2.png";
import dish3 from "../assets/dish3.png";
import dish4 from "../assets/dish4.png";
const dishList = ref([
  {
    img: dish1,
    title: "Pepperoni",
    restaurant: "Chez Milo",
    category: "Menu",
    price: 2000,
  },
  {
    img: dish2,
    title: "Beef Steak",
    restaurant: "Chez Milo",
    category: "Menu",
    price: 3000,
  },
  {
    img: dish3,
    title: "Omelette",
    restaurant: "Chez Milo",
    category: "Menu",
    price: 2200,
  },
  {
    img: dish4,
    title: "Cool Cocktail",
    restaurant: "Chez Milo",
    category: "Menu",
    price: 2500,
  },
]);
</script>

<template>
  <div class="flex flex-col mt-12" data-aos="fade-up">
    <div class="flex w-full items-center justify-between">
      <div class="font-bold text-3xl">Популярные блюда</div>
      <div class="flex items-center gap-4">
        <div class="rounded-full border-2 border-[#E6E8EC]">
          <img
            src="../assets/arrow_left.svg"
            class="w-[30px] h-[30px]"
            alt=""
          />
        </div>
        <div class="rounded-full border-2 border-[#E6E8EC]">
          <img
            src="../assets/arrow_right.svg"
            class="w-[30px] h-[30px]"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-8 mt-10">
      <DishCard
        v-for="(dish, index) in dishList"
        :key="index"
        :img="dish.img"
        :title="dish.title"
        :restaurant="dish.restaurant"
        :category="dish.category"
        :price="dish.price"
      />
    </div>
  </div>
</template>
