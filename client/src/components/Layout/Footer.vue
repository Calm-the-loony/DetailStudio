<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__grid">
        <!-- Колонка 1: Логотип и описание -->
        <div class="footer__col">
          <div class="footer__logo" @click="goToHome">
            <span>DetailStudio</span>
          </div>
          <p class="footer__description">
            Профессиональный детейлинг-центр в Нижнем Новгороде. Керамическое покрытие, полировка,
            химчистка салона и защита кузова.
          </p>
          <div class="footer__social">
            <a
              href="#"
              class="footer__social-link"
              aria-label="WhatsApp"
              @click.prevent="openWhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19.077 4.928C17.191 3.041 14.683 2 12.006 2c-5.36 0-9.73 4.36-9.74 9.72 0 1.71.45 3.38 1.3 4.86L2 22l5.48-1.44c1.42.78 3.02 1.19 4.64 1.19h.01c5.36 0 9.73-4.36 9.74-9.72 0-2.59-1.02-5.06-2.88-6.94zM12.02 20.04c-1.46 0-2.89-.39-4.14-1.13l-.3-.17-3.35.88.9-3.27-.19-.32c-.8-1.32-1.22-2.85-1.22-4.41.01-4.46 3.64-8.09 8.12-8.09 2.16 0 4.2.85 5.73 2.38 1.53 1.53 2.37 3.57 2.37 5.73-.01 4.47-3.65 8.1-8.12 8.1zm4.44-6.06c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.19-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.57 4.06 3.6.57.24 1.01.39 1.36.5.57.18 1.1.15 1.51.09.46-.06 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="#"
              class="footer__social-link"
              aria-label="Telegram"
              @click.prevent="openTelegram"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </a>
            <a href="#" class="footer__social-link" aria-label="VK" @click.prevent="openVK">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M13 16V9h2.5M13 12h2.5M8.5 9H11v7H8.5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </a>
            <a
              href="#"
              class="footer__social-link"
              aria-label="Instagram"
              @click.prevent="openInstagram"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Колонка 2: Навигация -->
        <div class="footer__col">
          <h3 class="footer__title">Навигация</h3>
          <ul class="footer__menu">
            <li><a href="#services" @click.prevent="scrollToSection('services')">Услуги</a></li>
            <li>
              <a href="#advantages" @click.prevent="scrollToSection('advantages')">Преимущества</a>
            </li>
            <li><a href="#about" @click.prevent="scrollToSection('about')">О нас</a></li>
            <li><a href="#reviews" @click.prevent="scrollToSection('reviews')">Отзывы</a></li>
            <li><a href="#contact" @click.prevent="scrollToSection('contact')">Контакты</a></li>
          </ul>
        </div>

        <!-- Колонка 3: Контакты -->
        <div class="footer__col">
          <h3 class="footer__title">Контакты</h3>
          <ul class="footer__contacts">
            <li>
              <svg
                class="footer__contact-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2" />
              </svg>
              <span>ул. Кузнечихинская, д. 37, кв. 19</span>
            </li>
            <li>
              <svg
                class="footer__contact-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16.92V19C22.001 19.75 21.827 20.49 21.495 21.156C21.163 21.822 20.685 22.393 20.1 22.821C19.515 23.249 18.843 23.521 18.136 23.614C17.429 23.707 16.714 23.619 16.05 23.357C11.48 21.594 7.606 18.448 4.94 14.41C3.279 12.051 2.29 9.299 2.05 6.43C1.973 5.594 2.097 4.752 2.41 3.981C2.723 3.21 3.214 2.537 3.837 2.025C4.46 1.514 5.194 1.181 5.978 1.058C6.762 0.935 7.564 1.025 8.3 1.32C9.036 1.615 9.679 2.104 10.16 2.732C10.641 3.36 10.94 4.102 11.02 4.887C11.1 5.672 10.959 6.466 10.614 7.173C10.269 7.88 9.735 8.469 9.08 8.87C9.795 10.529 10.878 12.014 12.24 13.21C13.602 14.406 15.201 15.277 16.93 15.76C17.335 15.16 17.89 14.68 18.54 14.37C19.19 14.06 19.91 13.93 20.63 13.99C21.35 14.05 22.04 14.31 22.62 14.74C23.2 15.17 23.65 15.75 23.92 16.42C24.19 17.09 24.27 17.82 24.15 18.53C24.03 19.24 23.73 19.91 23.27 20.47C22.81 21.03 22.21 21.46 21.53 21.71C20.85 21.96 20.11 22.03 19.4 21.91"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <a href="tel:+79094521010" class="footer__link">+7 (909) 452-10-10</a>
            </li>
            <li>
              <svg
                class="footer__contact-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <a href="mailto:info@detailstudio.ru" class="footer__link">info@detailstudio.ru</a>
            </li>
          </ul>
        </div>

        <!-- Колонка 4: Реквизиты -->
        <div class="footer__col">
          <h3 class="footer__title">Реквизиты</h3>
          <ul class="footer__details">
            <li><span class="footer__details-label">ОГРН:</span> 1215200020342</li>
            <li><span class="footer__details-label">ИНН:</span> 5262379650</li>
            <li><span class="footer__details-label">КПП:</span> 526201001</li>
            <li><span class="footer__details-label">Директор:</span> Уткин А.И.</li>
            <li><span class="footer__details-label">Дата рег.:</span> 02.06.2021</li>
          </ul>
        </div>
      </div>

      <!-- Нижняя часть подвала -->
      <div class="footer__bottom">
        <p class="footer__copyright">
          © {{ currentYear }} ООО "Автодетейлинг". Все права защищены.
        </p>
        <p class="footer__legal">
          <a href="#" class="footer__legal-link" @click.prevent="openPrivacyModal"
            >Политика конфиденциальности</a
          >
          <span class="footer__separator">|</span>
          <a href="#" class="footer__legal-link" @click.prevent="openTermsModal"
            >Пользовательское соглашение</a
          >
        </p>
      </div>
    </div>

    <!-- Модальные окна -->
    <PrivacyModal :show="showPrivacyModal" @close="showPrivacyModal = false" />
    <TermsModal :show="showTermsModal" @close="showTermsModal = false" />
  </footer>
</template>

<script>
import { ref } from "vue";
import PrivacyModal from "@/components/UI/PrivacyModal.vue";
import TermsModal from "@/components/UI/TermsModal.vue";

export default {
  name: "AppFooter",
  components: {
    PrivacyModal,
    TermsModal,
  },
  setup() {
    const currentYear = ref(new Date().getFullYear());
    const showPrivacyModal = ref(false);
    const showTermsModal = ref(false);

    const goToHome = () => {
      window.location.href = "/";
    };

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    const openPrivacyModal = () => {
      showPrivacyModal.value = true;
    };

    const openTermsModal = () => {
      showTermsModal.value = true;
    };

    // Социальные сети
    const openWhatsApp = () => {
      window.open("https://wa.me/79094521010", "_blank");
    };

    const openTelegram = () => {
      window.open("https://t.me/detailstudio", "_blank");
    };

    const openVK = () => {
      window.open("https://vk.com/detailstudio", "_blank");
    };

    const openInstagram = () => {
      window.open("https://instagram.com/detailstudio", "_blank");
    };

    return {
      currentYear,
      showPrivacyModal,
      showTermsModal,
      goToHome,
      scrollToSection,
      openPrivacyModal,
      openTermsModal,
      openWhatsApp,
      openTelegram,
      openVK,
      openInstagram,
    };
  },
};
</script>

<style src="@/styles/Footer.scss" lang="scss" scoped></style>
