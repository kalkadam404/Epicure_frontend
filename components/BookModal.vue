<script setup>
const emit = defineEmits(["closeBookModal"]);
</script>

<template>
  <div>
    <div
      class="relative bg-white w-full max-w-lg rounded-lg shadow-lg p-6 mx-4"
    >
      <img
        src="../assets/close.svg"
        class="absolute top-4 right-4 w-8 h-8 cursor-pointer"
        alt=""
        @click="$emit('closeBookModal')"
      />
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ $t("BookModal.book") }}
        </h2>
        <button class="text-gray-400 hover:text-gray-600">
          <X size="{24}" />
        </button>
      </div>

      <div class="border-b border-gray-200 pb-6 mb-6">
        <p class="text-gray-600 mb-6">
          {{ $t("BookModal.description") }}
        </p>

        <div class="mb-4">
          <label class="block text-gray-600 mb-2">{{ $t("restaurant") }}</label>
          <div class="relative">
            <select
              class="w-full p-4 border border-gray-300 rounded-lg appearance-none text-gray-800 pr-10"
            >
              <option>Epicure Жарокова</option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-black"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-gray-600 mb-2">{{
              $t("BookModal.day")
            }}</label>
            <div class="relative">
              <div
                class="w-full p-4 border border-gray-300 rounded-lg flex justify-between items-center text-gray-400"
              >
                <span>{{ $t("inputs.select_day") }}</span>
                <img src="../assets/calendar.svg" />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-gray-600 mb-2">{{
              $t("BookModal.time")
            }}</label>
            <div class="relative">
              <div
                class="w-full p-4 border border-gray-300 rounded-lg flex justify-between items-center text-gray-400"
              >
                <span>{{ $t("inputs.select_time") }}</span>
                <img src="../assets/time.svg" />
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-600 mb-2">{{
            $t("BookModal.count")
          }}</label>
          <div class="relative">
            <input
              type="number"
              value="2"
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-800"
            />
            <div class="absolute inset-y-0 right-0 flex items-center">
              <div class="w-64 h-2 bg-gray-200 rounded-full mr-4">
                <div class="h-full w-1/3 bg-black rounded-full relative">
                  <div
                    class="absolute -top-2 right-0 w-6 h-6 bg-black rounded-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-gray-600 mb-2">{{
            $t("inputs.phone")
          }}</label>
          <input
            type="tel"
            placeholder="+7 (___) ___-__-__"
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-800"
          />
        </div>
      </div>

      <button
        class="w-full bg-black hover:bg-gray-950 text-white font-medium py-4 px-6 rounded-lg"
      >
        {{ $t("buttons.done") }}
      </button>
    </div>
  </div>
</template>
