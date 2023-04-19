import { createWebHistory, createRouter } from "vue-router";

import AnagramMain from "./components/Anagram/AnagramMain.vue";
import MathMain from "./components/Math/MathMain.vue";

const routes = [
  {
    path: '/math-game',
    component: MathMain
  },
  {
    path: '/anagram-game',
    component: AnagramMain
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;