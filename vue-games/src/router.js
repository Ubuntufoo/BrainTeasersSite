import { createWebHistory, createRouter } from "vue-router";

import AnagramMain from "./components/Anagram/AnagramMain.vue";
import MathGame from "./apps/MathGame.vue";

const routes = [
  {
    path: '/anagram-game',
    component: AnagramMain
  },
  {
    path: '/math-game',
    component: MathGame
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;