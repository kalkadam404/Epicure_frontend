<template>
  <div class="min-h-screen flex items-center justify-center bg-red-50 px-4">
    <div class="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
      <svg
        class="mx-auto mb-6 h-16 w-16 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <h1 class="text-2xl font-bold text-red-700 mb-2">Оплата отменена</h1>
      <p class="text-gray-600 mb-6">
        Вы отменили оплату. Попробуйте снова или вернитесь на сайт.
      </p>
      <NuxtLink
        to="/"
        class="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Вернуться на главную
      </NuxtLink>
    </div>
  </div>
</template>
