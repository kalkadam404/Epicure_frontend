<template>
  <div class="relative notifications-container">
    <!-- Notification Button with Badge -->
    <button
      @click.stop="toggleNotifications"
      class="notification-btn p-2 text-gray-700 hover:text-black rounded-full bg-gray-50 hover:bg-gray-100 transition-all relative z-20"
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
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      <!-- Badge for unread notifications -->
      <span
        v-if="unreadCount > 0"
        class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
      >
        {{ unreadCount > 9 ? "9+" : unreadCount }}
      </span>
    </button>

    <!-- Notifications Dropdown -->
    <div
      v-if="isOpen"
      ref="dropdownRef"
      class="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg py-2 z-50 max-h-[80vh] overflow-y-auto notifications-dropdown"
      @click.stop
    >
      <!-- Header -->
      <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <h3 class="font-medium text-lg text-gray-800">{{ $t('notifications') }}</h3>
        <div class="flex items-center gap-2">
          <button
            v-if="unreadCount > 0"
            @click="markAllAsRead"
            class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {{ $t('markAllAsRead') }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="p-4 flex items-center justify-center">
        <svg class="animate-spin h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <!-- Empty State -->
      <div v-else-if="notifications.length === 0" class="p-4 text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <p>{{ $t('noNotifications') }}</p>
      </div>

      <!-- Notification List -->
      <div v-else>
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer',
            { 'bg-blue-50': notification.status === 'sent' }
          ]"
          @click="viewNotification(notification)"
        >
          <!-- Notification Type Icon -->
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 mt-1">
              <!-- Payment Success Icon -->
              <div v-if="notification.notification_type === 'payment_success'" class="p-2 bg-green-100 text-green-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <!-- Welcome Icon -->
              <div v-else-if="notification.notification_type === 'welcome'" class="p-2 bg-yellow-100 text-yellow-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              
              <!-- Reservation Reminder Icon -->
              <div v-else-if="notification.notification_type === 'reservation_reminder'" class="p-2 bg-blue-100 text-blue-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <!-- Reservation Created Icon -->
              <div v-else-if="notification.notification_type === 'reservation_created'" class="p-2 bg-purple-100 text-purple-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              <!-- Default Icon -->
              <div v-else class="p-2 bg-gray-100 text-gray-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <!-- Content -->
            <div class="flex-1">
              <h4 class="font-medium text-gray-900 mb-0.5 line-clamp-1">{{ notification.title }}</h4>
              <p class="text-sm text-gray-600 line-clamp-2 mb-1">{{ notification.message.substring(0, 100) }}{{ notification.message.length > 100 ? '...' : '' }}</p>
              <div class="flex items-center justify-between mt-1">
                <span class="text-xs text-gray-500">{{ notification.time_since }}</span>
                <span v-if="notification.status === 'sent'" class="text-xs font-medium text-blue-600">{{ $t('new') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="hasMoreNotifications" class="px-4 py-3 text-center">
        <button
          @click="loadMoreNotifications"
          :disabled="loadingMore"
          class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {{ loadingMore ? $t('loading') + '...' : $t('loadMore') }}
        </button>
      </div>
    </div>

    <!-- Notification Details Modal -->
    <Modal v-if="selectedNotification" @close="closeModal">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">{{ selectedNotification.title }}</h3>
      </template>
      
      <template #body>
        <div class="mb-4 mt-2">
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <div class="flex items-center mb-3">
              <!-- Payment Success Icon -->
              <div v-if="selectedNotification.notification_type === 'payment_success'" class="p-2 bg-green-100 text-green-600 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <!-- Welcome Icon -->
              <div v-else-if="selectedNotification.notification_type === 'welcome'" class="p-2 bg-yellow-100 text-yellow-600 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              
              <!-- Reservation Reminder Icon -->
              <div v-else-if="selectedNotification.notification_type === 'reservation_reminder'" class="p-2 bg-blue-100 text-blue-600 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <!-- Default Icon -->
              <div v-else class="p-2 bg-gray-100 text-gray-600 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <div>
                <span class="block text-sm font-medium text-gray-700">{{ selectedNotification.notification_type_display }}</span>
                <span class="block text-xs text-gray-500">{{ formatDate(selectedNotification.created_at) }}</span>
              </div>
            </div>
            
            <div class="whitespace-pre-line text-gray-700">{{ selectedNotification.message }}</div>
          </div>
          
          <!-- Reservation Details if available -->
          <div v-if="selectedNotification.reservation_details" class="border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-3">{{ $t('reservationDetails') }}</h4>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <p class="text-sm text-gray-500">{{ $t('restaurant') }}</p>
                <p class="font-medium">{{ selectedNotification.reservation_details.restaurant_name }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ $t('date') }}</p>
                <p class="font-medium">{{ formatDateOnly(selectedNotification.reservation_details.reservation_date) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ $t('time') }}</p>
                <p class="font-medium">
                  {{ formatTimeOnly(selectedNotification.reservation_details.start_time) }} - 
                  {{ formatTimeOnly(selectedNotification.reservation_details.end_time) }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ $t('guests') }}</p>
                <p class="font-medium">{{ selectedNotification.reservation_details.guest_count }}</p>
              </div>
            </div>
            
            <div class="mt-4">
              <NuxtLink 
                :to="`/reservations/${selectedNotification.reservation_details.id}`"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-800 transition ease-in-out duration-150"
              >
                {{ $t('viewReservation') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
      
      <template #footer>
        <button 
          @click="closeModal"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ $t('close') }}
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useAuthStore } from '~/stores/auth';
import Modal from '~/components/Modal.vue';

