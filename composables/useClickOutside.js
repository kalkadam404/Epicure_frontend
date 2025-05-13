import { onMounted, onBeforeUnmount } from 'vue';

/**
 * Композабл для обнаружения клика вне указанного элемента
 * @param {Ref} elementRef - Реактивная ссылка на элемент
 * @param {Function} callback - Функция, вызываемая при клике вне элемента
 */
export function useClickOutside(elementRef, callback) {
  if (!elementRef) return;

  const listener = (event) => {
    if (elementRef.value && !elementRef.value.contains(event.target)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('click', listener);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', listener);
  });

  return {
    removeListener: () => {
      document.removeEventListener('click', listener);
    }
  };
}

/**
 * Директива для обнаружения клика вне элемента
 * Использование: v-click-outside="onClickOutside"
 */
export const vClickOutside = {
  mounted(el, binding) {
    el._clickOutsideHandler = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el._clickOutsideHandler);
  },
  
  unmounted(el) {
    document.removeEventListener('click', el._clickOutsideHandler);
  }
};