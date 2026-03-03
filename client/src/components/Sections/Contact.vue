<template>
  <section class="contact" id="contact">
    <div class="contact__container">
      <h2 class="contact__title">
        <span class="contact__title-accent">/</span> Контакты
        <span class="contact__title-accent">/</span>
      </h2>

      <p class="contact__subtitle">Свяжитесь с нами любым удобным способом</p>

      <div class="contact__content">
        <!-- Левая колонка с информацией -->
        <div class="contact__info">
          <div class="contact__card contact__card--full">
            <h3 class="contact__card-title">
              <svg
                class="contact__icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  stroke="#fbbf24"
                  stroke-width="2"
                />
                <circle cx="12" cy="9" r="2.5" stroke="#fbbf24" stroke-width="2" />
              </svg>
              Адрес
            </h3>
            <p class="contact__text">603105, Нижегородская область,</p>
            <p class="contact__text">г. Нижний Новгород, ул. Кузнечихинская, д. 37, кв. 19</p>
          </div>

          <div class="contact__card">
            <h3 class="contact__card-title">
              <svg
                class="contact__icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                  stroke="#fbbf24"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <circle cx="12" cy="7" r="4" stroke="#fbbf24" stroke-width="2" />
              </svg>
              Руководитель
            </h3>
            <p class="contact__text">Уткин Александр Иванович</p>
            <p class="contact__text-light">Директор</p>
          </div>

          <div class="contact__card">
            <h3 class="contact__card-title">
              <svg
                class="contact__icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="#fbbf24" stroke-width="2" />
                <path d="M12 6V12L16 14" stroke="#fbbf24" stroke-width="2" />
              </svg>
              Режим работы
            </h3>
            <p class="contact__text">Пн - Пт: 9:00 - 20:00</p>
            <p class="contact__text">Сб - Вс: 10:00 - 18:00</p>
          </div>

          <div class="contact__card">
            <h3 class="contact__card-title">
              <svg
                class="contact__icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16.92V19C22.001 19.75 21.827 20.49 21.495 21.156C21.163 21.822 20.685 22.393 20.1 22.821C19.515 23.249 18.843 23.521 18.136 23.614C17.429 23.707 16.714 23.619 16.05 23.357C11.48 21.594 7.606 18.448 4.94 14.41C3.279 12.051 2.29 9.299 2.05 6.43C1.973 5.594 2.097 4.752 2.41 3.981C2.723 3.21 3.214 2.537 3.837 2.025C4.46 1.514 5.194 1.181 5.978 1.058C6.762 0.935 7.564 1.025 8.3 1.32C9.036 1.615 9.679 2.104 10.16 2.732C10.641 3.36 10.94 4.102 11.02 4.887C11.1 5.672 10.959 6.466 10.614 7.173C10.269 7.88 9.735 8.469 9.08 8.87C9.795 10.529 10.878 12.014 12.24 13.21C13.602 14.406 15.201 15.277 16.93 15.76C17.335 15.16 17.89 14.68 18.54 14.37C19.19 14.06 19.91 13.93 20.63 13.99C21.35 14.05 22.04 14.31 22.62 14.74C23.2 15.17 23.65 15.75 23.92 16.42C24.19 17.09 24.27 17.82 24.15 18.53C24.03 19.24 23.73 19.91 23.27 20.47C22.81 21.03 22.21 21.46 21.53 21.71C20.85 21.96 20.11 22.03 19.4 21.91"
                  stroke="#fbbf24"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Телефон
            </h3>
            <p class="contact__text">
              <a href="tel:+79094521010" class="contact__link">+7 (909) 452-10-10</a>
            </p>
            <p class="contact__text-light">Ежедневно с 9:00 до 20:00</p>
          </div>

          <div class="contact__card">
            <h3 class="contact__card-title">
              <svg
                class="contact__icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="#fbbf24"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="#fbbf24"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Email
            </h3>
            <p class="contact__text">
              <a href="mailto:info@detailstudio.ru" class="contact__link">info@detailstudio.ru</a>
            </p>
            <p class="contact__text-light">Ответим в течение часа</p>
          </div>
        </div>

        <!-- Правая колонка с реквизитами и картой -->
        <div class="contact__right">
          <div class="contact__details">
            <h3 class="contact__details-title">Реквизиты компании</h3>

            <div class="contact__details-grid">
              <div class="contact__details-item">
                <span class="contact__details-label">Полное наименование:</span>
                <span class="contact__details-value"
                  >ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "АВТОДЕТЕЙЛИНГ"</span
                >
              </div>

              <div class="contact__details-item">
                <span class="contact__details-label">Краткое наименование:</span>
                <span class="contact__details-value">ООО "Автодетейлинг"</span>
              </div>

              <div class="contact__details-item">
                <span class="contact__details-label">ОГРН:</span>
                <span class="contact__details-value">1215200020342</span>
              </div>

              <div class="contact__details-item">
                <span class="contact__details-label">ИНН:</span>
                <span class="contact__details-value">5262379650</span>
              </div>

              <div class="contact__details-item">
                <span class="contact__details-label">КПП:</span>
                <span class="contact__details-value">526201001</span>
              </div>

              <div class="contact__details-item">
                <span class="contact__details-label">Дата регистрации:</span>
                <span class="contact__details-value">02.06.2021</span>
              </div>

              <div class="contact__details-item">
                <span class="contact__details-label">Уставный капитал:</span>
                <span class="contact__details-value">10 000 руб.</span>
              </div>
            </div>
          </div>

          <div class="contact__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2221.123456789!2d43.999999!3d56.299999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTbCsDE4JzAwLjAiTiA0NMKwMDAnMDAuMCJF!5e0!3m2!1sru!2sru!4v1234567890"
              class="contact__map-iframe"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Карта проезда"
            ></iframe>
            <div class="contact__map-overlay">
              <svg
                class="contact__map-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  stroke="#fbbf24"
                  stroke-width="2"
                />
                <circle cx="12" cy="9" r="2.5" stroke="#fbbf24" stroke-width="2" />
              </svg>
              <p>ул. Кузнечихинская, д. 37</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ContactSection",
};
</script>

<style src="@/styles/Contact.scss" lang="scss" scoped></style>
