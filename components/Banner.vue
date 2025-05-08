<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/main_img.png";

const banners = [
  { id: 1, img: banner1 },
  { id: 2, img: banner2 },
  { id: 3, img: banner3 },
  { id: 4, img: banner4 },
];

const current = ref(0);
const containerWidth = ref(0);
const slideContainer = ref(null);
const autoplayInterval = ref(null);
const isUserInteracting = ref(false);
const autoplayDelay = 4000;

const extendedBanners = computed(() => {
  return [
    { ...banners[banners.length - 1], id: `${banners.length - 1}-clone` },
    ...banners,
    { ...banners[0], id: `0-clone` },
  ];
});

const actualIndex = ref(1);

const translateValue = computed(() => {
  return `translateX(-${actualIndex.value * 100}%)`;
});

const handleTransitionEnd = () => {
  if (actualIndex.value === 0) {
    disableTransition();
    actualIndex.value = extendedBanners.value.length - 2;
    setTimeout(enableTransition, 50);
  } else if (actualIndex.value === extendedBanners.value.length - 1) {
    disableTransition();
    actualIndex.value = 1;
    setTimeout(enableTransition, 50);
  }
};

const isTransitionEnabled = ref(true);
const transitionStyle = computed(() => {
  return isTransitionEnabled.value
    ? "transition-transform duration-700 ease-out"
    : "";
});

const disableTransition = () => {
  isTransitionEnabled.value = false;
};

const enableTransition = () => {
  isTransitionEnabled.value = true;
};

let startX = 0;
let isDragging = false;

const nextSlide = () => {
  actualIndex.value++;
  current.value = (current.value + 1) % banners.length;
};

const prevSlide = () => {
  actualIndex.value--;
  current.value = (current.value - 1 + banners.length) % banners.length;
};

const onTouchStart = (e) => {
  startX = e.touches[0].clientX;
  pauseAutoplay();
};

const onTouchEnd = (e) => {
  const endX = e.changedTouches[0].clientX;
  const delta = startX - endX;
  if (delta > 50) nextSlide();
  else if (delta < -50) prevSlide();
};

const onMouseDown = (e) => {
  e.preventDefault();
  isDragging = true;
  startX = e.clientX;
  pauseAutoplay();
};

const onMouseUp = (e) => {
  if (!isDragging) return;
  const endX = e.clientX;
  const delta = startX - endX;
  if (delta > 50) nextSlide();
  else if (delta < -50) prevSlide();
  isDragging = false;
};

const updateContainerWidth = () => {
  if (slideContainer.value) {
    containerWidth.value = slideContainer.value.offsetWidth;
  }
};

const preventDragHandler = (e) => {
  e.preventDefault();
  return false;
};

const startAutoplay = () => {
  if (autoplayInterval.value) return;

  autoplayInterval.value = setInterval(() => {
    if (!isUserInteracting.value) {
      nextSlide();
    }
  }, autoplayDelay);
};

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = null;
  }
};

const pauseAutoplay = () => {
  isUserInteracting.value = true;

  setTimeout(() => {
    isUserInteracting.value = false;
  }, 5000);
};
onMounted(() => {
  window.addEventListener("mouseup", onMouseUp);
  window.addEventListener("resize", updateContainerWidth);

  if (slideContainer.value) {
    slideContainer.value.addEventListener("dragstart", preventDragHandler);
  }
  updateContainerWidth();

  actualIndex.value = 1;

  startAutoplay();
});

onUnmounted(() => {
  window.removeEventListener("mouseup", onMouseUp);
  window.removeEventListener("resize", updateContainerWidth);
  if (slideContainer.value) {
    slideContainer.value.removeEventListener("dragstart", preventDragHandler);
  }

  stopAutoplay();
});
</script>

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
        class="min-w-full w-full flex-shrink-0 overflow-hidden"
      >
        <img
          :src="banner.img"
          alt="Banner"
          class="cursor-pointer w-full h-[500px] object-cover hover:scale-105 transition-transform duration-1000"
          draggable="false"
        />
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
