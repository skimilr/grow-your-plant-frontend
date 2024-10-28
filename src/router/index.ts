import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/HelloWorld.vue";
import UserPlant from "../components/UserPlant.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/plant",
    name: "UserPlant",
    component: UserPlant,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
