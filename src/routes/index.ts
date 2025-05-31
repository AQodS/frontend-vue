import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Cookies from "js-cookie";

const getToken = () => Cookies.get("token");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/index.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/auth/register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/login.vue"),
  },
  {
    path: "/admin/dashboard",
    name: "dashboard",
    component: () => import("../views/admin/dashboard/index.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Global navigation guard
router.beforeEach((to, _from, next) => {
  // Ambil token otentikasi pengguna
  const token = getToken();

  // Jika rute tujuan membutuhkan otentikasi dan pengguna tidak memiliki token
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    // Alihkan pengguna ke halaman login
    next({ name: "login" });
  }
  // Jika rute tujuan adalah halaman login atau register dan pengguna sudah login
  else if ((to.name === "login" || to.name === "register") && token) {
    // Alihkan pengguna ke halaman dashboard
    next({ name: "dashboard" });
  }
  // Jika tidak ada kondisi khusus, izinkan navigasi ke rute tujuan
  else {
    next();
  }
});

export default router;
