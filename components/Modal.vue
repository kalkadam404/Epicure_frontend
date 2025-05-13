<template>
  <Teleport to="body">
    <!-- Overlay -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
      @click="closeOnBackdrop ? $emit('close') : null"
    >
      <!-- Modal Content -->
      <div
        class="relative bg-white rounded-lg max-w-lg w-full mx-4 shadow-xl transform transition-all"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <!-- Header Content (slot) -->
            <slot name="header">
              <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
            </slot>
            
            <!-- Close Button -->
            <button
              @click="$emit('close')"
              type="button"
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Modal Body -->
        <div class="px-6 py-4 overflow-y-auto max-h-[60vh]">
          <slot name="body">
            <p class="text-base text-gray-500">{{ content }}</p>
          </slot>
        </div>
        
        <!-- Modal Footer -->
        <div
          class="px-6 py-4 bg-gray-50 flex flex-row-reverse gap-2 rounded-b-lg"
        >
          <slot name="footer">
            <button
              @click="$emit('confirm')"
              v-if="showConfirmButton"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ confirmButtonText }}
            </button>
            <button
              @click="$emit('close')"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ cancelButtonText }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

// Props для конфигурации модального окна
const props = defineProps({
  title: {
    type: String,
    default: 'Информация'
  },
  content: {
    type: String,
    default: ''
  },
  showConfirmButton: {
    type: Boolean,
    default: false
  },
  confirmButtonText: {
    type: String,
    default: 'Подтвердить'
  },
  cancelButtonText: {
    type: String,
    default: 'Закрыть'
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
});

// События для взаимодействия с родительским компонентом
defineEmits(['close', 'confirm']);

// Закрытие модального окна с клавиатуры (Escape)
const onKeyDown = (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    emit('close');
  }
};

// Блокировка прокрутки на body
const blockScroll = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '15px'; // Предотвращает смещение контента из-за исчезновения полосы прокрутки
};

// Разблокировка прокрутки
const unblockScroll = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

// Жизненный цикл компонента
onMounted(() => {
  document.addEventListener('keydown', onKeyDown);
  blockScroll();
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyDown);
  unblockScroll();
});
</script>

<style scoped>
/* Анимация появления модального окна */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>