// State
const isOpen = ref(false);
const notifications = ref([]);
const selectedNotification = ref(null);
const loading = ref(false);
const loadingMore = ref(false);
const page = ref(1);
const hasMoreNotifications = ref(false);
const userStore = useAuthStore();
const limit = 10; // Number of notifications per page
const dropdownRef = ref(null);

// Computed
const unreadCount = computed(() => {
  return notifications.value.filter(n => n.status === 'sent').length;
});

// Methods
const toggleNotifications = async (e) => {
  if (e) {
    e.stopPropagation();
  }
  isOpen.value = !isOpen.value;
  
  if (isOpen.value) {
    // Добавляем обработчик клика для закрытия меню при клике вне его
    await nextTick();
    document.addEventListener('click', handleOutsideClick);
    
    if (notifications.value.length === 0) {
      await fetchNotifications();
    }
  } else {
    document.removeEventListener('click', handleOutsideClick);
  }
};

const handleOutsideClick = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target) && 
      !e.target.closest('.notification-btn')) {
    closeNotifications();
  }
};

const closeNotifications = () => {
  if (isOpen.value) {
    isOpen.value = false;
    document.removeEventListener('click', handleOutsideClick);
  }
};

const fetchNotifications = async (reset = true) => {
  if (!userStore.isLoggedIn) return;
  
  if (reset) {
    loading.value = true;
    page.value = 1;
  } else {
    loadingMore.value = true;
  }
  
  try {
    // API Endpoint
    const endpoint = `/v1/notifications/?page=${page.value}&limit=${limit}`;
    const response = await fetchWithAuth(endpoint, { method: 'GET' });
    
    if (reset) {
      notifications.value = response.results || [];
    } else {
      notifications.value = [...notifications.value, ...(response.results || [])];
    }
    
    // Check if there are more pages
    hasMoreNotifications.value = Boolean(response.next);
    
  } catch (error) {
    console.error('Error fetching notifications:', error);
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

const markAllAsRead = async () => {
  try {
    await fetchWithAuth('/v1/notifications/mark_all_as_read/', { method: 'POST' });
    
    // Update local notifications status
    notifications.value = notifications.value.map(n => ({
      ...n,
      status: 'read',
      read_at: new Date().toISOString()
    }));
    
  } catch (error) {
    console.error('Error marking notifications as read:', error);
  }
};

const viewNotification = async (notification) => {
  selectedNotification.value = notification;
  
  // If notification is unread, mark it as read
  if (notification.status === 'sent') {
    try {
      await fetchWithAuth(`/v1/notifications/${notification.id}/mark_as_read/`, { method: 'POST' });
      
      // Update notification status locally
      const index = notifications.value.findIndex(n => n.id === notification.id);
      if (index !== -1) {
        notifications.value[index] = {
          ...notifications.value[index],
          status: 'read',
          read_at: new Date().toISOString()
        };
      }
      
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }
};

const closeModal = () => {
  selectedNotification.value = null;
};

// Helper function for authenticated API calls
const fetchWithAuth = async (url, options = {}) => {
  if (!userStore.token) {
    console.error('No auth token available');
    throw new Error('Authentication required');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userStore.token}`
  };
  
  try {
    // Используем относительный путь для API запросов
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {}),
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        console.error('Authentication error: Token might be expired');
      }
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return {};
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

const loadMoreNotifications = async () => {
  page.value++;
  await fetchNotifications(false);
};

// Date formatting functions
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
  } catch (error) {
    console.error('Date formatting error:', error);
    return dateString;
  }
};

const formatDateOnly = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
  } catch (error) {
    console.error('Date formatting error:', error);
    return dateString;
  }
};

const formatTimeOnly = (timeString) => {
  if (!timeString) return '';
  // Handle time strings in format HH:MM:SS
  return timeString.substring(0, 5);
};

// Auto-refresh notifications periodically
let refreshInterval;

onMounted(() => {
  if (userStore.isLoggedIn) {
    fetchNotifications();
    
    // Setup auto-refresh every 30 seconds
    refreshInterval = setInterval(() => {
      if (!isOpen.value) {  // Only refresh when dropdown is closed
        fetchNotifications();
      }
    }, 30000);
  }
});

onBeforeUnmount(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
  document.removeEventListener('click', handleOutsideClick);
});

// Listen for ESC key to close notifications
const handleEscKey = (event) => {
  if (event.key === 'Escape') {
    closeNotifications();
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscKey);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey);
});

// Expose closeNotifications to parent component
defineExpose({
  closeNotifications
});
</script>

<style scoped>
.notifications-container {
  position: relative;
  z-index: 30; /* Высокий z-index для контейнера */
}

.notification-btn {
  position: relative;
  z-index: 30; /* Тот же z-index что и у контейнера */
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.notifications-dropdown {
  animation: slideDown 0.2s ease-out forwards;
  z-index: 40; /* Выше, чем у кнопки */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.whitespace-pre-line {
  white-space: pre-line;
}
</style>