<template>
  <div class="login-page">
    <AppHeader />
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h2 class="login-title">Вход в админ-панель</h2>
          <p class="login-subtitle">Введите свои данные для доступа к управлению сайтом</p>
        </div>

        <form class="login-form" @submit.prevent="handleLogin">
          <div v-if="error" class="login-error">
            <svg
              class="error-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
              <path
                d="M12 8V12M12 16H12.01"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <span>{{ error }}</span>
          </div>

          <div class="input-group" :class="{ focused: focusedField === 'email' }">
            <label class="input-label">
              <svg
                class="input-icon"
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
              Email
            </label>
            <input
              type="email"
              class="login-input"
              v-model="email"
              @focus="focusedField = 'email'"
              @blur="focusedField = ''"
              placeholder="admin@detailstudio.ru"
              required
            />
          </div>

          <div class="input-group" :class="{ focused: focusedField === 'password' }">
            <label class="input-label">
              <svg
                class="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M7 11V7C7 4.2 9.2 2 12 2C14.8 2 17 4.2 17 7V11"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
              Пароль
            </label>
            <div class="password-input-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="login-input password-input"
                v-model="password"
                @focus="focusedField = 'password'"
                @blur="focusedField = ''"
                placeholder="••••••••"
                required
              />
              <button type="button" class="password-toggle" @click="showPassword = !showPassword">
                <svg
                  v-if="!showPassword"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 2L22 22"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M6.7 6.7C4.1 8.4 2.5 11.1 2.5 11.1C2.5 11.1 6 18 12.5 18C14.4 18 16.1 17.3 17.5 16.2M9.5 9.5C9.9 9.1 10.4 8.8 11 8.6C11.6 8.4 12.3 8.4 13 8.6C13.7 8.8 14.3 9.2 14.8 9.7C15.3 10.2 15.7 10.8 15.9 11.5C16.1 12.2 16.1 12.9 15.9 13.6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M19.9 15.5C21.2 13.9 22 11.9 22 11.1C22 11.1 19 4 12 4"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" class="login-button" :disabled="isLoading">
            <span v-if="!isLoading">Войти</span>
            <span v-else class="loader"></span>
          </button>
        </form>

        <div class="login-footer">
          <p>Демо-доступ: admin@detailstudio.ru / admin123</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "@/components/Layout/Header.vue";

export default {
  name: "LoginView",
  components: {
    AppHeader,
  },
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const focusedField = ref("");
    const showPassword = ref(false);
    const isLoading = ref(false);

    const handleLogin = async () => {
      if (!email.value || !password.value) {
        error.value = "Заполните все поля";
        return;
      }

      isLoading.value = true;
      error.value = "";

      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Ошибка авторизации");
        }

        if (data.success) {
          localStorage.setItem("isAdmin", "true");
          localStorage.setItem("user", JSON.stringify(data.user));
          router.push("/admin");
        } else {
          error.value = data.message || "Доступ запрещён";
        }
      } catch (err) {
        console.error("Ошибка входа:", err);
        error.value = err.message || "Ошибка соединения с сервером";
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      password,
      error,
      focusedField,
      showPassword,
      isLoading,
      handleLogin,
    };
  },
};
</script>

<style src="@/styles/Login.scss" lang="scss" scoped></style>
