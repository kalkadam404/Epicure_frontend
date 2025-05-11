<script setup>
import me from "../assets/me.jpeg";
import alzhik from "../assets/alzhik.jpg";
import abu from "../assets/abu.jpg";
import dauka from "../assets/dauka.jpg";
const { t } = useI18n();
const persons = [
  {
    img: alzhik,
    name: "Дарибаев Әлжан",
    job: t("our_team.chef"),
    about: t("our_team.description1"),
  },
  {
    img: me,
    name: "Койшыбай Еркебұлан",
    job: t("our_team.manager"),
    about: t("our_team.description2"),
  },
  {
    img: dauka,
    name: "Дармен Дәулет",
    job: t("our_team.waiter"),
    about: t("our_team.description3"),
  },
  {
    img: abu,
    name: "Қуатұлы Абуханифа",
    job: t("our_team.designer"),
    about: t("our_team.description4"),
  },
];
</script>

<template>
  <div class="flex flex-col items-center gap-5 mt-10">
    <div class="font-bold text-4xl">{{ $t("about") }}</div>
    <p class="text-gray-400 text-lg font-medium text-center w-[600px]">
      {{ $t("aboutUs.title_mini") }}
    </p>
    <main class="flex gap-5 justify-between items-center mt-10 mb-20 px-20">
      <div class="flex flex-col gap-4" data-aos="fade-down">
        <div class="font-bold text-5xl">{{ $t("aboutUs.our_story") }}</div>
        <div class="flex flex-col gap-1 mt-5 w-[650px]">
          <div class="text-gray-400 text-lg font-medium mb-4">
            {{ $t("aboutUs.description1") }}
          </div>
          <div class="text-gray-400 text-lg font-medium mb-4">
            {{ $t("aboutUs.description2") }}
          </div>
          <div class="text-gray-400 text-lg font-medium mb-4">
            {{ $t("aboutUs.description3") }}
          </div>
        </div>
      </div>
      <div data-aos="fade-up">
        <img src="../assets/res_history.png" class="rounded-lg" />
      </div>
    </main>
    <div class="font-bold text-4xl">{{ $t("aboutUs.our_team") }}</div>
    <div class="grid grid-cols-4 gap-8 mt-10 px-20" data-aos="fade-down">
      <PersonCard
        v-for="(person, index) in persons"
        :key="index"
        :img="person.img"
        :name="person.name"
        :job="person.job"
        :about="person.about"
      />
    </div>
    <div class="px-20 mb-10">
      <BonusAppPromo />
    </div>
    <div
      class="bg-[#FAFAFA] flex items-start gap-5 w-full p-10 mt-10"
      data-aos="fade-up"
    >
      <div class="flex flex-col gap-5 w-1/2">
        <div class="font-bold text-2xl">{{ $t("aboutUs.contact_us") }}</div>
        <div class="w-[600px]">
          {{ $t("aboutUs.contact_description") }}
        </div>
        <div class="flex flex-col gap-3">
          <div class="flex gap-2 items-center">
            <img src="../assets/phone.svg" alt="" />
            <div>+7 (706) 123-45-67</div>
          </div>
          <div class="flex gap-2 items-center">
            <img src="../assets/email.svg" alt="" />
            <div>info@restobron.ru</div>
          </div>
          <div class="flex gap-2 items-center">
            <img src="../assets/location.svg" alt="" />
            <div>{{ $t("aboutUs.address") }}</div>
          </div>
        </div>
        <div class="flex gap-4 mt-2">
          <div
            class="rounded-lg py-1.5 px-1.5 border border-[#e2e1e1] bg-white"
          >
            <img src="../assets/insta.svg" />
          </div>
          <div
            class="rounded-lg py-1.5 px-1.5 border border-[#e2e1e1] bg-white"
          >
            <img src="../assets/facebook.svg" />
          </div>
          <div
            class="rounded-lg py-1.5 px-1.5 border border-[#e2e1e1] bg-white"
          >
            <img src="../assets/twit.svg" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-5 w-1/2">
        <div class="grid grid-cols-2 gap-5">
          <div>
            <label for="username" class="block text-gray-700 font-medium">{{
              $t("inputs.name")
            }}</label>
            <input
              type="text"
              id="name"
              required
              :placeholder="$t('inputs.your_name')"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label for="email" class="block text-gray-700 font-medium">{{
              $t("inputs.email")
            }}</label>
            <input
              type="text"
              id="email"
              required
              :placeholder="$t('inputs.your_email')"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
        <div>
          <label class="block text-gray-700 font-medium">{{
            $t("inputs.title")
          }}</label>
          <input
            type="text"
            id="tema"
            required
            :placeholder="$t('inputs.title_placeholder')"
            class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-medium">{{
            $t("inputs.message")
          }}</label>
          <textarea
            type="text"
            id="message"
            required
            :placeholder="$t('inputs.message_placeholder')"
            class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <button class="py-2 px-5 bg-black text-white rounded-lg">
          {{ $t("buttons.send_message") }}
        </button>
      </div>
    </div>
  </div>
</template>
