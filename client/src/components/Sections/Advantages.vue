<template>
  <section class="advantages" id="advantages">
    <div class="advantages__container">
      <h2 class="advantages__title">
        <span class="advantages__title-accent">/</span> Наши Преимущества
        <span class="advantages__title-accent">/</span>
      </h2>

      <div class="advantages__grid">
        <div
          v-for="(advantage, index) in advantages"
          :key="index"
          class="advantage__card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="advantage__icon" v-html="advantage.icon"></div>
          <h3 class="advantage__title">{{ advantage.title }}</h3>
          <p class="advantage__description">{{ advantage.description }}</p>
          <div class="advantage__corner"></div>
        </div>
      </div>
    </div>

    <!-- Декоративные линии -->
    <div class="advantages__line advantages__line--vertical"></div>
    <div class="advantages__line advantages__line--horizontal"></div>
  </section>
</template>

<script>
export default {
  name: "AdvantagesSection",
  data() {
    return {
      advantages: [
        {
          icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z" fill="#fbbf24"/></svg>',
          title: "Качество работы",
          description:
            "Высокое качество ремонта и обслуживания автомобилей с использованием премиальных материалов.",
        },
        {
          icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#fbbf24" stroke-width="2"/><path d="M12 6V12L16 14" stroke="#fbbf24" stroke-width="2"/></svg>',
          title: "Скорость выполнения",
          description: "Быстрое и качественное выполнение всех услуг без потери в качестве.",
        },
        {
          icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12" stroke="#fbbf24" stroke-width="2"/><path d="M12 2V14M12 14L8 10M12 14L16 10" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/></svg>',
          title: "Доступные цены",
          description:
            "Предлагаем выгодные цены на все виды ремонта и обслуживания. Прозрачная система оплаты.",
        },
        {
          icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#fbbf24"/></svg>',
          title: "Профессиональные мастера",
          description: "Работают только квалифицированные специалисты с опытом работы от 10 лет.",
        },
        {
          icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10.5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V10.5M12 3V15M12 15L8 11M12 15L16 11" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/><path d="M3 10.5H21" stroke="#fbbf24" stroke-width="2"/></svg>',
          title: "Гарантия на работы",
          description:
            "Даем гарантию на все виды работ до 2 лет. Используем только качественные запчасти.",
        },
        {
          icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#fbbf24" stroke-width="2"/><path d="M12 6V12L16 10" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="16" r="1" fill="#fbbf24"/></svg>',
          title: "Срочный ремонт",
          description:
            "Ремонт в день обращения. Экспресс-диагностика и оперативное устранение неисправностей.",
        },
      ],
    };
  },
};
</script>

<style src="@/styles/Advantages.scss" lang="scss" scoped></style>
