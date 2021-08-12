<template>
  <div id="Header">
    <v-app-bar
      app
      color="#0779E4"
      dark
      height="60px"
      v-show="$store.getters.getLogin"
    >
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
            @click.prevent="logout"
            dark
          >
            <v-icon>power_settings_new</v-icon>
          </v-btn>
        </template>
        <span class="text-tooltip">ອອກຈາກລະບົບ</span>
      </v-tooltip>
    </v-app-bar>
     <!-- Dialog confirm delete data -->
      <template>
        <v-row justify="center">
          <v-dialog
            v-model="confirm_dialog"
            persistent
            max-width="400"
            transition="dialog-transition"
          >
            <template>
              <v-card>
                <v-toolbar color="primary" height="45" dark>
                  <v-toolbar-title class="header-message">
                    <v-icon>info</v-icon>
                    ຂໍ້ຄວາມ
                  </v-toolbar-title>
                </v-toolbar>
                <v-card-text class="text-center mt-5 text-message">
                  ທ່ານຕ້ອງການອອກຈາກລະບົບຫຼືບໍ່?
                </v-card-text>
                <v-card-actions class="justify-space-between text-message-btn">
                  <v-btn text @click="confirm_dialog = false" color="error"
                    >ຍົກເລີກ</v-btn
                  >
                  <v-spacer></v-spacer>
                  <v-btn text :loading="buttonLoading" color="primary" @click="LogOutConfirm"
                    >ຕົກລົງ</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-row>
      </template>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      confirm_dialog:false,
      buttonLoading:false,
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
      this.confirm_dialog = true;
    },
    LogOutConfirm(){
      this.buttonLoading=true;
      if(this.confirm_dialog==true){
       setInterval(() => {
          this.$store.dispatch({
        type: "doLogOut",
      });
      localStorage.clear();
      this.$router.push("/");
      this.buttonLoading=false;
      this.confirm_dialog = false;
       }, 3000);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.text-tooltip {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
