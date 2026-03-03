<template>
  <section class="about" id="about">
    <div class="about__container">
      <h2 class="about__title">
        <span class="about__title-accent">/</span> О нас <span class="about__title-accent">/</span>
      </h2>

      <div class="about__content">
        <p class="about__text" :class="{ visible: isVisible }" ref="textElement">
          <span class="about__text-dropcap">А</span>
          втосервис <strong>DetailStudio</strong> — это команда профессионалов с более чем 10-летним
          опытом работы. Мы специализируемся на детейлинге, ремонте и обслуживании автомобилей любой
          сложности. Используем только премиальные материалы и современное оборудование.
        </p>

        <p class="about__text about__text--second" :class="{ visible: isVisible }">
          Нам важно не просто привести автомобиль в идеальное состояние, а дать вам уверенность на
          дороге. Мы ценим ваше время и предлагаем индивидуальный подход, честные цены и прозрачную
          работу.
        </p>
      </div>

      <!-- Декоративные элементы -->
      <div class="about__line about__line--left"></div>
      <div class="about__line about__line--right"></div>
      <div class="about__corner about__corner--tl"></div>
      <div class="about__corner about__corner--br"></div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "AboutSection",
  setup() {
    const isVisible = ref(false);
    const textElement = ref(null);

    const handleScroll = () => {
      if (textElement.value) {
        const rect = textElement.value.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100 && rect.bottom >= 0) {
          isVisible.value = true;
        }
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      isVisible,
      textElement,
    };
  },
};
</script>

<style src="@/styles/About.scss" lang="scss" scoped></style>
