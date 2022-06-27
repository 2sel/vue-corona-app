import { createApp } from "vue"; // eslint-disable-line no-unused-vars
import App from "./App.vue";

// element plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// global css
import "./styles/main.css";

const app = createApp(App);

app.use(ElementPlus);

app.mount("#app");
