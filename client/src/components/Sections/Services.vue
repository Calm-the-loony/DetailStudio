<template>
  <section class="services" id="services">
    <div class="services__container">
      <h2 class="services__title">
        <span class="services__title-accent">/</span> Наши услуги
        <span class="services__title-accent">/</span>
      </h2>

      <div v-if="isLoading" class="services__loading">
        <div class="services__spinner"></div>
        <p>Загрузка услуг...</p>
      </div>

      <div v-else-if="error" class="services__error">
        <p>{{ error }}</p>
        <button @click="fetchServices" class="services__retry-btn">Повторить</button>
      </div>

      <div v-else class="services__grid">
        <div
          v-for="(service, index) in services"
          :key="service.id"
          class="service__card"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @mouseenter="hoveredCard = index"
          @mouseleave="hoveredCard = null"
        >
          <div class="service__icon" v-html="service.icon"></div>
          <h3 class="service__title">{{ service.name }}</h3>
          <p class="service__description">{{ service.description }}</p>
          <div class="service__footer">
            <span class="service__price">{{ service.price }}</span>
            <a href="#contact" class="service__btn">Записаться</a>
          </div>
          <div class="service__corner"></div>

          <!-- Плавающий эффект -->
          <div class="service__glow" :class="{ active: hoveredCard === index }"></div>
        </div>
      </div>
    </div>

    <!-- Декоративные элементы -->
    <div class="services__line services__line--vertical"></div>
    <div class="services__line services__line--horizontal"></div>
    <div class="services__shape services__shape--1"></div>
    <div class="services__shape services__shape--2"></div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "ServicesSection",
  setup() {
    const services = ref([]);
    const isLoading = ref(true);
    const error = ref(null);
    const hoveredCard = ref(null);

    const fetchServices = async () => {
      isLoading.value = true;
      error.value = null;

      try {
        const response = await fetch("http://localhost:5000/api/services");
        if (!response.ok) throw new Error("Ошибка загрузки услуг");
        const data = await response.json();
        services.value = data;
      } catch (err) {
        error.value = err.message;
        console.error("Ошибка:", err);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchServices();
    });

    return {
      services,
      isLoading,
      error,
      hoveredCard,
      fetchServices,
    };
  },
};
</script>

<style src="@/styles/Services.scss" lang="scss" scoped></style>
