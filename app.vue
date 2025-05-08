<script setup>
const isLoginModalVisible = ref(false);
const isRegisterModalVisible = ref(false);
const isBookModalOpen = ref(false);
const isCityModalOpen = ref(false);
const isDishInfoModalOpen = ref(false);

import { provide } from "vue";

const openLoginModal = () => {
  isLoginModalVisible.value = true;
  isRegisterModalVisible.value = false;
};

const closeLoginModal = () => {
  isLoginModalVisible.value = false;
  isRegisterModalVisible.value = false;
};
const toggleToRegister = () => {
  isLoginModalVisible.value = false;
  isRegisterModalVisible.value = true;
};

const openBookModal = () => {
  isBookModalOpen.value = true;
};
const closeBookModal = () => {
  isBookModalOpen.value = false;
};

const openCityModal = () => {
  isCityModalOpen.value = true;
};
const closeCityModal = () => {
  isCityModalOpen.value = false;
};

const openDishInfoModal = () => {
  isDishInfoModalOpen.value = true;
};
const closeDishInfoModal = () => {
  isDishInfoModalOpen.value = false;
};

provide("cityModal", {
  isCityModalOpen,
  openCityModal,
  closeCityModal,
});

provide("dishInfoModal", {
  isDishInfoModalOpen,
  openDishInfoModal,
  closeDishInfoModal,
});
</script>

<template>
  <div>
    <Header
      @openLoginModal="openLoginModal"
      @toggleToRegister="toggleToRegister"
      @openBookModal="openBookModal"
    />
    <NuxtPage class="pt-[105px]" />
    <Footer />

    <transition name="fade">
      <div
        v-if="isDishInfoModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 ease-in-out z-40"
          @click="closeDishInfoModal"
        ></div>

        <transition name="scale-fade">
          <div class="relative z-50">
            <DishInfo @closeDishInfoModal="closeDishInfoModal" />
          </div>
        </transition>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-if="isCityModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 ease-in-out z-40"
          @click="closeCityModal"
        ></div>

        <transition name="scale-fade">
          <div class="relative z-50">
            <CityModal @closeCityModal="closeCityModal" />
          </div>
        </transition>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-if="isBookModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 ease-in-out z-40"
          @click="closeBookModal"
        ></div>

        <transition name="scale-fade">
          <div class="relative z-50">
            <BookModal @closeBookModal="closeBookModal" />
          </div>
        </transition>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-if="isLoginModalVisible"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 ease-in-out z-40"
          @click="closeLoginModal"
        ></div>

        <transition name="scale-fade">
          <div class="relative z-50">
            <Login
              @closeLoginModal="closeLoginModal"
              @toggleToRegister="toggleToRegister"
            />
          </div>
        </transition>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-if="isRegisterModalVisible"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 ease-in-out z-40"
          @click="closeLoginModal"
        ></div>

        <transition name="scale-fade">
          <div class="relative z-50">
            <Register
              @closeRegisterModal="closeLoginModal"
              @openLoginModal="openLoginModal"
            />
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* затемнение */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* анимация появления модалки */
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.3s ease;
}
.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.scale-fade-enter-to,
.scale-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
