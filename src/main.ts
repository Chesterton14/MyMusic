import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

import "./styles/index.scss";

import { ElInput } from "element-plus";
import "element-plus/packages/theme-chalk/src/base.scss"; // Element-plus 按需引入

import { Swipe, SwipeItem } from "vant";
import 'vant/lib/index.css'; 

const app = createApp(App);
app.component(ElInput.name, ElInput);
app.use(Swipe)
  .use(SwipeItem);

app.use(router);
app.mount("#app");
