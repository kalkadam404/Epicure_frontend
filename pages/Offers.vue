<script setup>
import AOS from "aos";
import axios from "axios";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const offers = ref([]);
const tokenJWT = useCookie("token_jwt");
const config = useRuntimeConfig();

const fetchOffers = async () => {
  try {
    const { data } = await axios.get(
      `${config.public.apiBase}/api/v1/offers/offers/`,
      {
        Authorization: `Bearer ${tokenJWT}`,
      }
    );
    offers.value = data.results;
    console.log("fetched offers", offers.value);
  } catch (err) {
    console.log(err);
  }
};

function getLocalized(item, field) {
  const lang = locale.value.toLowerCase();
  return item[`${field}_${lang}`] || item[`${field}_ru`]; // fallback to ru
}

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  fetchOffers();
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
          :title="getLocalized(offer, 'title')"
          :image="offer.image"
          :oldPrice="Number(offer.old_price)"
          :newPrice="Number(offer.new_price)"
          :description="offer.items"
          :badge="offer.badge"
          :peopleCount="offer.people_count"
          :perPerson="offer.per_person"
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
