<template>
  <div>
    <v-app>
      <v-container fluid>
        <v-row justify="center" class="my-5 mx-7">
          <v-card width="100%" color="primary" dark>
            <v-card-title class="justify-center">
              <span class="text-header" color="white">ລາຍງານຂໍ້ມູນຍົກຍ້າຍ</span>
            </v-card-title>
            <v-card-text>
              <v-container fluid>
                <v-form v-model="valid">
                  <v-row>
                    <v-col cols="6">
                      <v-card color="transparent" dark>
                        <v-card-title>
                          <span class="sub-text" color="blue"
                            >ລາຍງານຈຳນວນສະມາຊິກທີ່ຍົກຍ້າຍ</span
                          >
                        </v-card-title>
                        <v-card-text class="sub-text">
                          <v-select
                            :items="Year_select"
                            v-model="Year_value_select"
                            label="ເລືອກສົກຮຽນ"
                            @input="Isselect($event)"
                          ></v-select>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn :disabled="isChecked" color="blue">
                            <v-icon>print</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                    <v-col cols="6">
                      <v-card color="transparent" dark>
                        <v-card-title>
                          <span class="sub-text"
                            >ລາຍງານລາຍຊື່ສະມາຊິກທີ່ຍົກຍ້າຍ</span
                          >
                        </v-card-title>
                        <v-card-text class="sub-text">
                          <v-select
                            :items="items"
                            v-model="value"
                            label="dd"
                            @input="isselect_($event)"
                          ></v-select>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn :disabled="isChecked_" color="blue">
                            <v-icon>print</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "MemberMoveReport",
  data() {
    return {
      Year_select: [],
      Year_start: null,
      Year_value_select: null,
      isChecked: true,
      isChecked_: true,
    };
  },

  mounted() {
    this.setYear_select();
  },

  methods: {
    setYear_select() {
      // let object = [];
      let str = "";
      var d = new Date();
      var y = d.getFullYear();
      this.Year_start = y;
      for (let i = this.Year_start; i > 2000; i--) {
        let n = i - 1;
        str = (i.toString() + "-" + n.toString()).toString();
        this.Year_select.push(str);
      }
    },
    Isselect(value) {
      if (value != "") {
        this.isChecked = false;
      } else {
        this.isChecked = true;
      }
    },
    isselect_(value) {
      if (value != "") {
        this.isChecked_ = false;
      } else {
        this.isChecked_ = true;
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
  font-size: 18px;
}
</style>
