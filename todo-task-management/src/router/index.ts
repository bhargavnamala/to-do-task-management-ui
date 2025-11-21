import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ConfirmEmailView from "../views/ConfirmEmailView.vue";
import TodoView from "../views/TodoView.vue";
import { useAuthStore } from "@/stores/authStore";

const routes = [
  { path: "/", redirect: "/todos" },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/confirm-email", component: ConfirmEmailView },
  { path: "/todos", component: TodoView, meta: { requiresAuth: true } }
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.accessToken) {
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else next();
});

export default router;
