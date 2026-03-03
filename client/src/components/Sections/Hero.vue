<template>
  <section class="hero">
    <div class="hero__overlay">
      <div class="hero__content">
        <h1 class="hero__title">
          Вернем блеск<br />
          <span>вашего автомобиля</span>
        </h1>
        <p class="hero__subtitle">
          Профессиональный детейлинг, керамическое покрытие, полировка фар, химчистка салона и
          защита кузова. Работаем с премиальными брендами.
        </p>

        <div class="hero__buttons">
          <a href="#services" class="hero__cta-btn">
            <span>Наши услуги</span>
            <svg
              class="hero__cta-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
          <a href="#contact" class="hero__cta-btn hero__cta-btn--outline">
            <span>Связаться с нами</span>
          </a>
        </div>
      </div>

      <div class="hero__visual">
        <div class="hero__image-wrapper">
          <div class="hero__image-glow"></div>
          <img :src="carImage" alt="Премиальный автомобиль" class="hero__image" />
        </div>
      </div>
    </div>

    <!-- Минималистичные декоративные элементы -->
    <div class="hero__line hero__line--vertical"></div>
    <div class="hero__line hero__line--horizontal"></div>
    <div class="hero__line hero__line--corner"></div>
  </section>
</template>

<script>
import carImage from "@/assets/car.png";

export default {
  name: "HeroSection",
  data() {
    return {
      carImage,
    };
  },
};
</script>

<style src="@/styles/Hero.scss" lang="scss" scoped></style>
