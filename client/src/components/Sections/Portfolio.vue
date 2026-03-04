<template>
  <section class="portfolio" id="portfolio">
    <div class="portfolio__container">
      <h2 class="portfolio__title">
        <span class="portfolio__title-accent">/</span> Наши работы
        <span class="portfolio__title-accent">/</span>
      </h2>

      <p class="portfolio__subtitle">Примеры выполненных работ</p>

      <div v-if="isLoading" class="portfolio__loading">
        <div class="portfolio__spinner"></div>
        <p>Загрузка работ...</p>
      </div>

      <div v-else-if="error" class="portfolio__error">
        <p>{{ error }}</p>
        <button @click="fetchWorks" class="portfolio__retry-btn">Повторить</button>
      </div>

      <template v-else>
        <div class="portfolio__filters">
          <button
            v-for="filter in filters"
            :key="filter.id"
            class="portfolio__filter"
            :class="{ active: activeFilter === filter.id }"
            @click="activeFilter = filter.id"
          >
            {{ filter.name }}
          </button>
        </div>

        <div v-if="filteredWorks.length === 0" class="portfolio__empty">
          <p>В этой категории пока нет работ</p>
        </div>

        <div v-else class="portfolio__grid">
          <div
            v-for="work in filteredWorks"
            :key="work.id"
            class="portfolio__item"
            @click="openLightbox(work)"
          >
            <div class="portfolio__image-wrapper">
              <img
                :src="work.image_path"
                :alt="work.title"
                class="portfolio__image"
                loading="lazy"
                @error="handleImageError"
              />
              <div class="portfolio__overlay">
                <h3 class="portfolio__item-title">{{ work.title }}</h3>
                <p class="portfolio__item-car">{{ work.car || "Автомобиль не указан" }}</p>
                <span class="portfolio__item-badge">{{ getCategoryName(work.category) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Кнопка "Показать еще" -->
        <div v-if="hasMore" class="portfolio__more">
          <button @click="loadMore" class="portfolio__more-btn">
            Показать еще
            <svg
              class="portfolio__more-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </template>
    </div>

    <!-- Lightbox для просмотра -->
    <div v-if="lightboxOpen" class="portfolio__lightbox" @click.self="closeLightbox">
      <div class="portfolio__lightbox-content">
        <button class="portfolio__lightbox-close" @click="closeLightbox">×</button>
        <div class="portfolio__lightbox-image-wrapper">
          <img
            :src="currentWork?.image_path"
            :alt="currentWork?.title"
            class="portfolio__lightbox-image"
            @error="handleLightboxImageError"
          />
        </div>
        <div class="portfolio__lightbox-info">
          <h3 class="portfolio__lightbox-title">{{ currentWork?.title }}</h3>
          <p class="portfolio__lightbox-car">{{ currentWork?.car || "Автомобиль не указан" }}</p>
          <p class="portfolio__lightbox-category">{{ getCategoryName(currentWork?.category) }}</p>
          <p class="portfolio__lightbox-description">
            {{ currentWork?.description || "Нет описания" }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  name: "PortfolioSection",
  setup() {
    const works = ref([]);
    const isLoading = ref(true);
    const error = ref(null);
    const activeFilter = ref("all");
    const visibleCount = ref(6);
    const lightboxOpen = ref(false);
    const currentWork = ref(null);

    const filters = [
      { id: "all", name: "Все работы" },
      { id: "ceramic", name: "Керамика" },
      { id: "polish", name: "Полировка" },
      { id: "cleaning", name: "Химчистка" },
      { id: "protection", name: "Защита" },
    ];

    const getCategoryName = (categoryId) => {
      const category = filters.find((f) => f.id === categoryId);
      return category ? category.name : categoryId;
    };

    const handleImageError = (e) => {
      e.target.src = "https://via.placeholder.com/600x400?text=Фото+не+доступно";
      e.target.onerror = null;
    };

    const handleLightboxImageError = (e) => {
      e.target.src = "https://via.placeholder.com/1200x800?text=Фото+не+доступно";
      e.target.onerror = null;
    };

    const fetchWorks = async () => {
      isLoading.value = true;
      error.value = null;

      try {
        const response = await fetch("http://localhost:5000/api/portfolio");
        if (!response.ok) throw new Error("Ошибка загрузки работ");
        works.value = await response.json();
      } catch (err) {
        error.value = err.message;
        console.error("Ошибка:", err);
      } finally {
        isLoading.value = false;
      }
    };

    const filteredWorks = computed(() => {
      let filtered = works.value;
      if (activeFilter.value !== "all") {
        filtered = filtered.filter((w) => w.category === activeFilter.value);
      }
      return filtered.slice(0, visibleCount.value);
    });

    const hasMore = computed(() => {
      const total =
        activeFilter.value === "all"
          ? works.value.length
          : works.value.filter((w) => w.category === activeFilter.value).length;
      return visibleCount.value < total;
    });

    const loadMore = () => {
      visibleCount.value += 3;
    };

    const openLightbox = (work) => {
      currentWork.value = work;
      lightboxOpen.value = true;
      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      lightboxOpen.value = false;
      currentWork.value = null;
      document.body.style.overflow = "";
    };

    onMounted(() => {
      fetchWorks();
    });

    return {
      works,
      isLoading,
      error,
      filters,
      activeFilter,
      filteredWorks,
      hasMore,
      lightboxOpen,
      currentWork,
      getCategoryName,
      handleImageError,
      handleLightboxImageError,
      fetchWorks,
      loadMore,
      openLightbox,
      closeLightbox,
    };
  },
};
</script>

<style src="@/styles/Portfolio.scss" lang="scss" scoped></style>
