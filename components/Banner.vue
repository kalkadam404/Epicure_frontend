<template>
  <div
    class="relative w-full overflow-hidden rounded-[30px] select-none shadow-lg"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @mousedown="onMouseDown"
    @mouseenter="pauseAutoplay"
    @dragstart.prevent
    ref="slideContainer"
  >
    <div
      :class="[transitionStyle]"
      class="flex"
      :style="{ transform: translateValue }"
      @transitionend="handleTransitionEnd"
    >
      <div
        v-for="banner in extendedBanners"
        :key="banner.id"
        class="min-w-full w-full flex-shrink-0 overflow-hidden relative"
      >
        <img
          :src="banner.img"
          alt="Banner"
          class="cursor-pointer w-full h-[500px] object-cover hover:scale-105 transition-transform duration-1000"
          draggable="false"
        />
        <!-- Title and subtitle overlay -->
        <div
          class="absolute inset-0 flex flex-col justify-center items-center text-center px-6 bg-black/30"
        >
          <h2
            class="text-white text-4xl font-bold mb-3 tracking-wide drop-shadow-lg transform transition-all duration-500 hover:scale-105"
          >
            {{ banner.title || "Потрясающее предложение" }}
          </h2>
          <p
            class="text-white text-xl max-w-2xl drop-shadow-md transform transition-all duration-500 hover:scale-105"
          >
            {{
              banner.subtitle ||
              "Откройте для себя наши новые продукты и специальные предложения"
            }}
          </p>
          <button
            v-if="banner.buttonText"
            class="mt-6 px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            {{ banner.buttonText }}
          </button>
        </div>
      </div>
    </div>

    <!-- Dots -->
    <div class="absolute bottom-3 w-full flex justify-center gap-2">
      <div
        v-for="(banner, index) in banners"
        :key="banner.id"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="[
          index === current
            ? 'bg-white scale-110'
            : 'bg-white/50 hover:bg-white/70',
          'transform hover:scale-105',
        ]"
        @click="
          current = index;
          pauseAutoplay();
        "
      ></div>
    </div>
  </div>
</template>

<script setup>
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/main_img.png";

// Banner data sample - add your actual banner data here
const banners = ref([
  {
    id: 1,
    img: banner1,
    title: "Забронируйте столик",
    subtitle: "Особая атмосфера для ваших важных встреч и праздников",
    buttonText: "Бронировать сейчас",
  },
  {
    id: 2,
    img: banner2,
    title: "Изысканная кухня",
    subtitle: "Насладитесь неповторимыми блюдами от нашего шеф-повара",
    buttonText: "Меню ресторана",
  },
  {
    id: 3,
    img: banner3,
    title: "Сезонное предложение",
    subtitle: "Новое весеннее меню с использованием свежих сезонных продуктов",
    buttonText: "Попробовать",
  },
  {
    id: 4,
    img: banner4,
    title: "Специальные предложения",
    subtitle: "Узнайте о наших акциях и специальных предложениях",
    buttonText: "Узнать больше",
  },
]);

const current = ref(0);
const slideContainer = ref(null);
const isDragging = ref(false);
const startX = ref(0);
const autoplayInterval = ref(null);
const transitionActive = ref(false);
const transitionStyle = computed(() =>
  transitionActive.value ? "transition-transform duration-500 ease-in-out" : ""
);

// Handle duplicate slides for infinite effect
const extendedBanners = computed(() => {
  return [
    banners.value[banners.value.length - 1],
    ...banners.value,
    banners.value[0],
  ];
});

const translateValue = computed(() => {
  const offset = -100 * (current.value + 1);
  return `translateX(${offset}%)`;
});

// Touch/mouse event handlers
const onTouchStart = (event) => {
  startDrag(event.touches[0].clientX);
};

const onMouseDown = (event) => {
  startDrag(event.clientX);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

const startDrag = (clientX) => {
  isDragging.value = true;
  startX.value = clientX;
  pauseAutoplay();
  transitionActive.value = false;
};

const onTouchEnd = () => {
  endDrag();
};

const onMouseUp = () => {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
  endDrag();
};

const onMouseMove = (event) => {
  if (isDragging.value) {
    const deltaX = event.clientX - startX.value;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      isDragging.value = false;
    }
  }
};

const endDrag = () => {
  isDragging.value = false;
  transitionActive.value = true;
  startAutoplay();
};

// Slide navigation
const nextSlide = () => {
  transitionActive.value = true;
  if (current.value < banners.value.length - 1) {
    current.value++;
  } else {
    current.value = 0;
  }
};

const prevSlide = () => {
  transitionActive.value = true;
  if (current.value > 0) {
    current.value--;
  } else {
    current.value = banners.value.length - 1;
  }
};

const handleTransitionEnd = () => {
  if (current.value === banners.value.length) {
    transitionActive.value = false;
    current.value = 0;
  } else if (current.value === -1) {
    transitionActive.value = false;
    current.value = banners.value.length - 1;
  }
};

// Autoplay functionality
const startAutoplay = () => {
  pauseAutoplay();
  autoplayInterval.value = setInterval(() => {
    nextSlide();
  }, 5000); // Change slides every 5 seconds
};

const pauseAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = null;
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  pauseAutoplay();
});
</script>
