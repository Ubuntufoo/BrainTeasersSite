import axios from 'axios';
import VueAxios from 'vue-axios';

import { createApp } from 'vue';
import router from './router';

import App from "./App";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const app = createApp(App); // create our app instance

app.use(router); // tell our app to use the router
app.use(VueAxios, axios);

app.mount("#app"); // mount our app on the div#app element in our template
