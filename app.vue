<script setup>
import { ref, provide, onMounted } from "vue";
import axios from "axios";

const isLoginModalVisible = ref(false);
const isRegisterModalVisible = ref(false);
const isBookModalOpen = ref(false);
const isCityModalOpen = ref(false);
const isDishInfoModalOpen = ref(false);
const dishes = ref([]);

const currentCityId = ref(null);
const citySelectionCallback = ref(null);
const selectedDish = ref(null);

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

const openCityModal = (cityId = null, callback = null) => {
  currentCityId.value = cityId;
  citySelectionCallback.value = callback;
  isCityModalOpen.value = true;
};

const closeCityModal = () => {
  isCityModalOpen.value = false;
};

const handleCitySelected = (city) => {
  if (citySelectionCallback.value) {
    citySelectionCallback.value(city);
  }
  closeCityModal();
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
  currentCityId
});

provide("dishInfoModal", {
  isDishInfoModalOpen,
  openDishInfoModal,
  closeDishInfoModal,
  selectedDish,
});

const handleReservationSubmit = (reservationData) => {
  console.log("Reservation submitted:", reservationData);
  closeBookModal();
};

const fetchDishes = async () => {
  try {
    const { data } = await axios.get(
      "http://0.0.0.0:8000/api/v1/products/menu-items/"
    );
    dishes.value = data.results;
    console.log(dishes.value);
  } catch (error) {
    console.error("Ошибка при получении блюд:", error);
  }
};

onMounted(() => {
  fetchDishes();
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
            <CityModal 
              @closeCityModal="closeCityModal" 
              @citySelected="handleCitySelected"
              :currentCityId="currentCityId"
            />
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
            <BookModal 
              @closeBookModal="closeBookModal"
              :dishes="dishes"
              @submit="handleReservationSubmit"
            />
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