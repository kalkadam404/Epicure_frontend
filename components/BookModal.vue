<template>
  <div>
    <div
      class="bg-white rounded-xl p-6 w-[600px] max-h-[90vh] overflow-y-auto shadow-xl"
    >
      <!-- Заголовок и индикатор прогресса -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-2xl font-bold">{{ $t("booking") }}</h2>
          <button @click="close" class="text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Индикатор прогресса -->
        <div class="flex items-center mb-4">
          <div v-for="i in 5" :key="i" class="flex items-center">
            <div
              :class="`rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium ${
                step >= i ? 'bg-black text-white' : 'bg-gray-200'
              }`"
            >
              {{ i }}
            </div>
            <div
              v-if="i < 5"
              :class="`h-1 w-12 mx-1 ${step > i ? 'bg-black' : 'bg-gray-200'}`"
            ></div>
          </div>
        </div>

        <!-- Название текущего шага -->
        <h3 class="text-lg font-medium text-gray-600">
          {{ stepTitles[step - 1] }}
        </h3>
      </div>

      <!-- Шаг 1: Выбор ресторана -->
      <div v-if="step === 1" class="space-y-4">
        <!-- Выбор города -->
        <div class="mb-4">
          <label class="block mb-2 font-medium">{{
            $t("buttons.select_city")
          }}</label>
          <select
            v-model="selectedCity"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option v-for="city in cities" :key="city" :value="city.name">
              {{ city.name }}
            </option>
          </select>
        </div>

        <!-- Список ресторанов -->
        <div class="space-y-3">
          <label class="block mb-2 font-medium">{{
            $t("select_restaurant")
          }}</label>
          <div
            v-for="restaurant in filteredRestaurants"
            :key="restaurant.id"
            :class="`flex items-center border rounded-lg p-3 cursor-pointer transition-colors ${
              selectedRestaurant && selectedRestaurant.id === restaurant.id
                ? 'border-black bg-blue-50'
                : 'hover:bg-gray-50'
            }`"
            @click="selectRestaurant(restaurant)"
          >
            <div
              class="w-20 h-20 mr-4 rounded-lg overflow-hidden flex-shrink-0"
            >
              <img
                :src="restaurant.photo"
                :alt="restaurant.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 class="font-medium text-lg">{{ restaurant.name }}</h4>
              <p class="text-sm text-gray-500">{{ restaurant.city.name }}</p>
              <div class="flex items-center mt-1">
                <div class="flex items-center text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span class="ml-1 text-sm">{{ restaurant.rating }}</span>
                </div>
                <span class="mx-2 text-gray-300">•</span>
                <span class="text-sm text-gray-500">{{
                  restaurant.description_ru
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Кнопки навигации -->
        <div class="flex justify-between items-center pt-4">
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            {{ $t("buttons.cancel") }}
          </button>
          <button
            :disabled="!selectedRestaurant"
            @click="nextStep"
            :class="`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedRestaurant
                ? 'bg-gray-900 text-white hover:bg-gray-950'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`"
          >
            {{ $t("buttons.next") }}
          </button>
        </div>
      </div>

      <!-- Шаг 2: Дата, время и количество гостей -->
      <div v-else-if="step === 2" class="space-y-4">
        <!-- Календарь -->
        <div>
          <label class="block mb-2 font-medium">{{ $t("select_date") }}</label>
          <div class="border rounded-lg p-4">
            <div class="flex justify-between items-center mb-4">
              <button
                @click="prevMonth"
                class="p-1 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div class="font-medium">
                {{ currentMonthName }} {{ currentYear }}
              </div>
              <button
                @click="nextMonth"
                class="p-1 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <!-- Дни недели -->
            <div class="grid grid-cols-7 gap-1 mb-1">
              <div
                v-for="day in weekDays"
                :key="day"
                class="text-center text-sm font-medium text-gray-500"
              >
                {{ day }}
              </div>
            </div>

            <!-- Календарные дни -->
            <div class="grid grid-cols-7 gap-1">
              <div
                v-for="(day, index) in calendarDays"
                :key="index"
                :class="`aspect-square flex items-center justify-center rounded-full text-sm cursor-pointer
                     ${day.disabled ? 'text-gray-300 cursor-not-allowed' : ''}
                     ${
                       isSelectedDate(day.date)
                         ? 'bg-black text-white'
                         : day.isToday
                         ? 'border border-black'
                         : 'hover:bg-gray-100'
                     }`"
                @click="!day.disabled && selectDate(day.date)"
              >
                {{ day.number }}
              </div>
            </div>
          </div>
        </div>

        <!-- Кнопки навигации -->
        <div class="flex justify-between items-center pt-4">
          <button @click="prevStep" class="text-gray-500 hover:text-gray-700">
            {{ $t("buttons.back") }}
          </button>
          <button
            :disabled="!isStep1Valid"
            @click="nextStep"
            :class="`px-4 py-2 rounded-lg font-medium transition-colors ${
              isStep1Valid
                ? 'bg-gray-900 text-white hover:bg-gray-950'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`"
          >
            {{ $t("buttons.next") }}
          </button>
        </div>
      </div>

      <div v-else-if="step === 3" class="space-y-4">
        <!-- Выбор времени -->
        <div>
          <label class="block mb-2 font-medium">{{ $t("select_time") }}</label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="time in availableTimes"
              :key="time"
              :class="`py-2 px-3 border rounded text-sm font-medium
                      ${
                        selectedTime === time
                          ? 'bg-black text-white border-black'
                          : 'hover:bg-gray-50'
                      }`"
              @click="selectTime(time)"
            >
              {{ time }}
            </button>
          </div>
        </div>

        <!-- Количество гостей -->
        <div>
          <label class="block mb-2 font-medium">{{ $t("guest_count") }}</label>
          <div class="flex items-center border rounded-lg overflow-hidden">
            <button
              @click="decrementGuests"
              :disabled="form.guests <= 1"
              :class="`p-3 ${
                form.guests <= 1
                  ? 'text-gray-300'
                  : 'text-gray-600 hover:bg-gray-100'
              }`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                />
              </svg>
            </button>
            <div class="flex-1 text-center text-lg font-medium">
              {{ form.guests }}
            </div>
            <button
              @click="incrementGuests"
              :disabled="form.guests >= 10"
              :class="`p-3 ${
                form.guests >= 10
                  ? 'text-gray-300'
                  : 'text-gray-600 hover:bg-gray-100'
              }`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
          <p class="text-sm text-gray-500 mt-1">{{ $t("max_guests") }}</p>
        </div>

        <!-- Кнопки навигации -->
        <div class="flex justify-between items-center pt-4">
          <button @click="prevStep" class="text-gray-500 hover:text-gray-700">
            {{ $t("buttons.back") }}
          </button>
          <button
            :disabled="!isStep1Valid"
            @click="nextStep"
            :class="`px-4 py-2 rounded-lg font-medium transition-colors ${
              isStep1Valid
                ? 'bg-gray-900 text-white hover:bg-gray-950'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`"
          >
            {{ $t("buttons.next") }}
          </button>
        </div>
      </div>

      <!-- Шаг 4: Выбор блюд -->
      <div v-else-if="step === 4">
        <div class="mb-4">
          <label class="block mb-2 font-medium text-lg">{{
            $t("select_dish")
          }}</label>
          <div class="space-y-4">
            <div
              v-for="dish in dishes"
              :key="dish.id"
              :class="`flex justify-between items-center border rounded-lg p-4 transition-colors ${
                selectedDishes.includes(dish)
                  ? 'border-black bg-gray-100'
                  : 'hover:bg-gray-50'
              }`"
            >
              <div class="flex items-center gap-4 flex-1">
                <!-- Изображение блюда -->
                <div class="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    :src="dish.image || '/api/placeholder/200/200'"
                    :alt="getLocalized(dish, 'name')"
                    class="w-full h-full object-cover"
                  />
                </div>

                <!-- Информация о блюде -->
                <div class="flex-1">
                  <h4 class="font-medium text-lg">
                    {{ getLocalized(dish, "name") }}
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ getLocalized(dish, "description") || "Нет описания" }}
                  </p>
                  <div class="text-lg font-medium text-gray-800 mt-2">
                    {{ dish.price }} ₸
                  </div>
                </div>
              </div>

              <!-- Кнопка добавления/удаления -->
              <button
                @click="toggleDish(dish)"
                :class="`ml-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDishes.includes(dish)
                    ? 'bg-black text-white hover:bg-gray-900'
                    : 'border border-black text-black hover:bg-gray-100'
                }`"
              >
                {{ selectedDishes.includes(dish) ? $t("remove") : $t("add") }}
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center pt-4 mt-6">
          <button
            @click="prevStep"
            class="text-gray-500 hover:text-gray-700 font-medium"
          >
            {{ $t("buttons.back") }}
          </button>
          <button
            :disabled="selectedDishes.length === 0"
            @click="nextStep"
            :class="`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedDishes.length > 0
                ? 'bg-black text-white hover:bg-gray-900'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`"
          >
            {{ $t("buttons.next") }}
          </button>
        </div>
      </div>

      <!-- Шаг 5: Подтверждение -->
      <div v-else-if="step === 5">
        <div class="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 class="text-xl font-semibold mb-4">
            {{ $t("booking_details") }}
          </h3>

          <div class="space-y-3">
            <div class="flex items-start">
              <div
                class="min-w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <div>
                <div class="font-medium">{{ $t("restaurant") }}</div>
                <div class="text-gray-600">
                  {{ selectedRestaurant ? selectedRestaurant.name : "—" }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ selectedRestaurant ? selectedRestaurant.address : "—" }}
                </div>
              </div>
            </div>

            <div class="flex items-start">
              <div
                class="min-w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <div class="font-medium">{{ $t("date_time") }}</div>
                <div class="text-gray-600">
                  {{ formatDate(selectedDate) }} {{ selectedTime }}
                </div>
              </div>
            </div>

            <div class="flex items-start">
              <div
                class="min-w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <div class="font-medium">{{ $t("guest_count") }}</div>
                <div class="text-gray-600">
                  {{ form.guests }} {{ getGuestWord(form.guests) }}
                </div>
              </div>
            </div>

            <div class="flex items-start">
              <div
                class="min-w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <div class="font-medium">{{ $t("selected_dishes") }}</div>
                <ul class="text-gray-600 mt-1">
                  <li
                    v-for="dish in selectedDishes"
                    :key="dish.id"
                    class="flex items-center"
                  >
                    <span class="mr-2">•</span>
                    {{ getLocalized(dish, "name") }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t pt-4 mt-4">
          <div class="flex justify-between mb-2">
            <span class="font-medium">{{ $t("pre_total") }}</span>
            <span class="font-medium">{{ calculateTotal }} ₸</span>
          </div>
          <p class="text-sm text-gray-500 mb-4">
            {{ $t("full_price_note") }}
          </p>
        </div>

        <div class="flex justify-between items-center pt-4">
          <button @click="prevStep" class="text-gray-500 hover:text-gray-700">
            {{ $t("buttons.back") }}
          </button>
          <button
            @click="createReservation"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            {{ $t("proceed_payment") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  script: [
    {
      src: "https://js.stripe.com/v3/",
    },
  ],
});

const props = defineProps({
  dishes: {
    type: Array,
    default: () => [],
  },
});
import axios from "axios";
import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const { t } = useI18n();
const selectedDishes = ref([]);
const step = ref(1);
const userStore = useAuthStore();

const stepTitles = [
  t("step_restaurant"),
  t("step_date"),
  t("step_time_guests"),
  t("step_dishes"),
  t("step_confirm"),
];

// Данные для календаря
const currentDate = ref(new Date());
const selectedDate = ref(new Date());
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const weekDays = [
  t("weekdays.mon"),
  t("weekdays.tue"),
  t("weekdays.wed"),
  t("weekdays.thu"),
  t("weekdays.fri"),
  t("weekdays.sat"),
  t("weekdays.sun"),
];
const selectedTime = ref(null);

// Доступные времена для бронирования
const availableTimes = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

const emit = defineEmits(["closeBookModal"]);
const close = () => emit("closeBookModal");

const form = reactive({
  datetime: "",
  guests: 1,
});

// Вычисляемое свойство для текущего месяца в текстовом виде
const currentMonthName = computed(() => {
  const months = [
    t("months.jan"),
    t("months.feb"),
    t("months.mar"),
    t("months.apr"),
    t("months.may"),
    t("months.jun"),
    t("months.jul"),
    t("months.aug"),
    t("months.sep"),
    t("months.oct"),
    t("months.nov"),
    t("months.dec"),
  ];
  return months[currentMonth.value];
});

const cities = ref([]);
const selectedCity = ref("Алматы");
const selectedRestaurant = ref(null);

// Данные для ресторанов
const restaurants = ref([]);

// Фильтрация ресторанов по выбранному городу
const filteredRestaurants = computed(() => {
  if (!restaurants.value || !Array.isArray(restaurants.value)) {
    return [];
  }

  return restaurants.value.filter(
    (restaurant) =>
      restaurant.city && restaurant.city.name === selectedCity.value
  );
});

// Функция для выбора ресторана
const selectRestaurant = (restaurant) => {
  selectedRestaurant.value = restaurant;
};

// Вычисляемое свойство для всех дней в календаре
const calendarDays = computed(() => {
  let days = [];

  // Первый день месяца
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  // Получаем день недели (0 - воскресенье, 1 - понедельник, и т.д.)
  let firstDayOfWeek = firstDay.getDay() || 7; // Преобразуем 0 (воскресенье) в 7
  firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek; // Преобразуем 0 (воскресенье) в 7

  // Последний день предыдущего месяца
  const lastDayPrevMonth = new Date(
    currentYear.value,
    currentMonth.value,
    0
  ).getDate();

  // Добавляем дни из предыдущего месяца
  for (let i = firstDayOfWeek - 1; i > 0; i--) {
    const day = lastDayPrevMonth - i + 1;
    days.push({
      number: day,
      date: new Date(currentYear.value, currentMonth.value - 1, day),
      disabled: true,
    });
  }

  // Количество дней в текущем месяце
  const daysInMonth = new Date(
    currentYear.value,
    currentMonth.value + 1,
    0
  ).getDate();

  // Добавляем дни текущего месяца
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    const isToday = date.getTime() === today.getTime();
    // Блокируем прошедшие дни
    const disabled = date < today;

    days.push({
      number: i,
      date,
      isToday,
      disabled,
    });
  }

  // Заполняем оставшиеся ячейки следующим месяцем
  const nextMonthDays = 42 - days.length; // 42 = 6 строк по 7 дней
  for (let i = 1; i <= nextMonthDays; i++) {
    days.push({
      number: i,
      date: new Date(currentYear.value, currentMonth.value + 1, i),
      disabled: true,
    });
  }

  return days;
});

// Функции для работы с календарём
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const isSelectedDate = (date) => {
  if (!selectedDate.value || !date) return false;
  return (
    date.getDate() === selectedDate.value.getDate() &&
    date.getMonth() === selectedDate.value.getMonth() &&
    date.getFullYear() === selectedDate.value.getFullYear()
  );
};

const selectDate = (date) => {
  selectedDate.value = date;
  updateFormDateTime();
};

const selectTime = (time) => {
  selectedTime.value = time;
  updateFormDateTime();
};

const updateFormDateTime = () => {
  if (selectedDate.value && selectedTime.value) {
    const [hours, minutes] = selectedTime.value.split(":");
    const datetime = new Date(selectedDate.value);
    datetime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    // Формат YYYY-MM-DDTHH:MM
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, "0");
    const day = String(datetime.getDate()).padStart(2, "0");
    const hour = String(datetime.getHours()).padStart(2, "0");
    const minute = String(datetime.getMinutes()).padStart(2, "0");

    form.datetime = `${year}-${month}-${day}T${hour}:${minute}`;
  }
};

// Валидация первого шага
const isStep1Valid = computed(() => {
  return form.datetime && form.guests >= 1;
});

// Функции для управления количеством гостей
const incrementGuests = () => {
  if (form.guests < 10) form.guests++;
};

const decrementGuests = () => {
  if (form.guests > 1) form.guests--;
};

const nextStep = () => {
  if (step.value < 5) step.value++;
};

const prevStep = () => {
  if (step.value > 1) step.value--;
};

const toggleDish = (dish) => {
  const index = selectedDishes.value.indexOf(dish);
  if (index === -1) selectedDishes.value.push(dish);
  else selectedDishes.value.splice(index, 1);
};

function getLocalized(item, field) {
  if (!item) return "";
  const lang = locale.value ? locale.value.toLowerCase() : "ru";
  return item[`${field}_${lang}`] || item[`${field}_ru`]; // fallback to ru
}
import dayjs from "dayjs";
import "dayjs/locale/kk";
let locale_kz = "ru";
if (locale.value == "KZ") {
  locale_kz = "kk";
}
// Форматирование даты
const formatDate = (date) => {
  if (!date) return "";

  const options = { day: "numeric", month: "long", year: "numeric" };
  return dayjs(date).locale(locale_kz).format("D MMMM YYYY");
};

// Склонение слова "гость"
const getGuestWord = (count) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return t("guest.singular");
  } else if (
    [2, 3, 4].includes(lastDigit) &&
    ![12, 13, 14].includes(lastTwoDigits)
  ) {
    return t("guest.dual");
  } else {
    return t("guest.plural");
  }
};

// Расчет предварительной стоимости (демо)
// const calculateTotal = () => {};
const calculateTotal = computed(() => {
  return selectedDishes.value.reduce((sum, dish) => {
    return sum + Number(dish.price || 0);
  }, 0);
});
const fetchRestaurants = async () => {
  try {
    const { data } = await axios.get(
      `${config.public.apiBase}/api/v1/restaurants/`
    );
    restaurants.value = data.results;
    console.log("restaurants", restaurants.value);
  } catch (err) {
    console.log(err);
  }
};

const fetchCities = async () => {
  try {
    const { data } = await axios.get(`${config.public.apiBase}/api/v1/cities/`);
    cities.value = data.results;
    console.log("cities", cities.value);
  } catch (err) {
    console.error("Ошибка загрузки городов:", err);
  }
};

const tokenJWT = useCookie("token_jwt");
const config = useRuntimeConfig();
console.log("JWT Token:", tokenJWT.value);

const endtime = computed(() => {
  if (!selectedTime.value) return null;
  const [hours, minutes] = selectedTime.value.split(":").map(Number);
  const endHours = hours + 1;
  return `${String(endHours).padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:00`;
});

const tableId = ref("");

const fetchTable = async () => {
  try {
    const { data } = await axios.get(
      `${config.public.apiBase}/api/v1/room/restaurant/${selectedRestaurant.value?.id}/tables/`
    );
    tableId.value = data.sections?.[0]?.tables?.[0].uuid;
    console.log("tableid", tableId.value);
  } catch (err) {
    console.log(err);
  }
};

const createReservation = async () => {
  await fetchTable();
  try {
    const { data } = await axios.post(
      `${config.public.apiBase}/api/v1/room/reservations/`,
      {
        restaurant: selectedRestaurant.value?.id,
        table: tableId.value,
        reservation_date: form.datetime.split("T")[0],
        start_time: selectedTime.value,
        end_time: endtime.value,
        guest_count: form.guests,
        guest_name: userStore.username,
        guest_phone: userStore.phone_number,
        guest_email: userStore.email,
        menu_items: selectedDishes.value.map((dish) => ({
          menu_item: dish.id,
          quantity: 1, // при необходимости изменить
        })),
      }
    );
    const reservationId = data.id; // ⬅️ Тут получаешь ID
    console.log("Reservation создан:", reservationId);
    await redirectToCheckout(reservationId);
  } catch (err) {
    console.log(err);
  }
};

const redirectToCheckout = async (reservationId) => {
  // const stripe = window.Stripe(config.public.STRIPE_PUBLISHABLE_KEY);

  try {
    const response = await axios.post(
      `${config.public.apiBase}/api/v1/payments/checkout/`,
      {
        reservation_id: reservationId,
      },
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${tokenJWT.value.access}`,
        },
      }
    );

    const sessionId = response.data.session_id;

    if (!sessionId) {
      console.error("Session ID отсутствует:", response.data);
      return;
    }

    console.log("Redirecting with Session ID:", sessionId);

    // const result = await stripe.redirectToCheckout({
    //   sessionId: sessionId,
    // });
    window.location.href = response.data.checkout_url;

    if (result.error) {
      console.error("Stripe redirect error:", result.error.message);
    }
  } catch (err) {
    console.log("Error:", err);
  }
};

onMounted(async () => {
  // Устанавливаем текущую дату как выбранную по умолчанию
  selectDate(new Date());
  // Устанавливаем время по умолчанию (первое доступное)
  if (availableTimes.length > 0) {
    selectTime(availableTimes[0]);
  }
  await fetchRestaurants();
  await fetchCities();
  await userStore.fetchUserProfile();
});
</script>
