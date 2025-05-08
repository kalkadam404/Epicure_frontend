<script setup>
import me from "../assets/me.jpeg";
import alzhik from "../assets/alzhik.jpg";
import abu from "../assets/abu.jpg";
import dauka from "../assets/dauka.jpg";
const persons = [
  {
    img: alzhik,
    name: "Дарибаев Әлжан",
    job: "Шеф-повар",
    about:
      "Наш шеф-повар с более чем 15-летним опытом работы в лучших ресторанах мира. Он создает уникальные блюда, которые радуют наших гостей. ",
  },
  {
    img: me,
    name: "Койшыбай Еркебұлан",
    job: "Менеджер по обслуживанию клиентов",
    about:
      "Наш менеджер по обслуживанию клиентов. Он всегда готов помочь и сделать ваше посещение незабываемым.",
  },
  {
    img: dauka,
    name: "Дармен Дәулет",
    job: "Сомелье",
    about:
      "Наш сомелье, который поможет вам выбрать идеальное вино к вашему блюду.",
  },
  {
    img: abu,
    name: "Қуатұлы Абуханифа",
    job: "Дизайнер интерьеров",
    about:
      "Наш дизайнер интерьеров, которая создает уникальную атмосферу в каждом ресторане Epicure.",
  },
];
</script>

<template>
  <div class="flex flex-col items-center gap-5 mt-10">
    <div class="font-bold text-4xl">О нас</div>
    <p class="text-gray-400 text-lg font-medium text-center w-[600px]">
      Узнайте больше о нашей истории, команде и философии Epicure.
    </p>
    <main class="flex gap-5 justify-between items-center mt-10 mb-20 px-20">
      <div class="flex flex-col gap-4" data-aos="fade-down">
        <div class="font-bold text-5xl">Наша история</div>
        <div class="flex flex-col gap-1 mt-5 w-[650px]">
          <div class="text-gray-400 text-lg font-medium mb-4">
            Epicure начал свою работу в 2010 году как небольшой семейный
            ресторан. За прошедшие годы мы выросли в сеть ресторанов, но
            сохранили наши основные ценности: качество, гостеприимство и
            внимание к деталям.
          </div>
          <div class="text-gray-400 text-lg font-medium mb-4">
            Мы гордимся тем, что создаем не просто места для еды, а пространства
            для общения, отдыха и наслаждения изысканной кухней. Каждый наш
            ресторан имеет свою уникальную атмосферу и концепцию.
          </div>
          <div class="text-gray-400 text-lg font-medium mb-4">
            Наша миссия — делать каждое посещение ресторана особенным и
            запоминающимся для наших гостей.
          </div>
        </div>
      </div>
      <div data-aos="fade-up">
        <img src="../assets/res_history.png" class="rounded-lg" />
      </div>
    </main>
    <div class="font-bold text-4xl">Наша команда</div>
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
    <div
      class="bg-[#FAFAFA] flex items-start gap-5 w-full p-10 mt-10"
      data-aos="fade-up"
    >
      <div class="flex flex-col gap-5 w-1/2">
        <div class="font-bold text-2xl">Свяжитесь с нами</div>
        <div class="w-[600px]">
          Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нами
          любым удобным способом
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
            <div>ул. Толе би, 59, Алматы</div>
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
            <label for="username" class="block text-gray-700 font-medium"
              >Имя</label
            >
            <input
              type="text"
              id="name"
              required
              placeholder="Ваше имя"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label for="email" class="block text-gray-700 font-medium"
              >Email</label
            >
            <input
              type="text"
              id="email"
              required
              placeholder="Ваш email"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
        <div>
          <label class="block text-gray-700 font-medium">Тема</label>
          <input
            type="text"
            id="tema"
            required
            placeholder="Тема сообщения"
            class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-medium">Сообщения</label>
          <textarea
            type="text"
            id="message"
            required
            placeholder="Ваше сообщение"
            class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <button class="py-2 px-5 bg-black text-white rounded-lg">
          Отправить сообщение
        </button>
      </div>
    </div>
  </div>
</template>
