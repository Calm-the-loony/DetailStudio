<template>
  <section class="reviews" id="reviews">
    <div class="reviews__container">
      <h2 class="reviews__title">
        <span class="reviews__title-accent">/</span> Отзывы наших клиентов
        <span class="reviews__title-accent">/</span>
      </h2>

      <p class="reviews__subtitle">Более 500 довольных клиентов за 8 лет работы</p>

      <div class="reviews__grid">
        <div v-for="review in reviews" :key="review.id" class="review__card">
          <div class="review__header">
            <div class="review__avatar">
              {{ review.name.charAt(0) }}
            </div>
            <div class="review__info">
              <h3 class="review__name">{{ review.name }}</h3>
              <p class="review__car">{{ review.car || "Автомобиль не указан" }}</p>
            </div>
          </div>

          <div class="review__rating">
            <span
              v-for="star in 5"
              :key="star"
              class="review__star"
              :class="{ active: star <= review.rating }"
              >★</span
            >
          </div>

          <p class="review__comment">{{ review.comment }}</p>

          <p class="review__date">{{ formatDate(review.date) }}</p>
        </div>
      </div>

      <!-- Форма добавления отзыва -->
      <div class="reviews__form-container">
        <h3 class="reviews__form-title">Оставить отзыв</h3>

        <form @submit.prevent="submitReview" class="reviews__form">
          <div class="form-group">
            <label class="form-label">
              <svg
                class="form-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" />
              </svg>
              Ваше имя *
            </label>
            <input
              type="text"
              v-model="form.name"
              class="reviews__input"
              placeholder="Иван Иванов"
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
                <rect
                  x="2"
                  y="4"
                  width="20"
                  height="16"
                  rx="3"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="2" />
              </svg>
              Автомобиль (необязательно)
            </label>
            <input
              type="text"
              v-model="form.car"
              class="reviews__input"
              placeholder="Porsche Cayenne"
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
                <path
                  d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
              Оценка *
            </label>
            <div class="reviews__rating-select">
              <span
                v-for="star in 5"
                :key="star"
                class="rating-star"
                :class="{ selected: form.rating >= star }"
                @click="form.rating = star"
                >★</span
              >
            </div>
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
              Ваш отзыв *
            </label>
            <textarea
              v-model="form.comment"
              class="reviews__textarea"
              placeholder="Расскажите о своем опыте..."
              rows="4"
              required
            ></textarea>
          </div>

          <!-- Чекбокс согласия на обработку персональных данных -->
          <div class="form-group consent-group">
            <label class="consent-label">
              <input type="checkbox" v-model="form.consent" class="consent-checkbox" required />
              <span class="consent-text">
                Я согласен на
                <a href="#" class="consent-link" @click.prevent="openPrivacyModal"
                  >обработку персональных данных</a
                >
              </span>
            </label>
          </div>

          <button type="submit" class="reviews__submit-btn" :disabled="!isFormValid">
            <span>Отправить отзыв</span>
            <svg
              class="btn-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </form>

        <p v-if="formSubmitted" class="reviews__success">
          Спасибо за отзыв! Он появится после проверки модератором.
        </p>
      </div>
    </div>

    <!-- Модальное окно политики конфиденциальности -->
    <PrivacyModal :show="showPrivacyModal" @close="showPrivacyModal = false" />
  </section>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import PrivacyModal from "@/components/UI/PrivacyModal.vue";

export default {
  name: "ReviewsSection",
  components: {
    PrivacyModal,
  },
  setup() {
    const reviews = ref([]);
    const isLoading = ref(true);
    const error = ref(null);
    const formSubmitted = ref(false);
    const showPrivacyModal = ref(false);

    const form = ref({
      name: "",
      car: "",
      rating: 5,
      comment: "",
      consent: false,
    });

    const isFormValid = computed(() => {
      return form.value.name && form.value.comment && form.value.rating && form.value.consent; // Добавлена проверка согласия
    });

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reviews");
        if (!response.ok) throw new Error("Ошибка загрузки отзывов");
        reviews.value = await response.json();
      } catch (err) {
        error.value = err.message;
      } finally {
        isLoading.value = false;
      }
    };

    const submitReview = async () => {
      if (!isFormValid.value) return;

      try {
        const response = await fetch("http://localhost:5000/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.value.name,
            car: form.value.car,
            rating: form.value.rating,
            comment: form.value.comment,
          }),
        });

        if (!response.ok) throw new Error("Ошибка отправки отзыва");

        form.value = {
          name: "",
          car: "",
          rating: 5,
          comment: "",
          consent: false,
        };
        formSubmitted.value = true;

        setTimeout(() => {
          formSubmitted.value = false;
        }, 5000);
      } catch (err) {
        error.value = err.message;
      }
    };

    const openPrivacyModal = () => {
      showPrivacyModal.value = true;
    };

    onMounted(() => {
      fetchReviews();
    });

    return {
      reviews,
      isLoading,
      error,
      form,
      formSubmitted,
      showPrivacyModal,
      isFormValid,
      formatDate,
      submitReview,
      openPrivacyModal,
    };
  },
};
</script>

<style src="@/styles/Reviews.scss" lang="scss" scoped></style>
