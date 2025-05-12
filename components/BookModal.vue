<template>
  <div>
    <div
      class="bg-white rounded-xl p-6 w-[600px] max-h-[90vh] overflow-y-auto shadow-xl"
    >
      <!-- Заголовок и индикатор прогресса -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-2xl font-bold">Бронирование</h2>
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
          <div v-for="i in 4" :key="i" class="flex items-center">
            <div
              :class="`rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium ${
                step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`"
            >
              {{ i }}
            </div>
            <div
              v-if="i < 4"
              :class="`h-1 w-12 mx-1 ${
                step > i ? 'bg-blue-600' : 'bg-gray-200'
              }`"
            ></div>
          </div>
        </div>

        <!-- Название текущего шага -->
        <h3 class="text-lg font-medium text-gray-600">
          {{ stepTitles[step - 1] }}
        </h3>
      </div>

      <!-- Шаг 1: Дата, время и количество гостей -->
      <div v-if="step === 1" class="space-y-4">
        <!-- Календарь -->
        <div>
          <!-- <label class="block mb-2 font-medium">Выберите дату</label> -->
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
                         ? 'bg-blue-600 text-white'
                         : day.isToday
                         ? 'border border-blue-600'
                         : 'hover:bg-gray-100'
                     }`"
                @click="!day.disabled && selectDate(day.date)"
              >
                {{ day.number }}
              </div>
            </div>
          </div>
        </div>

        <!-- Выбор времени -->
        <!-- <div>
          <label class="block mb-2 font-medium">Выберите время</label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="time in availableTimes"
              :key="time"
              :class="`py-2 px-3 border rounded text-sm font-medium
                      ${
                        selectedTime === time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'hover:bg-gray-50'
                      }`"
              @click="selectTime(time)"
            >
              {{ time }}
            </button>
          </div>
        </div> -->

        <!-- Количество гостей -->
        <!-- <div>
          <label class="block mb-2 font-medium">Количество гостей</label>
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
          <p class="text-sm text-gray-500 mt-1">Максимум 10 гостей</p>
        </div> -->

        <!-- Кнопки навигации -->
        <div class="flex justify-between items-center pt-4">
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            Отмена
          </button>
          <button
            :disabled="!isStep1Valid"
            @click="nextStep"
            :class="`px-4 py-2 rounded-lg font-medium transition-colors ${
              isStep1Valid
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`"
          >
            Далее
          </button>
        </div>
      </div>

      <div v-if="step === 2" class="space-y-4">
        <!-- Выбор времени -->
        <div>
          <label class="block mb-2 font-medium">Выберите время</label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="time in availableTimes"
              :key="time"
              :class="`py-2 px-3 border rounded text-sm font-medium
                      ${
                        selectedTime === time
                          ? 'bg-blue-600 text-white border-blue-600'
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
          <label class="block mb-2 font-medium">Количество гостей</label>
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
          <p class="text-sm text-gray-500 mt-1">Максимум 10 гостей</p>
        </div>

        <!-- Кнопки навигации -->
        <div class="flex justify-between items-center pt-4">
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            Отмена
          </button>
          <button
            :disabled="!isStep1Valid"
            @click="nextStep"
            :class="`px-4 py-2 rounded-lg font-medium transition-colors ${
              isStep1Valid
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`"
          >
            Далее
          </button>
        </div>
      </div>

      <!-- Шаг 2: Выбор блюд -->
      <div v-else-if="step === 3">
        <div class="mb-4">
          <label class="block mb-2 font-medium"
            >Выберите хотя бы одно блюдо</label
          >
          <div class="space-y-3">
            <div
              v-for="dish in dishes"
              :key="dish.id"
              :class="`flex justify-between items-center border rounded-lg p-3 transition-colors ${
                selectedDishes.includes(dish)
                  ? 'border-blue-600 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium">{{ getLocalized(dish, "name") }}</h4>
                  <p class="text-sm text-gray-500">
                    {{ getLocalized(dish, "description") || "Нет описания" }}
                  </p>
                </div>
              </div>
              <button
                @click="toggleDish(dish)"
                :class="`text-sm px-3 py-1 rounded-lg font-medium ${
                  selectedDishes.includes(dish)
                    ? 'bg-blue-600 text-white'
                    : 'border border-blue-600 text-blue-600'
                }`"
              >
                {{ selectedDishes.includes(dish) ? "Убрать" : "Добавить" }}
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center pt-4">
          <button @click="prevStep" class="text-gray-500 hover:text-gray-700">
            Назад
          </button>
          <button
            :disabled="selectedDishes.length === 0"
            @click="nextStep"
            :class="`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedDishes.length > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`"
          >
            Далее
          </button>
        </div>
      </div>

      <!-- Шаг 3: Подтверждение -->
      <div v-else-if="step === 4">
        <div class="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 class="text-xl font-semibold mb-4">Детали бронирования</h3>

          <div class="space-y-3">
            <div class="flex items-start">
              <div
                class="min-w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-blue-600"
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
                <div class="font-medium">Дата и время</div>
                <div class="text-gray-600">
                  {{ formatDate(selectedDate) }} {{ selectedTime }}
                </div>
              </div>
            </div>

            <div class="flex items-start">
              <div
                class="min-w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-blue-600"
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
                <div class="font-medium">Количество гостей</div>
                <div class="text-gray-600">
                  {{ form.guests }} {{ getGuestWord(form.guests) }}
                </div>
              </div>
            </div>

            <div class="flex items-start">
              <div
                class="min-w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-blue-600"
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
                <div class="font-medium">Выбранные блюда</div>
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
            <span class="font-medium">Предварительная сумма:</span>
            <span class="font-medium">{{ calculateTotal() }} ₸</span>
          </div>
          <p class="text-sm text-gray-500 mb-4">
            Полная стоимость будет рассчитана после подтверждения бронирования
          </p>
        </div>

        <div class="flex justify-between items-center pt-4">
          <button @click="prevStep" class="text-gray-500 hover:text-gray-700">
            Назад
          </button>
          <button
            @click="redirectToCheckout"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Перейти к оплате
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
// import { loadStripe } from "@stripe/stripe-js";
// const stripePromise = loadStripe(useRuntimeConfig().STRIPE_PUBLISHABLE_KEY);
const { locale } = useI18n();
const selectedDishes = ref([]);
const step = ref(1);

const stepTitles = ["Выбор даты и времени", "Выбор блюд", "Подтверждение"];

// Данные для календаря
const currentDate = ref(new Date());
const selectedDate = ref(new Date());
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
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

const props = defineProps({
  dishes: {
    type: Array,
    default: () => [
      {
        id: 1,
        name_ru: "Борщ",
        name_en: "Borsch",
        description_ru: "Традиционный украинский суп",
      },
      {
        id: 2,
        name_ru: "Цезарь с курицей",
        name_en: "Chicken Caesar",
        description_ru: "Классический салат",
      },
      {
        id: 3,
        name_ru: "Паста Карбонара",
        name_en: "Pasta Carbonara",
        description_ru: "Итальянская паста с соусом",
      },
    ],
  },
});

const emit = defineEmits(["closeBookModal"]);
const close = () => emit("closeBookModal");

const form = reactive({
  datetime: "",
  guests: 1,
});

// Вычисляемое свойство для текущего месяца в текстовом виде
const currentMonthName = computed(() => {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return months[currentMonth.value];
});

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
  if (step.value < 4) step.value++;
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

// Форматирование даты
const formatDate = (date) => {
  if (!date) return "";

  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("ru-RU", options);
};

// Склонение слова "гость"
const getGuestWord = (count) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return "гость";
  } else if (
    [2, 3, 4].includes(lastDigit) &&
    ![12, 13, 14].includes(lastTwoDigits)
  ) {
    return "гостя";
  } else {
    return "гостей";
  }
};

// Расчет предварительной стоимости (демо)
const calculateTotal = () => {
  // Демо расчет, в реальном приложении здесь будет настоящая логика
  const basePrice = 1000; // Базовая стоимость бронирования
  const dishPrice = 500; // Средняя стоимость блюда

  return basePrice + selectedDishes.value.length * dishPrice;
};

const redirectToCheckout = async () => {
  try {
    // const stripe = await stripePromise;

    const response = await axios.post(
      "http://0.0.0.0:8000/api/v1/create-checkout-session/",
      {
        reservation: {
          datetime: form.datetime,
          guests: form.guests,
        },
        selectedDishes: selectedDishes.value.map((dish) => dish.id),
      }
    );

    const session = response.data;

    // const result = await stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });

    // if (result.error) {
    //   console.error(result.error.message);
    // }

    console.log("Перенаправление на оплату:", {
      datetime: form.datetime,
      guests: form.guests,
      dishes: selectedDishes.value.map((dish) => dish.id),
    });

    // Временное решение, пока нет реального Stripe
    alert("Перенаправление на страницу оплаты...");
  } catch (error) {
    console.error("Ошибка при создании сессии оплаты:", error);
    alert(
      "Произошла ошибка при переходе к оплате. Пожалуйста, попробуйте еще раз."
    );
  }
};

// Инициализация при загрузке компонента
onMounted(() => {
  // Устанавливаем текущую дату как выбранную по умолчанию
  selectDate(new Date());
  // Устанавливаем время по умолчанию (первое доступное)
  if (availableTimes.length > 0) {
    selectTime(availableTimes[0]);
  }
});
</script>
