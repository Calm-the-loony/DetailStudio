<template>
  <header :class="['header', { scrolled: isScrolled }]">
    <div class="container header__content">
      <div class="header__logo" @click="goToHome">
        <span>DetailStudio</span>
      </div>

      <nav :class="['header__nav', { open: isMenuOpen }]">
        <a href="/" @click="goToHome">Главная</a>
        <a href="#services" @click="scrollToSection('services')">Услуги</a>
        <a href="#portfolio" @click="scrollToSection('portfolio')">Портфолио</a>
        <a href="#advantages" @click="scrollToSection('advantages')">Преимущества</a>

        <!-- Выпадающее меню для остальных пунктов -->
        <div class="dropdown">
          <span class="dropdown__toggle">Еще</span>
          <div class="dropdown__menu">
            <a href="#about" @click="scrollToSection('about')">О нас</a>
            <a href="#reviews" @click="scrollToSection('reviews')" class="dropdown-item">Отзывы</a>
            <a href="#contact" @click="scrollToSection('contact')" class="dropdown-item"
              >Контакты</a
            >
          </div>
        </div>

        <a href="/login" class="login-link">Вход</a>
      </nav>

      <div class="burger" :class="{ active: isMenuOpen }" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "AppHeader",

  setup() {
    const isMenuOpen = ref(false);
    const isScrolled = ref(false);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    const goToHome = (e) => {
      if (e) e.preventDefault();
      closeMenu();
      window.location.href = "/";
    };

    const scrollToSection = (sectionId) => {
      closeMenu();
      if (window.location.pathname !== "/") {
        window.location.href = "/";
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      isMenuOpen,
      isScrolled,
      toggleMenu,
      closeMenu,
      goToHome,
      scrollToSection,
    };
  },
};
</script>

<style src="@/styles/Header.scss" lang="scss" scoped></style>
