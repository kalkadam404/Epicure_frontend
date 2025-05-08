<script setup>
import res1 from "../assets/res1.png";
import res2 from "../assets/res2.png";
import res3 from "../assets/res3.png";

import { inject } from "vue";

const { openCityModal } = inject("cityModal");
const restaurants = ref([
  {
    img: res1,
    ResName: "Chez Milo",
    city: "Almaty",
    menuType: "Европейская, Азиатская кухня",
    time: "10:00 - 22:00",
    rating: "5.0",
  },
  {
    img: res2,
    ResName: "Cafe Gourmet",
    city: "Almaty",
    menuType: "Французская кухня",
    time: "09:00 - 23:00",
    rating: "4.8",
  },
  {
    img: res3,
    ResName: "Cafe Gourmet",
    city: "Almaty",
    menuType: "Французская кухня",
    time: "09:00 - 23:00",
    rating: "4.8",
  },
]);
</script>

<template>
  <div class="flex flex-col mt-10" data-aos="fade-up">
    <div class="flex w-full items-center justify-between">
      <div class="font-bold text-3xl">Рестораны в Алматы</div>
      <div
        class="flex items-center gap-1 bg-[#EDEDED] rounded-[20px] px-5 py-2 cursor-pointer"
        @click="openCityModal"
      >
        <img src="../assets/loc.svg" alt="" />
        <div class="font-medium text-lg">Выберите город</div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-8 mt-10">
      <RestaurantCard
        v-for="(res, index) in restaurants"
        :key="index"
        :img="res.img"
        :ResName="res.ResName"
        :city="res.city"
        :menuType="res.menuType"
        :time="res.time"
        :rating="res.rating"
      />
    </div>
  </div>
</template>
