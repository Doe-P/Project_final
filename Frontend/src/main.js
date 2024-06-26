import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
//import moment from "moment"
import dateformat from "dateformat";

Vue.config.productionTip = false;
Vue.filter("formatDate", function (value) {
  if (value) {
    return dateformat(value, "dd-mm-yyyy");
  }
});
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
