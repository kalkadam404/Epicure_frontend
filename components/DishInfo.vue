<template>
  <div
    class="relative bg-white w-[550px] shadow-xl flex flex-col items-start rounded-lg gap-5 py-9 px-10 m-auto"
  >
    <img
      src="../assets/close.svg"
      class="absolute top-4 right-4 w-8 h-8 cursor-pointer"
      alt=""
      @click="$emit('closeDishInfoModal')"
    />
    <div>
      <div class="text-2xl font-bold">Информация о блюде</div>
    </div>

    <div
      class="flex flex-col gap-4 w-full border-t border-b border-[#afafaf] pt-5 pb-5"
    >
      <div class="font-bold text-xl">Куриные крылышки во фритюре</div>
      <div class="text-base">
        Отварные куриные крылья, маринованные с китайскими специями в панировке
        и обжаренные до хрустящей корочки
      </div>
      <div class="font-bold text-lg">3500.00 ₸</div>
    </div>
    <div class="flex flex-col gap-4 w-full border-b border-[#afafaf] pb-5">
      <div class="font-bold text-xl">Пищевая ценность</div>
      <div class="flex gap-4 items-center justify-center">
        <div class="flex flex-col items-center gap-2">
          <div class="font-bold">1 ккал</div>
          <span>Калории</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="font-bold">120.00 г</div>
          <span>Белки</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="font-bold">100.00 г</div>
          <span>Жиры</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="font-bold">Н/Д</div>
          <span>Углеводы</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4 w-full border-b border-[#afafaf] pb-5">
      <div class="font-bold text-xl">Ресторан</div>
      <span class="text-[#9D9D9D]">Chez Milo</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const emit = defineEmits(["closeDishInfoModal"]);
</script>
