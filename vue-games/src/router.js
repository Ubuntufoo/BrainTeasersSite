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
    path: '/anagram-game',
    component: AnagramMain
  },
  {
    path: '/wordle-game',
    component: WordleMain
  },
];

const router = createRouter({
  base: 'brainteasers.herokuapp.com/',
  history: createWebHistory(),
  routes: routes,
});

export default router;