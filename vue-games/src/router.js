import { createWebHistory, createRouter } from "vue-router";

import AnagramMain from "./components/Anagram/AnagramMain.vue";
import MathMain from "./components/Math/MathMain.vue";
import WordleMain from "./components/Wordle/WordleMain.vue";

const routes = [
  {
    path: '/math-game',
    component: MathMain
  },
  {
    path: '/',
    component: AnagramMain
  },
  {
    path: '/wordle-game',
    component: WordleMain
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;