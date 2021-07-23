import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#0779E4",
        update: "#35D0BA",
        delete: "#F05945",
        btn_save: "#0779E4",
        btn_cancel: "#ff9642",
        btn_add: "#0779E4",
        font_color: "#5F5F5F",
        font_header: "#0779E4",
        women: "#7C83FD",
      },
    },
  },
});
