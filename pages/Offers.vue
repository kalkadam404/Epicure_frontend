<script setup>
import resdinner from "../assets/romantic_dinner.png";
import familydinner from "../assets/family_dinner.png";
import businnesdinner from "../assets/businnes_dinner.png";
import AOS from "aos";

const offers = [
  {
    title: "Романтический вечер",
    image: resdinner,
    oldPrice: 14990,
    newPrice: 7990,
    description: [
      "Ужин из 3 блюд на двоих",
      "Бутылка вина на выбор",
      "Десерт-комплимент",
      "Свечи и цветочное оформление",
    ],
    badge: "-20%",
    peopleCount: 2,
    perPerson: false,
  },
  {
    title: "Семейный обед",
    image: familydinner,
    oldPrice: 8490,
    newPrice: 8490,
    description: [
      "Сет из 5 фирменных блюд",
      "Напитки для всей семьи",
      "Детское меню включено",
      "Игровая зона для детей",
    ],
    badge: "Хит",
    peopleCount: 4,
    perPerson: false,
  },
  {
    title: "Бизнес-ланч",
    image: businnesdinner,
    oldPrice: 1990,
    newPrice: 1990,
    description: [
      "Салат + суп + горячее",
      "Напиток на выбор",
      "Обслуживание за 45 минут",
      "Бесплатный Wi-Fi",
    ],
    badge: "Быстро",
    peopleCount: 1,
    perPerson: true,
  },
];

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  // Обновим AOS если данные могли загружаться позже
  AOS.refresh();
});
</script>

<template>
  <section class="py-16 bg-white">
    <!-- Заголовок секции -->
    <div class="container mx-auto px-4 mb-12 text-center">
      <h2 class="text-4xl md:text-5xl font-bold text-black mb-4">
        {{ $t("offers_section.title") }}
      </h2>
      <p class="text-gray-700 text-lg max-w-2xl mx-auto">
        {{ $t("offers_section.description") }}
      </p>
      <div class="w-20 h-1 bg-black mx-auto mt-6"></div>
    </div>

    <!-- Пакеты предложений -->
    <div class="px-20 mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <OfferCard
          v-for="(offer, index) in offers"
          :key="index"
          :title="offer.title"
          :image="offer.image"
          :oldPrice="offer.oldPrice"
          :newPrice="offer.newPrice"
          :description="offer.description"
          :badge="offer.badge"
          :peopleCount="offer.peopleCount"
          :perPerson="offer.perPerson"
          :dataAos="index % 2 === 0 ? 'fade-up' : 'fade-down'"
        />
      </div>
    </div>

    <div class="px-20 mb-5">
      <BonusAppPromo />
    </div>

    <!-- Дополнительная информация -->
    <div class="mx-auto mt-16 px-20">
      <div class="bg-gray-100 p-8 rounded-lg text-center">
        <h3 class="text-2xl font-bold text-black mb-4">
          {{ $t("offers_section.for_subscribers") }}
        </h3>
        <p class="text-gray-700 mb-6">
          {{ $t("offers_section.for_subscribers_description") }}
        </p>

        <div class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            :placeholder="$t('inputs.your_email')"
            class="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            class="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            {{ $t("buttons.subscribe") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
