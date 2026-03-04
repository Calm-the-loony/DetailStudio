import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/Login.vue";
import AdminPanel from "@/views/AdminPanel.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminPanel,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (to.meta.requiresAuth && !isAdmin) {
    next("/login");
  } else {
    next();
  }
});

export default router;
