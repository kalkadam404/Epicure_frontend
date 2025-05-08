<template>
  <div
    class="relative bg-white w-[550px] shadow-xl flex flex-col items-start rounded-lg gap-3 py-9 px-10 m-auto"
  >
    <img
      src="../assets/close.svg"
      class="absolute top-4 right-4 w-8 h-8 cursor-pointer"
      alt=""
      @click="$emit('closeCityModal')"
    />
    <div>
      <div class="text-2xl font-bold">Выберите город</div>
    </div>
    <div class="flex flex-col gap-4 w-full border-t border-[#afafaf] pt-5">
      <div class="flex gap-4 rounded-[10px] border border-[#9D9D9D] py-3 px-4">
        <img src="../assets/ellipse.svg" alt="" />
        <div>Almaty</div>
      </div>
      <div class="flex gap-4 rounded-[10px] border border-[#9D9D9D] py-3 px-4">
        <img src="../assets/ellipse.svg" alt="" />
        <div>Astana</div>
      </div>
      <div class="flex gap-4 rounded-[10px] border border-[#9D9D9D] py-3 px-4">
        <img src="../assets/ellipse.svg" alt="" />
        <div>Shymkent</div>
      </div>
    </div>
    <div class="mt-6">
      <button
        class="flex items-center gap-2 bg-black text-white rounded-[10px] py-3 px-5"
      >
        <img src="../assets/select.svg" alt="" />
        Выбрать
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const emit = defineEmits(["closeCityModal"]);
</script>
