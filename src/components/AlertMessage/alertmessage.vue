<template>
  <div id="Alertmessage">
    <v-row>
      <v-snackbar
        v-model="this.$store.getters.getmyMessage.mShow"
        timeout="-1"
        :color="this.$store.getters.getmyMessage.mColor"
        top
        dark
      >
        <v-icon>{{ this.$store.getters.getmyMessage.mIcon }}</v-icon>
        <span class="mx-3">{{ this.$store.getters.getmyMessage.Message }}</span>
        <span class="mx-10"></span>
        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" class="mr-5" text dark @click="closeMessage"
            >ປິດ</v-btn
          >
        </template>
      </v-snackbar>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Alertmessage",
  data() {
    return {
      timeout: 4000,
    };
  },
  mounted() {},
  methods: {
    closeMessage() {
      this.$store.dispatch({
        type: "doClick_myMsg",
        mshow: false,
        mcolor: "",
        micon: "",
        message: "",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#Alertmessage {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
