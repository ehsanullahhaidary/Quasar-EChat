const routes = [
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      try {
        if (
          localStorage.getItem("userName") === "Ehsanullah" &&
          localStorage.getItem("password") === "12345"
        ) {
          next();
        } else {
          next("login");
        }
      } catch (error) {
        next("login");
      }
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/HomePage.vue"),
        name: "Home",
      },
      {
        path: "about",
        component: () => import("pages/AboutPage.vue"),
        name: "About",
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: (to, from, next) => {
      try {
        if (
          localStorage.getItem("userName") === "Ehsanullah" &&
          localStorage.getItem("password") === "12345"
        ) {
          next("/");
        } else {
          next();
        }
      } catch (error) {
        next("login");
      }
    },
    component: () => import("pages/LoginPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
