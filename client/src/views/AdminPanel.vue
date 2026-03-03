<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1 class="admin-title">
        <span class="admin-title-accent">/</span> Админ-панель DetailStudio
        <span class="admin-title-accent">/</span>
      </h1>
      <button @click="handleLogout" class="admin-logout-btn">
        <svg class="logout-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M16 17L21 12L16 7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <span>Выйти</span>
      </button>
    </div>

    <div class="admin-content">
      <!-- Форма добавления/редактирования -->
      <div class="admin-form-section">
        <h2 class="admin-section-title">
          {{ editingId ? "Редактировать услугу" : "Добавить новую услугу" }}
        </h2>

        <form @submit.prevent="handleSubmit" class="admin-form">
          <div class="form-group">
            <label class="form-label">
              <svg
                class="form-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
              Название услуги
            </label>
            <input
              type="text"
              v-model="newService.name"
              placeholder="Например: Керамическое покрытие"
              class="admin-input"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              <svg
                class="form-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                <path
                  d="M12 8V12L15 15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Выберите иконку
            </label>
            <div class="icon-selector">
              <button
                type="button"
                v-for="icon in availableIcons"
                :key="icon.name"
                class="icon-option"
                :class="{ selected: newService.icon === icon.svg }"
                @click="selectIcon(icon.svg)"
                :title="icon.name"
              >
                <div class="icon-preview" v-html="icon.svg"></div>
              </button>
            </div>
            <input type="hidden" v-model="newService.icon" required />
          </div>

          <div class="form-group">
            <label class="form-label">
              <svg
                class="form-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M16 3H21V8"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M21 3L12 12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Описание
            </label>
            <textarea
              v-model="newService.description"
              placeholder="Подробное описание услуги..."
              class="admin-textarea"
              rows="4"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">
              <svg
                class="form-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M12 2V14M12 14L8 10M12 14L16 10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Цена
            </label>
            <input
              type="text"
              v-model="newService.price"
              placeholder="Например: от 5000₽"
              class="admin-input"
              required
            />
          </div>

          <div class="form-actions">
            <button type="submit" class="admin-submit-btn" :disabled="!isFormValid">
              <svg
                class="btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H14L20 10V12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M16 4V8H12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <circle cx="12" cy="16" r="2" stroke="currentColor" stroke-width="2" />
              </svg>
              {{ editingId ? "Обновить услугу" : "Добавить услугу" }}
            </button>

            <button
              v-if="editingId"
              type="button"
              @click="handleCancelEdit"
              class="admin-cancel-btn"
            >
              <svg
                class="btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Отмена
            </button>
          </div>
        </form>
      </div>

      <!-- Список услуг -->
      <div class="admin-services-section">
        <h2 class="admin-section-title">Список услуг ({{ services.length }})</h2>

        <div v-if="isLoading" class="admin-loading">
          <div class="loader"></div>
          <p>Загрузка услуг...</p>
        </div>

        <div v-else-if="error" class="admin-error">
          <svg
            class="error-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
            <path
              d="M12 8V12M12 16H12.01"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <p>{{ error }}</p>
        </div>

        <div v-else-if="services.length === 0" class="admin-empty">
          <svg
            class="empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
            <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" />
          </svg>
          <p>Нет добавленных услуг</p>
        </div>

        <div v-else class="admin-services-grid">
          <div
            v-for="service in services"
            :key="service.id"
            class="admin-service-card"
            :class="{ active: selectedService === service }"
            @click="selectedService = service === selectedService ? null : service"
          >
            <div class="admin-service-icon" v-html="service.icon"></div>
            <div class="admin-service-header">
              <h3 class="admin-service-name">{{ service.name }}</h3>
              <span class="admin-service-price">{{ service.price }}</span>
            </div>
            <p class="admin-service-description">{{ service.description }}</p>

            <div v-if="selectedService === service" class="admin-service-actions">
              <button class="admin-edit-btn" @click.stop="handleEdit(service)">
                <svg
                  class="action-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 3L21 7L7 21H3V17L17 3Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                Редактировать
              </button>
              <button class="admin-delete-btn" @click.stop="handleDelete(service.id)">
                <svg
                  class="action-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AdminPanel",
  setup() {
    const router = useRouter();
    const services = ref([]);
    const newService = ref({ name: "", icon: "", description: "", price: "" });
    const editingId = ref(null);
    const selectedService = ref(null);
    const isLoading = ref(true);
    const error = ref("");

    // Библиотека иконок (16 штук)
    const availableIcons = [
      {
        name: "Керамика",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#fbbf24" stroke-width="2"/><path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
      {
        name: "Полировка",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#fbbf24" stroke-width="2"/><path d="M12 6V12L16 14" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
      {
        name: "Химчистка",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#fbbf24" stroke-width="2"/><path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
      {
        name: "Защита кузова",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#fbbf24" stroke-width="2"/><path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
      {
        name: "Двигатель",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="16" height="12" rx="2" stroke="#fbbf24" stroke-width="2"/><path d="M8 4V8M16 4V8" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
      {
        name: "Шины",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke="#fbbf24" stroke-width="2"/><circle cx="12" cy="12" r="3" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
      {
        name: "Фары",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="12" r="4" stroke="#fbbf24" stroke-width="2"/><path d="M4 8H10C11.1046 8 12 8.89543 12 10V14C12 15.1046 11.1046 16 10 16H4" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
      {
        name: "Салон",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 16L8 12M20 16L16 12" stroke="#fbbf24" stroke-width="2"/><rect x="2" y="6" width="20" height="12" rx="2" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
      {
        name: "Автомойка",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12H20M8 8L6 12M16 8L18 12" stroke="#fbbf24" stroke-width="2"/><rect x="2" y="12" width="20" height="8" rx="2" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
      {
        name: "Полировка кузова",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke="#fbbf24" stroke-width="2"/><path d="M18 6L20 8M6 18L4 20" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/></svg>',
      },
      {
        name: "Диски",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke="#fbbf24" stroke-width="2"/><circle cx="12" cy="12" r="3" stroke="#fbbf24" stroke-width="2"/><path d="M12 4V2M12 22V20M20 12H22M2 12H4" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
      {
        name: "Стекла",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="20" height="16" rx="2" stroke="#fbbf24" stroke-width="2"/><path d="M8 8H16M8 12H16M8 16H12" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/></svg>',
      },
      {
        name: "Аккумулятор",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="12" height="16" rx="2" stroke="#fbbf24" stroke-width="2"/><path d="M10 8V14M14 8V14" stroke="#fbbf24" stroke-width="2"/><path d="M8 20H16" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
      {
        name: "Кондиционер",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="16" height="8" rx="2" stroke="#fbbf24" stroke-width="2"/><path d="M12 16V20M8 4L10 8M16 4L14 8" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
      {
        name: "Тормоза",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke="#fbbf24" stroke-width="2"/><path d="M12 4V12L16 16" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
      {
        name: "Подвеска",
        svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8H8M16 8H20M6 16L8 8M18 16L16 8M4 20L6 16M20 20L18 16" stroke="#fbbf24" stroke-width="2"/></svg>',
      },
    ];

    // Проверка валидности формы
    const isFormValid = computed(() => {
      return (
        newService.value.name &&
        newService.value.icon &&
        newService.value.description &&
        newService.value.price
      );
    });

    // Выбор иконки
    const selectIcon = (iconSvg) => {
      newService.value.icon = iconSvg;
    };

    // Проверка авторизации
    onMounted(() => {
      const isAdmin = localStorage.getItem("isAdmin");
      if (isAdmin !== "true") {
        router.push("/login");
      } else {
        fetchServices();
      }
    });

    // Загрузка услуг
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/services");
        if (!response.ok) throw new Error("Ошибка загрузки услуг");
        services.value = await response.json();
      } catch (err) {
        error.value = err.message;
      } finally {
        isLoading.value = false;
      }
    };

    // Добавление/обновление услуги
    const handleSubmit = async () => {
      if (!isFormValid.value) return;

      error.value = "";

      try {
        const url = editingId.value
          ? `http://localhost:5000/api/services/${editingId.value}`
          : "http://localhost:5000/api/services";
        const method = editingId.value ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newService.value),
        });

        if (!response.ok) throw new Error("Ошибка сохранения");

        const data = await response.json();

        if (editingId.value) {
          services.value = services.value.map((s) => (s.id === editingId.value ? data : s));
        } else {
          services.value.push(data);
        }

        // Сброс формы
        newService.value = { name: "", icon: "", description: "", price: "" };
        editingId.value = null;
        selectedService.value = null;
      } catch (err) {
        error.value = err.message;
      }
    };

    // Редактирование
    const handleEdit = (service) => {
      newService.value = {
        name: service.name,
        icon: service.icon,
        description: service.description,
        price: service.price,
      };
      editingId.value = service.id;
      selectedService.value = null;
    };

    // Удаление
    const handleDelete = async (id) => {
      if (!confirm("Вы уверены, что хотите удалить эту услугу?")) return;

      try {
        const response = await fetch(`http://localhost:5000/api/services/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Ошибка удаления");

        services.value = services.value.filter((s) => s.id !== id);
        selectedService.value = null;
      } catch (err) {
        error.value = err.message;
      }
    };

    // Отмена редактирования
    const handleCancelEdit = () => {
      newService.value = { name: "", icon: "", description: "", price: "" };
      editingId.value = null;
    };

    // Выход
    const handleLogout = () => {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("user");
      router.push("/login");
    };

    return {
      services,
      newService,
      editingId,
      selectedService,
      isLoading,
      error,
      availableIcons,
      isFormValid,
      selectIcon,
      handleSubmit,
      handleEdit,
      handleDelete,
      handleCancelEdit,
      handleLogout,
    };
  },
};
</script>

<style src="@/styles/AdminPanel.scss" lang="scss" scoped></style>
