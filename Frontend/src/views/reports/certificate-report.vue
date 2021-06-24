<template>
  <div>
    <v-container fluid>
      <v-row justify="center" class="my-5 mx-10">
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="justify-center">
            <span class="text-header">ລາຍງານຂໍ້ມູນການຍ້ອງຍໍ</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-card width="100%">
          <v-row>
            <v-col cols="6">
              <v-card width="100%">
                <v-card-title primary-title>
                  <span class="sub-header">ລາຍງານຂໍ້ມູນປະຈຳສົກປີ</span>
                </v-card-title>
                <v-card-text>
                  <v-form class="text-content">
                    <v-select
                      :items="Years"
                      v-model="value"
                      label="ເລືອກປີ"
                      append-icon="today"
                      @input="selectvalue($event)"
                    ></v-select>
                  </v-form>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn color="primary" :disabled="isChecked" @click="submit">
                    <v-icon>print</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card width="100%">
                <v-card-title primary-title>
                  <span class="sub-header"
                    >ລາຍງານລາຍຊື່ສະມາຊິກທີ່ໄດ້ຮັບການຍ້ອງຍໍ</span
                  >
                </v-card-title>
                <v-card-text>
                  <v-form class="text-content">
                    <v-select
                      :items="certificate_NO"
                      v-model="select_NO"
                      label="ເລືອກເລກທີໃບຍ້ອງຍໍ"
                      @input="check_select($event)"
                    ></v-select>
                    <v-row>
                      <v-col cols="10">
                           <v-textarea
                           rows="2"
                           label="ຫົວຂໍ້ການຍ້ອງຍໍ"
                           readonly
                           :value="activity_Title"
                           >
                           </v-textarea>
                           </v-col>
                      <v-col cols="2" class="pt-7 align-content-end">
                        <v-card-actions class="justify-end">
                          <v-btn color="primary" :disabled="isChecked2">
                            <v-icon>print</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MemberRetirementReport",
  data() {
    return {
      //Valid input
      required(propertyType) {
        return (v) => (v && v.length > 0) || `ກະລຸນາປ້ອນຂໍ້ມູນ${propertyType}`;
      },
      // validate btn
      valid: false,
      Years: [],
      start_year: 2000,
      isChecked: true,
      select_NO:"",
      activity_Title:"",
      isChecked2: true,
    };
  },

  mounted() {
    this.setYear();
  },
  methods: {
    submit() {
      if (this.start_date_format > this.end_date_format) {
        this.$store.dispatch({
          type: "doClick_myMsg",
          mshow: true,
          mcolor: "error",
          micon: "error",
          message: "ຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຄືນໃໝ່",
        });
        this.message = "ກະລຸນາເລືອກວັນທີຄືນໃໝ່";
      }
    },
    setYear() {
      var now = new Date();
      var y = now.getFullYear();
      for (let i = y; i >= this.start_year; i--) {
        this.Years.push(i);
      }
    },
    selectvalue(val) {
      if (val != "") {
        this.isChecked = false;
      } else {
        this.isChecked = true;
      }
    },
    check_select(val){
     if(val!="" && this.activity_Title!=""){
         this.isChecked2=false;
     }else{
         this.isChecked2=true;
     }
    }
  },
};
</script>

<style lang="scss" scoped>
.text-header {
  font-family: "boonhome-400";
  font-size: 24px;
}
.sub-header {
  font-family: "boonhome-400";
  font-size: 18px;
  color: #0779e4;
}
.text-content,
.calender {
  font-family: "boonhome-400";
  font-size: 14px;
}
</style>
