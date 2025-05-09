<template>
  <section class="py-16 bg-white">
    <!-- Заголовок секции -->
    <div class="container mx-auto px-4 mb-12 text-center">
      <h2 class="text-4xl md:text-5xl font-bold text-black mb-4">
        Специальные предложения
      </h2>
      <p class="text-gray-700 text-lg max-w-2xl mx-auto">
        Эксклюзивные пакеты и акции для незабываемых моментов в нашем ресторане
      </p>
      <div class="w-20 h-1 bg-black mx-auto mt-6"></div>
    </div>

    <!-- Пакеты предложений -->
    <div class="px-20 mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Пакет 1: Романтический ужин -->
        <div
          class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-gray-100"
        >
          <!-- Бейдж скидки -->
          <div
            class="absolute top-4 right-4 bg-black text-white text-sm px-3 py-1 rounded-full font-semibold z-10"
          >
            -20%
          </div>

          <!-- Изображение -->
          <div class="h-64 overflow-hidden">
            <img
              src="../assets/romantic_dinner.png"
              alt="Романтический ужин"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <!-- Контент -->
          <div class="p-6">
            <h3 class="text-2xl font-bold text-black mb-2">
              Романтический вечер
            </h3>
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-gray-500 line-through">14990 ₸</span>
              <span class="text-black font-bold text-xl">7990 ₸</span>
              <span class="text-gray-700 text-sm">/ на двоих</span>
            </div>

            <ul class="space-y-2 mb-6">
              <li class="flex items-center text-gray-700">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Ужин из 3 блюд на двоих
              </li>
              <li class="flex items-center text-gray-700">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Бутылка вина на выбор
              </li>
              <li class="flex items-center text-gray-700">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Десерт-комплимент
              </li>
              <li class="flex items-center text-gray-700">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Свечи и цветочное оформление
              </li>
            </ul>

            <button
              class="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Забронировать столик
            </button>
          </div>
        </div>

        <!-- Пакет 2: Семейный обед -->
        <div
          class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-gray-100"
        >
          <!-- Бейдж -->
          <div
            class="absolute top-4 right-4 bg-black text-white text-sm px-3 py-1 rounded-full font-semibold z-10"
          >
            Хит
          </div>

          <!-- Изображение -->
          <div class="h-64 overflow-hidden">
            <img
              src="../assets/family_dinner.png"
              alt="Семейный обед"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <!-- Контент -->
          <div class="p-6">
            <h3 class="text-2xl font-bold text-black mb-2">Семейный обед</h3>
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-black font-bold text-xl">8490 ₸</span>
              <span class="text-gray-700 text-sm">/ до 4 персон</span>
            </div>

            <ul class="space-y-2 mb-6">
              <li class="flex items-center text-gray-700">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Сет из 5 фирменных блюд
              </li>
              <li class="flex items-center text-gray-700">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Напитки для всей семьи
              </li>
              <li class="flex items-center text-gray-700">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Детское меню включено
              </li>
              <li class="flex items-center text-gray-700">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Игровая зона для детей
              </li>
            </ul>

            <button
              class="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Забронировать столик
            </button>
          </div>
        </div>

        <!-- Пакет 3: Бизнес-ланч -->
        <div
          class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-gray-100"
        >
          <!-- Бейдж скидки -->
          <div
            class="absolute top-4 right-4 bg-black text-white text-sm px-3 py-1 rounded-full font-semibold z-10"
          >
            Быстро
          </div>

          <!-- Изображение -->
          <div class="h-64 overflow-hidden">
            <img
              src="../assets/businnes_dinner.png"
              alt="Бизнес-ланч"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <!-- Контент -->
          <div class="p-6">
            <h3 class="text-2xl font-bold text-black mb-2">Бизнес-ланч</h3>
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-black font-bold text-xl">1990 ₸</span>
              <span class="text-gray-700 text-sm">/ на персону</span>
            </div>

            <ul class="space-y-2 mb-6">
              <li class="flex items-center text-gray-700">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Салат + суп + горячее
              </li>
              <li class="flex items-center text-gray-700">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Напиток на выбор
              </li>
              <li class="flex items-center text-gray-700">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Обслуживание за 45 минут
              </li>
              <li class="flex items-center text-gray-700">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Бесплатный Wi-Fi
              </li>
            </ul>

            <button
              class="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Забронировать столик
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="px-20 mb-5">
      <BonusAppPromo />
    </div>

    <!-- Дополнительная информация -->
    <div class="mx-auto mt-16 px-20">
      <div class="bg-gray-100 p-8 rounded-lg text-center">
        <h3 class="text-2xl font-bold text-black mb-4">
          Специальное предложение для подписчиков
        </h3>
        <p class="text-gray-700 mb-6">
          Подпишитесь на нашу рассылку и получите дополнительную скидку 10% на
          любой пакет
        </p>

        <div class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Ваш email"
            class="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            class="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Подписаться
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Здесь можно добавить логику, если необходимо
</script>
