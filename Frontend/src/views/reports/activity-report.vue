<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="justify-center">
            <span class="text-header">ລາຍງານຂໍ້ມູນການເຄື່ອນໄຫວກິດຈະກຳ</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-card width="100%">
          <v-card-title primary-title class="justify-center">
            <v-row justify="center" class="sub-text">
              <v-col cols="4">
                <v-select
                  :items="Year_select"
                  v-model="Year_value_select"
                  label="ເລືອກປີ"
                  @input="Isselect($event)"
                ></v-select>
              </v-col>
              <v-col cols="4" class="pt-7">
                <v-btn color="primary" :disabled="isChecked">
                  <v-icon>print</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ReceiveReport",
  data() {
    return {
      Year_select: [],
      Year_start: null,
      Year_value_select: null,
      isChecked: true,
    };
  },

  mounted() {
    this.setYear_select();
  },

  methods: {
    setYear_select() {
      // let object = [];
      var d = new Date();
      var y = d.getFullYear();
      this.Year_start = y;
      for (let i = this.Year_start; i > 2000; i--) {
        this.Year_select.push(i);
      }
    },
    Isselect(value) {
      if (value != "") {
        this.isChecked = false;
      } else {
        this.isChecked = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-size: 24px;
}
.sub-text {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
