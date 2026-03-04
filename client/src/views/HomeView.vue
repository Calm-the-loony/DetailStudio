<template>
  <div>
    <AppHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <AdvantagesSection />
      <ServicesSection />
      <ReviewsSection />
      <PortfolioSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/Layout/Header.vue";
import AppFooter from "@/components/Layout/Footer.vue";
import HeroSection from "@/components/Sections/Hero.vue";
import AboutSection from "@/components/Sections/About.vue";
import AdvantagesSection from "@/components/Sections/Advantages.vue";
import ServicesSection from "@/components/Sections/Services.vue";
import ReviewsSection from "@/components/Sections/Reviews.vue";
import PortfolioSection from "@/components/Sections/Portfolio.vue";
import ContactSection from "@/components/Sections/Contact.vue";

export default {
  name: "HomeView",
  components: {
    AppHeader,
    AppFooter,
    HeroSection,
    AboutSection,
    AdvantagesSection,
    ServicesSection,
    ReviewsSection,
    PortfolioSection,
    ContactSection,
  },
};
</script>
