<template>
  <div id="app">
    <!--Header and Menu -->
    <v-app>
      <div id="myapp">
        <Header v-show="$store.getters.getLogin" />
        <Msg />
        <Menu />
      </div>

      <!--Content  -->
      <Content class="content" />
    </v-app>
  </div>
</template>

<script>
import Header from "@/components/core/Header.vue";
import Menu from "@/components/core/Menu.vue";
import Content from "@/components/core/Content.vue";
import Msg from "@/components/AlertMessage/alertmessage.vue";
import { mapActions } from "vuex";
export default {
  name: "App",

  components: {
    Header,
    Menu,
    Content,
    Msg,
  },
  created() {
   
  },
  watch: {

  },
  computed: {
  
  },
  mounted() {
    this.show();
  },
  methods: {
    ...mapActions("User", {
      actionsGetUser: "getUser",
    }),
    async show() {
        if(localStorage.getItem("accessToken")){
           await this.actionsGetUser(localStorage.getItem("accessToken"));
            this.$store.dispatch({
             type: "restoreLogin",
                });

        }
    },
  },
  data: () => ({
    //
  }),
};
</script>

<style>
#myapp {
  font-family: "boonhome-400";
  font-size: 24px;
  font-weight: bold;
}
.content {
  font-family: "boonhome-400";
  font-size: 24px;
}
</style>
