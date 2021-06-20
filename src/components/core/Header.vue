<template>
  <div id="Header">
    <v-app-bar app color="#0779E4" dark height="60px">
      <v-app-bar-nav-icon @click="ClickShowmenu"> </v-app-bar-nav-icon>
      <v-divider class="" inset vertical></v-divider>
      <span></span>
      <v-app-bar-title>
        <v-img
          alt="Vuetify Name"
          class="shrink ml-3"
          contain
          src="@/assets/images/logo.png"
          width="60px"
          height="60px"
          transition="scale-transition"
        />
      </v-app-bar-title>
      <v-app-bar-title width="auto">
        <span>ຄຊປປລ ມຊ</span>
      </v-app-bar-title>
      <span></span>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-on="on"
            v-bind="attrs"
            outlined
            small
            color="white"
            @click="logout"
            dark
          >
            <v-icon>power_settings_new</v-icon>
          </v-btn>
        </template>
        <span class="text-tooltip">ອອກຈາກລະບົບ</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      drawer: false,
    };
  },
  mounted() {},
  methods: {
    ClickShowmenu() {
      this.$store.dispatch({
        type: "doClickshow",
      });
    },
    logout() {
      this.$store.dispatch({
        type: "doLogin",
        status: false,
      });
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.text-tooltip{
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
